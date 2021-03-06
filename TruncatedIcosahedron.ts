function truncatedIcosahedronPoly(): Polyhedron {
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
    var points = [P, A, B, C, D, E, p, a, b, c, d, e];

    var faces = new Array<Face>();

    function third(a: Point, b: Point): Point {
        var found = find(a.name + "-" + b.name + "-0-3");
        if (found) return found;
        var p = new Segment(a, b).interpolate(0, 3);
        points.push(p);
        return p;
    }

    function pentagon(x: Point, a: Point, b: Point, c: Point, d: Point, e: Point): Face {
        return new Face([third(x, a), third(x, b), third(x, c), third(x, d), third(x, e)]);
    }

    function hexagon(a: Point, b: Point, c: Point): Face {
        return new Face([third(a, b), third(b, a), third(b, c), third(c, b), third(c, a), third(a, c)]);
    }

    function find(a: string): Point {
        for (let p of points) if (p.name == a) return p;
    }

    function h(abc: string): Face {
        return hexagon(find(abc[0]), find(abc[1]), find(abc[2]));
    }

    function t(x: string): Face {
        return pentagon(find(x[0]), find(x[1]), find(x[2]), find(x[3]), find(x[4]), find(x[5]));
    }
    
    for (let x of "PAB PBC PCD PDE PEA pab pbc pcd pde pea Acd aCD Bde bDE Cea cEA Dab dAB Ebc eBC".split(" ")) {
        faces.push(h(x));
    }

    for (let x of "PABCDE pabcde ABPEcd abpeCD BCPAde bcpaDE CDPBea cdpbEA DEPCab depcAB EAPDbc eapdBC".split(" ")) {
        faces.push(t(x));
    }

    let result = new Polyhedron(faces);
    return result;
}
function truncatedIcosahedronPath(): Array<string> {
    return [
        "A-P-0-3 A-E-0-3", 
        "A-P-0-3 P-A-0-3 P-B-0-3 P-C-0-3 C-P-0-3 C-D-0-3 C-a-0-3 a-C-0-3 a-e-0-3", 
        "a-e-0-3 a-p-0-3"];
}

function truncatedIcosahedronCuts(): Array<string> {
    return [
        "A-P-0-3<", 
        "P-A-0-3< A-E-0-3", 
        "P-B-0-3< P-E-0-3 E-A-0-3 A-c-0-3 A-P-0-3>", 
        "P-C-0-3< E-P-0-3 E-c-0-3 c-A-0-3 A-B-0-3 P-A-0-3>", 
        "C-P-0-3< P-D-0-3 E-D-0-3 c-E-0-3 A-d-0-3 B-A-0-3 P-B-0-3>", 
        "C-D-0-3< D-P-0-3 E-b-0-3 c-b-0-3 c-d-0-3 d-A-0-3 B-d-0-3 B-P-0-3 P-C-0-3>", 
        "C-a-0-3< D-C-0-3 D-E-0-3 b-E-0-3 c-p-0-3 d-c-0-3 d-B-0-3 B-C-0-3 C-P-0-3>",
        "D-b-0-3 b-c-0-3 p-c-0-3 d-p-0-3 B-e-0-3 C-B-0-3 C-D-0-3>", 
        "a-C-0-3< D-a-0-3 b-D-0-3 b-p-0-3 p-d-0-3 d-e-0-3 e-B-0-3 C-a-0-3>", 
        "a-D-0-3 b-a-0-3 p-b-0-3 p-e-0-3 e-d-0-3 C-e-0-3", 
        "a-e-0-3< a-b-0-3 p-a-0-3 e-p-0-3 e-C-0-3 a-C-0-3>", 
        "a-p-0-3 e-a-0-3", 
        "a-e-0-3>"];
}
