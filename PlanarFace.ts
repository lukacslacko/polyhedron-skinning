class PlanarFace {
    public topLeft: PlanarPoint;
    public topRight: PlanarPoint;
    public bottomLeft: PlanarPoint;
    public bottomRight: PlanarPoint;
    public backVert: PlanarPoint;

    constructor(vert: PlanarPoint, orig: PlanarPoint, face: CutFace) {
        this.bottomLeft = orig;
        this.bottomLeft.name = face.back.from.name;
        let f = face.back.from.distance(face.back.to);
        let g = face.back.to.distance(face.front.to);
        let h = face.back.from.distance(face.front.to);
        this.topLeft = orig.plus(vert.times(f));
        this.topLeft.name = face.back.to.name;
        let middleVert = vert;
        if (face.front.to == face.back.to) {
            this.topRight = this.topLeft;
        } else {
            this.topRight = this.triangle(f, g, h, vert, orig);
            this.topRight.name = face.front.to.name;
            middleVert = this.bottomLeft.unitVectorTo(this.topRight);
        }
        let i = face.front.from.distance(face.back.from);
        let j = face.front.to.distance(face.front.from);
        if (face.back.from == face.front.from) {
            this.backVert = middleVert;
            this.bottomRight = this.bottomLeft;
        } else {
            this.bottomRight = this.triangle(h, j, i, middleVert, orig);
            this.bottomRight.name = face.front.from.name;
            this.backVert = this.bottomRight.unitVectorTo(this.topRight);
        }
        console.log("Created " + this.describe() + " from " + face.describe());
    }

    private horiz(vert: PlanarPoint): PlanarPoint {
        return new PlanarPoint(vert.y, -vert.x);
    }

    private triangle(f: number, g: number, h: number, vert: PlanarPoint, orig: PlanarPoint) {
        let y = (h*h + f*f - g*g) / (2*f);
        let x = Math.sqrt(h*h - y*y);
        return this.horiz(vert).times(x).plus(vert.times(y)).plus(orig);
    }

    public describe(): string {
        return [this.bottomLeft.name, this.bottomRight.name, this.topRight.name, this.topLeft.name].join(":");
    }
}