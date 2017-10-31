var Segment = /** @class */ (function () {
    function Segment(from, to) {
        this.from = from;
        this.to = to;
    }
    Segment.prototype.interpolate = function (index, parts) {
        var from = this.from;
        var to = this.to;
        var factor = (index + 1) / parts;
        return new Point((1 - factor) * from.x + factor * to.x, (1 - factor) * from.y + factor * to.y, (1 - factor) * from.z + factor * to.z, [from.name, to.name, index, parts].join("-"));
    };
    Segment.prototype.equalsDirected = function (other) {
        return this.from == other.from && this.to == other.to;
    };
    Segment.prototype.equalsReverted = function (other) {
        return this.from == other.to && this.to == other.from;
    };
    Segment.prototype.revert = function () {
        return new Segment(this.to, this.from);
    };
    Segment.prototype.describe = function () {
        return "[" + this.from.name + "," + this.to.name + "]";
    };
    return Segment;
}());
//# sourceMappingURL=Segment.js.map