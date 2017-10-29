var icosa = icosahedron();
var renderLabels = false;
reRender();
var skin = new Skin(document.getElementById("skin"), icosa, ["P", "C"], ["P", "A", "d", "p"], ["p", "b"]);
skin.buildGraph();
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