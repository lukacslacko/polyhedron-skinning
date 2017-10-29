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
        var v = new GraphVertex(name, false, 0, 0);
        this.vertices.push(v);
        return v;
    }
}
