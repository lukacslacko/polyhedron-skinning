var Skin = /** @class */ (function () {
    function Skin(cnv, chainCanvas, poly, pathNames) {
        this.chainCanvas = chainCanvas;
        this.poly = poly;
        this.top = [];
        this.side = [];
        this.bottom = [];
        this.find(pathNames[0].split(" "), this.top, poly);
        this.find(pathNames[1].split(" "), this.side, poly);
        this.find(pathNames[2].split(" "), this.bottom, poly);
        var w = cnv.width;
        var h = cnv.height;
        this.dx = w / (2 * this.top.length);
        this.dy = h / (this.side.length + 1);
        this.ctx = cnv.getContext("2d");
        this.ctx.font = "12px Arial";
        this.ctx.fillStyle = "red";
        this.chainCtx = chainCanvas.getContext("2d");
        this.chainCtx.font = "8px Arial";
        this.chainCtx.fillStyle = "red";
        this.cutEdges = new Array();
    }
    Skin.prototype.find = function (names, points, poly) {
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_1 = names_1[_i];
            points.push(poly.point(name_1));
        }
    };
    Skin.prototype.addFace = function (face, side) {
        if (this.facesAdded.indexOf(face) != -1)
            return;
        console.log("Adding face " + face.describe() + " side " + side);
        this.facesAdded.push(face);
        var graphFace = new GraphFace();
        for (var _i = 0, _a = face.points; _i < _a.length; _i++) {
            var p = _a[_i];
            var i = this.path.indexOf(p);
            if (i > -1) {
                var name = p.name;
                if (i > 0 && i < this.path.length - 1) {
                    name += (side < 0 ? "<" : ">");
                }
                var x = 0;
                var y = 0;
                if (i < this.top.length) {
                    x = this.top.length - 1 + side * i;
                }
                else if (i < this.top.length + this.side.length - 1) {
                    x = (side + 1) * (this.top.length - 1);
                    y = i - this.top.length + 1;
                }
                else {
                    y = this.side.length - 1;
                    x = this.top.length - 1 + side * (this.path.length - 1 - i);
                }
                graphFace.vertices.push(this.graph.makeFixedVertex(name, x, y, p));
            }
            else {
                graphFace.vertices.push(this.graph.makeVertex(p.name, p));
            }
        }
        this.graph.faces.push(graphFace);
    };
    Skin.prototype.buildGraph = function () {
        this.path = new Array();
        this.facesAdded = new Array();
        this.graph = new Graph();
        for (var i = this.top.length - 1; i > 0; --i)
            this.path.push(this.top[i]);
        for (var i = 0; i < this.side.length; ++i)
            this.path.push(this.side[i]);
        for (var i = 1; i < this.bottom.length; ++i)
            this.path.push(this.bottom[i]);
        var poly = this.poly;
        var firstEdge = new Segment(this.path[0], this.path[1]);
        var left = poly.opposite(firstEdge, null);
        var right = poly.opposite(firstEdge, left);
        var leftEdge = firstEdge;
        var rightEdge = firstEdge;
        this.addFace(left, -1);
        this.addFace(right, 1);
        var pathIndex = 1;
        do {
            var prevPoint = this.path[pathIndex];
            ++pathIndex;
            var nextPoint = this.path[pathIndex];
            while (true) {
                var leftOther = left.otherVertex(prevPoint, leftEdge);
                leftEdge = new Segment(prevPoint, leftOther);
                if (leftOther == nextPoint)
                    break;
                left = poly.opposite(leftEdge, left);
                this.addFace(left, -1);
            }
            while (true) {
                var rightOther = right.otherVertex(prevPoint, rightEdge);
                rightEdge = new Segment(prevPoint, rightOther);
                if (rightOther == nextPoint)
                    break;
                right = poly.opposite(rightEdge, right);
                this.addFace(right, 1);
            }
        } while (pathIndex < this.path.length - 1);
        for (var _i = 0, _a = poly.faces; _i < _a.length; _i++) {
            var f = _a[_i];
            if (this.facesAdded.indexOf(f) == -1) {
                this.addFace(f, 0);
            }
        }
    };
    Skin.prototype.solveCoordinates = function () {
        var unsolvedVertices = new Array();
        for (var _i = 0, _a = this.graph.vertices; _i < _a.length; _i++) {
            var v = _a[_i];
            if (!v.fixed)
                unsolvedVertices.push(v);
        }
        var n = unsolvedVertices.length;
        var x_c = new Array(n);
        var x_a = new Array(n * n);
        var y_c = new Array(n);
        var y_a = new Array(n * n);
        for (var i = 0; i < n; ++i) {
            var neighbors = this.graph.neighbors(unsolvedVertices[i]);
            var d = neighbors.length;
            var x_sum = 0;
            var y_sum = 0;
            for (var j = 0; j < n; ++j) {
                x_a[n * i + j] = 0;
                y_a[n * i + j] = 0;
            }
            x_c[i] = 0;
            y_c[i] = 0;
            for (var _b = 0, neighbors_1 = neighbors; _b < neighbors_1.length; _b++) {
                var p = neighbors_1[_b];
                if (p.fixed) {
                    x_c[i] += p.x / d;
                    y_c[i] += p.y / d;
                }
                else {
                    var idx = unsolvedVertices.indexOf(p);
                    x_a[n * i + idx] = 1 / d;
                    y_a[n * i + idx] = 1 / d;
                }
            }
        }
        var xs = SolveLinear(x_c, x_a);
        var ys = SolveLinear(y_c, y_a);
        for (var i = 0; i < n; ++i) {
            unsolvedVertices[i].x = xs[i];
            unsolvedVertices[i].y = ys[i];
        }
    };
    Skin.prototype.cutRank = function (v) {
        for (var i = 0; i < this.cuts.length; ++i) {
            if (this.cuts[i].indexOf(v.name) > -1) {
                return i;
            }
        }
        return -1;
    };
    Skin.prototype.rankedPoint = function (bottom, top, rank) {
        var bottomRank = this.cutRank(bottom);
        var topRank = this.cutRank(top);
        if (bottomRank == rank)
            return [bottom.point, bottom];
        if (topRank == rank)
            return [top.point, top];
        var result = this.poly.splitEdge(new Segment(bottom.point, top.point), bottomRank - topRank, bottomRank - rank - 1);
        var vertex = bottom.interpolate((bottomRank - rank) / (bottomRank - topRank), top, result);
        return [result, vertex];
    };
    Skin.prototype.upperNeighbor = function (face, vertex) {
        var n = face.vertices.length;
        var i = face.vertices.indexOf(vertex);
        var p = face.vertices[(i + 1) % n];
        var q = face.vertices[(i + n - 1) % n];
        if (this.cutRank(p) < this.cutRank(vertex))
            return p;
        else
            return q;
    };
    Skin.prototype.cutFace = function (f) {
        console.log("Cutting " + f.describe());
        var maxRank = -1;
        var maxVertex;
        for (var _i = 0, _a = f.vertices; _i < _a.length; _i++) {
            var v = _a[_i];
            var rank = this.cutRank(v);
            if (rank > maxRank) {
                maxRank = rank;
                maxVertex = v;
            }
        }
        var leftVertex = maxVertex;
        var rightVertex = maxVertex;
        var rank = maxRank;
        var result = new Array();
        var cutEdges = new Array();
        var cnt = 0;
        do {
            var nextLeftVertex = this.upperNeighbor(f, leftVertex);
            var nextRightVertex = this.upperNeighbor(f, rightVertex);
            if (leftVertex == maxVertex) {
                nextLeftVertex = f.neighbor(leftVertex, 1);
            }
            if (rightVertex == maxVertex) {
                nextRightVertex = f.neighbor(rightVertex, -1);
            }
            var leftNextRank = this.cutRank(nextLeftVertex);
            var rightNextRank = this.cutRank(nextRightVertex);
            var nextRank = Math.max(leftNextRank, rightNextRank);
            console.log("Current", leftVertex.describe(), rightVertex.describe());
            console.log("Next", nextLeftVertex.describe(), leftNextRank, nextRightVertex.describe(), rightNextRank);
            console.log("Next rank", nextRank);
            while (rank > nextRank) {
                var leftBottom = this.rankedPoint(leftVertex, nextLeftVertex, rank);
                var leftTop = this.rankedPoint(leftVertex, nextLeftVertex, rank - 1);
                var rightBottom = this.rankedPoint(rightVertex, nextRightVertex, rank);
                var rightTop = this.rankedPoint(rightVertex, nextRightVertex, rank - 1);
                var newFace = new CutFace(new Segment(leftBottom[0], leftTop[0]), new Segment(rightBottom[0], rightTop[0]));
                cutEdges.push(new GraphEdge(leftBottom[1], rightBottom[1]), new GraphEdge(leftTop[1], rightTop[1]));
                result.push(newFace);
                --rank;
                console.log("Added and rank", newFace.describe(), rank);
            }
            if (rank == leftNextRank)
                leftVertex = nextLeftVertex;
            if (rank == rightNextRank)
                rightVertex = nextRightVertex;
        } while (leftVertex != rightVertex && ((cnt++) < 10));
        for (var _b = 0, result_1 = result; _b < result_1.length; _b++) {
            var r = result_1[_b];
            console.log(r.describe());
        }
        return [result, cutEdges];
    };
    Skin.prototype.cutAlong = function (cuts) {
        this.cuts = new Array();
        for (var _i = 0, cuts_1 = cuts; _i < cuts_1.length; _i++) {
            var cut = cuts_1[_i];
            this.cuts.push(cut.split(" "));
        }
        var cutFaces = new Array();
        for (var _a = 0, _b = this.graph.faces; _a < _b.length; _a++) {
            var f = _b[_a];
            var cutResult = this.cutFace(f);
            for (var _c = 0, _d = cutResult[0]; _c < _d.length; _c++) {
                var c = _d[_c];
                cutFaces.push(c);
            }
            for (var _e = 0, _f = cutResult[1]; _e < _f.length; _e++) {
                var e = _f[_e];
                this.cutEdges.push(e);
            }
        }
        for (var _g = 0, cutFaces_1 = cutFaces; _g < cutFaces_1.length; _g++) {
            var c = cutFaces_1[_g];
            console.log(c.describe());
        }
        if (cuts.length == 0)
            return;
        console.log(cutFaces.length);
        var chainedFaces = new Array();
        chainedFaces.push(cutFaces.pop());
        var numFaces = cutFaces.length;
        for (var cnt = 0; cnt < numFaces; ++cnt) {
            var lastEdge = chainedFaces[chainedFaces.length - 1].front;
            for (var i = 0; i < cutFaces.length; ++i) {
                var f = cutFaces[i];
                if (lastEdge.equalsDirected(f.back)) {
                    chainedFaces.push(f);
                    cutFaces.splice(i, 1);
                    break;
                }
                if (lastEdge.equalsReverted(f.front)) {
                    chainedFaces.push(f.rotate());
                    cutFaces.splice(i, 1);
                    break;
                }
            }
        }
        for (var _h = 0, chainedFaces_1 = chainedFaces; _h < chainedFaces_1.length; _h++) {
            var c = chainedFaces_1[_h];
            console.log(c.describe());
        }
        console.log(chainedFaces.length);
        for (var _j = 0, cutFaces_2 = cutFaces; _j < cutFaces_2.length; _j++) {
            var c = cutFaces_2[_j];
            console.log("Remaining " + c.describe());
        }
        var planarFaces = new Array();
        var vert = new PlanarPoint(0, 1);
        var orig = new PlanarPoint(0, 0);
        var minX = 0;
        var minY = 0;
        var maxX = 0;
        var maxY = 0;
        for (var _k = 0, chainedFaces_2 = chainedFaces; _k < chainedFaces_2.length; _k++) {
            var c = chainedFaces_2[_k];
            var planarFace = new PlanarFace(vert, orig, c);
            vert = planarFace.backVert.clone();
            orig = planarFace.bottomRight.clone();
            planarFaces.push(planarFace);
            minX = Math.min(minX, planarFace.bottomLeft.x, planarFace.bottomRight.x, planarFace.topLeft.x, planarFace.topRight.x);
            minY = Math.min(minY, planarFace.bottomLeft.y, planarFace.bottomRight.y, planarFace.topLeft.y, planarFace.topRight.y);
            maxX = Math.max(maxX, planarFace.bottomLeft.x, planarFace.bottomRight.x, planarFace.topLeft.x, planarFace.topRight.x);
            maxY = Math.max(maxY, planarFace.bottomLeft.y, planarFace.bottomRight.y, planarFace.topLeft.y, planarFace.topRight.y);
        }
        var dx = this.chainCanvas.width / (maxX - minX + 1);
        var dy = this.chainCanvas.height / (maxY - minY + 1);
        var d = Math.min(dx, dy);
        for (var _l = 0, planarFaces_1 = planarFaces; _l < planarFaces_1.length; _l++) {
            var p = planarFaces_1[_l];
            this.chainCtx.lineWidth = 3;
            this.chainCtx.strokeStyle = p.tabAtBottom ? "lightgreen" : "orange";
            this.line(this.chainCtx, p.bottomLeft, p.bottomRight, d, d, 0.25 - minX, 0.25 - minY);
            this.chainCtx.strokeStyle = !p.tabAtBottom ? "lightgreen" : "orange";
            this.line(this.chainCtx, p.topLeft, p.topRight, d, d, 0.25 - minX, 0.25 - minY);
            this.chainCtx.strokeStyle = "black";
            this.chainCtx.lineWidth = 1;
            this.line(this.chainCtx, p.bottomLeft, p.topLeft, d, d, 0.25 - minX, 0.25 - minY);
            this.line(this.chainCtx, p.bottomRight, p.topRight, d, d, 0.25 - minX, 0.25 - minY);
            console.log(p.describe());
        }
        console.log(planarFaces.length);
        var rotations = new Array();
        for (var rotAng = 0; rotAng <= 180; rotAng += 5) {
            rotations.push(new PlanarPoint(Math.cos(rotAng * Math.PI / 180), Math.sin(rotAng * Math.PI / 180)));
        }
        var findBestPiece = function (pieces, direction) {
            var minWidth = pieces[0].maxX - pieces[0].minX;
            var minPiece = pieces[0];
            for (var j = 1; j < pieces.length; ++j) {
                var width = pieces[j].maxX - pieces[j].minX;
                if (direction * (width - minWidth) > 0) {
                    minWidth = width;
                    minPiece = pieces[j];
                }
            }
            return minPiece;
        };
        var pageWidth = 200;
        var pageHeight = 270;
        var div = document.getElementById("download");
        var layout = new Layout(pageWidth, pageHeight);
        for (var i = 0; i < chainedFaces.length; ++i) {
            var left = chainedFaces[i];
            var right = chainedFaces[(i + 1) % chainedFaces.length];
            var pieces = new Array();
            for (var j = 0; j < rotations.length; ++j) {
                var vert_1 = rotations[j];
                var orig_1 = new PlanarPoint(0, 0);
                var leftPlanar = new PlanarFace(vert_1, orig_1, left);
                var rightPlanar = new PlanarFace(leftPlanar.backVert, leftPlanar.bottomRight, right);
                var piece = new DXFModule();
                leftPlanar.render(piece, true);
                rightPlanar.render(piece, false);
                pieces.push(piece);
            }
            layout.add(findBestPiece(pieces, -1));
        }
        var pageNumber = 0;
        for (var _m = 0, _o = layout.save(); _m < _o.length; _m++) {
            var page = _o[_m];
            div.appendChild(page.downloadLink("page" + (++pageNumber) + ".dxf"));
            div.appendChild(page.previewCanvas(pageWidth, pageHeight));
        }
        div.appendChild(document.createElement("br"));
        layout = new Layout(pageWidth, pageHeight);
        for (var i = 0; i < chainedFaces.length; ++i) {
            var face = chainedFaces[i];
            var pieces = new Array();
            for (var j = 0; j < rotations.length; ++j) {
                var vert_2 = rotations[j];
                var orig_2 = new PlanarPoint(0, 0);
                var planar = new PlanarFace(vert_2, orig_2, face);
                var piece = new DXFModule();
                planar.cover(piece);
                pieces.push(piece);
            }
            layout.add(findBestPiece(pieces, 1));
        }
        pageNumber = 0;
        for (var _p = 0, _q = layout.save(); _p < _q.length; _p++) {
            var page = _q[_p];
            div.appendChild(page.downloadLink("page" + (++pageNumber) + ".dxf"));
            div.appendChild(page.previewCanvas(pageWidth, pageHeight));
        }
    };
    Skin.prototype.draw = function () {
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        for (var _i = 0, _a = this.graph.faces; _i < _a.length; _i++) {
            var f = _a[_i];
            for (var i = 0; i < f.vertices.length; ++i) {
                var j = (i + 1) % f.vertices.length;
                this.line(this.ctx, f.vertices[j], f.vertices[i], this.dx, this.dy);
            }
        }
        this.ctx.strokeStyle = "lightgreen";
        this.ctx.lineWidth = 3;
        for (var _b = 0, _c = this.cutEdges; _b < _c.length; _b++) {
            var edge = _c[_b];
            this.line(this.ctx, edge.from, edge.to, this.dx, this.dy);
        }
    };
    Skin.prototype.line = function (ctx, a, b, dx, dy, shiftX, shiftY) {
        if (shiftX === void 0) { shiftX = 0.5; }
        if (shiftY === void 0) { shiftY = 0.5; }
        var x1 = a.x;
        var x2 = b.x;
        var y1 = a.y;
        var y2 = b.y;
        ctx.beginPath();
        ctx.moveTo((shiftX + x1) * dx, (shiftY + y1) * dy);
        ctx.lineTo((shiftX + x2) * dx, (shiftY + y2) * dy);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse((shiftX + x1) * dx, (shiftY + y1) * dy, 2, 2, 0, 0, 360);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse((shiftX + x2) * dx, (shiftY + y2) * dy, 2, 2, 0, 0, 360);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillText(a.name, 4 + (shiftX + x1) * dx, (shiftY + y1) * dy);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillText(b.name, 4 + (shiftX + x2) * dx, (shiftY + y2) * dy);
        ctx.stroke();
    };
    return Skin;
}());
//# sourceMappingURL=DrawSkin.js.map