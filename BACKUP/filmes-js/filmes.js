const form = {
    nome: document.querySelector('input[name="name"]'),
    sinopse: document.querySelector('textarea[name="sinopse"]'),
    data: document.querySelector('input[name="data"]'),
    poster: document.querySelector('input[name="poster"]'),
};

const botaoCadastro = document.getElementById('Cadastro');
const listaFilmes = document.getElementById('lista-filmes');

botaoCadastro.addEventListener('click', (e) => {
    e.preventDefault(); // evita reload da página caso o botão esteja dentro de um form

    const nome = form.nome.value.trim();
    const sinopse = form.sinopse.value.trim();
    const data = form.data.value;
    const posterFile = form.poster.files[0];

    if (!nome) {
        alert('Digite o nome do filme!');
        return;
    }

    criarCardFilme({ nome, sinopse, data, posterFile });
    limparFormulario();
});

function criarCardFilme({ nome, sinopse, data, posterFile }) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow p-4 flex gap-4';

    let posterHTML = '';
    if (posterFile) {
        const url = URL.createObjectURL(posterFile);
        posterHTML = `<img src="${url}" alt="Poster de ${nome}" class="w-20 h-28 object-cover rounded">`;
    }

    const dataFormatada = data
        ? new Date(data + 'T00:00:00').toLocaleDateString('pt-BR')
        : 'Sem data';

    card.innerHTML = `
        ${posterHTML}
        <div class="flex flex-col">
            <h2 class="text-xl font-bold">${nome}</h2>
            <span class="text-sm text-gray-500 mb-2">${dataFormatada}</span>
            <p class="text-gray-700">${sinopse || 'Sem sinopse.'}</p>
        </div>
    `;

    listaFilmes.prepend(card); // novo filme aparece no topo
}

function limparFormulario() {
    form.nome.value = '';
    form.sinopse.value = '';
    form.data.value = '';
    form.poster.value = '';
}