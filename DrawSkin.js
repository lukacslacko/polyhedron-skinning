var Skin = /** @class */ (function () {
    function Skin(cnv, poly, pathNames) {
        this.poly = poly;
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
    Skin.prototype.find = function (names, points, poly) {
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            points.push(poly.point(name_1));
        }
    };
    Skin.prototype.addFace = function (face, side) {
        console.log("Adding face " + face.describe() + " side " + side);
        this.facesAdded.push(face);
        var graphFace = new GraphFace();
        for (var _i = 0, _a = face.points; _i < _a.length; _i++) {
            var p = _a[_i];
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
                }
                else if (i < this.top.length + this.side.length - 1) {
                    x = (side + 1) * (this.top.length - 1);
                    y = i - this.top.length + 1;
                }
                else {
                    y = this.side.length - 1;
                    x = this.top.length - 1 + side * (this.path.length - 1 - i);
                }
                graphFace.vertices.push(this.graph.makeFixedVertex(name, x, y, p));
            }
            else {
                graphFace.vertices.push(this.graph.makeVertex(p.name, p));
            }
        }
        this.graph.faces.push(graphFace);
    };
    Skin.prototype.buildGraph = function () {
        this.path = new Array();
        this.facesAdded = new Array();
        this.graph = new Graph();
        for (var i = this.top.length - 1; i > 0; --i)
            this.path.push(this.top[i]);
        for (var i = 0; i < this.side.length; ++i)
            this.path.push(this.side[i]);
        for (var i = 1; i < this.bottom.length; ++i)
            this.path.push(this.bottom[i]);
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
                if (leftOther == nextPoint)
                    break;
                left = poly.opposite(leftEdge, left);
                this.addFace(left, -1);
            }
            while (true) {
                var rightOther = right.otherVertex(prevPoint, rightEdge);
                rightEdge = new Segment(prevPoint, rightOther);
                if (rightOther == nextPoint)
                    break;
                right = poly.opposite(rightEdge, right);
                this.addFace(right, 1);
            }
        } while (pathIndex < this.path.length - 1);
        for (var _i = 0, _a = poly.faces; _i < _a.length; _i++) {
            var f = _a[_i];
            if (this.facesAdded.indexOf(f) == -1) {
                this.addFace(f, 0);
            }
        }
    };
    Skin.prototype.solveCoordinates = function () {
        var unsolvedVertices = new Array();
        for (var _i = 0, _a = this.graph.vertices; _i < _a.length; _i++) {
            var v = _a[_i];
            if (!v.fixed)
                unsolvedVertices.push(v);
        }
        var n = unsolvedVertices.length;
        var x_c = new Array(n);
        var x_a = new Array(n * n);
        var y_c = new Array(n);
        var y_a = new Array(n * n);
        for (var i = 0; i < n; ++i) {
            var neighbors = this.graph.neighbors(unsolvedVertices[i]);
            var d = neighbors.length;
            var x_sum = 0;
            var y_sum = 0;
            for (var j = 0; j < n; ++j) {
                x_a[n * i + j] = 0;
                y_a[n * i + j] = 0;
            }
            x_c[i] = 0;
            y_c[i] = 0;
            for (var _b = 0, neighbors_1 = neighbors; _b < neighbors_1.length; _b++) {
                var p = neighbors_1[_b];
                if (p.fixed) {
                    x_c[i] += p.x / d;
                    y_c[i] += p.y / d;
                }
                else {
                    var idx = unsolvedVertices.indexOf(p);
                    x_a[n * i + idx] = 1 / d;
                    y_a[n * i + idx] = 1 / d;
                }
            }
        }
        var xs = SolveLinear(x_c, x_a);
        var ys = SolveLinear(y_c, y_a);
        for (var i = 0; i < n; ++i) {
            unsolvedVertices[i].x = xs[i];
            unsolvedVertices[i].y = ys[i];
        }
    };
    Skin.prototype.cutRank = function (v) {
        for (var i = 0; i < this.cuts.length; ++i) {
            if (this.cuts[i].indexOf(v.name) > -1) {
                return i;
            }
        }
        return -1;
    };
    Skin.prototype.rankedPoint = function (bottom, top, rank) {
        var bottomRank = this.cutRank(bottom);
        var topRank = this.cutRank(top);
        if (bottomRank == rank)
            return bottom.point;
        if (topRank == rank)
            return top.point;
    };
    /*
        private cutFace(f: GraphFace): CutFace[] {
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
            do {
                var nextLeftVertex = f.neighbor(leftVertex, -1);
                var nextRightVertex = f.neighbor(rightVertex, 1);
                var leftNextRank = this.cutRank(nextLeftVertex);
                var rightNextRank = this.cutRank(nextRightVertex);
                var nextRank = Math.min(leftNextRank, rightNextRank);
                while (rank < nextRank) {
                    var leftBottom = this.rankedPoint(leftVertex, nextLeftVertex, rank);
                    var leftTop = this.rankedPoint(leftVertex, nextLeftVertex, rank + 1);
                }
            } while (leftVertex != rightVertex);
        }
    */
    Skin.prototype.cutAlong = function (cuts) {
        this.cuts = new Array();
        for (var _i = 0, cuts_1 = cuts; _i < cuts_1.length; _i++) {
            var cut = cuts_1[_i];
            this.cuts.push(cut.split(" "));
        }
        var cutFaces = new Array();
        for (var _a = 0, _b = this.graph.faces; _a < _b.length; _a++) {
            var f = _b[_a];
            // cutFaces.concat(this.cutFace(f));
        }
    };
    Skin.prototype.draw = function () {
        for (var _i = 0, _a = this.graph.faces; _i < _a.length; _i++) {
            var f = _a[_i];
            for (var i = 0; i < f.vertices.length; ++i) {
                var j = (i + 1) % f.vertices.length;
                this.line(f.vertices[j], f.vertices[i]);
            }
        }
        this.ctx.strokeStyle = "lightgreen";
        this.ctx.lineWidth = 3;
        for (var _b = 0, _c = this.cuts; _b < _c.length; _b++) {
            var cut = _c[_b];
            for (var i = 0; i < cut.length - 1; ++i) {
                this.line(this.graph.find(cut[i]), this.graph.find(cut[i + 1]));
            }
        }
    };
    Skin.prototype.line = function (a, b) {
        var x1 = a.x;
        var x2 = b.x;
        var y1 = a.y;
        var y2 = b.y;
        this.ctx.beginPath();
        this.ctx.moveTo((1 + x1) * this.dx, (1 + y1) * this.dy);
        this.ctx.lineTo((1 + x2) * this.dx, (1 + y2) * this.dy);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.ellipse((1 + x1) * this.dx, (1 + y1) * this.dy, 2, 2, 0, 0, 360);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.ellipse((1 + x2) * this.dx, (1 + y2) * this.dy, 2, 2, 0, 0, 360);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.fillText(a.name, 4 + (1 + x1) * this.dx, (1 + y1) * this.dy);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.fillText(b.name, 4 + (1 + x2) * this.dx, (1 + y2) * this.dy);
        this.ctx.stroke();
    };
    return Skin;
}());
//# sourceMappingURL=DrawSkin.js.map