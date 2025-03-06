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

    // Adicione verificação antes de usar
    if (menuTrigger && submenu && closeSubmenu) {
        menuTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            submenu.classList.add('active');
        });

        closeSubmenu.addEventListener('click', function() {
            submenu.classList.remove('active');
        });
    }

    document.addEventListener('click', function(e) {
        if (!submenu.contains(e.target) && !menuTrigger.contains(e.target)) {
            submenu.classList.remove('active');
        }
    });

    // Sistema de Log de Atualizações
    const updateLogModal = document.getElementById('updateLogModal');
    const logButton = document.querySelector('.log-button');
    const closeUpdateModalBtn = updateLogModal?.querySelector('.close-modal');

    // Funções de controle do modal
    const openModal = () => {
        updateLogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        updateLogModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event Listeners para o modal de log
    if (logButton && updateLogModal) {
        logButton.addEventListener('click', openModal);
    }

    if (closeUpdateModalBtn) {
        closeUpdateModalBtn.addEventListener('click', closeModal);
    }

    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target === updateLogModal) {
            closeModal();
        }
    });

    // Fechar com ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && updateLogModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Sistema de Música Modal
    const musicModal = document.querySelector('.music-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const menuTriggers = document.querySelectorAll('.menu-trigger');

    // Funções de controle do modal de música
    const openMusicModal = () => {
        musicModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMusicModal = () => {
        musicModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event Listeners para o modal de música
    if (menuTriggers.length > 0) {
        menuTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if (e.currentTarget.querySelector('i.fa-music')) {
                    e.preventDefault();
                    openMusicModal();
                }
            });
        });
    }

    if (modalClose) modalClose.addEventListener('click', closeMusicModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeMusicModal);

    // Fechar modal de música com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && musicModal?.classList.contains('active')) {
            closeMusicModal();
        }
    });
});
