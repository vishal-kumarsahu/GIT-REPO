(async function startCamera() {
  const videoPreview = document.getElementById('video-preview');

  try {
    // Request access to camera video only (no audio)
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    // Set the video element's srcObject to the camera stream for live preview
    videoPreview.srcObject = stream;
  } catch (err) {
    console.error('Error accessing the camera: ', err);
    alert('Unable to access your camera. Please check permissions.');
  }
})();


document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatWindow = document.getElementById('chat-window');

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Display user message
    appendMessage(userMessage, 'user');

    chatInput.value = '';

    // Simulate AI reply after a short delay
    setTimeout(() => {
      const aiReply = generateAIReply(userMessage);
      appendMessage(aiReply, 'ai');
    }, 800);
  });

  function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'message-user' : 'message-ai');
    messageDiv.innerText = text;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll to bottom
  }

  // Simple dummy AI reply generator (you can replace with real logic or API call)
  function generateAIReply(userText) {
  const input = userText.toLowerCase().trim();

  // Exact instruction match
  if (input === 'hello' || input === 'hi'||input ==='hey' || input === 'is anyone there') {
    return 'Hello! What happended it seems like you not looking well and having some anxiety ?';
  }
  
  if (input === 'who are you?') {
    return 'I am your support and a way of conveying your pain and emotions.';
  }
  
  if (input.includes('help')) {
    return 'Sure! Please tell me what you need help with.';
  }

  if (input.includes('thank you')|| input.includes('thanks')||input.includes("thnks")||input.includes('thanks for being with me')) {
    return 'You are welcome! I am always here for you and to be the reason for your smile';
  }

   if (input.includes('sad')|| input.includes('depressed')||input.includes("anxiety")||input.includes('lonely')||input.includes('unhappy')) {
    return 'Don\'t worry, it\'s okay to feel this way something will get better tommorow. Remember, you are not alone and there are people who care about you.'; 
  }

   if (input.includes('good enough')|| input.includes('crying')||input.includes("why does this happend")||input.includes('overthinking')|| input.includes('feel like')){
    return 'Don\'t worry the world has a lot of offers to you. Just keep your head up and keep moving forward.'; 
  }
  if (input.includes('What you get ')|| input.includes(' Face')|| input.includes('i feel')||input.includes('know about')){
    return 'Yaa! It seems you are depressed, lonely, anxiety, and thinking over and over of bad things. But dont\'t worry I am here to help you please tell me what you feel an what you want to say you can share it with me.'; 
  }
  if (input.includes('.')){
    return 'Oohk Go on please tell me more about it am listening to you.'; 
  }
  if (input.includes('bye')||input.includes('see you')||input.includes('catch you later')||input.includes('talk to you later')){
    return 'GoodBye! Take care and remember, you are stronger than you think and you are never alone.'
  }
  if (input.includes('Why it happens')|| input.includes('only with me')){
    return 'Oh! I understand how you feel. Sometime life can be tough but remember, you are not alone. There are people who care about you and want to help you.'; 
  }
  if (input.includes('How can get over')|| input.includes('deal with it')||input.includes('can i do')){
    return 'Hmm! It\'s important to take care of yourself. Try to focus on the positive things in your life and rememeber you are not alone dear. Reach out to your friends, family.'; 
  }

  if (input.includes('What should i do ')|| input.includes('What can make me happy')|| input.includes('i dont know')){
    return 'Well ther are several way to get back to your happy place and mind. You can try meditation, excersice, spending time with loved onced, pursuing hobbies or readding books, being surrounded to nature feel the wind and sun'; 
  }
  else
  return "I'm not sure about that, but I'm learning!";
}
});

