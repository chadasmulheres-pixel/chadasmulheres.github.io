// ===============================
// CONTADOR REGRESSIVO
// ===============================

const dataEvento = new Date("August 22, 2026 14:00:00").getTime();

const contador = setInterval(function () {

    const agora = new Date().getTime();

    const distancia = dataEvento - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        `${dias} dias ${horas}h ${minutos}m ${segundos}s`;

    if (distancia < 0) {

        clearInterval(contador);

        document.getElementById("countdown").innerHTML =
            "O evento começou!";

    }

}, 1000);


// ===============================
// FORMULÁRIO
// ===============================

const formulario = document.querySelector("form");

formulario.addEventListener("submit", async function (e) {

    e.preventDefault();

    const dados = {
        nome: formulario.querySelector('input[placeholder="Nome Completo"]').value,
        whatsapp: formulario.querySelector('input[placeholder="WhatsApp"]').value,
        ingressos: formulario.querySelector('input[type="number"]').value
    };

    try {

        await fetch("https://script.google.com/macros/s/AKfycbz888Qkv9eRAeMmQ68x1i5tRDUM7tkqeFsBZTk41Ydcn2h7mKK9SOHVpcM5flxhkz_QrQ/exec", {
            method: "POST",
            body: JSON.stringify(dados)
        });

    alert(
`Obrigada pela inscrição, ${nome}!

Agora realize o pagamento via PIX.

Chave PIX:
06583916401

Após o pagamento você será direcionada para o WhatsApp da Missionária Luana.`
);

    const mensagem =
`Olá Missionária Luana!

Meu nome é ${nome}.

Acabei de realizar minha inscrição para o Chá de Mulheres - Raízes.

Segue meu comprovante de pagamento.`;

    const url =
"https://wa.me/5511965502306?text=" +
encodeURIComponent(mensagem);

    window.open(url, "_blank");

});


// ===============================
// ANIMAÇÃO AO ROLAR
// ===============================

const elementos = document.querySelectorAll("section");

const observar = new IntersectionObserver((itens) => {

    itens.forEach((item) => {

        if (item.isIntersecting) {

            item.target.style.opacity = "1";
            item.target.style.transform = "translateY(0px)";

        }

    });

});

elementos.forEach((el) => {

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "1s";

    observar.observe(el);

});


// ===============================
// BOTÃO VOLTAR AO TOPO
// ===============================

const topo = document.createElement("button");

topo.innerHTML = "↑";

topo.id = "topo";

document.body.appendChild(topo);

topo.style.position = "fixed";
topo.style.bottom = "20px";
topo.style.right = "20px";
topo.style.width = "50px";
topo.style.height = "50px";
topo.style.borderRadius = "50%";
topo.style.border = "none";
topo.style.background = "#b58b45";
topo.style.color = "white";
topo.style.fontSize = "22px";
topo.style.cursor = "pointer";
topo.style.display = "none";
topo.style.boxShadow = "0 4px 10px rgba(0,0,0,.3)";

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topo.style.display = "block";

    } else {

        topo.style.display = "none";

    }

});

topo.onclick = () => {

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

};
