// --- CONSTANTES DE ELEMENTOS ---
const input = document.getElementById('password-input');
const loginScreen = document.getElementById('login-screen');
const mainSystem = document.getElementById('main-system');
const monitorFrame = document.getElementById('monitor-frame'); 
const hintContainer = document.getElementById('hidden-hint');
const hintWords = document.querySelectorAll('.hint-word');
const errorBtn = document.getElementById('error-btn');
const fileViewer = document.getElementById('file-viewer');
const fileTitle = document.getElementById('file-title');
const fileContent = document.getElementById('file-content');
const logsSection = document.getElementById('logs-section');

// Login
const loadingScreen = document.getElementById('loading-screen');
const loadingText = document.getElementById('loading-text');
const progressBarFill = document.getElementById('progress-bar-fill');

// Pasta sonho
const sonhoPasswordHud = document.getElementById('sonho-password-hud');
const sonhoInput = document.getElementById('sonho-input');


let typewriterTimeout; 

// DADOS DO SISTEMA 
const fileData = {
    'Aprendizagem': { title: 'Aprendizagem', content: 'Depois da minha reativação fui ensinado pelo Ashen a pescar, será armazenado, como: pegar a vara depesca, colocar os objetos necessarios, e arremassar ao mar, depois puxar quando o peixe, "Fisgar" em seguida pegar o peixe e tentar ligar a grelha, mas parar antes pois não tem dados suficientes para ligar a grelha e devolver o peixe ao mar.' },
    'Canto_II': { title: 'Memoria I', content: 'Fui ativado depois do INCIDENTE, meus sistemas estavam em constante vibração, como se estivessem em falha, avisos frequentes depois de andar fora do armazem, encontrei uma grimlock, ela atacou, mas meus sistemas de defesa estavam danificados e não ativaram, meus dados começaram a corromper quando ele apareceu, ele me chamou para sua casa, e está cuidando de min, seus dados estão sendo alocados para um novo ambiente. tentando acessar emoções: .  .   . Acesso negado.' },
    'Canto_III': { title: 'Memoria II', content: 'Foi me ensinado o significado da palavra Pai    .   .  . Dados insificientes, caso prosseguir o erro aparecerar  .  .   . Fim dos dados' },
    'Virgilio': { title: 'Dados: Recarga', content: 'Ao recarregar tenho sonhos, vejo dados que nunca foram computados, o sistema secundario irá salvar o sonho a demanda do sistema primario, esté dado será armazenado para pesquisas futuras do sistema primario.' },
    'Beatriz': { title: 'Espaço vazio', content: 'Off Rp: Para adição de coisas nessas pastas só falar, minha criatividade acabou aqui kkkkk ass: Star' },
    
    // ARQUIVO PROTEGIDO 
    'Sonho': { 
        title: 'Fada da lua.TXT', 
        content: `Neste documento relata um sonho que o grimlock sonhou: Eu estava de olhos abertos, em um quarto grande, ao meu lado tinha uma pessoa com um vestido preto. Eu não conseguia desligar para recarregar, por causa que algo que fazia meu peito apertar. Ela colocava a mão sobre meu peito de maneira recofortante e de forma suave a dor sumia, e diante da calmaria, ela começou a falar: 
Outrora, existiu uma pequena fada lunar que, por onde voava, deixava um rastro brilhante. Mas, não se engane: ele não iluminava para ser visto, mas para que outros não se perdessem no escuro. 
Por eras, sua luz costurou caminhos seguros entre noites inquietas, guiando os perdidos até seus respectivos destinos. Contudo, o mundo cresceu barulhento e... começou a pedir mais do que ela poderia dar. 
E a fada, bem... ela tentou brilhar além de si. 
No fim, sua luz tornou-se pálida. 
Foi então que a lua a chamou de volta, cobrindo o céu por um instante. E, nesse eclipse breve, o mundo aprendeu a caminhar sem depender de seu brilho. Afinal, existiam as estrelas. E, lembrando do quão brilhante era o brilho daquela fada, os viajantes passaram a prestar mais atenção nas estrelas. Elas, cada vez mais próximas, fizeram a noite tornar-se menos temida e solitária. 
Enquanto isso, não pense que a fada desapareceu. Ela repousou na sombra da lua. E ali, entendeu que sua luz sempre existiria, mesmo quando não fosse vista.
Ela olhou para mim e falou:
Você compreende a finalidade dessa história?
ela afabou meu cabelo e continuou:- Sua mãe é como a pequena fada. Apesar dela não estar aqui, neste momento, para te guiar... a lua está cuidando dela. E... tal qual os viajantes, isso fez você prestar atenção nas estrelas, não foi? Isso mostra que você consegue ir muito bem sem ela. E, bem... apesar da ausência marcante dela, você sabe... sabe que o amor dela estará sempre contigo, certo? Protegendo e guiando você por onde quer que esteja.

Fim do sonho, depois disso a inicialização do sistema ocorreu normalmente, entretanto uma avaria no olho esquerdo foi detectada.`, 
        protegido: true 
    }
};

// Não funciona mais ignorar
function playSound(audioElement) {
    console.log("Som removido/ignorado.");
}

// FUNÇÃO TYPEWRITER 
function typewriter(element, text, speed = 35) {
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
    element.textContent = '';
    let i = 0;

    function digita() {
        if (i < text.length) {
            const char = text[i];
            const isFast = char === ' ' || char === ',' || char === '.' || char === '\n';
            element.textContent += char;
            i++;
            typewriterTimeout = setTimeout(digita, isFast ? speed / 3 : speed); 
        } else {
            updateLogs(); 
        }
    }
    digita();
}


