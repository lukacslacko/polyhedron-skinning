class DXF {
    lines: Array<string>;
    constructor() {
        this.lines = new Array<string>();
        this.lines.push("0", "SECTION", "2", "ENTITIES");
    }

    line(x1: number, y1: number, x2: number, y2: number): void {
        this.lines.push(
            "0", "LINE", "8", "Polygon", 
            "10", "" + x1, "20", "" + y1, 
            "11", "" + x2, "21", "" + y2);
    }

    content(): string {
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