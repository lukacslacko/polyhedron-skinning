var poly = gyrobifastigiumPoly();
reRender();
var skin = new Skin(document.getElementById("skin"), document.getElementById("chain"), poly, gyrobifastigiumPath());
skin.buildGraph();
skin.solveCoordinates();
skin.cutAlong(gyrobifastigiumCuts());
skin.draw();
reRender();
function reRender() {
    poly.render(scene, true);
    doRender();
}
//# sourceMappingURL=MainGyrobifastigium.js.map