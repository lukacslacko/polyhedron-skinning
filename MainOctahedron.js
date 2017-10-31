var octahedron = octahedronPoly();
reRender();
var skin = new Skin(document.getElementById("skin"), document.getElementById("chain"), octahedron, octahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(octahedronCuts());
skin.draw();
reRender();
function reRender() {
    octahedron.render(scene, true);
    doRender();
}
//# sourceMappingURL=MainOctahedron.js.map