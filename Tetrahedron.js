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
    return result.scale(1.2);
}
function tetrahedronPath() {
    return ["A D", "A B", "B, C"];
}
function tetrahedronCuts() {
    return ["A>", "D", "B> A<", "C", "B<"];
}
//# sourceMappingURL=Tetrahedron.js.map