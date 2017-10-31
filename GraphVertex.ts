class GraphVertex {
    constructor(public name: string, public fixed: boolean, public x: number, public y: number, public point: Point) {}

    describe(): string {
        return "(" + this.name + "=" + this.point.name + ")";
    }
}
