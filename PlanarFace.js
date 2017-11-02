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
    PlanarFace.prototype.render = function (dxf, left) {
        this.line(dxf, this.bottomLeft, this.topLeft, !left);
        this.line(dxf, this.bottomRight, this.topRight, left);
        if (this.bottomLeft != this.bottomRight)
            this.tab(dxf, this.bottomLeft, this.bottomRight, this.tabAtBottom, true);
        if (this.topLeft != this.topRight)
            this.tab(dxf, this.topLeft, this.topRight, this.tabAtBottom, false);
    };
    PlanarFace.prototype.line = function (dxf, a, b, dashed) {
        if (!dashed) {
            this.scaledLine(dxf, a, b);
        }
        else {
            var cut = 0.2;
            var gap = 0.2;
            var d = a.distanceTo(b);
            var n = (d - 2 * cut) / (gap + cut + gap);
            var nCeil = Math.ceil(n);
            var factor = n / nCeil;
            var scaledCut = factor * cut;
            var scaledGap = factor * gap;
            var scaledStep = 2 * scaledGap + scaledCut;
            var v = a.unitVectorTo(b);
            this.scaledLine(dxf, a, a.plus(v.times(cut)));
            this.scaledLine(dxf, b, b.plus(v.times(-cut)));
            for (var i = 0; i < n; ++i) {
                this.scaledLine(dxf, a.plus(v.times(cut + i * scaledStep + scaledGap)), a.plus(v.times(cut + i * scaledStep + scaledGap + scaledCut)));
            }
        }
    };
    PlanarFace.prototype.scaledLine = function (dxf, a, b) {
        var scale = 20;
        dxf.line(a.x * scale, a.y * scale, b.x * scale, b.y * scale);
    };
    PlanarFace.prototype.tab = function (dxf, a, b, tabAtBottom, bottom) {
        var d = a.distanceTo(b);
        var v = a.unitVectorTo(b);
        var w = this.horiz(v);
        if (!tabAtBottom)
            w = w.times(-1);
        var gap = tabAtBottom == bottom ? 0.3 : 0.31;
        this.scaledLine(dxf, a, a.plus(v.times((d - gap) / 2)));
        this.scaledLine(dxf, b, b.plus(v.times(-(d - gap) / 2)));
        var r = gap / 2;
        var step = 15;
        var x = d / 2 + r;
        var y = 0;
        for (var deg = step; deg <= 180; deg += step) {
            var newX = d / 2 + r * Math.cos(deg * Math.PI / 180);
            var newY = r * Math.sin(deg * Math.PI / 180);
            this.scaledLine(dxf, a.plus(v.times(x)).plus(w.times(y)), a.plus(v.times(newX)).plus(w.times(newY)));
            x = newX;
            y = newY;
        }
    };
    return PlanarFace;
}());
//# sourceMappingURL=PlanarFace.js.map