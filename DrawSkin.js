var Skin = /** @class */ (function () {
    function Skin(cnv, poly, topNames, sideNames, bottomNames) {
        this.cnv = cnv;
        this.poly = poly;
        this.topNames = topNames;
        this.sideNames = sideNames;
        this.bottomNames = bottomNames;
        this.top = [];
        this.side = [];
        this.bottom = [];
        this.find(topNames, this.top, poly);
        this.find(sideNames, this.side, poly);
        this.find(bottomNames, this.bottom, poly);
        var w = cnv.width;
        var h = cnv.height;
        this.dx = w / (2 * this.top.length);
        this.dy = h / (this.side.length + 1);
        this.ctx = cnv.getContext("2d");
    }
    Skin.prototype.find = function (names, points, poly) {
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            points.push(poly.point(name_1));
        }
    };
    Skin.prototype.draw = function () {
        for (var i = 1; i < this.side.length; ++i) {
            this.line(0, i - 1, this.side[i - 1], 0, i, this.side[i]);
            this.line(2 * this.top.length - 2, i - 1, this.side[i - 1], 2 * this.top.length - 2, i, this.side[i]);
        }
        for (var i = 1; i < this.top.length; ++i) {
            this.line(i - 1, 0, this.top[i - 1], i, 0, this.top[i]);
            this.line(2 * this.top.length - 2 - (i - 1), 0, this.top[i - 1], 2 * this.top.length - 2 - i, 0, this.top[i]);
            this.line(i - 1, this.side.length - 1, this.bottom[i - 1], i, this.side.length - 1, this.bottom[i]);
            this.line(2 * this.top.length - 2 - (i - 1), this.side.length - 1, this.bottom[i - 1], 2 * this.top.length - 2 - i, this.side.length - 1, this.bottom[i]);
        }
    };
    Skin.prototype.line = function (x1, y1, p1, x2, y2, p2) {
        this.ctx.beginPath();
        this.ctx.moveTo((1 + x1) * this.dx, (1 + y1) * this.dy);
        this.ctx.lineTo((1 + x2) * this.dx, (1 + y2) * this.dy);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.ellipse((1 + x1) * this.dx, (1 + y1) * this.dy, 2, 2, 0, 0, 360);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.ellipse((1 + x2) * this.dx, (1 + y2) * this.dy, 2, 2, 0, 0, 360);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeText(p1.name, 4 + (1 + x1) * this.dx, (1 + y1) * this.dy);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.strokeText(p2.name, 4 + (1 + x2) * this.dx, (1 + y2) * this.dy);
        this.ctx.stroke();
    };
    return Skin;
}());
//# sourceMappingURL=DrawSkin.js.map