var icosahedron = icosahedronPoly();
var truncatedIcosahedron = truncatedIcosahedronPoly();

var renderLabels = false;

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    truncatedIcosahedron,
    truncatedIcosahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(truncatedIcosahedronCuts());
skin.draw();

function reRender() {
    truncatedIcosahedron.render(scene, renderLabels);
    doRender();
}

function setRenderLabels(box: HTMLInputElement) {
    renderLabels = box.checked;
    reRender();
}