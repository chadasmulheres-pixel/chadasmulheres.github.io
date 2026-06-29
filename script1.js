// =====================================
// CONTADOR REGRESSIVO
// =====================================

const dataEvento = new Date("August 22, 2026 14:00:00").getTime();

setInterval(() => {

    const agora = new Date().getTime();
    const distancia = dataEvento - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML =
        `${dias} dias ${horas}h ${minutos}m ${segundos}s`;

    if (distancia < 0) {
        document.getElementById("countdown").innerHTML = "O evento começou!";
    }

}, 1000);


// =====================================
// URL DO APPS SCRIPT
// =====================================

const URL =
"https://script.google.com/macros/s/AKfycbzKS8cwvmxmVbYuE7sJFtwrWqJmHJg-4Kz-e-Jw0IrWu2aeD95hRn-1lmfDY7fHs_hdAg/exec";


// =====================================
// VAGAS
// =====================================

async function atualizarVagas(){

    try{

        const resposta = await fetch(URL);
        const dados = await resposta.json();

        const vagas = document.getElementById("vagas");

        if(vagas){

            vagas.innerHTML =
            `Restam ${dados.restantes} vagas`;

        }

        if(dados.encerrado){

            document.querySelector("button[type='submit']").disabled = true;

            alert("As inscrições foram encerradas.");

        }

    }catch(erro){

        console.log(erro);

    }

}

atualizarVagas();


// =====================================
// FORMULÁRIO
// =====================================

const formulario = document.querySelector("form");

formulario.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const nome =
    document.querySelector('input[placeholder="Nome Completo"]').value;

    const whatsapp =
    document.querySelector('input[placeholder="WhatsApp"]').value;

    const ingressos =
    document.querySelector('input[type="number"]').value;

    const formData = new FormData();

    formData.append("nome", nome);
    formData.append("whatsapp", whatsapp);
    formData.append("ingressos", ingressos);

    try{

        const resposta = await fetch(URL,{

            method:"POST",
            body:formData

        });

        const resultado = await resposta.json();

        if(resultado.status!="ok"){

            throw new Error(resultado.mensagem);

        }

        alert(`Obrigada pela inscrição, ${nome}!

Agora realize o pagamento.

PIX

Chave:
06583916401

Após o pagamento envie o comprovante para a Missionária Luana.`);

        const mensagem =
`Olá Missionária Luana!

Meu nome é ${nome}.

Acabei de realizar minha inscrição para o Chá de Mulheres - Raízes.

Segue meu comprovante de pagamento.`;

        window.open(

"https://wa.me/5511965502306?text="+encodeURIComponent(mensagem),

"_blank"

);

        formulario.reset();

        atualizarVagas();

    }catch(erro){

        console.error(erro);

        alert("Não foi possível realizar a inscrição.");

    }

});


// =====================================
// ANIMAÇÃO
// =====================================

const elementos=document.querySelectorAll("section");

const observar=new IntersectionObserver((itens)=>{

itens.forEach(item=>{

if(item.isIntersecting){

item.target.style.opacity="1";
item.target.style.transform="translateY(0px)";

}

});

});

elementos.forEach(el=>{

el.style.opacity="0";
el.style.transform="translateY(40px)";
el.style.transition="1s";

observar.observe(el);

});


// =====================================
// BOTÃO TOPO
// =====================================

const topo=document.createElement("button");

topo.innerHTML="↑";

document.body.appendChild(topo);

topo.style.position="fixed";
topo.style.bottom="20px";
topo.style.right="20px";
topo.style.width="50px";
topo.style.height="50px";
topo.style.borderRadius="50%";
topo.style.border="none";
topo.style.background="#b58b45";
topo.style.color="white";
topo.style.fontSize="22px";
topo.style.cursor="pointer";
topo.style.display="none";

window.addEventListener("scroll",()=>{

topo.style.display=window.scrollY>400?"block":"none";

});

topo.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};
