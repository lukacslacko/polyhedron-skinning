class Segment {
    constructor(public from: Point, public to: Point) {}

    midpoint(): Point {
        var from = this.from;
        var to = this.to;
        return new Point(
            (from.x + to.x) / 2, (from.y + to.y) / 2, (from.z + to.z) / 2,
            from.name + to.name);
    }

    third(): Point {
        var from = this.from;
        var to = this.to;
        return new Point(
            (2*from.x + to.x) / 3, (2*from.y + to.y) / 3, (2*from.z + to.z) / 3,
            from.name + to.name);        
    }

    describe(): string {
        return "[" + this.from.name + "," + this.to.name + "]";
    }
}