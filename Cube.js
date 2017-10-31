function cubePoly() {
    var A = new Point(-1, -1, -1, "A");
    var B = new Point(1, -1, -1, "B");
    var C = new Point(1, 1, -1, "C");
    var D = new Point(-1, 1, -1, "D");
    var E = new Point(-1, -1, 1, "E");
    var F = new Point(1, -1, 1, "F");
    var G = new Point(1, 1, 1, "G");
    var H = new Point(-1, 1, 1, "H");
    return new Polyhedron([
        new Face([A, B, C, D]),
        new Face([E, F, G, H]),
        new Face([A, B, F, E]),
        new Face([B, C, G, F]),
        new Face([C, D, H, G]),
        new Face([D, A, E, H]),
    ]);
}
function cubePath() {
    return ["E H G", "E A", "A B C"];
}
function cubeCuts() {
    return ["E<", "A< F H<", "B< G", "C H>", "B> D E>", "A>"];
}
//# sourceMappingURL=Cube.js.map