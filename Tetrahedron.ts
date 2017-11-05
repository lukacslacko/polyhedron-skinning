function tetrahedronPoly(): Polyhedron {
    var A = new Point(-1, -1, -1, "A");
    var B = new Point(1, 1, -1, "B");
    var C = new Point(-1, 1, 1, "C");
    var D = new Point(1, -1, 1, "D");

    let result = new Polyhedron([
        new Face([A, B, C]),
        new Face([A, B, D]),
        new Face([A, C, D]),
        new Face([B, C, D])
    ]);
    
    return result.scale(1.2);
}
function tetrahedronPath(): Array<string> {
    return ["A D", "A B", "B, C"];
}

function tetrahedronCuts(): Array<string> {
    return ["A>", "D", "B> A<", "C", "B<"];
}
