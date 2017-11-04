var poly = triangularPrismPoly();
reRender();
var skin = new Skin(document.getElementById("skin"), document.getElementById("chain"), poly, triangularPrismPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(triangularPrismCuts());
skin.draw();
reRender();
function reRender() {
    poly.render(scene, true);
    doRender();
}
//# sourceMappingURL=MainTriangularPrism.js.map