const getElement = (selector) => document.querySelector(selector);
const setText = (element, text) => element.innerText = text;
const setStyle = (element, style) => element.setAttribute('style', style);
const textInput = getElement('#descriptografar-area');
const textOutput = getElement('#text-content');
const dialogWindow = getElement('#dialog-box');
const dialogText = getElement('#dialog-text');
const closeButton = getElement('#dialog-close');

// Exibir a janela de diálogo com uma mensagem específica
const showDialog = (message) => {
    setText(dialogText, message); 
    setStyle(dialogWindow, 'display: flex'); 
    setTimeout(() => dialogWindow.classList.add('animate'), 200); 
};

// Esconder a janela de diálogo
const hideDialog = () => {
    setStyle(dialogWindow, 'display: none'); 
    dialogWindow.classList.remove('animate'); 
    textInput.value = ''; 
};

// Alterar a área de código
const changeCodeArea = () => {
    getElement('.no-content').setAttribute('style', 'display: flex'); 
    getElement('.showing-content').setAttribute('style', 'display: none'); 
};

// Limpar o texto na área de entrada e alterar a área de código
const limpaTexto = () => {
    getElement('.no-content').setAttribute('style', 'display: none'); 
    getElement('.showing-content').setAttribute('style', 'display: flex'); 
    textInput.value = ''; 
};

// Verificar se o texto contém caracteres especiais
const verificarEspecial = (phrase) => {
    const letterlist = [...'abcdefghijklmnopqrstuvwxyz 0123456789']; // Lista de caracteres válidos
    return !phrase.split('').every((character) => letterlist.includes(character)); // Retorna verdadeiro se encontrar caracteres inválidos
};

// Verificar se o texto contém letras maiúsculas
const verificarMaiuscula = (phrase) => phrase.split('').some((char) => char !== char.toLowerCase()); // Retorna verdadeiro se encontrar letras maiúsculas

// Função para criptografar o texto na área de entrada
const encriptar = () => {
    const text = textInput.value; // Obtém o texto da área de entrada
    if (verificarEspecial(text) || verificarMaiuscula(text)) { // Verifica se o texto contém caracteres especiais ou letras maiúsculas
        showDialog("O texto não deve conter caracteres especiais, acentuação ou letras maiúsculas."); 
        limpaTexto(); 
        changeCodeArea(); 
        return; 
    }
    // Substitui os caracteres no texto por suas representações criptografadas
    const resultadoEncriptar = text.replace(/e/g, 'el').replace(/i/g, 'ih').replace(/a/g, 'myb')
        .replace(/o/g, 'lo').replace(/u/g, 'de');
    textOutput.value = resultadoEncriptar; 
    changeCodeArea(); 
    limpaTexto(); 
};

// Descriptografar o texto na área de entrada
const descriptografar = () => {
    const text = textInput.value; 
    if (verificarEspecial(text) || verificarMaiuscula(text)) { // Verifica se o texto contém caracteres especiais ou letras maiúsculas
        showDialog("O texto não deve conter caracteres especiais, acentuação ou letras maiúsculas."); 
        return; 
    }
    // Substitui as representações criptografadas no texto por seus caracteres originais
    const resultadoDescriptografar = text.replace(/el/g, 'e').replace(/ih/g, 'i').replace(/myb/g, 'a')
        .replace(/lo/g, 'o').replace(/de/g, 'u');
    textOutput.value = resultadoDescriptografar;
    changeCodeArea(); 
    limpaTexto();
};

// Copiar o texto da área de saída
const copy = () => {
    const copyText = getElement('#text-content'); 
    copyText.select();
    document.execCommand('copy');
    showDialog("Texto copiado"); 
};

// Fechar a janela de diálogo quando o botão de fechar é clicado
closeButton.addEventListener('click', hideDialog);