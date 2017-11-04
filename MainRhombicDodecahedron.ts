var poly = rhombicDodecahedronPoly();

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    <HTMLCanvasElement> document.getElementById("chain"),
    poly,
    rhombicDodecahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(rhombicDodecahedronCuts());
skin.draw();

reRender();

function reRender() {
    poly.render(scene, true);
    doRender();
}
