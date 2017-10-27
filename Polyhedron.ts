class Polyhedron {
    constructor(public faces : Face[]) {}

    hide(scene : any) : void {
        for (let face of this.faces) {
            face.hide(scene);
        }
    }

    render(scene : any) : void {
        for (let face of this.faces) {
            face.render(scene);
        }
    }
}