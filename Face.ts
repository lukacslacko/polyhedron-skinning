class Face {
    constructor(public points: Point[]) {}

    hide(scene: any): void {}

    render(scene: any): void {
        var geometry = new THREE.Geometry();
        for (let p of this.points) {
            geometry.vertices.push(p.asVector3());
        }
        for (var i = 2; i < this.points.length; ++i) {
            geometry.faces.push(new THREE.Face3(0, i-1, i));
            geometry.faces.push(new THREE.Face3(0, i, i-1));
        }
        geometry.computeFaceNormals();
        scene.add(new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xbb6622})));
    }

    hasEdge(edge: Segment): boolean {
        var points = this.points;
        for (var i = 0; i < points.size(); ++i) {
            var j = (i+1) % points.size();
            if (edge.from == points[i] && edge.to == points[j]) return true;
            if (edge.from == points[j] && edge.to == points[i]) return true;
        }
        return false;
    }
}