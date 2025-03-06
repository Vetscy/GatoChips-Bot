document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const settingsBtn = document.querySelector('.fa-cog').parentElement;
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.querySelector('.settings-close');

    // Carregar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('light-theme', savedTheme === 'light');
    themeToggle.checked = savedTheme === 'light';

    // Alternar tema
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', themeToggle.checked ? 'light' : 'dark');
        
        // Atualizar ícone do tema
        const themeIcon = document.querySelector('.option-label i');
        themeIcon.className = themeToggle.checked ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Abrir/fechar modal de configurações
    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });

    closeSettings.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });

    // Fechar ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });
});