// --- LÓGICA DE LOGIN PRINCIPAL ---

input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const val = input.value.trim().toLowerCase();

        if (val === 'dante') { // Senha de Manutenção/Emergência 
            triggerGlitchHint();
            input.value = '';
        } 
        else if (val === 'divina comedia' || val === 'divina comédia') { // Senha de Ativação
            loginSuccess();
        } 
        else {
            showLoginError();
        }
    }
});

function triggerGlitchHint() {
    hintContainer.style.opacity = '1';
    
    hintWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.display = 'block';
            word.classList.add('glitch-active');
        }, index * 100); 
    });

    setTimeout(() => {
        hintContainer.style.opacity = '0';
        setTimeout(() => {
            hintWords.forEach(word => {
                word.style.display = 'none';
                word.classList.remove('glitch-active');
            });
        }, 500);
    }, 5000);
}


function showLoginError() {
    input.style.borderBottom = "2px solid red";
    setTimeout(() => input.style.borderBottom = "2px solid var(--primary-color)", 1000);
}

// LOADING

function loginSuccess() {
    loginScreen.style.display = 'none'; 
    loadingScreen.style.display = 'flex';
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1; 
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                monitorFrame.style.display = 'none'; 
                mainSystem.style.display = 'grid'; 
                openSection('inicio'); 
            }, 500);
        }
        progressBarFill.style.width = progress + '%';
        
    }, 100);
}

// --- FUNÇÕES DO SISTEMA SECUNDÁRIO 

window.openSection = function(sectionId) { 
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId + '-section').classList.add('active');
    
    closeFileViewer(); 
}

// FECHAR ARQUIVO
window.closeFileViewer = function() {
    fileViewer.style.display = 'none';
    sonhoPasswordHud.style.display = 'none';
    fileContent.textContent = '';
    fileTitle.textContent = '';
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
}

// --- FUNÇÃO PARA ABRIR ARQUIVOS (MEMÓRIAS) ---
window.openFile = function(fileName) {
    const data = fileData[fileName];
    
    fileContent.textContent = "DECODIFICANDO..."; 
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    sonhoPasswordHud.style.display = 'none'; 

    if (data) {
        fileViewer.style.display = 'block';
        fileTitle.textContent = data.title; 

        // LÓGICA DA PASTA "SONHO"
        if (data.protegido) {
            fileContent.textContent = "ARQUIVO PROTEGIDO. SENHA REQUERIDA...";
            sonhoPasswordHud.style.display = 'block';
            sonhoInput.value = '';
            sonhoInput.focus();
        } else {
            // Arquivo normal: typing
            setTimeout(() => {
                typewriter(fileContent, data.content, 40);
            }, 300); 
        }
        
        fileViewer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Senha da pasta sonho
sonhoInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const val = this.value.trim().toLowerCase();
        
        if (val === 'familia' || val === 'família') {
            // Senha correta: Mostra o conteúdo
            sonhoPasswordHud.style.display = 'none';
            fileContent.textContent = "DECODIFICANDO...";

            setTimeout(() => {
                const sonhoData = fileData['Sonho'];
                delete sonhoData.protegido; 
                typewriter(fileContent, sonhoData.content, 40);
            }, 300);

        } else {
            // Senha incorreta
            this.style.borderBottom = "2px solid red";
            this.value = '';
            setTimeout(() => this.style.borderBottom = "2px solid var(--primary-color)", 1000);
        }
    }
});

// LOGS
function updateLogs() {
    logsSection.innerHTML = `
        <h2>REGISTROS DO SISTEMA SECUNDÁRIO:</h2>
        <p>STATUS DO NÚCLEO: <span style="color: yellow;">INACESSÍVEL </span></p>
        <p>STATUS EMOCIONAL: DIRETRIZ T-2 </p>
        <p>INTEGRIDADE DO CARCAÇA: 97% </p>
        <hr>
        <p>TENTATIVAS DE ACESSO AO SISTEMA PRIMARIO: PERIGO. NÃO FORÇAR.</p>
        <p>Sistema secundário online. Memórias instável. </p>
    `;
}
document.addEventListener('DOMContentLoaded', updateLogs);


// TROCARO TEMA
window.changeTheme = function(element) {
    const newColor = element.getAttribute('data-color');
    
    document.documentElement.style.setProperty('--primary-color', newColor);
    
    if (newColor === '#33ff00') {
        document.documentElement.style.setProperty('--glitch-color', '#00ffea');
    } else if (newColor === '#00ffff') {
        document.documentElement.style.setProperty('--glitch-color', '#ff00ff');
    } else if (newColor === '#ffcc00') {
        document.documentElement.style.setProperty('--glitch-color', '#0000ff');
    }
    
    document.body.style.textShadow = `0 0 5px ${newColor}`;
    document.querySelectorAll('.color-box').forEach(box => {
        box.style.borderColor = newColor;
    });
};


// ERRO

errorBtn.addEventListener('click', () => {
    
    
    document.body.classList.add('system-failure');
    mainSystem.classList.add('system-failure');
    
    document.querySelector('.hud').innerHTML = "<span>NÚCLEO EM COLAPSO</span><span>MEMÓRIA FRAGMENTADA</span><span>FRAGMENTO SOFRENDO</span>";
    
    const elements = document.querySelectorAll('.folder, .tab, .danger-btn');
    elements.forEach(el => {
        el.style.transform = `rotate(${Math.random() * 8 - 4}deg) translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
        el.classList.add('glitch-active');
    });

});
