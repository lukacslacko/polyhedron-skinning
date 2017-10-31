var GraphFace = /** @class */ (function () {
    function GraphFace() {
        this.vertices = new Array();
    }
    GraphFace.prototype.neighbor = function (v, side) {
        var i = this.vertices.indexOf(v);
        var n = this.vertices.length;
        var p = this.vertices[(i + 1) % n];
        var q = this.vertices[(i + n - 1) % n];
        var px = p.x - v.x;
        var py = p.y - v.y;
        var qx = q.x - v.x;
        var qy = q.y - v.y;
        if (side * (px * qy - qx * py) > 0)
            return p;
        else
            return q;
    };
    return GraphFace;
}());
//# sourceMappingURL=GraphFace.js.map