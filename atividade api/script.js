function carregarjogos() {
    fetch("http://localhost:3000/jogos")
        .then(response => response.json())
        .then(data => {
            const ul = document.getElementById("lista");
            ul.innerHTML = ""; 
            
            data.forEach(jogo => { 
                const li = document.createElement("li");
                li.textContent = `${jogo.titulo} - ${jogo.genero} - ${jogo.plataforma} - ${jogo.nota} - ${jogo.status}`;
                ul.appendChild(li);
            });
        })
        .catch(err => console.error("Erro ao buscar jogos:", err));
}
carregarjogos();

const formulario = document.getElementById("meu-formulario");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    const novojogo = {
        titulo: document.getElementById("titulo").value,
        genero: document.getElementById("genero").value,
        plataforma: document.getElementById("plataforma").value,
        nota: document.getElementById("nota").value,
        status: document.getElementById("status").value
    };
    fetch("http://localhost:3000/jogos", {
        method: "POST",
        body: JSON.stringify(novojogo),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json()) 
    .then(() => {
        formulario.reset(); 
        carregarjogos();   
    })
    .catch(err => console.error("Erro ao cadastrar jogo!", err));
});