function octahedronPoly() {
    var a = Math.sqrt(3);
    var A = new Point(-a, 0, 0, "A");
    var B = new Point(0, -a, 0, "B");
    var C = new Point(a, 0, 0, "C");
    var D = new Point(0, a, 0, "D");
    var P = new Point(0, 0, a, "P");
    var Q = new Point(0, 0, -a, "Q");
    return new Polyhedron([
        new Face([P, A, B]),
        new Face([P, B, C]),
        new Face([P, C, D]),
        new Face([P, D, A]),
        new Face([Q, A, B]),
        new Face([Q, B, C]),
        new Face([Q, C, D]),
        new Face([Q, D, A])
    ]);
}
function octahedronPath() {
    return ["P D", "P A Q", "Q B"];
}
function octahedronCuts() {
    return ["P<", "A< D", "Q< C P>", "B A>", "Q>"];
}
//# sourceMappingURL=Octahedron.js.map