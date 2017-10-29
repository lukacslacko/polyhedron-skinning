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
        return null;
    }

    opposite(edge: Segment, face: Face): Face {
        for (let f of this.faces) {
            if (f == face) continue;
            if (f.hasEdge(edge)) return f;
        }
        console.log("COuld not find opposite of " + face.describe() + " through edge " + edge.describe());
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
}