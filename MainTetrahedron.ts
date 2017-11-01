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

var dxf = new DXF();
dxf.line(0,0, 100,-100);
dxf.line(50,-100, 100,-100);

document.getElementById("download").appendChild(dxf.downloadLink("proba.dxf"));

reRender();

function reRender() {
    tetrahedron.render(scene, true);
    doRender();
}
