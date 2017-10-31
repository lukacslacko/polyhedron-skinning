var cube = cubePoly();
reRender();
var skin = new Skin(document.getElementById("skin"), document.getElementById("chain"), cube, cubePath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(cubeCuts());
skin.draw();
reRender();
function reRender() {
    cube.render(scene, true);
    doRender();
}
//# sourceMappingURL=MainCube.js.map