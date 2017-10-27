var Polyhedron = /** @class */ (function () {
    function Polyhedron(faces) {
        this.faces = faces;
    }
    Polyhedron.prototype.hide = function (scene) {
        for (var _i = 0, _a = this.faces; _i < _a.length; _i++) {
            var face = _a[_i];
            face.hide(scene);
        }
    };
    Polyhedron.prototype.render = function (scene) {
        for (var _i = 0, _a = this.faces; _i < _a.length; _i++) {
            var face = _a[_i];
            face.render(scene);
        }
    };
    return Polyhedron;
}());
//# sourceMappingURL=Polyhedron.js.map