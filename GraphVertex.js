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
    GraphVertex.prototype.interpolate = function (factor, other, point) {
        return new GraphVertex("", true, (1 - factor) * this.x + factor * other.x, (1 - factor) * this.y + factor * other.y, point);
    };
    return GraphVertex;
}());
//# sourceMappingURL=GraphVertex.js.map