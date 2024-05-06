const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const btnIcon = document.getElementById('button-icon');
const linkInsta = document.querySelector('.link-insta');
const imgDogContainer = document.querySelector('.img-dog')
const imgdog = document.getElementById('imgDog');
const chatContainer = document.querySelector('.chat-container');

sendBtn.addEventListener('click',sendMessage);

// function rolaTopo(){
//     chatContainer.scrollTop = chatContainer.clientHeight;
// }

const imgVetor = [
    './assets/img1.jpg',
    './assets/img2.jpg',
    './assets/img3.jpg',
    './assets/img4.jpg',
    './assets/img5.jpg',
    './assets/img6.jpg',
    './assets/img7.jpg',
    './assets/img8.jpg',
    './assets/img9.jpg',
    './assets/img10.jpg',
    './assets/img11.jpg',
    './assets/img12.jpg',
    './assets/img13.jpg',
    './assets/img14.jpg',]

function randomImg(){
    return imgVetor[Math.floor(Math.random() * imgVetor.length)];
}

userInput.addEventListener('keydown',(event)=>{
    if (event.key === 'Enter') {
        sendMessage();
        
    }
});

function sendMessage(){
    const message = userInput.value.trim();
    
    if(message == ''){
        return;
    }else if(message.toUpperCase() === 'DEVELOPER' || 
            message.toUpperCase() === 'DESENVOLVEDOR' ||
            message.toUpperCase() === 'CRIADOR')
    {
        userInput.value = '';
        appendMessage('user',message);
        setTimeout(()=>{
            appendMessage('bot','Essa versão do chatGPT foi criado por Felipe Gattelli Gauer.');
            btnIcon.classList.add('fa-regular', 'fa-paper-plane');
            btnIcon.classList.remove('fas', 'fa-spinner','fa-pulse');
            userInput.disabled = false;
            userInput.placeholder = "Escreva sua mensagem";
        }, 2000);
        return;
    }else if(message.toUpperCase() ==="QUEM E O AMOR DO FELPS"){
        userInput.value = '';
        appendMessage('user',message);
        setTimeout(()=>{
            appendMessage('bot','Paula Dias Toigo é o amor do Felipe Gauer, criador dessa versão do chatGPT.');
            btnIcon.classList.add('fa-regular', 'fa-paper-plane');
            btnIcon.classList.remove('fas', 'fa-spinner','fa-pulse');
            userInput.disabled = false;
            userInput.placeholder = "Escreva sua mensagem";
        }, 2000);
        return;
    }else if(message.toUpperCase()==="DOG" ||
            message.toUpperCase()==="CACHORRO"||
            message.toUpperCase()==="PUCA"){
        userInput.value = '';
        appendMessage('user',message);
        setTimeout(()=>{
            appendImg('bot',randomImg());
            btnIcon.classList.add('fa-regular', 'fa-paper-plane');
            btnIcon.classList.remove('fas', 'fa-spinner','fa-pulse');
            userInput.disabled = false;
            userInput.placeholder = "Escreva sua mensagem";
        },2000);
        
        return;
    }
    appendMessage('user', message);
    userInput.value = '';

    const options= {
        method: 'POST',
	    headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '014a009a07msh2fb2b359a9c586dp14536bjsn7ce9fede9198',
		'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
	    },
        body: `{"messages":[{"role":"user","content":"${message}"}]}`
    };


    fetch('https://chatgpt-42.p.rapidapi.com/gpt4', options)
    .then((response)=>response.json()).then((response)=>{
        console.log(response);
        appendMessage('bot',response.result);
        btnIcon.classList.add('fa-regular', 'fa-paper-plane');
        btnIcon.classList.remove('fas', 'fa-spinner','fa-pulse');
        userInput.disabled = false;
        userInput.placeholder = "Escreva sua mensagem";
    }).catch((err)=>{
        if (err.name === 'TypeError') {
            appendMessage('bot','ERRO! Verifique a chave de acesso da API');
            btnIcon.classList.add('fa-regular', 'fa-paper-plane');
            btnIcon.classList.remove('fas', 'fa-spinner','fa-pulse');
            userInput.disabled = false;
            userInput.placeholder = "Escreva sua mensagem";
            
        }
    });
}

function appendMessage(sender, message){
    linkInsta.style.display = 'none';
    btnIcon.classList.add('fas', 'fa-spinner','fa-pulse');
    btnIcon.classList.remove('fa-regular', 'fa-paper-plane');
    userInput.disabled = true;
    userInput.placeholder = "Carregando...";

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    if (sender === 'user') {
        icon.classList.add('fa-regular','fa-user');
        iconElement.setAttribute('id','user-icon');
    }else{
        icon.classList.add('fa-solid','fa-robot');
        iconElement.setAttribute('id','bot-icon')
    }
    
    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;

    // setTimeout(rolaTopo,300);
}


function appendImg(sender, img){
    
    console.log(img);
    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');
    const imgElement = document.createElement('img');

    

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    imgElement.classList.add('chat-box-img')
    imgElement.src = img;

    if (sender === 'user') {
        icon.classList.add('fa-regular','fa-user');
        iconElement.setAttribute('id','user-icon');
    }else{
        icon.classList.add('fa-solid','fa-robot');
        iconElement.setAttribute('id','bot-icon')
    }

    iconElement.appendChild(icon);
    messageElement.appendChild(imgElement);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;

    // setTimeout(rolaTopo,300);
}