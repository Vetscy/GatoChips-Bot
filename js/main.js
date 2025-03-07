// Funções para a barra flutuante
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('.fa-moon');
    icon.classList.toggle('fa-sun');
}

function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'KotoriBot',
            text: 'Confira o KotoriBot - O melhor bot para seu servidor Discord!',
            url: window.location.href
        });
    }
}

// Observador de scroll para mostrar/ocultar botão de voltar ao topo
const handleScroll = () => {
    const scrollButton = document.querySelector('.floating-btn');
    if (window.scrollY > 200) {
        scrollButton.style.display = 'flex';
    } else {
        scrollButton.style.display = 'none';
    }
};

window.addEventListener('scroll', handleScroll);

// Animação de entrada dos elementos
document.addEventListener('DOMContentLoaded', () => {
    handleScroll();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
});
