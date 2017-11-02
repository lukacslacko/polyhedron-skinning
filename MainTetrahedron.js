var tetrahedron = tetrahedronPoly();
reRender();
var skin = new Skin(document.getElementById("skin"), document.getElementById("chain"), tetrahedron, tetrahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(tetrahedronCuts());
skin.draw();
reRender();
function reRender() {
    tetrahedron.render(scene, true);
    doRender();
}
//# sourceMappingURL=MainTetrahedron.js.map