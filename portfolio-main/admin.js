// Simple client-side admin panel for managing contact_submissions in localStorage
// WARNING: This is client-side only and not secure. Do not rely on this for production auth.

// Change this default password here if you want to use a different one.
const ADMIN_PASSWORD = 'nearadmin2025';

const loginBox = document.getElementById('loginBox');
const adminPanel = document.getElementById('adminPanel');
const btnLogin = document.getElementById('btnLogin');
const btnCancel = document.getElementById('btnCancel');
const logoutBtn = document.getElementById('logoutBtn');
const exportCsvBtn = document.getElementById('exportCsvAdmin');
const clearAllBtn = document.getElementById('clearAllAdmin');
const adminList = document.getElementById('adminList');
const adminEmpty = document.getElementById('adminEmpty');
const inputPass = document.getElementById('adminPassword');

function loadSubmissions() {
    try { return JSON.parse(localStorage.getItem('contact_submissions') || '[]'); }
    catch (e) { return []; }
}

function saveSubmissions(subs) {
    localStorage.setItem('contact_submissions', JSON.stringify(subs));
}

function formatDate(iso) { return new Date(iso).toLocaleString(); }

function renderAdminList() {
    const subs = loadSubmissions();
    adminList.innerHTML = '';
    if (!subs.length) {
        adminEmpty.style.display = 'block';
        return;
    }
    adminEmpty.style.display = 'none';

    subs.forEach(sub => {
        const item = document.createElement('div');
        item.className = 'inbox-item';

        const title = document.createElement('h4');
        title.textContent = sub.subject || '(no subject)';

        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.textContent = `${sub.name} • ${sub.email} • ${formatDate(sub.timestamp)}`;

        const body = document.createElement('p');
        body.textContent = sub.message || '';

        const controls = document.createElement('div');
        controls.style.marginTop = '8px';

        const del = document.createElement('button');
        del.className = 'btn btn-secondary';
        del.textContent = 'Delete';
        del.addEventListener('click', () => {
            if (!confirm('Delete this response?')) return;
            let s = loadSubmissions();
            s = s.filter(x => String(x.id) !== String(sub.id));
            saveSubmissions(s);
            renderAdminList();
        });

        controls.appendChild(del);

        item.appendChild(title);
        item.appendChild(meta);
        item.appendChild(body);
        item.appendChild(controls);

        adminList.appendChild(item);
    });
}

function exportCsv() {
    const subs = loadSubmissions();
    if (!subs.length) { alert('No responses to export.'); return; }
    const headers = ['id','timestamp','name','email','subject','message'];
    const rows = subs.map(s => [s.id, s.timestamp, s.name, s.email, s.subject, s.message]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => '"' + String(c).replace(/"/g,'""') + '"').join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'contact_responses.csv';
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

function clearAll() {
    if (!confirm('Clear all responses? This cannot be undone.')) return;
    localStorage.removeItem('contact_submissions');
    renderAdminList();
}

btnLogin.addEventListener('click', () => {
    const val = (inputPass.value || '').trim();
    if (!val) { alert('Enter password'); return; }
    if (val === ADMIN_PASSWORD) {
        loginBox.style.display = 'none';
        adminPanel.classList.add('show');
        renderAdminList();
    } else {
        alert('Incorrect password');
    }
});

btnCancel.addEventListener('click', () => { inputPass.value = ''; });

logoutBtn.addEventListener('click', () => {
    adminPanel.classList.remove('show');
    loginBox.style.display = 'block';
    inputPass.value = '';
});

exportCsvBtn.addEventListener('click', exportCsv);
clearAllBtn.addEventListener('click', clearAll);

// Allow Enter key to submit
inputPass.addEventListener('keydown', (e) => { if (e.key === 'Enter') btnLogin.click(); });

// Auto-focus password
inputPass.focus();
