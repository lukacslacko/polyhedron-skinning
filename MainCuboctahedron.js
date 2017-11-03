var cuboctahedron = cuboctahedronPoly();
reRender();
var skin = new Skin(document.getElementById("skin"), document.getElementById("chain"), cuboctahedron, cuboctahedronPath());
skin.buildGraph();
skin.solveCoordinates();
var cuts = cuboctahedronCuts();
if (cuts.length > 0)
    skin.cutAlong(cuts);
skin.draw();
reRender();
function reRender() {
    cuboctahedron.render(scene, true);
    doRender();
}
//# sourceMappingURL=MainCuboctahedron.js.map