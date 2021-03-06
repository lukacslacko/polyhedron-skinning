class PlanarFace {
    public topLeft: PlanarPoint;
    public topRight: PlanarPoint;
    public bottomLeft: PlanarPoint;
    public bottomRight: PlanarPoint;
    public backVert: PlanarPoint;
    public tabAtBottom: boolean;

    constructor(vert: PlanarPoint, orig: PlanarPoint, face: CutFace) {
        this.tabAtBottom = face.tabAtBottom;
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

    render(dxf: DXFModule, left: boolean): void {
        this.line(dxf, this.bottomLeft, this.topLeft, !left);
        this.line(dxf, this.bottomRight, this.topRight, left);
        if (this.bottomLeft != this.bottomRight) this.tab(dxf, this.bottomLeft, this.bottomRight, this.tabAtBottom, true);
        if (this.topLeft != this.topRight) this.tab(dxf, this.topLeft, this.topRight, this.tabAtBottom, false);
    }

    cover(dxf: DXFModule): void {
        if (this.bottomLeft != this.bottomRight) this.line(dxf, this.bottomLeft, this.bottomRight, false);
        if (this.topLeft != this.topRight) this.line(dxf, this.topLeft, this.topRight, false);
        let leftUnit = this.bottomLeft.unitVectorTo(this.topLeft).times(0.03);
        let leftInset = this.horiz(leftUnit);
        let leftStart = this.bottomLeft.plus(leftInset).plus(leftUnit.times(-2));
        let leftEnd = this.topLeft.plus(leftInset).plus(leftUnit.times(2));
        this.line(dxf, leftStart, leftEnd, false);
        let rightUnit = this.bottomRight.unitVectorTo(this.topRight).times(0.03);
        let rightInset = this.horiz(rightUnit).times(-1);
        let rightStart = this.bottomRight.plus(rightInset).plus(rightUnit.times(-2));
        let rightEnd = this.topRight.plus(rightInset).plus(rightUnit.times(2));
        this.line(dxf, rightStart, rightEnd, false);
    }

    private line(dxf: DXFModule, a: PlanarPoint, b: PlanarPoint, dashed: boolean): void {
        if (!dashed) {
            this.scaledLine(dxf, a, b);
        } else {
            let cut = 0.1;
            let gap = 0.2;
            let v = a.unitVectorTo(b);
            this.scaledLine(dxf, a, a.plus(v.times(cut)));
            this.scaledLine(dxf, b, b.plus(v.times(-cut)));
            let d = a.distanceTo(b);
            let n = (d - 2*cut) / (gap + cut + gap);
            let nFloor = Math.floor(n);
            if (nFloor == 0) return;
            let factor = n / nFloor;
            let scaledCut = factor * cut;
            let scaledGap = factor * gap; 
            let scaledStep = 2 * scaledGap + scaledCut;
            for (let i = 0; i < nFloor; ++i) {
                this.scaledLine(
                    dxf, 
                    a.plus(v.times(cut + i * scaledStep + scaledGap)),
                    a.plus(v.times(cut + i * scaledStep + scaledGap + scaledCut)));
            }
        }
    }

    private scaledLine(dxf: DXFModule, a: PlanarPoint, b: PlanarPoint): void {
        let scale = 60;
        dxf.line(a.x * scale, a.y * scale, b.x * scale, b.y * scale);
    }

    private tab(dxf: DXFModule, a: PlanarPoint, b: PlanarPoint, tabAtBottom: boolean, bottom: boolean): void {
        let d = a.distanceTo(b);
        let v = a.unitVectorTo(b);
        let w = this.horiz(v);
        if (!tabAtBottom) w = w.times(-1);
        let gap = tabAtBottom == bottom ? 0.46 : 0.5;
        this.scaledLine(dxf, a, a.plus(v.times((d-gap) / 2)));
        this.scaledLine(dxf, b, b.plus(v.times(-(d-gap) / 2)));
        let r = gap / 2;
        let step = 15;
        let x = d / 2 +r;
        let y = 0;
        for (let deg = step; deg <= 180; deg += step) {
            let newX = d / 2 + r * Math.cos(deg * Math.PI / 180);
            let newY = r * Math.sin(deg * Math.PI / 180);
            this.scaledLine(
                dxf, 
                a.plus(v.times(x)).plus(w.times(y)), 
                a.plus(v.times(newX)).plus(w.times(newY)));
            x = newX;
            y = newY;
        }
    }
}
