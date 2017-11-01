var truncatedIcosahedron = truncatedIcosahedronPoly();

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    <HTMLCanvasElement> document.getElementById("chain"),
    truncatedIcosahedron,
    truncatedIcosahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(truncatedIcosahedronCuts());
skin.draw();

reRender();

function reRender() {
    truncatedIcosahedron.render(scene, true);
    doRender();
}
