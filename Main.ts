var icosahedron = icosahedronPoly();

var renderLabels = false;

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    icosahedron,
    icosahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(icosahedronCuts());
skin.draw();

function reRender() {
    icosahedron.render(scene, renderLabels);
    doRender();
}

function setRenderLabels(box: HTMLInputElement) {
    renderLabels = box.checked;
    reRender();
}