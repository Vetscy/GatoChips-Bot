document.addEventListener('DOMContentLoaded', () => {
    // Animar elementos quando entrarem na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    });

    document.querySelectorAll('.card, .hero-section').forEach((el) => observer.observe(el));

    // Tema escuro/claro
    const toggleTheme = () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    };

    // Botão de voltar ao topo
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-top modern-button';
    scrollButton.innerHTML = '↑';
    document.body.appendChild(scrollButton);

    scrollButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        scrollButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    const menuTrigger = document.querySelector('.menu-trigger');
    const submenu = document.querySelector('.submenu');
    const closeSubmenu = document.querySelector('.close-submenu');

    menuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        submenu.classList.add('active');
    });

    closeSubmenu.addEventListener('click', function() {
        submenu.classList.remove('active');
    });

    document.addEventListener('click', function(e) {
        if (!submenu.contains(e.target) && !menuTrigger.contains(e.target)) {
            submenu.classList.remove('active');
        }
    });

    // Selecionando elementos
    const modal = document.getElementById('musicModal');
    const closeModal = modal.querySelector('.close-modal');

    // Abrir modal ao clicar no botão
    menuTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Previne rolagem
    });

    // Fechar modal
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaura rolagem
    });

    // Fechar modal ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Selecionando elementos
    const menuTriggers = document.querySelectorAll('.menu-trigger');
    const musicModal = document.querySelector('.music-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Identificar qual botão foi clicado
    menuTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Verificar se o botão clicado é o de música
            if (e.currentTarget.querySelector('i.fa-music')) {
                e.preventDefault();
                musicModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Fechar modal
    const closeModal = () => {
        musicModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && musicModal.classList.contains('active')) {
            closeModal();
        }
    });
});
