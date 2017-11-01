var dodecahedron = dodecahedronPoly();

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    <HTMLCanvasElement> document.getElementById("chain"),
    dodecahedron,
    dodecahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(dodecahedronCuts());
skin.draw();

reRender();

function reRender() {
    dodecahedron.render(scene, true);
    doRender();
}
