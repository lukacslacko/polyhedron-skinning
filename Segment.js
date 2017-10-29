var Segment = /** @class */ (function () {
    function Segment(from, to) {
        this.from = from;
        this.to = to;
    }
    Segment.prototype.midpoint = function () {
        var from = this.from;
        var to = this.to;
        return new Point((from.x + to.x) / 2, (from.y + to.y) / 2, (from.z + to.z) / 2, from.name + to.name);
    };
    Segment.prototype.third = function () {
        var from = this.from;
        var to = this.to;
        return new Point((2 * from.x + to.x) / 3, (2 * from.y + to.y) / 3, (2 * from.z + to.z) / 3, from.name + to.name);
    };
    Segment.prototype.describe = function () {
        return "[" + this.from.name + "," + this.to.name + "]";
    };
    return Segment;
}());
//# sourceMappingURL=Segment.js.map