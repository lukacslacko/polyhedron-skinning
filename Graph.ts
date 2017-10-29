class Graph {
    public vertices: GraphVertex[];
    public faces: GraphFace[];
    constructor() {
        this.vertices = new Array<GraphVertex>();
        this.faces = new Array<GraphFace>();
    }

    makeFixedVertex(name: string, x: number, y: number): GraphVertex {
        for (let v of this.vertices) {
            if (v.name == name) return v;
        }
        var v = new GraphVertex(name, true, x, y);
        this.vertices.push(v);
        return v;
    }

    makeVertex(name: string): GraphVertex {
        for (let v of this.vertices) {
            if (v.name == name) return v;
        }
        var v = new GraphVertex(name, false, Math.random(), Math.random());
        this.vertices.push(v);
        return v;
    }

    find(name: string): GraphVertex {
        for (let v of this.vertices) {
            if (v.name == name) return v;
        }
        return undefined;
    }

    neighbors(v: GraphVertex): GraphVertex[] {
        var result = new Array<GraphVertex>();
        for (let f of this.faces) {
            var i = f.vertices.indexOf(v);
            if (i == -1) continue;
            var n = f.vertices.length;
            var p = f.vertices[(i+1) % n];
            var q = f.vertices[(n+i-1) % n];
            if (result.indexOf(p) == -1) result.push(p);
            if (result.indexOf(q) == -1) result.push(q);
        }
        return result;
    }
}
