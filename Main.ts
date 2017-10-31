var icosahedron = icosahedronPoly();
var truncatedIcosahedron = truncatedIcosahedronPoly();
var octahedron = octahedronPoly();

var renderLabels = false;

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    octahedron,
    octahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(octahedronCuts());
skin.draw();
/*
var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    icosahedron,
    icosahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(icosahedronCuts());
skin.draw();
*/
function reRender() {
    octahedron.render(scene, renderLabels);
    //icosahedron.render(scene, renderLabels);
    doRender();
}

function setRenderLabels(box: HTMLInputElement) {
    renderLabels = box.checked;
    reRender();
}