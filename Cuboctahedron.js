function cuboctahedronPoly() {
    var A = new Point(0, -1, -1, "A");
    var B = new Point(1, 0, -1, "B");
    var C = new Point(0, 1, -1, "C");
    var D = new Point(-1, 0, -1, "D");
    var P = new Point(0, -1, 1, "P");
    var Q = new Point(1, 0, 1, "Q");
    var R = new Point(0, 1, 1, "R");
    var S = new Point(-1, 0, 1, "S");
    var X = new Point(-1, -1, 0, "X");
    var Y = new Point(1, -1, 0, "Y");
    var Z = new Point(1, 1, 0, "Z");
    var W = new Point(-1, 1, 0, "W");
    var result = new Polyhedron([
        new Face([A, B, C, D]),
        new Face([P, Q, R, S]),
        new Face([A, X, P, Y]),
        new Face([B, Y, Q, Z]),
        new Face([C, Z, R, W]),
        new Face([D, W, S, X]),
        new Face([A, B, Y]),
        new Face([P, Q, Y]),
        new Face([B, C, Z]),
        new Face([Q, R, Z]),
        new Face([C, D, W]),
        new Face([R, S, W]),
        new Face([A, D, X]),
        new Face([P, S, X])
    ]);
    result.splitEdge(new Segment(P, X), 2, 0);
    return result;
}
function cuboctahedronPath() {
    // return ["R W", "R S X A B", "B Y"];
    return ["P Q R", "P P-X-0-2 X A", "A B C"];
}
function cuboctahedronCuts() {
    /* return [
        "R<",
        "S< W",
        "X< Q R>",
        "A< P Z D S>",
        "B< C X>",
        "Y A>",
        "B>"]; */
    return [
        "P<",
        "P-X-0-2< S Q<",
        "X< R",
        "A< W Q>",
        "B< D Z P>",
        "C Y P-X-0-2>",
        "B> X>",
        "A>"
    ];
}
//# sourceMappingURL=Cuboctahedron.js.map