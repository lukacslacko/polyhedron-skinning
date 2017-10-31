class Face {
    constructor(public points: Point[]) {}

    hide(scene: any): void {}

    render(scene: any): void {
        var geometry = new THREE.Geometry();
        for (let p of this.points) {
            geometry.vertices.push(p.asVector3());
        }
        for (var i = 2; i < this.points.length; ++i) {
            geometry.faces.push(new THREE.Face3(0, i-1, i));
            geometry.faces.push(new THREE.Face3(0, i, i-1));
        }
        geometry.computeFaceNormals();
        scene.add(new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: 0xbb6622})));
    }

    hasEdge(edge: Segment): boolean {
        var points = this.points;
        for (var i = 0; i < points.length; ++i) {
            var j = (i+1) % points.length;
            if (edge.from == points[i] && edge.to == points[j]) return true;
            if (edge.from == points[j] && edge.to == points[i]) return true;
        }
        return false;
    }

    otherVertex(vertex: Point, edge: Segment): Point {
        var points = this.points;
        for (var i = 0; i < points.length; ++i) {
            var j = (i+1) % points.length;
            if (edge.from == points[i] && edge.to == points[j]) continue;
            if (edge.from == points[j] && edge.to == points[i]) continue;
            if (vertex == points[i]) return points[j];
            if (vertex == points[j]) return points[i];
        }        
        return undefined;
    }

    splitEdge(edge: Segment, parts: number, points: Point[]): void {
        var fromIndex = this.points.indexOf(edge.from);
        var toIndex = this.points.indexOf(edge.to);
        if (toIndex == fromIndex + 1) {
            for (var i = parts - 2; i >= 0; --i) {
                this.points.splice(toIndex, 0, points[i]);
            }
        } else if (fromIndex == toIndex + 1) {
            for (var i = 0; i < parts - 1; ++i) {
                this.points.splice(fromIndex, 0, points[i]);
            }
        } else if (fromIndex == 0) {
            for (var i = parts - 2; i >= 0; --i) this.points.push(points[i]);
        } else {
            for (var i = 0; i < parts - 1; ++i) this.points.push(points[i]);
        }
    }

    describe(): string {
        var result = "";
        for (let p of this.points) {
            if (result != "") result += ",";
            result += p.name;
        }
        return result;
    }
}