class Polyhedron {
    private points : Point[];
    constructor(public faces : Face[]) {
        this.points = [];
        for (let face of faces) {
            for (let p of face.points) {
                if (this.points.indexOf(p) == -1) {
                    console.log("Adding point");
                    this.points.push(p);
                } else console.log("Skipping point");
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
            console.log("Rendering face");
            face.render(scene);
        }
        for (let p of this.points) {
            console.log("Rendering point");
            p.render(scene);
        }
    }
}