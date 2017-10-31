var PlanarPoint = /** @class */ (function () {
    function PlanarPoint(x, y) {
        this.x = x;
        this.y = y;
        this.name = "?";
    }
    PlanarPoint.prototype.clone = function () {
        var p = new PlanarPoint(this.x, this.y);
        p.name = this.name;
        return p;
    };
    PlanarPoint.prototype.plus = function (other) {
        return new PlanarPoint(this.x + other.x, this.y + other.y);
    };
    PlanarPoint.prototype.times = function (factor) {
        return new PlanarPoint(factor * this.x, factor * this.y);
    };
    PlanarPoint.prototype.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    PlanarPoint.prototype.unitVectorTo = function (other) {
        var diff = other.plus(this.times(-1));
        return diff.times(1 / diff.length());
    };
    return PlanarPoint;
}());
//# sourceMappingURL=PlanarPoint.js.map