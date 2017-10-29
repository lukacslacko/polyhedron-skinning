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
    Face.prototype.hasEdge = function (edge) {
        var points = this.points;
        for (var i = 0; i < points.length; ++i) {
            var j = (i + 1) % points.length;
            if (edge.from == points[i] && edge.to == points[j])
                return true;
            if (edge.from == points[j] && edge.to == points[i])
                return true;
        }
        return false;
    };
    Face.prototype.otherVertex = function (vertex, edge) {
        var points = this.points;
        for (var i = 0; i < points.length; ++i) {
            var j = (i + 1) % points.length;
            if (edge.from == points[i] && edge.to == points[j])
                continue;
            if (edge.from == points[j] && edge.to == points[i])
                continue;
            if (vertex == points[i])
                return points[j];
            if (vertex == points[j])
                return points[i];
        }
        return undefined;
    };
    Face.prototype.describe = function () {
        var result = "";
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            if (result != "")
                result += "-";
            result += p.name;
        }
        return result;
    };
    return Face;
}());
//# sourceMappingURL=Face.js.map