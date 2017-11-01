/*
Represents a face in the cut up skin. Each face has a front and back side, through
which it connects to the next and the previous face and has one or two sides (depending
on whether the respective endpoints of front and back are the same) through which the
cut of the skin proceeds. Each face in the cut up skin is therefore a triangle or a
quadrilateral.
*/
class CutFace {
    constructor(
        public front: Segment, public back: Segment, 
        public tabAtBottom: boolean = true) {}

    rotate(): CutFace {
        return new CutFace(this.back.revert(), this.front.revert(), !this.tabAtBottom);
    }

    describe(): string {
        return "<" + this.back.describe() + ";" + this.front.describe() + ";" + this.tabAtBottom + ">";
    }
}
