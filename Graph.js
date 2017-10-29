var Graph = /** @class */ (function () {
    function Graph() {
        this.vertices = new Array();
        this.faces = new Array();
    }
    Graph.prototype.makeFixedVertex = function (name, x, y) {
        for (var _i = 0, _a = this.vertices; _i < _a.length; _i++) {
            var v_1 = _a[_i];
            if (v_1.name == name)
                return v_1;
        }
        var v = new GraphVertex(name, true, x, y);
        this.vertices.push(v);
        return v;
    };
    Graph.prototype.makeVertex = function (name) {
        for (var _i = 0, _a = this.vertices; _i < _a.length; _i++) {
            var v_2 = _a[_i];
            if (v_2.name == name)
                return v_2;
        }
        var v = new GraphVertex(name, false, Math.random(), Math.random());
        this.vertices.push(v);
        return v;
    };
    return Graph;
}());
//# sourceMappingURL=Graph.js.map