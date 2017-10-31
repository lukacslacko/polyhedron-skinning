class Segment {
    constructor(public from: Point, public to: Point) {}

    interpolate(index: number, parts: number): Point {
        var from = this.from;
        var to = this.to;
        var factor = (index+1)/parts;
        return new Point(
            (1-factor) * from.x + factor * to.x, 
            (1-factor) * from.y + factor * to.y,
            (1-factor) * from.z + factor * to.z,
            [from.name, to.name, index, parts].join("-"));
    }

    equalsDirected(other: Segment): boolean {
        return this.from == other.from && this.to == other.to;
    }

    equalsReverted(other: Segment): boolean {
        return this.from == other.to && this.to == other.from;
    }

    revert(): Segment {
        return new Segment(this.to, this.from);
    }

    describe(): string {
        return "[" + this.from.name + "," + this.to.name + "]";
    }
}