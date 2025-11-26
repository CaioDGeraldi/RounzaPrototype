// auth.js - simples autenticação via localStorage e UI de perfil
(function(){
    const LOGIN_PAGE = 'login.html';

    function getCurrentUser(){
        try{
            return JSON.parse(localStorage.getItem('currentUser'));
        }catch(e){ return null; }
    }

    function saveCurrentUser(u){
        localStorage.setItem('currentUser', JSON.stringify(u));
    }

    function requireAuth(){
        const path = window.location.pathname.split('/').pop();
        if (path === '' || path === '/') return; // root edge
        if (path === LOGIN_PAGE) return; // allow login page
        const user = getCurrentUser();
        if (!user) {
            window.location.href = LOGIN_PAGE;
        } else {
            renderProfile(user);
        }
    }

    function renderProfile(user){
        // simple profile circle fixed at top-right
        const btn = document.createElement('button');
        btn.setAttribute('aria-label','Perfil');
        btn.style.position = 'fixed';
        btn.style.top = '12px';
        btn.style.right = '12px';
        btn.style.width = '56px';
        btn.style.height = '56px';
        btn.style.borderRadius = '999px';
        btn.style.border = 'none';
        btn.style.padding = '0';
        btn.style.cursor = 'pointer';
        btn.style.boxShadow = 'none';
        btn.style.background = 'transparent';
        btn.style.zIndex = '9999';
        btn.className = 'profile-btn';


        const img = document.createElement('img');
        img.src = user.photo || 'usuusu.png';
        img.alt = user.displayName || user.username || 'Usuário';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '999px';
        img.style.display = 'block';
        img.style.boxShadow = '0 8px 28px rgba(99,102,241,0.18)';

        btn.appendChild(img);
        document.body.appendChild(btn);

        // modal (same as before)
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.display = 'none';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.background = 'rgba(2,6,23,0.5)';
        modal.style.zIndex = '10000';

        const card = document.createElement('div');
        card.style.width = '360px';
        card.style.maxWidth = '94%';
        card.style.background = '#fff';
        card.style.padding = '18px';
        card.style.borderRadius = '12px';
        card.style.boxShadow = '0 8px 40px rgba(2,6,23,0.12)';

        card.innerHTML = `
            <div style="display:flex; gap:12px; align-items:center;">
                <img id="profile-photo" src="${user.photo || 'usuusu.png'}" alt="foto" style="width:72px; height:72px; object-fit:cover; border-radius:12px; background:#f8fafc;">
                <div style="flex:1;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <h3 id="profile-name" style="margin:0; color:#3730a3;">${user.displayName || user.username}</h3>
                    </div>
                    <p style="margin:6px 0 0 0; color:#6b7280;">@${user.username}</p>
                </div>
            </div>
            <hr style="margin:12px 0;">
            <div style="display:flex; gap:12px;">
                <div style="flex:1;">
                    <strong>Encontros criados</strong>
                    <div id="created-count" style="font-size:1.2rem; color:#3730a3;">${user.created || 0}</div>
                </div>
                <div style="flex:1;">
                    <strong>Encontros participados</strong>
                    <div id="participated-count" style="font-size:1.2rem; color:#3730a3;">${user.participated || 0}</div>
                </div>
            </div>
            <p style="margin:12px 0 0 0;"><strong>Há quanto tempo é Rounzer:</strong> <span id="months-on" style="color:#3730a3;">${user.months || 0} meses</span></p>
            <hr style="margin:12px 0;">
            <label style="display:block; margin-bottom:8px; font-weight:600;">Alterar nome</label>
            <input id="name-input" type="text" value="${user.displayName || ''}" style="width:100%; margin-bottom:8px; padding:8px; border-radius:8px; border:1px solid #e6e9f2;">
            <label style="display:block; margin-bottom:8px; font-weight:600; margin-top:6px;">Alterar foto</label>
            <input id="photo-input" type="file" accept="image/*" style="width:100%; margin-bottom:12px;">
            <div style="display:flex; gap:8px; justify-content:space-between; margin-top:6px;">
                <button id="save-profile" class="btn" style="flex:1;">Salvar</button>
                <button id="logout-btn" class="btn" style="flex:1; background:#ef4444; border-color:#ef4444;">Sair</button>
            </div>
        `;

        modal.appendChild(card);
        document.body.appendChild(modal);

        btn.addEventListener('click', ()=>{ modal.style.display = 'flex'; });
        modal.addEventListener('click', (e)=>{ if (e.target === modal) modal.style.display = 'none'; });

        // handlers
        const nameInput = card.querySelector('#name-input');
        const photoInput = card.querySelector('#photo-input');
        const saveBtn = card.querySelector('#save-profile');
        const logoutBtn = card.querySelector('#logout-btn');

        saveBtn.addEventListener('click', ()=>{
            const newName = nameInput.value.trim() || user.displayName;
            if (photoInput.files && photoInput.files[0]){
                const fr = new FileReader();
                fr.onload = function(ev){
                    user.photo = ev.target.result;
                    user.displayName = newName;
                    saveCurrentUser(user);
                    updateProfileUI(user);
                    modal.style.display = 'none';
                };
                fr.readAsDataURL(photoInput.files[0]);
            } else {
                user.displayName = newName;
                saveCurrentUser(user);
                updateProfileUI(user);
                modal.style.display = 'none';
            }
        });

        logoutBtn.addEventListener('click', ()=>{
            localStorage.removeItem('currentUser');
            window.location.href = LOGIN_PAGE;
        });

        function updateProfileUI(u){
            img.src = u.photo || 'usuusu.png';
            const pphoto = document.getElementById('profile-photo');
            const pname = document.getElementById('profile-name');
            const created = document.getElementById('created-count');
            const part = document.getElementById('participated-count');
            const months = document.getElementById('months-on');
            if (pphoto) pphoto.src = u.photo || 'usuusu.png';
            if (pname) pname.textContent = u.displayName || u.username;
            if (created) created.textContent = (u.created || 0);
            if (part) part.textContent = (u.participated || 0);
            if (months) months.textContent = (u.months || 0) + ' meses';
        }
    }

    // run on load
    document.addEventListener('DOMContentLoaded', requireAuth);

})();
