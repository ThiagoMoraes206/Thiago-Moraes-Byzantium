//Script para funcionalidade do botão das curiosidades
function toggleList(){
    const list = document.getElementById('trivia-list');
    const label = document.getElementById('btn-label');
    const arrow = document.getElementById('arrow');

    const open = list.style.display === 'block';

    list.style.display = open ? 'none' : 'block';
    label.textContent = open ? 'Mostrar Curiosidades' : 'Esconder Curiosidades';
    arrow.textContent = open ? '▼' : '▲';
}

//Conteúdo da busca

const conteudo = [
    {
        titulo: "Guarda Varegues",
        descricao: "A elite byzantina composta por guerreiros nórdicos, famosa por sua lealdade e habilidades de combate, servindo como guarda pessoal dos imperadores bizantinos por séculos.",
        pagina: "guardaVaregues.html"
    }
]

//Script para funcionalidade do botão de pesquisa

document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.querySelector(".searchForm");
    if (formulario) {
        formulario.addEventListener("submit", function (e) {
            const input = formulario.querySelector("[name='q']");
            const termo = input.value.trim();
            if (termo === "") {
                e.preventDefault();
            }
        });
    }

    const termSpan = document.getElementById("search-term");
    const resultsDiv = document.getElementById("search-results");

    if (termSpan && resultsDiv) {
        const params = new URLSearchParams(window.location.search);
        const termo = params.get("q") || "";

        termSpan.textContent = '"' + termo + '"';

        if (termo === "") {
            resultsDiv.innerHTML = '<p class="sem-resultado">Nenhum termo foi pesquisado.</p>';
            return;
        }

        const termoLower = termo.toLowerCase();
        const encontrados = conteudo.filter(item =>
            item.titulo.toLowerCase().includes(termoLower) ||
            item.texto.toLowerCase().includes(termoLower)
        );

        if (encontrados.length === 0) {
            resultsDiv.innerHTML = '<p class="sem-resultado">Nenhum resultado encontrado para "' + termo + '".</p>';
            return;
        }

        resultsDiv.innerHTML = encontrados.map(item => `
            <div class="resultado-item">
                <h3><a href="${item.pagina}" class="redes">${item.titulo}</a></h3>
                <p>${item.texto}</p>
            </div>
        `).join("");
    }
});