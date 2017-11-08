var Layout = /** @class */ (function () {
    function Layout(pageWidth, pageHeight) {
        this.pageWidth = pageWidth;
        this.pageHeight = pageHeight;
        this.pieces = new Array();
    }
    Layout.prototype.add = function (item) {
        this.pieces.push(item);
    };
    Layout.prototype.save = function () {
        var rows = [new LayoutRow(this.pageWidth)];
        for (var _i = 0, _a = this.pieces; _i < _a.length; _i++) {
            var piece = _a[_i];
            if (!rows[rows.length - 1].maybeAdd(piece)) {
                rows.push(new LayoutRow(this.pageWidth));
                rows[rows.length - 1].add(piece);
            }
        }
        var pages = [new LayoutPage(this.pageHeight)];
        for (var _b = 0, rows_1 = rows; _b < rows_1.length; _b++) {
            var row = rows_1[_b];
            if (!pages[pages.length - 1].maybeAdd(row)) {
                pages.push(new LayoutPage(this.pageHeight));
                pages[pages.length - 1].add(row);
            }
        }
        var dxfs = new Array();
        for (var _c = 0, pages_1 = pages; _c < pages_1.length; _c++) {
            var page = pages_1[_c];
            var dxf = new DXF();
            for (var _d = 0, _e = page.rows; _d < _e.length; _d++) {
                var row = _e[_d];
                for (var _f = 0, _g = row.pieces; _f < _g.length; _f++) {
                    var piece = _g[_f];
                    dxf.add(piece.shift(0, row.shiftY));
                }
            }
            dxfs.push(dxf);
        }
        return dxfs;
    };
    return Layout;
}());
var layoutGap = 10;
var LayoutPage = /** @class */ (function () {
    function LayoutPage(pageHeight) {
        this.pageHeight = pageHeight;
        this.rows = new Array();
        this.height = 0;
    }
    LayoutPage.prototype.maybeAdd = function (row) {
        if (this.height + row.height > this.pageHeight) {
            return false;
        }
        this.add(row);
        return true;
    };
    LayoutPage.prototype.add = function (row) {
        row.shiftY = this.height;
        this.rows.push(row);
        this.height += row.height;
    };
    return LayoutPage;
}());
var LayoutRow = /** @class */ (function () {
    function LayoutRow(rowWidth) {
        this.rowWidth = rowWidth;
        this.width = 0;
        this.height = 0;
        this.pieces = new Array();
    }
    LayoutRow.prototype.maybeAdd = function (piece) {
        if (this.width + piece.maxX - piece.minX > this.rowWidth) {
            return false;
        }
        this.add(piece);
        return true;
    };
    LayoutRow.prototype.add = function (piece) {
        this.pieces.push(piece.shift(layoutGap + this.width - piece.minX, layoutGap - piece.minY));
        this.width += layoutGap + piece.maxX - piece.minX;
        this.height = Math.max(this.height, layoutGap + piece.maxY - piece.minY);
    };
    return LayoutRow;
}());
;
//# sourceMappingURL=Layout.js.map