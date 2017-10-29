var icosa = icosahedron();
var renderLabels = false;
reRender();
var skin = new Skin(document.getElementById("skin"), icosa, ["P", "B", "e"], ["P", "A", "c", "p"], ["p", "b", "D"]);
skin.buildGraph();
skin.solveCoordinates();
skin.draw();
function reRender() {
    icosa.render(scene, renderLabels);
    doRender();
}
function setRenderLabels(box) {
    renderLabels = box.checked;
    reRender();
}
//# sourceMappingURL=Main.js.map