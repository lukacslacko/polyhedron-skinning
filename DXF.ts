class DXF {
    lines: Array<string>;
    constructor() {
        this.lines = new Array<string>();
        this.lines.push("0", "SECTION", "2", "ENTITIES");
    }

    add(piece: DXFModule, x: number, y: number): void {
        for (let line of piece.lines) {
            this.line(x + line.x1, y + line.y1, x + line.x2, y + line.y2);
        }
    }

    private line(x1: number, y1: number, x2: number, y2: number): void {
        this.lines.push(
            "0", "LINE", "8", "Polygon", 
            "10", "" + x1, "20", "" + (-y1), 
            "11", "" + x2, "21", "" + (-y2));
    }

    private content(): string {
        this.lines.push("0", "ENDSEC", "0", "EOF");
        return this.lines.join("\r\n");
    }

    downloadLink(filename: string): HTMLAnchorElement {
        let result = document.createElement("a");
        result.innerHTML = filename;
        result.setAttribute("download", filename);
        result.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(this.content()));
        return result;
    }
}

class DXFLine {
    constructor(public x1: number, public y1: number, public x2: number, public y2: number) {}
}

class DXFModule {
    public lines: Array<DXFLine>;
    public minX: number;
    public minY: number;
    public maxX: number;
    public maxY: number;

    constructor() {
        this.lines = new Array<DXFLine>();
        this.minX = 0;
        this.minY = 0;
        this.maxX = 0;
        this.maxY = 0;
    }

    line(x1: number, y1: number, x2: number, y2: number) {
        this.lines.push(new DXFLine(x1, y1, x2, y2));
        this.minX = Math.min(this.minX, x1, x2);
        this.maxX = Math.max(this.maxX, x1, x2);
        this.minY = Math.min(this.minY, y1, y2);
        this.maxY = Math.max(this.maxY, y1, y2);
        console.log("Line", x1, y1, x2, y2, this.minX, this.minY, this.maxX, this.maxY);
    }
}