function cuboctahedronPoly(): Polyhedron {
    let A = new Point(0, -1, -1, "A");
    let B = new Point(1, 0, -1, "B");
    let C = new Point(0, 1, -1, "C");
    let D = new Point(-1, 0, -1, "D");
    let P = new Point(0, -1, 1, "P");
    let Q = new Point(1, 0, 1, "Q");
    let R = new Point(0, 1, 1, "R");
    let S = new Point(-1, 0, 1, "S");
    let X = new Point(-1, -1, 0, "X");
    let Y = new Point(1, -1, 0, "Y");
    let Z = new Point(1, 1, 0, "Z");
    let W = new Point(-1, 1, 0, "W");

    let result = new Polyhedron([
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

    return result;
}
function cuboctahedronPath(): Array<string> {
    return ["P Q R", "P X A", "A B C"];
}

function cuboctahedronCuts(): Array<string> {
    return [
        "P<", 
        "S Q<", 
        "X< R", 
        "A< W Q>", 
        "B< D Z P>", 
        "C Y", 
        "B> X>", 
        "A>"];
}