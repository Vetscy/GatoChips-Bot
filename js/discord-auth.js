document.addEventListener('DOMContentLoaded', function() {
    // Função para obter parâmetros da URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Função para verificar se há um erro na URL
    function checkForErrors() {
        const error = getUrlParameter('error');
        const errorDescription = getUrlParameter('error_description');
        
        if (error) {
            console.error('Erro de autenticação:', error, errorDescription);
            // Mostrar mensagem de erro
            const loginButton = document.querySelector('.login-button');
            if (loginButton) {
                loginButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erro ao conectar';
                loginButton.classList.add('login-error');
                
                // Restaurar botão após 3 segundos
                setTimeout(() => {
                    loginButton.innerHTML = '<i class="fab fa-discord"></i> Login';
                    loginButton.classList.remove('login-error');
                }, 3000);
            }
            // Limpar a URL para evitar que o erro persista em recarregamentos
            window.history.replaceState({}, document.title, window.location.pathname);
            return true;
        }
        return false;
    }

    // Função para verificar se o usuário já está logado
    function checkLoggedInStatus() {
        const userData = localStorage.getItem('discord_user');
        if (userData) {
            try {
                const user = JSON.parse(userData);
                updateLoginButton(user);
                return true;
            } catch (e) {
                console.error('Erro ao analisar dados do usuário:', e);
                localStorage.removeItem('discord_user');
            }
        }
        return false;
    }

    // Função para atualizar o botão de login com as informações do usuário
    function updateLoginButton(user) {
        const loginButton = document.querySelector('.login-button');
        if (loginButton) {
            // Criar URL do avatar do Discord
            const avatarUrl = user.avatar 
                ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` 
                : 'https://cdn.discordapp.com/embed/avatars/0.png';
            
            loginButton.innerHTML = `<img src="${avatarUrl}" class="user-avatar"> ${user.username}`;
            loginButton.classList.add('logged-in');
            loginButton.href = '#perfil';
            
            // Adicionar menu de logout
            loginButton.addEventListener('click', function(e) {
                e.preventDefault();
                if (confirm('Deseja sair da sua conta Discord?')) {
                    localStorage.removeItem('discord_user');
                    localStorage.removeItem('discord_token');
                    window.location.reload();
                }
            });
        }
    }

    // Verificar se há erros na URL
    if (checkForErrors()) {
        return;
    }

    // Verificar se o usuário já está logado
    if (checkLoggedInStatus()) {
        return;
    }

    // Verificar se há um código de autorização na URL
    const code = getUrlParameter('code');
    
    if (code) {
        // Mostrar indicador de carregamento
        const loginButton = document.querySelector('.login-button');
        if (loginButton) {
            loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
        }

        // Simular a obtenção de dados do usuário (em um cenário real, você faria uma solicitação ao seu backend)
        setTimeout(function() {
            // Dados simulados do usuário
            const mockUser = {
                id: '123456789012345678',
                username: 'Usuário',
                avatar: null,
                discriminator: '0000'
            };
            
            // Salvar dados do usuário no localStorage
            localStorage.setItem('discord_user', JSON.stringify(mockUser));
            localStorage.setItem('discord_token', 'mock_token_' + Date.now());
            
            // Atualizar o botão de login
            updateLoginButton(mockUser);
            
            // Limpar o código da URL para evitar reautenticação em recarregamentos
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 1500);
    }
});