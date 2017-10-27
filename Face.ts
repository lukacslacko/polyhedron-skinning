class Face {
    constructor(public points : Point[]) {}

    hide(scene : any) : void {}

    render(scene : any) : void {
        var geometry = new THREE.Geometry();
        for (let p of this.points) {
            geometry.vertices.push(p);
        }
        for (var i = 2; i < this.points.length; ++i) {
            geometry.faces.push(new THREE.Face3(0, i-1, i));
            geometry.faces.push(new THREE.Face3(0, i, i-1));
        }
        geometry.computeFaceNormals();
        scene.add(new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xbb6622})));
    }
}