var dodecahedron = dodecahedronPoly();
reRender();
var skin = new Skin(document.getElementById("skin"), document.getElementById("chain"), dodecahedron, dodecahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(dodecahedronCuts());
skin.draw();
reRender();
function reRender() {
    dodecahedron.render(scene, true);
    doRender();
}
//# sourceMappingURL=MainDodecahedron.js.map