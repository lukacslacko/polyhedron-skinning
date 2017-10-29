class GraphVertex {
    public solved: boolean;
    constructor(public name: string, public fixed: boolean, public x: number, public y: number) {
        this.solved = !fixed;
    }
}
