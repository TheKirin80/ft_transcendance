function afficherRectangleBleu(){
    let context2D = document.getElementById('theCanvas').getContext('2d');
    context2D.strokeStyle = "#0000FF";
    context2D.rect(200, 200, 100, 25);
    context2D.stroke();
}

window.onload = afficherRectangleBleu;