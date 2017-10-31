var Graph = /** @class */ (function () {
    function Graph() {
        this.vertices = new Array();
        this.faces = new Array();
    }
    Graph.prototype.makeFixedVertex = function (name, x, y, p) {
        for (var _i = 0, _a = this.vertices; _i < _a.length; _i++) {
            var v_1 = _a[_i];
            if (v_1.name == name)
                return v_1;
        }
        var v = new GraphVertex(name, true, x, y, p);
        this.vertices.push(v);
        return v;
    };
    Graph.prototype.makeVertex = function (name, p) {
        for (var _i = 0, _a = this.vertices; _i < _a.length; _i++) {
            var v_2 = _a[_i];
            if (v_2.name == name)
                return v_2;
        }
        var v = new GraphVertex(name, false, Math.random(), Math.random(), p);
        this.vertices.push(v);
        return v;
    };
    Graph.prototype.find = function (name) {
        for (var _i = 0, _a = this.vertices; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v.name == name)
                return v;
        }
        return undefined;
    };
    Graph.prototype.neighbors = function (v) {
        var result = new Array();
        for (var _i = 0, _a = this.faces; _i < _a.length; _i++) {
            var f = _a[_i];
            var i = f.vertices.indexOf(v);
            if (i == -1)
                continue;
            var n = f.vertices.length;
            var p = f.vertices[(i + 1) % n];
            var q = f.vertices[(n + i - 1) % n];
            if (result.indexOf(p) == -1)
                result.push(p);
            if (result.indexOf(q) == -1)
                result.push(q);
        }
        return result;
    };
    return Graph;
}());
//# sourceMappingURL=Graph.js.map