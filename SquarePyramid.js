function squarePyramidPoly() {
    var A = new Point(-1, -1, 0, "A");
    var B = new Point(1, -1, 0, "B");
    var C = new Point(1, 1, 0, "C");
    var D = new Point(-1, 1, 0, "D");
    var P = new Point(0, 0, Math.sqrt(2), "P");
    return new Polyhedron([
        new Face([A, B, C, D]),
        new Face([A, B, P]),
        new Face([B, C, P]),
        new Face([C, D, P]),
        new Face([D, A, P])
    ]);
}
function squarePyramidPath() {
    return ["A D", "A B C", "C P"];
}
function squarePyramidCuts() {
    return ["A>", "D B>", "A< C>", "B< P", "C<"];
}
//# sourceMappingURL=SquarePyramid.js.map