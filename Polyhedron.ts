class Polyhedron {
    private points: Point[];
    constructor(public faces: Face[]) {
        this.points = [];
        for (let face of faces) {
            for (let p of face.points) {
                if (this.points.indexOf(p) == -1) {
                    this.points.push(p);
                }
            }
        }
    }

    point(name: string): Point {
        for (let p of this.points) if (p.name == name) return p;
        return undefined;
    }

    opposite(edge: Segment, face: Face): Face {
        for (let f of this.faces) {
            if (f == face) continue;
            if (f.hasEdge(edge)) return f;
        }
        console.log("Could not find opposite of " + (face == null ? "null" : face.describe()) + " through edge " + edge.describe());
        return undefined;
    }

    hide(scene: any): void {
        for (let face of this.faces) {
            face.hide(scene);
        }
    }

    render(scene: any, renderLabels: boolean): void {
        for (let face of this.faces) {
            face.render(scene);
        }
        if (renderLabels) for (let p of this.points) {
            p.render(scene);
        }
    }

    scale(factor: number): Polyhedron {
        let scaledPoints = new Array<Point>();
        for (let p of this.points) {
            scaledPoints.push(new Point(factor * p.x, factor * p.y, factor * p.z, p.name));
        }
        function find(p: Point): Point {
            for (let scaled of scaledPoints) if (p.name == scaled.name) return scaled;
        }
        let scaledFaces = new Array<Face>();
        for (let f of this.faces) {
            let scaled = new Array<Point>();
            for (let p of f.points) scaled.push(find(p));
            scaledFaces.push(new Face(scaled));
        }
        return new Polyhedron(scaledFaces);
    }

    /*
    Splits the given edge into parts number of segments and returns the index'th
    vertex from the split edge. The internal vertices are named 
    edge.from.name-edge.to.name-index-parts.
    */
    splitEdge(edge: Segment, parts: number, index: number): Point {
        var alreadyThere = this.point([edge.from.name, edge.to.name, index, parts].join("-"));
        if (alreadyThere) return alreadyThere;
        var splitPoints = new Array<Point>();
        var result: Point;
        for (var i = 0; i < parts - 1; ++i) {
            var point = edge.interpolate(i, parts);
            this.points.push(point);
            splitPoints.push(point);
            if (i == index) result = point;
        }
        for (let f of this.faces) {
            if (f.hasEdge(edge)) {
                f.splitEdge(edge, parts, splitPoints);
            }
        }
        return result;
    }
}