const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

// Variável para armazenar a mensagem do usuário
let userMessage = null;

const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Cria um elemento chat <li> com mensagem e className passados
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // retorna o elemento chat <li>
}

const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");

    messageElement.classList.add("error");
    messageElement.textContent = "Oops! Este chat não está fucionando no momento. Tente novamente mais tarde.";
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Obtêm a mensagem inserida pelo usuário e remove espaços em branco extras
    if(!userMessage) return;

    // Limpa a área de entrada de texto e define sua altura como padrão
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Anexa a mensagem do usuário à chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Exibe a mensagem "Digitando..." enquanto aguarda a resposta
        const incomingChatLi = createChatLi("Digitando...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Ajusta a altura da textarea com base em seu conteúdo
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // Se a tecla Enter for pressionada sem a tecla Shift e a largura da janela for maior que 800px, a mensagem é enviada
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));