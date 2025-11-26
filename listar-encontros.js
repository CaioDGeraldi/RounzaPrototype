// listar-encontros.js - Lista encontros salvos no localStorage


const localImgs = {
    "Lago (Prainha)": "lagoprainha.jpg",
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
    // determine creator info (use logged user or default Rounza)
    const currentUser = (() => {
        try { return JSON.parse(localStorage.getItem('currentUser')) } catch(e){ return null }
    })() || { displayName: 'Rounza', photo: 'usuusu.png' };
    let html = '<ul style="list-style:none; padding:0;">';
    encontros.reverse().forEach((e, idx) => {
        const imgSrc = localImgs[e.local] || 'favicon.svg';
        html += `<li style="background:#f8fafc; margin-bottom:18px; padding:15px 20px; border-radius:12px; box-shadow:0 2px 8px rgba(99,102,241,0.07); display:flex; gap:12px; align-items:flex-start;">
            <img src="${imgSrc}" alt="${e.local}" style="width:120px; margin: 0px; height:160px; flex-shrink:0; object-fit:cover; border-radius:12px; box-shadow:0 2px 8px rgba(99,102,241,0.10);">
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0px; padding:0px 10px; background:#fff; border-radius:12px; border:2px solid #6366f1; flex-shrink:0;">
                <img src="${currentUser.photo || 'usuusu.png'}" alt="${currentUser.displayName}" style="width:40px; height:40px; object-fit:cover; border-radius:999px; box-shadow:0 2px 8px rgba(99,102,241,0.08);">
                <div style="text-align:center;">
                    <div style="font-size:0.7rem; color:#6b7280; font-weight:600;">Criado por</div>
                    <div style="font-weight:700; color:#3730a3; font-size:0.9rem;">${currentUser.displayName}</div>
                </div>
            </div>
            <div style="flex:1;">
                <h3 style="margin-top:0; margin-bottom:6px; color:#3730a3;">${e.titulo}</h3>
                <p style="margin:4px 0 4px 0;"><strong>Local:</strong> ${e.local}</p>
                <p style="margin:4px 0 4px 0;"><strong>Data:</strong> ${e.data}</p>
                <p style="margin:4px 0 4px 0;"><strong>Horário:</strong> ${e.horaini} até ${e.horafim}</p>
                <p style="margin:4px 0 0 0;">${e.descricao}</p>
            </div>
        </li>`;
    });
    html += '</ul>';
    container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderEncontros);
