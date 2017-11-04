function gyrobifastigiumPoly() {
    var A = new Point(-1, -1, 0, "A");
    var B = new Point(1, -1, 0, "B");
    var C = new Point(1, 1, 0, "C");
    var D = new Point(-1, 1, 0, "D");
    var E = new Point(0, -1, Math.sqrt(3), "E");
    var F = new Point(0, 1, Math.sqrt(3), "F");
    var G = new Point(-1, 0, -Math.sqrt(3), "G");
    var H = new Point(1, 0, -Math.sqrt(3), "H");
    var result = new Polyhedron([
        new Face([A, B, H, G]),
        new Face([C, D, G, H]),
        new Face([A, D, F, E]),
        new Face([B, C, F, E]),
        new Face([A, D, G]),
        new Face([C, B, H]),
        new Face([A, B, E]),
        new Face([C, D, F])
    ]);
    result.splitEdge(new Segment(E, F), 3, 0);
    return result;
}
function gyrobifastigiumPath() {
    return ["E A", "E E-F-0-3 E-F-1-3 F", "F C"];
}
function gyrobifastigiumCuts() {
    return [
        "E>",
        "E-F-0-3> A",
        "E-F-1-3> B G E<",
        "F> H D E-F-0-3<",
        "C E-F-1-3<",
        "F<"
    ];
}
//# sourceMappingURL=Gyrobifastigium.js.map