class Layout {
    private pieces : Array<DXFModule>;
    
    constructor(private pageWidth: number, private pageHeight: number) {
        this.pieces = new Array<DXFModule>();
    }

    add(item: DXFModule): void {
        this.pieces.push(item);
    }

    save(): Array<DXF> {
        let rows = [new LayoutRow(this.pageWidth)];
        for (let piece of this.pieces) {
            if (!rows[rows.length-1].maybeAdd(piece)) {
                rows.push(new LayoutRow(this.pageWidth));
                rows[rows.length-1].add(piece);
            }
        }
        let pages = [new LayoutPage(this.pageHeight)];
        for (let row of rows) {
            if (!pages[pages.length-1].maybeAdd(row)) {
                pages.push(new LayoutPage(this.pageHeight));
                pages[pages.length-1].add(row);
            }
        }
        let dxfs = new Array<DXF>();
        for (let page of pages) {
            let dxf = new DXF();
            for (let row of page.rows) {
                for (let piece of row.pieces) {
                    dxf.add(piece.shift(0, row.shiftY));
                }
            }
            dxfs.push(dxf);
        }
        return dxfs;
    }
}

let layoutGap = 10;

class LayoutPage {
    public rows: Array<LayoutRow>;
    private height: number;
    constructor(private pageHeight: number) {
        this.rows = new Array<LayoutRow>();
        this.height = 0;
    }

    maybeAdd(row: LayoutRow): boolean {
        if (this.height + row.height > this.pageHeight) {
            return false;
        }
        this.add(row);
        return true;
    }

    add(row: LayoutRow): void {
        row.shiftY = this.height;
        this.rows.push(row);
        this.height += row.height;
    }
}

class LayoutRow {
    private width: number;
    public pieces: Array<DXFModule>;
    public height: number;
    public shiftY: number;
    
    constructor(private rowWidth: number) { 
        this.width = 0;
        this.height = 0;
        this.pieces = new Array<DXFModule>();
    }

    maybeAdd(piece: DXFModule): boolean {
        if (this.width + piece.maxX - piece.minX > this.rowWidth) {
            return false;
        }
        this.add(piece);
        return true;
    }

    add(piece: DXFModule): void {
        this.pieces.push(piece.shift(layoutGap + this.width - piece.minX, layoutGap - piece.minY));
        this.width += layoutGap + piece.maxX - piece.minX;
        this.height = Math.max(this.height, layoutGap + piece.maxY - piece.minY);
    }
};