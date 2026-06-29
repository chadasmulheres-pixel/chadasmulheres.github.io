// =====================================
// CONTADOR REGRESSIVO
// =====================================

const dataEvento = new Date("2026-08-22T14:00:00").getTime();

function atualizarContador() {

    const agora = new Date().getTime();
    const distancia = dataEvento - agora;

    if (distancia <= 0) {
        document.getElementById("countdown").innerHTML = "O evento começou!";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        ${dias} dias • ${horas}h • ${minutos}m • ${segundos}s;

}

atualizarContador();
setInterval(atualizarContador,1000);


// =====================================
// FORMULÁRIO
// =====================================

const formulario = document.querySelector("form");

formulario.addEventListener("submit", async function(e){

    e.preventDefault();

    const dados = {

        nome: document.querySelector('input[placeholder="Nome Completo"]').value,

        whatsapp: document.querySelector('input[placeholder="WhatsApp"]').value,

        email: document.querySelector('input[type="email"]').value,

        cidade: document.querySelector('input[placeholder="Cidade"]').value,

        ingressos: document.querySelector('input[type="number"]').value

    };

    try{

        const resposta = await fetch("https://script.google.com/macros/s/AKfycbznDL_vtjVnQ3WB6klJjlrtJHAI1Zh5uAuXMUVpgpKhyk8f5OwisXHjAQ0cUiBnk6T6QQ/exec",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(dados)

        });

        if(!resposta.ok){
            throw new Error("Erro ao enviar");
        }

        alert(`Obrigada pela inscrição, ${dados.nome}!

Agora realize o pagamento.

PIX

Chave:
06583916401

Após o pagamento envie o comprovante para a Missionária Luana.`);

        const mensagem =
`Olá Missionária Luana!

Meu nome é ${dados.nome}.

Acabei de realizar minha inscrição para o Chá de Mulheres - Raízes.

Segue meu comprovante de pagamento.`;

        window.open(
            "https://wa.me/5511965502306?text="+encodeURIComponent(mensagem),
            "_blank"
        );

        formulario.reset();

    }

    catch(erro){

        console.error(erro);

        alert("Não foi possível enviar a inscrição. Tente novamente.");

    }

});


// =====================================
// ANIMAÇÃO
// =====================================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0)";

        }

    });

});

sections.forEach(section=>{

    section.style.opacity="0";
    section.style.transform="translateY(40px)";
    section.style.transition="0.8s";

    observer.observe(section);

});


// =====================================
// BOTÃO TOPO
// =====================================

const botaoTopo=document.createElement("button");

botaoTopo.innerHTML="↑";

botaoTopo.id="topo";

document.body.appendChild(botaoTopo);

botaoTopo.style.cssText=`
position:fixed;
bottom:20px;
right:20px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#b58b45;
color:white;
font-size:22px;
cursor:pointer;
display:none;
box-shadow:0 5px 15px rgba(0,0,0,.3);
`;

window.addEventListener("scroll",()=>{

    botaoTopo.style.display=window.scrollY>300?"block":"none";

});

botaoTopo.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};