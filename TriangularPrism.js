function triangularPrismPoly() {
    var A = new Point(-1, -1, 0, "A");
    var B = new Point(-1, 1, 0, "B");
    var C = new Point(1, 1, 0, "C");
    var D = new Point(1, -1, 0, "D");
    var P = new Point(-1, 0, Math.sqrt(3), "P");
    var Q = new Point(1, 0, Math.sqrt(3), "Q");
    var result = new Polyhedron([
        new Face([A, B, C, D]),
        new Face([B, C, Q, P]),
        new Face([A, P, Q, D]),
        new Face([Q, C, D]),
        new Face([A, P, B])
    ]);
    return result;
}
function triangularPrismPath() {
    return ["A P", "A D", "D C"];
}
function triangularPrismCuts() {
    return [
        "A>",
        "P",
        "D> B Q A<",
        "C",
        "D<"
    ];
}
//# sourceMappingURL=TriangularPrism.js.map