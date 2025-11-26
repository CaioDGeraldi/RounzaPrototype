// encontro.js - Salva encontros no localStorage e exibe mensagem de sucesso


document.getElementById('encontro-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value.trim();
    const local = document.getElementById('local').value;
    const data = document.getElementById('data').value;
    const descricao = document.getElementById('descricao').value.trim();
    const horaini = document.getElementById('horaini').value;
    const horafim = document.getElementById('horafim').value;

    if (!titulo || !local || !data || !descricao || !horaini || !horafim) {
        document.getElementById('mensagem').textContent = 'Preencha todos os campos.';
        return;
    }

    const encontro = { titulo, local, data, descricao, horaini, horafim };
    let encontros = JSON.parse(localStorage.getItem('encontros') || '[]');
    encontros.push(encontro);
    localStorage.setItem('encontros', JSON.stringify(encontros));

    document.getElementById('mensagem').textContent = 'Encontro criado com sucesso!';
    document.getElementById('encontro-form').reset();
});
