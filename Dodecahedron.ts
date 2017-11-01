function dodecahedronPoly(): Polyhedron {
    var phi = (1 + Math.sqrt(5)) / 2;
    var ihp = 1 / phi;
    var A = new Point(-1, -1, -1, "A");
    var B = new Point(1, -1, -1, "B");
    var C = new Point(1, 1, -1, "C");
    var D = new Point(-1, 1, -1, "D");
    var E = new Point(-1, -1, 1, "E");
    var F = new Point(1, -1, 1, "F");
    var G = new Point(1, 1, 1, "G");
    var H = new Point(-1, 1, 1, "H");
    var AB = new Point(0, -phi, -ihp, "AB");
    var EF = new Point(0, -phi, ihp, "EF");
    var BF = new Point(phi, -ihp, 0, "BF");
    var CG = new Point(phi, ihp, 0, "CG");
    var EH = new Point(-ihp, 0, phi, "EH");
    var FG = new Point(ihp, 0, phi, "FG");
    var BC = new Point(ihp, 0, -phi, "BC");
    var AD = new Point(-ihp, 0, -phi, "AD");
    var AE = new Point(-phi, -ihp, 0, "AE");
    var DH = new Point(-phi, ihp, 0, "DH");
    var GH = new Point(0, phi, ihp, "GH");
    var CD = new Point(0, phi, -ihp, "CD");

    let result = new Polyhedron([
        new Face([A, AB, B, BC, AD]),
        new Face([B, BC, C, CG, BF]),
        new Face([C, CD, D, AD, BC]),
        new Face([A, AD, D, DH, AE]),
        new Face([A, AE, E, EF, AB]),
        new Face([B, BF, F, EF, AB]),
        new Face([C, CG, G, GH, CD]),
        new Face([D, DH, H, GH, CD]),
        new Face([E, EF, F, FG, EH]),
        new Face([F, FG, G, CG, BF]),
        new Face([G, GH, H, EH, FG]),
        new Face([E, EH, H, DH, AE])
    ]);

    result.splitEdge(new Segment(E, AE), 2, 0);
    result.splitEdge(new Segment(AE, A), 2, 0);
    result.splitEdge(new Segment(A, AD), 2, 0);
    return result;
}

function dodecahedronPath(): Array<string> {
    return ["E EH", "E E-AE-0-2 AE AE-A-0-2 A A-AD-0-2 AD", "AD BC"];
}

function dodecahedronCuts(): Array<string> {
    return [
        "E<", 
        "E-AE-0-2< EH", 
        "AE< EF FG H E>", 
        "AE-A-0-2< F G DH E-AE-0-2>", 
        "A< BF GH AE>",
        "A-AD-0-2< AB CG CD AE-A-0-2>",
        "AD< B C D A>", 
        "BC A-AD-0-2>", 
        "AD>"];
}