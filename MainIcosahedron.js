var icosahedron = icosahedronPoly();
reRender();
var skin = new Skin(document.getElementById("skin"), document.getElementById("chain"), icosahedron, icosahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(icosahedronCuts());
skin.draw();
reRender();
function reRender() {
    icosahedron.render(scene, true);
    doRender();
}
//# sourceMappingURL=MainIcosahedron.js.map