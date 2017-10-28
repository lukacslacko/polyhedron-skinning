var Face = /** @class */ (function () {
    function Face(points) {
        this.points = points;
    }
    Face.prototype.hide = function (scene) { };
    Face.prototype.render = function (scene) {
        var geometry = new THREE.Geometry();
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            geometry.vertices.push(p.asVector3());
        }
        for (var i = 2; i < this.points.length; ++i) {
            geometry.faces.push(new THREE.Face3(0, i - 1, i));
            geometry.faces.push(new THREE.Face3(0, i, i - 1));
        }
        geometry.computeFaceNormals();
        scene.add(new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xbb6622 })));
    };
    return Face;
}());
//# sourceMappingURL=Face.js.map