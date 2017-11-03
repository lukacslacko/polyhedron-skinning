class GraphVertex {
    constructor(public name: string, public fixed: boolean, public x: number, public y: number, public point: Point) {}

    describe(): string {
        return "(" + this.name + "=" + this.point.name + ")";
    }

    interpolate(factor: number, other: GraphVertex, point: Point): GraphVertex {
        return new GraphVertex(
            "", true, 
            (1 - factor) * this.x + factor * other.x,
            (1 - factor) * this.y + factor * other.y, 
            point);
    }
}
