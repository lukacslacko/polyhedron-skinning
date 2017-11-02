class PlanarPoint {
    public name: string;
    constructor(public x: number, public y: number) {
        this.name = "?";
    }

    clone(): PlanarPoint {
        let p = new PlanarPoint(this.x, this.y);
        p.name = this.name;
        return p;
    }

    plus(other: PlanarPoint): PlanarPoint {
        return new PlanarPoint(this.x + other.x, this.y + other.y);
    }

    times(factor: number): PlanarPoint {
        return new PlanarPoint(factor * this.x, factor * this.y);
    }

    length(): number {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    unitVectorTo(other: PlanarPoint): PlanarPoint {
        let diff = other.plus(this.times(-1));
        return diff.times(1 / diff.length());
    }

    distanceTo(other: PlanarPoint): number {
        return other.plus(this.times(-1)).length();
    }
}