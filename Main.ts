var icosa = icosahedron();

var renderLabels = false;

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    icosa,
    ["P", "B", "e"], ["P", "A", "c", "p"], ["p", "b", "D"]);
skin.buildGraph();
skin.solveCoordinates();
skin.draw();

function reRender() {
    icosa.render(scene, renderLabels);
    doRender();
}

function setRenderLabels(box: HTMLInputElement) {
    renderLabels = box.checked;
    reRender();
}