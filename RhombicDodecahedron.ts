function rhombicDodecahedronPoly(): Polyhedron {
    var A = new Point(-1, -1, -1, "A");
    var B = new Point(1, -1, -1, "B");
    var C = new Point(1, 1, -1, "C");
    var D = new Point(-1, 1, -1, "D");
    var E = new Point(-1, -1, 1, "E");
    var F = new Point(1, -1, 1, "F");
    var G = new Point(1, 1, 1, "G");
    var H = new Point(-1, 1, 1, "H");
    var P = new Point(0, 0, -2, "P");
    var Q = new Point(0, 0, 2, "Q");
    var R = new Point(0, -2, 0, "R");
    var S = new Point(0, 2, 0, "S");
    var T = new Point(-2, 0, 0, "T");
    var U = new Point(2, 0, 0, "U");

    let result = new Polyhedron([
        new Face([A, R, B, P]),
        new Face([B, U, C, P]),
        new Face([C, S, D, P]),
        new Face([D, T, A, P]),
        new Face([E, R, F, Q]),
        new Face([F, U, G, Q]),
        new Face([G, S, H, Q]),
        new Face([H, T, E, Q]),
        new Face([A, T, E, R]),
        new Face([B, R, F, U]),
        new Face([G, U, C, S]),
        new Face([D, S, H, T])
    ]);

    return result;
}
function rhombicDodecahedronPath(): Array<string> {
    return ["P A", "P D S G Q", "Q F"];
}

function rhombicDodecahedronCuts(): Array<string> {
    return [
        "P<", 
        "D< C A", 
        "S< B T P>", 
        "G< R D>", 
        "Q< U E S>", 
        "F H G>", 
        "Q>"];
}