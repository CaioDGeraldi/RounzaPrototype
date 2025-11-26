// role.js - Exibe informações do local selecionado

const locais = {
	"Lago (Prainha)": {
		titulo: "Lago (Prainha)",
		descricao: "Ponto de encontro à beira do lago, ideal para piqueniques, esportes e relaxamento ao ar livre.",
		imagem: "lagoprainha.jpg",
		info: "Aberto todos os dias, das 6h às 22h. Eventos aos finais de semana."
	},
	"Lago": {
		titulo: "Lago",
		descricao: "Área ampla para caminhadas, esportes e eventos culturais. Ambiente seguro e arborizado.",
		imagem: "lago.jpg",
		info: "Aberto diariamente. Atividades esportivas e culturais programadas."
	},
	"Centro (Lado A)": {
		titulo: "Centro (Lado A)",
		descricao: "Região central com cafés, lojas e espaços para apresentações culturais.",
		imagem: "centroA.jpg",
		info: "Movimentado durante o dia. Eventos culturais à noite."
	},
	"Centro (Lado B)": {
		titulo: "Centro (Lado B)",
		descricao: "Área com bares, restaurantes e espaços para socialização noturna.",
		imagem: "centroB.jpg",
		info: "Melhor aproveitado à noite. Música ao vivo em alguns estabelecimentos."
	},
	"Parque Ecológico": {
		titulo: "Parque Ecológico",
		descricao: "Espaço verde para trilhas, esportes e contato com a natureza. Ideal para grupos e famílias.",
		imagem: "parque.jpg",
		info: "Aberto das 7h às 18h. Trilhas e áreas de lazer."
	}
};

function getQueryParam(param) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
}

function renderLocal() {
	const local = getQueryParam('local');
	if (!local || !locais[local]) {
		document.getElementById('local-title').textContent = 'Local não encontrado';
		document.getElementById('local-desc').textContent = '';
		document.getElementById('local-info').textContent = '';
		document.getElementById('local-img').style.display = 'none';
		return;
	}
	const data = locais[local];
	document.getElementById('local-title').textContent = data.titulo;
	document.getElementById('local-desc').textContent = data.descricao;
	document.getElementById('local-info').textContent = data.info;
	const img = document.getElementById('local-img');
	img.src = data.imagem;
	img.alt = `Imagem de ${data.titulo}`;
	img.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', renderLocal);

document.addEventListener('DOMContentLoaded', () => {
    const createMeetingBtn = document.getElementById('create-meeting-btn');
    const localTitle = document.getElementById('local-title').textContent.trim();

    // Define o link do botão com o local como parâmetro na URL
    createMeetingBtn.href = `criar-encontro.html?local=${encodeURIComponent(localTitle)}`;
});
