var PlanarFace = /** @class */ (function () {
    function PlanarFace(vert, orig, face) {
        this.tabAtBottom = face.tabAtBottom;
        this.bottomLeft = orig;
        this.bottomLeft.name = face.back.from.name;
        var f = face.back.from.distance(face.back.to);
        var g = face.back.to.distance(face.front.to);
        var h = face.back.from.distance(face.front.to);
        this.topLeft = orig.plus(vert.times(f));
        this.topLeft.name = face.back.to.name;
        var middleVert = vert;
        if (face.front.to == face.back.to) {
            this.topRight = this.topLeft;
        }
        else {
            this.topRight = this.triangle(f, g, h, vert, orig);
            this.topRight.name = face.front.to.name;
            middleVert = this.bottomLeft.unitVectorTo(this.topRight);
        }
        var i = face.front.from.distance(face.back.from);
        var j = face.front.to.distance(face.front.from);
        if (face.back.from == face.front.from) {
            this.backVert = middleVert;
            this.bottomRight = this.bottomLeft;
        }
        else {
            this.bottomRight = this.triangle(h, j, i, middleVert, orig);
            this.bottomRight.name = face.front.from.name;
            this.backVert = this.bottomRight.unitVectorTo(this.topRight);
        }
        console.log("Created " + this.describe() + " from " + face.describe());
    }
    PlanarFace.prototype.horiz = function (vert) {
        return new PlanarPoint(vert.y, -vert.x);
    };
    PlanarFace.prototype.triangle = function (f, g, h, vert, orig) {
        var y = (h * h + f * f - g * g) / (2 * f);
        var x = Math.sqrt(h * h - y * y);
        return this.horiz(vert).times(x).plus(vert.times(y)).plus(orig);
    };
    PlanarFace.prototype.describe = function () {
        return [this.bottomLeft.name, this.bottomRight.name, this.topRight.name, this.topLeft.name].join(":");
    };
    return PlanarFace;
}());
//# sourceMappingURL=PlanarFace.js.map