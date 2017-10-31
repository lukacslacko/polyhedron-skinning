var GraphVertex = /** @class */ (function () {
    function GraphVertex(name, fixed, x, y, point) {
        this.name = name;
        this.fixed = fixed;
        this.x = x;
        this.y = y;
        this.point = point;
    }
    GraphVertex.prototype.describe = function () {
        return "(" + this.name + "=" + this.point.name + ")";
    };
    return GraphVertex;
}());
//# sourceMappingURL=GraphVertex.js.map