/*
Represents a face in the cut up skin. Each face has a front and back side, through
which it connects to the next and the previous face and has one or two sides (depending
on whether the respective endpoints of front and back are the same) through which the
cut of the skin proceeds. Each face in the cut up skin is therefore a triangle or a
quadrilateral.
*/
var CutFace = /** @class */ (function () {
    function CutFace(front, back) {
        this.front = front;
        this.back = back;
    }
    CutFace.prototype.rotate = function () {
        return new CutFace(this.back.revert(), this.front.revert());
    };
    CutFace.prototype.describe = function () {
        return "<" + this.front.describe() + ";" + this.back.describe() + ">";
    };
    return CutFace;
}());
//# sourceMappingURL=CutFace.js.map