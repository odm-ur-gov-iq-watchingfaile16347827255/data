//Get the button btn-back-to-top
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};


////scroll btn to top
function scrollFunction() {
    if (
        document.body.scrollTop >50 ||
        document.documentElement.scrollTop >50
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
//////////////////////////////////
window.addEventListener('load', () => {
    function ObterTamanhoFonte(seletorComClasseAcessibilidade) {
        let tamanho = window.getComputedStyle(seletorComClasseAcessibilidade, null)
                        .getPropertyValue('font-size');
return parseFloat(tamanho);
}

function ControlaTamanhoElementos(seletoresComClasseAcessibilidade, aumentar, normal) {
    for (let i = 0; i < seletoresComClasseAcessibilidade.length; i++) {
        const element = seletoresComClasseAcessibilidade[i];
        let fontSizeAtual = 0;

        if (normal) {
            element.style.fontSize = '1em';
    }
else {
                if (aumentar)
fontSizeAtual = ObterTamanhoFonte(element) + 1;
else
                    fontSizeAtual = ObterTamanhoFonte(element) - 1;

element.style.fontSize = fontSizeAtual.toString() + 'px';
}
}
}

document.querySelector('#increase-plugin-ac').addEventListener('click', e => {
    let acessibilidade = document.getElementsByClassName('content-page');
ControlaTamanhoElementos(acessibilidade, true);
});

document.querySelector('#decrease-plugin-ac').addEventListener('click', e => {
    let acessibilidade = document.getElementsByClassName('content-page');
ControlaTamanhoElementos(acessibilidade, false);
});
});