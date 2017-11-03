var cuboctahedron = cuboctahedronPoly();

reRender();

var skin = new Skin(
    <HTMLCanvasElement> document.getElementById("skin"),
    <HTMLCanvasElement> document.getElementById("chain"),
    cuboctahedron,
    cuboctahedronPath());
skin.buildGraph();
skin.solveCoordinates();
let cuts = cuboctahedronCuts();
if (cuts.length > 0) skin.cutAlong(cuts);
skin.draw();

reRender();

function reRender() {
    cuboctahedron.render(scene, true);
    doRender();
}
