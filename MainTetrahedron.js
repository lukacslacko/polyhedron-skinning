var tetrahedron = tetrahedronPoly();
reRender();
var skin = new Skin(document.getElementById("skin"), document.getElementById("chain"), tetrahedron, tetrahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(tetrahedronCuts());
skin.draw();
var dxf = new DXF();
dxf.line(0, 0, 100, -100);
dxf.line(50, -100, 100, -100);
reRender();
function reRender() {
    tetrahedron.render(scene, true);
    doRender();
}
//# sourceMappingURL=MainTetrahedron.js.map