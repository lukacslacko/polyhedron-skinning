var icosa = icosahedron();

var renderLabels = false;

reRender();

var skin = new Skin(<HTMLCanvasElement> document.getElementById("skin"), icosa, ["P", "C"], ["P", "A", "d", "p"], ["p", "b"]);
skin.draw();

function reRender() {
    icosa.render(scene, renderLabels);
    doRender();
}

function setRenderLabels(box: HTMLInputElement) {
    renderLabels = box.checked;
    reRender();
}