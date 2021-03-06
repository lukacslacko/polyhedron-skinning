function icosahedronPoly() {
    var f = (Math.sqrt(5) + 1) / 2;
    var P = new Point(0, 1, f, "P");
    var A = new Point(-f, 0, 1, "A");
    var B = new Point(0, -1, f, "B");
    var C = new Point(f, 0, 1, "C");
    var D = new Point(1, f, 0, "D");
    var E = new Point(-1, f, 0, "E");
    var p = new Point(0, -1, -f, "p");
    var a = new Point(f, 0, -1, "a");
    var b = new Point(0, 1, -f, "b");
    var c = new Point(-f, 0, -1, "c");
    var d = new Point(-1, -f, 0, "d");
    var e = new Point(1, -f, 0, "e");
    var poly = new Polyhedron([
        new Face([P, A, B]),
        new Face([P, B, C]),
        new Face([P, C, D]),
        new Face([P, D, E]),
        new Face([P, E, A]),
        new Face([p, a, b]),
        new Face([p, b, c]),
        new Face([p, c, d]),
        new Face([p, d, e]),
        new Face([p, e, a]),
        new Face([A, c, d]),
        new Face([a, C, D]),
        new Face([B, d, e]),
        new Face([b, D, E]),
        new Face([C, e, a]),
        new Face([c, E, A]),
        new Face([D, a, b]),
        new Face([d, A, B]),
        new Face([E, b, c]),
        new Face([e, B, C])
    ]);
    return poly.scale(1.5);
}
function icosahedronPath() {
    return ["P E", "P A d p", "p e"];
}
function icosahedronCuts() {
    return [
        "P<",
        "A< E",
        "B D P>",
        "d< C b A>",
        "p< a c",
        "e d>",
        "p>"
    ];
}
//# sourceMappingURL=Icosahedron.js.map