class Segment {
    constructor(public from: Point, public to: Point) {}

    midpoint(): Point {
        var from = this.from;
        var to = this.to;
        return new Point(
            (from.x + to.x) / 2, (from.y + to.y) / 2, (from.z + to.z) / 2,
            from.name + to.name);
    }
}