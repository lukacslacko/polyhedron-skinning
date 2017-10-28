class Polyhedron {
    private points : Point[];
    constructor(public faces : Face[]) {
        this.points = [];
        for (let face of faces) {
            for (let p of face.points) {
                if (this.points.indexOf(p) == -1) {
                    this.points.push(p);
                }
            }
        }
    }

    hide(scene : any) : void {
        for (let face of this.faces) {
            face.hide(scene);
        }
    }

    render(scene : any) : void {
        for (let face of this.faces) {
            face.render(scene);
        }
        for (let p of this.points) {
            p.render(scene);
        }
    }
}