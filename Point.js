var Point = /** @class */ (function () {
    function Point(x, y, z, name) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.name = name;
    }
    Point.prototype.asVector3 = function () {
        return new THREE.Vector3(this.x, this.y, this.z);
    };
    Point.prototype.render = function (scene) {
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
        var sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }));
        sprite.position.x = this.x * 1.05;
        sprite.position.y = this.y * 1.05;
        sprite.position.z = this.z * 1.05;
        scene.add(sprite);
        console.log("added point " + this.name);
    };
    return Point;
}());
//# sourceMappingURL=Point.js.map