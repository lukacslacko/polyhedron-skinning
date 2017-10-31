var tetrahedron = tetrahedronPoly();

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    <HTMLCanvasElement> document.getElementById("chain"),
    tetrahedron,
    tetrahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(tetrahedronCuts());
skin.draw();

reRender();

function reRender() {
    tetrahedron.render(scene, true);
    doRender();
}
