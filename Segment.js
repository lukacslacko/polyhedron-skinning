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
    return Segment;
}());
//# sourceMappingURL=Segment.js.map