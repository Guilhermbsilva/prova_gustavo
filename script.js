// script.js (Atualizado)

document.addEventListener("DOMContentLoaded", function() {
    // Função de cadastro
    document.getElementById('cadastro-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const role = document.getElementById('role').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Recuperando o array de usuários do LocalStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Adicionando o novo usuário ao array
        users.push({ username, email, password, role });

        // Salvando o array atualizado de usuários no LocalStorage
        localStorage.setItem('users', JSON.stringify(users));

        alert('Cadastro realizado com sucesso!');
        window.location.href = 'index.html'; // Redireciona para a página de login
    });
});

// script.js (Atualizado para Login)

document.addEventListener("DOMContentLoaded", function() {
    // Função de login
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const role = document.getElementById('role').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Recuperando o array de usuários do LocalStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificando se o usuário existe
        const user = users.find(user => user.username === username && user.password === password && user.role === role);

        if (user) {
            // Se for aluno, redireciona para a página de aluno
            if (role === 'aluno') {
                window.location.href = 'aluno.html'; 
            }
            // Se for professor, redireciona para a página de professor
            else if (role === 'professor') {
                window.location.href = 'professor.html';
            }
        } else {
            alert('Usuário ou senha incorretos!');
        }
    });
});


// script.js (Atualizado para Adicionar Aula com Nome do Professor)
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('add-class-form')) {
        document.getElementById('add-class-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const classTitle = document.getElementById('class-title').value;
            const classDescription = document.getElementById('class-description').value;
            const professorName = localStorage.getItem('loggedInUser'); // Recuperando o nome do professor logado

            // Verificando se o professor está logado
            if (!professorName) {
                alert('Você precisa estar logado como professor para adicionar aulas!');
                return;
            }

            // Recuperando as aulas existentes do LocalStorage
            let classes = JSON.parse(localStorage.getItem('classes')) || [];

            // Adicionando a nova aula com o nome do professor
            classes.push({ title: classTitle, description: classDescription, professor: professorName });

            // Salvando as aulas no LocalStorage
            localStorage.setItem('classes', JSON.stringify(classes));

            alert('Aula adicionada com sucesso!');
        });
    }
});

// script.js (Atualizado para Aluno - Exibir Aulas com Nome do Professor)
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('aulas-container')) {
        const aulasContainer = document.getElementById('aulas-container');

        // Recuperando as aulas do LocalStorage
        let classes = JSON.parse(localStorage.getItem('classes')) || [];

        // Verificando se há aulas e exibindo
        if (classes.length > 0) {
            classes.forEach(function(classItem) {
                const classDiv = document.createElement('div');
                classDiv.classList.add('class-item');
                classDiv.innerHTML = `
                    <div class="class-box">
                        <h3>${classItem.title}</h3>
                        <p><strong>Professor: </strong>${classItem.professor}</p>
                        <p><strong>Descrição: </strong>${classItem.description}</p>
                    </div>
                `;
                aulasContainer.appendChild(classDiv);
            });
        } else {
            aulasContainer.innerHTML = '<p>Não há aulas disponíveis no momento.</p>';
        }
    }
});

// script.js (Atualizado para Login)
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const role = document.getElementById('role').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Recuperando o array de usuários do LocalStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Verificando se o usuário existe
        const user = users.find(user => user.username === username && user.password === password && user.role === role);

        if (user) {
            // Salvando o nome do usuário logado no LocalStorage
            localStorage.setItem('loggedInUser', username);

            // Se for aluno, redireciona para a página de aluno
            if (role === 'aluno') {
                window.location.href = 'aluno.html'; 
            }
            // Se for professor, redireciona para a página de professor
            else if (role === 'professor') {
                window.location.href = 'professor.html';
            }
        } else {
            alert('Usuário ou senha incorretos!');
        }
    });
});

// script.js (Adicionando função para limpar dados)
function clearData() {
    // Limpa todos os dados armazenados no localStorage
    localStorage.clear();

    // Avisar ao usuário que os dados foram apagados
    alert('Todos os dados foram limpos!');
    
    // Redireciona para a página de login após limpar os dados
    window.location.href = 'index.html';
}

