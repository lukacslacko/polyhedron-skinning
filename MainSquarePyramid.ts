var poly = squarePyramidPoly();

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    <HTMLCanvasElement> document.getElementById("chain"),
    poly,
    squarePyramidPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(squarePyramidCuts());
skin.draw();

reRender();

function reRender() {
    poly.render(scene, true);
    doRender();
}
