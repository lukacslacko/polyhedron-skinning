var poly = triangularPrismPoly();

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    <HTMLCanvasElement> document.getElementById("chain"),
    poly,
    triangularPrismPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(triangularPrismCuts());
skin.draw();

reRender();

function reRender() {
    poly.render(scene, true);
    doRender();
}
