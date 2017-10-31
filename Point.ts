class Point {
    constructor(
        public x: number, public y: number, public z: number, 
        public name: string) {}

    asVector3(): any {
        return new THREE.Vector3(this.x, this.y, this.z);
    }

    render(scene: any): void {
        var canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        var context = canvas.getContext("2d");
        context.fillStyle = "black";
        context.font = "bold 12px Arial";
        context.textBaseline = "top";
        context.textAlign = "center";
        context.fillText(this.name, 32, 32);
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        var sprite = new THREE.Sprite(new THREE.SpriteMaterial({map: texture}));
        sprite.position.x = this.x * 1.05;
        sprite.position.y = this.y * 1.05;
        sprite.position.z = this.z * 1.05;
        scene.add(sprite);
    }

    distance(other: Point): number {
        let dx = this.x - other.x;
        let dy = this.y - other.y;
        let dz = this.z - other.z;
        return Math.sqrt(dx*dx + dy*dy + dz*dz);
    }
}
