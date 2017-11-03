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
        return undefined;
    };
    Polyhedron.prototype.opposite = function (edge, face) {
        for (var _i = 0, _a = this.faces; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f == face)
                continue;
            if (f.hasEdge(edge))
                return f;
        }
        console.log("Could not find opposite of " + (face == null ? "null" : face.describe()) + " through edge " + edge.describe());
        return undefined;
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
    Polyhedron.prototype.scale = function (factor) {
        var scaledPoints = new Array();
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var p = _a[_i];
            scaledPoints.push(new Point(factor * p.x, factor * p.y, factor * p.z, p.name));
        }
        function find(p) {
            for (var _i = 0, scaledPoints_1 = scaledPoints; _i < scaledPoints_1.length; _i++) {
                var scaled = scaledPoints_1[_i];
                if (p.name == scaled.name)
                    return scaled;
            }
        }
        var scaledFaces = new Array();
        for (var _b = 0, _c = this.faces; _b < _c.length; _b++) {
            var f = _c[_b];
            var scaled = new Array();
            for (var _d = 0, _e = f.points; _d < _e.length; _d++) {
                var p = _e[_d];
                scaled.push(find(p));
            }
            scaledFaces.push(new Face(scaled));
        }
        return new Polyhedron(scaledFaces);
    };
    /*
    Splits the given edge into parts number of segments and returns the index'th
    vertex from the split edge. The internal vertices are named
    edge.from.name-edge.to.name-index-parts.
    */
    Polyhedron.prototype.splitEdge = function (edge, parts, index) {
        var alreadyThere = this.point([edge.from.name, edge.to.name, index, parts].join("-"));
        if (alreadyThere)
            return alreadyThere;
        var splitPoints = new Array();
        var result;
        for (var i = 0; i < parts - 1; ++i) {
            var point = edge.interpolate(i, parts);
            this.points.push(point);
            splitPoints.push(point);
            if (i == index)
                result = point;
        }
        for (var _i = 0, _a = this.faces; _i < _a.length; _i++) {
            var f = _a[_i];
            if (f.hasEdge(edge)) {
                f.splitEdge(edge, parts, splitPoints);
            }
        }
        return result;
    };
    return Polyhedron;
}());
//# sourceMappingURL=Polyhedron.js.map