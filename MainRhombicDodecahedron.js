var poly = rhombicDodecahedronPoly();
reRender();
var skin = new Skin(document.getElementById("skin"), document.getElementById("chain"), poly, rhombicDodecahedronPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(rhombicDodecahedronCuts());
skin.draw();
reRender();
function reRender() {
    poly.render(scene, true);
    doRender();
}
//# sourceMappingURL=MainRhombicDodecahedron.js.map