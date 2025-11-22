// listar-encontros.js - Lista encontros salvos no localStorage


const localImgs = {
    "Lago (Prainha)": "lago.jpg",
    "Lago": "lago.jpg",
    "Centro (Lado A)": "centroA.jpg",
    "Centro (Lado B)": "centroB.jpg",
    "Parque Ecológico": "parque.jpg"
};

function renderEncontros() {
    const container = document.getElementById('lista-encontros');
    let encontros = JSON.parse(localStorage.getItem('encontros') || '[]');
    if (!encontros.length) {
        container.innerHTML = '<p style="text-align:center; color:#6366f1;">Nenhum encontro criado ainda.</p>';
        return;
    }
    let html = '<ul style="list-style:none; padding:0;">';
    encontros.reverse().forEach((e, idx) => {
        const imgSrc = localImgs[e.local] || 'favicon.svg';
        html += `<li style="background:#f8fafc; margin-bottom:18px; padding:18px 20px; border-radius:12px; box-shadow:0 2px 8px rgba(99,102,241,0.07); display:flex; align-items:center; gap:18px;">
            <img src="${imgSrc}" alt="${e.local}" style="width:80px; height:80px; object-fit:cover; border-radius:12px; box-shadow:0 2px 8px rgba(99,102,241,0.10);">
            <div style="flex:1;">
                <h3 style="margin-top:0; color:#3730a3;">${e.titulo}</h3>
                <p style="margin:4px 0 8px 0;"><strong>Local:</strong> ${e.local}</p>
                <p style="margin:4px 0 8px 0;"><strong>Data:</strong> ${e.data}</p>
                <p style="margin:4px 0 0 0;">${e.descricao}</p>
            </div>
        </li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderEncontros);
document.addEventListener('DOMContentLoaded', renderEncontros);
