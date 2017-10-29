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
        var found = find(a.name + b.name);
        if (found) return found;
        var p = new Segment(a, b).third();
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

    return new Polyhedron(faces);
}
function truncatedIcosahedronPath(): Array<Array<string>> {
    return [["PA", "AP", "AB"], ["PA", "PE", "EP", "ED"], ["ED", "Eb", "bE"]];
}

function truncatedIcosahedronCuts(): Array<Array<string>> {
    return [[]];
}