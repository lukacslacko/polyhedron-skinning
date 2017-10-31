function tetrahedronPoly() {
    var A = new Point(-1, -1, -1, "A");
    var B = new Point(1, 1, -1, "B");
    var C = new Point(-1, 1, 1, "C");
    var D = new Point(1, -1, 1, "D");
    var result = new Polyhedron([
        new Face([A, B, C]),
        new Face([A, B, D]),
        new Face([A, C, D]),
        new Face([B, C, D])
    ]);
    result.splitEdge(new Segment(A, B), 2, 0);
    return result;
}
function tetrahedronPath() {
    return ["A D", "A A-B-0-2 B", "B, C"];
}
function tetrahedronCuts() {
    return ["A>", "A-B-0-2> D", "B> A<", "C A-B-0-2<", "B<"];
}
//# sourceMappingURL=Tetrahedron.js.map