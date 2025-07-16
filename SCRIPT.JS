const colors = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#795548'];
const isOwner = new URLSearchParams(window.location.search).get('owner') === 'true';

// Load messages on page load
window.onload = () => {
  const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
  savedMessages.forEach(msg => {
    createMessageElement(msg.id, msg.text, msg.color, msg.name);
  });
};

function getInput() {
  const inputEl = document.getElementById("userInput");
  const nameEl = document.getElementById("nameInput");

  const input = inputEl.value.trim();
  const name = nameEl.value.trim() || "Anonymous";
  if (!input) return;

  const id = Date.now();
  const color = colors[Math.floor(Math.random() * colors.length)];

  const newMsg = { id, text: input, color, name };

  saveMessage(newMsg);
  createMessageElement(id, input, color, name);

  inputEl.value = "";
}

function createMessageElement(id, text, color, name) {
  const container = document.getElementById("outputContainer");

  const message = document.createElement("div");
  message.className = "output-message";
  message.style.backgroundColor = color;
  message.setAttribute("data-id", id);

  const nameTag = document.createElement("div");
  nameTag.className = "name-tag";
  nameTag.innerText = name;

  const textEl = document.createElement("div");
  textEl.className = "text-body";
  textEl.innerText = text;

  message.appendChild(nameTag);
  message.appendChild(textEl);

  if (isOwner) {
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "✕";
    deleteBtn.onclick = () => deleteMessage(id);
    message.appendChild(deleteBtn);
  }

  container.appendChild(message);

}

function saveMessage(newMsg) {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push(newMsg);
  localStorage.setItem("messages", JSON.stringify(messages));
}

function deleteMessage(id) {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  const updated = messages.filter(msg => msg.id !== id);
  localStorage.setItem("messages", JSON.stringify(updated));

  const msgDiv = document.querySelector(`.output-message[data-id='${id}']`);
  if (msgDiv) msgDiv.remove();
}
