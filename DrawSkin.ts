class Skin {
    private dx: number;
    private dy: number;
    private ctx: CanvasRenderingContext2D;
    private top: Point[];
    private bottom: Point[];
    private side: Point[];
    private path: Point[];
    private graph: Graph;
    private facesAdded: Face[];
    private cuts: Array<Array<string>>;

    constructor(
        cnv: HTMLCanvasElement,
        private poly: Polyhedron,
        pathNames: Array<string>) {
        this.top = [];
        this.side = [];
        this.bottom = [];
        this.find(pathNames[0].split(" "), this.top, poly);
        this.find(pathNames[1].split(" "), this.side, poly);
        this.find(pathNames[2].split(" "), this.bottom, poly);
        var w = cnv.width;
        var h = cnv.height;
        this.dx = w / (2 * this.top.length);
        this.dy = h / (this.side.length + 1);
        this.ctx = cnv.getContext("2d");
        this.ctx.font = "18px Arial";
        this.ctx.fillStyle = "red";
    }

    private find(names: string[], points: Point[], poly: Polyhedron): void {
        for (let name of names) {
            points.push(poly.point(name));
        }
    }

    private addFace(face: Face, side: number): void {
        console.log("Adding face " + face.describe() + " side " + side);
        this.facesAdded.push(face);
        var graphFace = new GraphFace();
        for (let p of face.points) {
            var i = this.path.indexOf(p);
            if (i > -1) {
                var name = p.name;
                if (i > 0 && i < this.path.length - 1) {
                    name += (side < 0 ? "<" : ">");
                }
                var x = 0;
                var y = 0;
                if (i < this.top.length) {
                    x = this.top.length - 1 + side * i;
                } else if (i < this.top.length + this.side.length - 1) {
                    x = (side + 1) * (this.top.length - 1);
                    y = i - this.top.length + 1;
                } else {
                    y = this.side.length - 1;
                    x = this.top.length - 1 + side * (this.path.length - 1 - i);
                }
                graphFace.vertices.push(this.graph.makeFixedVertex(name, x, y, p));
            } else {
                graphFace.vertices.push(this.graph.makeVertex(p.name, p));
            }
        }
        this.graph.faces.push(graphFace);
    }

    buildGraph(): void {
        this.path = new Array<Point>();
        this.facesAdded = new Array<Face>();
        this.graph = new Graph();
        for (var i = this.top.length - 1; i > 0; --i) this.path.push(this.top[i]);
        for (var i = 0; i < this.side.length; ++i) this.path.push(this.side[i]);
        for (var i = 1; i < this.bottom.length; ++i) this.path.push(this.bottom[i]);
        var poly = this.poly;
        var firstEdge = new Segment(this.path[0], this.path[1]);
        var left = poly.opposite(firstEdge, null);
        var right = poly.opposite(firstEdge, left);
        var leftEdge = firstEdge;
        var rightEdge = firstEdge;
        this.addFace(left, -1);
        this.addFace(right, 1);
        var pathIndex = 1;
        do {
            var prevPoint = this.path[pathIndex];
            ++pathIndex;
            var nextPoint = this.path[pathIndex];
            while (true) {
                var leftOther = left.otherVertex(prevPoint, leftEdge);
                leftEdge = new Segment(prevPoint, leftOther);
                if (leftOther == nextPoint) break;
                left = poly.opposite(leftEdge, left);
                this.addFace(left, -1);    
            }
            while (true) {
                var rightOther = right.otherVertex(prevPoint, rightEdge);
                rightEdge = new Segment(prevPoint, rightOther);
                if (rightOther == nextPoint) break;
                right = poly.opposite(rightEdge, right);
                this.addFace(right, 1);    
            }
        } while (pathIndex < this.path.length - 1);
        for (let f of poly.faces) {
            if (this.facesAdded.indexOf(f) == -1) {
                this.addFace(f, 0);
            }
        }
    }

    solveCoordinates(): void {
        var unsolvedVertices = new Array<GraphVertex>();
        for (let v of this.graph.vertices) {
            if (!v.fixed) unsolvedVertices.push(v);
        }
        var n = unsolvedVertices.length;
        var x_c = new Array<number>(n);
        var x_a = new Array<number>(n*n);
        var y_c = new Array<number>(n);
        var y_a = new Array<number>(n*n);
        for (var i = 0; i < n; ++i) {
            var neighbors = this.graph.neighbors(unsolvedVertices[i]);
            var d = neighbors.length;
            var x_sum = 0;
            var y_sum = 0;
            for (var j = 0; j < n; ++j) {
                x_a[n*i+j] = 0;
                y_a[n*i+j] = 0;
            }
            x_c[i] = 0;
            y_c[i] = 0;
            for (let p of neighbors) {
                if (p.fixed) {
                    x_c[i] += p.x / d;
                    y_c[i] += p.y / d;
                } else {
                    var idx = unsolvedVertices.indexOf(p);
                    x_a[n*i + idx] = 1/d;
                    y_a[n*i + idx] = 1/d;
                }
            }
        }
        var xs = SolveLinear(x_c, x_a);
        var ys = SolveLinear(y_c, y_a);
        for (var i = 0; i < n; ++i) {
            unsolvedVertices[i].x = xs[i];
            unsolvedVertices[i].y = ys[i];
        }
    }

    private cutRank(v: GraphVertex): number {
        for (var i = 0; i < this.cuts.length; ++i) {
            if (this.cuts[i].indexOf(v.name) > -1) {
                return i;
            }
        }
        return -1;
    }

    private rankedPoint(bottom: GraphVertex, top: GraphVertex, rank: number): Point {
        var bottomRank = this.cutRank(bottom); 
        var topRank = this.cutRank(top);
        if (bottomRank == rank) return bottom.point;
        if (topRank == rank) return top.point;
        let result = this.poly.splitEdge(
            new Segment(bottom.point, top.point),
            bottomRank - topRank, 
            bottomRank - rank - 1);
        return result;
    }

    private upperNeighbor(face: GraphFace, vertex: GraphVertex): GraphVertex {
        let n = face.vertices.length;
        var i = face.vertices.indexOf(vertex);
        var p = face.vertices[(i+1) % n];
        var q = face.vertices[(i+n-1) % n];
        if (this.cutRank(p) < this.cutRank(vertex)) return p;
        else return q;
    }

    private cutFace(f: GraphFace): CutFace[] {
        console.log("Cutting " + f.describe());
        var maxRank = -1;
        var maxVertex: GraphVertex;
        for (let v of f.vertices) {
            var rank = this.cutRank(v);
            if (rank > maxRank) {
                maxRank = rank;
                maxVertex = v;
            }
        }
        var leftVertex = maxVertex;
        var rightVertex = maxVertex;
        var rank = maxRank;
        var result = new Array<CutFace>();
        let cnt = 0;
        do {
            var nextLeftVertex = this.upperNeighbor(f, leftVertex);
            var nextRightVertex = this.upperNeighbor(f, rightVertex);
            if (leftVertex == maxVertex) {
                nextLeftVertex = f.neighbor(leftVertex, 1);
            }
            if (rightVertex == maxVertex) {
                nextRightVertex = f.neighbor(rightVertex, -1);
            }
            var leftNextRank = this.cutRank(nextLeftVertex);
            var rightNextRank = this.cutRank(nextRightVertex);
            var nextRank = Math.max(leftNextRank, rightNextRank);
            console.log("Current", leftVertex.describe(), rightVertex.describe());
            console.log("Next", nextLeftVertex.describe(), leftNextRank, nextRightVertex.describe(), rightNextRank);
            console.log("Next rank", nextRank);
            while (rank > nextRank) {
                var leftBottom = this.rankedPoint(leftVertex, nextLeftVertex, rank);
                var leftTop = this.rankedPoint(leftVertex, nextLeftVertex, rank - 1);
                var rightBottom = this.rankedPoint(rightVertex, nextRightVertex, rank);
                var rightTop = this.rankedPoint(rightVertex, nextRightVertex, rank - 1);
                let newFace = new CutFace(new Segment(leftBottom, leftTop), new Segment(rightBottom, rightTop));
                result.push(newFace);
                --rank;
                console.log("Added and rank", newFace.describe(), rank);
            }
            if (rank == leftNextRank) leftVertex = nextLeftVertex;
            if (rank == rightNextRank) rightVertex = nextRightVertex;
        } while (leftVertex != rightVertex && ((cnt++) < 10));
        for (let r of result) console.log(r.describe());
        return result;
    }

    cutAlong(cuts: Array<string>): void {
        this.cuts = new Array<Array<string>>();
        for (let cut of cuts) {
            this.cuts.push(cut.split(" "));
        }
        var cutFaces = new Array<CutFace>();
        for (let f of this.graph.faces) {
            for (let c of this.cutFace(f)) {
                cutFaces.push(c);
            }
        }
        for (let c of cutFaces) {
            console.log(c.describe());
        }
        console.log(cutFaces.length);
    }

    draw(): void {
        for (let f of this.graph.faces) {
            for (var i = 0; i < f.vertices.length; ++i) {
                var j = (i+1) % f.vertices.length;
                this.line(f.vertices[j], f.vertices[i]);
            }
        }
        this.ctx.strokeStyle = "lightgreen";
        this.ctx.lineWidth = 3;
        for (let cut of this.cuts) {
            for (var i = 0; i < cut.length - 1; ++i) {
                this.line(this.graph.find(cut[i]), this.graph.find(cut[i+1]));
            }
        }
    }

    private line(a: GraphVertex, b: GraphVertex) {
        var x1 = a.x;
        var x2 = b.x;
        var y1 = a.y;
        var y2 = b.y;
        this.ctx.beginPath();
        this.ctx.moveTo((1+x1)*this.dx, (1+y1)*this.dy);
        this.ctx.lineTo((1+x2)*this.dx, (1+y2)*this.dy);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.ellipse((1+x1)*this.dx, (1+y1)*this.dy, 2, 2, 0, 0, 360);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.ellipse((1+x2)*this.dx, (1+y2)*this.dy, 2, 2, 0, 0, 360);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.fillText(a.name, 4+(1+x1)*this.dx, (1+y1)*this.dy);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.fillText(b.name, 4+(1+x2)*this.dx, (1+y2)*this.dy);
        this.ctx.stroke();
    }
}