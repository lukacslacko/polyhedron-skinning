var icosahedron = icosahedronPoly();

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    <HTMLCanvasElement> document.getElementById("chain"),
    icosahedron,
    icosahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(icosahedronCuts());
skin.draw();

reRender();

function reRender() {
    icosahedron.render(scene, true);
    doRender();
}
