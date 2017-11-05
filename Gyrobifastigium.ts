function gyrobifastigiumPoly(): Polyhedron {
    var A = new Point(-1, -1, 0, "A");
    var B = new Point(1, -1, 0, "B");
    var C = new Point(1, 1, 0, "C");
    var D = new Point(-1, 1, 0, "D");
    var E = new Point(0, -1, Math.sqrt(3), "E");
    var F = new Point(0, 1, Math.sqrt(3), "F");
    var G = new Point(-1, 0, -Math.sqrt(3), "G");
    var H = new Point(1, 0, -Math.sqrt(3), "H");

    let result = new Polyhedron([
        new Face([A, B, H, G]),
        new Face([C, D, G, H]),
        new Face([A, D, F, E]),
        new Face([B, C, F, E]),
        new Face([A, D, G]),
        new Face([C, B, H]),
        new Face([A, B, E]),
        new Face([C, D, F])
    ]);

    return result;
}
function gyrobifastigiumPath(): Array<string> {
    return ["E A", "E F", "F C"];
}

function gyrobifastigiumCuts(): Array<string> {
    return [
        "E>", 
        "A", 
        "B G E<", 
        "F> H D", 
        "C", 
        "F<"];
}