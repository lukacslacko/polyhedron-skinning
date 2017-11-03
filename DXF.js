var DXF = /** @class */ (function () {
    function DXF() {
        this.lines = new Array();
        this.lines.push("0", "SECTION", "2", "ENTITIES");
    }
    DXF.prototype.add = function (piece) {
        for (var _i = 0, _a = piece.lines; _i < _a.length; _i++) {
            var line = _a[_i];
            this.line(line.x1, line.y1, line.x2, line.y2);
        }
    };
    DXF.prototype.line = function (x1, y1, x2, y2) {
        this.lines.push("0", "LINE", "8", "Polygon", "10", "" + x1, "20", "" + (-y1), "11", "" + x2, "21", "" + (-y2));
    };
    DXF.prototype.content = function () {
        this.lines.push("0", "ENDSEC", "0", "EOF");
        return this.lines.join("\r\n");
    };
    DXF.prototype.downloadLink = function (filename) {
        var result = document.createElement("a");
        result.innerHTML = filename;
        result.setAttribute("download", filename);
        result.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(this.content()));
        return result;
    };
    return DXF;
}());
var DXFLine = /** @class */ (function () {
    function DXFLine(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    return DXFLine;
}());
var DXFModule = /** @class */ (function () {
    function DXFModule() {
        this.lines = new Array();
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
    }
    DXFModule.prototype.line = function (x1, y1, x2, y2) {
        this.lines.push(new DXFLine(x1, y1, x2, y2));
        this.minX = Math.min(this.minX, x1, x2);
        this.maxX = Math.max(this.maxX, x1, x2);
        this.minY = Math.min(this.minY, y1, y2);
        this.maxY = Math.max(this.maxY, y1, y2);
    };
    DXFModule.prototype.shift = function (x, y) {
        var result = new DXFModule();
        for (var _i = 0, _a = this.lines; _i < _a.length; _i++) {
            var line = _a[_i];
            result.line(x + line.x1, y + line.y1, x + line.x2, y + line.y2);
        }
        return result;
    };
    return DXFModule;
}());
//# sourceMappingURL=DXF.js.map