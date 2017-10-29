var Skin = /** @class */ (function () {
    function Skin(cnv, poly, topNames, sideNames, bottomNames) {
        this.poly = poly;
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
    Skin.prototype.addFace = function (face, side) {
        this.facesAdded.push(face);
        var graphFace = new GraphFace();
        for (var _i = 0, _a = face.points; _i < _a.length; _i++) {
            var p = _a[_i];
            var i = this.path.indexOf(p);
            if (i > -1) {
                var name = p.name;
                if (i > 0 && i < this.path.length - 1) {
                    name += (side < 0 ? "<" : ">");
                }
                var x = 0;
                var y = 0;
                if (i < this.top.length) {
                    x = this.top.length - 1 + side * i;
                }
                else if (i < this.top.length + this.side.length - 1) {
                    x = (side + 1) * (this.top.length - 1);
                    y = i - this.top.length + 1;
                }
                else {
                    y = this.side.length;
                    x = this.top.length - 1 + side * (this.path.length - 1 - i);
                }
                graphFace.vertices.push(this.graph.makeFixedVertex(name, x, y));
            }
            else {
                graphFace.vertices.push(this.graph.makeVertex(p.name));
            }
        }
        this.graph.faces.push(graphFace);
    };
    Skin.prototype.buildGraph = function () {
        this.path = new Array();
        this.facesAdded = new Array();
        this.graph = new Graph();
        for (var i = this.top.length - 1; i > 0; --i)
            this.path.push(this.top[i]);
        for (var i = 0; i < this.side.length; ++i)
            this.path.push(this.side[i]);
        for (var i = 1; i < this.bottom.length; ++i)
            this.path.push(this.bottom[i]);
        var poly = this.poly;
        var firstEdge = new Segment(this.path[0], this.path[1]);
        var left = poly.opposite(firstEdge, null);
        var right = poly.opposite(firstEdge, left);
        this.addFace(left, -1);
        this.addFace(right, 1);
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