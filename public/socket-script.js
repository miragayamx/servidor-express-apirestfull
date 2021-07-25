const socket = io();
//CHAT
const chatMessages = document.getElementById("chat-messages");
document.getElementById("chat-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const { email, message } = event.target;
  const chatMessage = {
    email: email.value,
    message: message.value,
  };
  socket.emit("setNewChatMessages", chatMessage);
});
socket.emit("getChatMessages");
socket.on("messages", (chatData) => {
  const html = chatData
    .map(
      (data) => `
        <div class="row">
            <div class="col">
                <p class="text-success fst-normal">
                    <span class="text-primary fw-bold">${data.email}</span>
                    <small class="fw-normal" style="color: #652A0E;">[${data.date}]</small>
                    : ${data.message}
                </p>
            </div>
        </div>
    `
    )
    .join("");
  chatMessages.innerHTML = html;
});
socket.on("chatInfo", (data) => {
  if (!!data.error) {
    return (chatMessages.innerHTML = ` 
      <div class="alert alert-danger" role="alert">
          ${data.error}
      </div>`);
  }
  chatMessages.innerHTML = ` 
      <div class="alert alert-info" role="alert">
          ${data.info}
      </div>`
});
