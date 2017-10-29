var icosahedron = icosahedronPoly();
var renderLabels = false;
reRender();
var skin = new Skin(document.getElementById("skin"), icosahedron, icosahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(icosahedronCuts());
skin.draw();
function reRender() {
    icosahedron.render(scene, renderLabels);
    doRender();
}
function setRenderLabels(box) {
    renderLabels = box.checked;
    reRender();
}
//# sourceMappingURL=Main.js.map