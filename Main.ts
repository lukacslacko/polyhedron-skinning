var icosahedron = icosahedronPoly();
var truncatedIcosahedron = truncatedIcosahedronPoly();
var octahedron = octahedronPoly();

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    <HTMLCanvasElement> document.getElementById("chain"),
    octahedron,
    octahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(octahedronCuts());
skin.draw();
reRender();
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
    octahedron.render(scene, true);
    //icosahedron.render(scene, true);
    doRender();
}
