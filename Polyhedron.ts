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