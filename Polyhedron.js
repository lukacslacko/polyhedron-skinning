var Polyhedron = /** @class */ (function () {
    function Polyhedron(faces) {
        this.faces = faces;
        this.points = [];
        for (var _i = 0, faces_1 = faces; _i < faces_1.length; _i++) {
            var face = faces_1[_i];
            for (var _a = 0, _b = face.points; _a < _b.length; _a++) {
                var p = _b[_a];
                if (this.points.indexOf(p) == -1) {
                    this.points.push(p);
                }
            }
        }
    }
    Polyhedron.prototype.point = function (name) {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            if (p.name == name)
                return p;
        }
        return null;
    };
    Polyhedron.prototype.hide = function (scene) {
        for (var _i = 0, _a = this.faces; _i < _a.length; _i++) {
            var face = _a[_i];
            face.hide(scene);
        }
    };
    Polyhedron.prototype.render = function (scene, renderLabels) {
        for (var _i = 0, _a = this.faces; _i < _a.length; _i++) {
            var face = _a[_i];
            face.render(scene);
        }
        if (renderLabels)
            for (var _b = 0, _c = this.points; _b < _c.length; _b++) {
                var p = _c[_b];
                p.render(scene);
            }
    };
    return Polyhedron;
}());
//# sourceMappingURL=Polyhedron.js.map