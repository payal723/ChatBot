async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  addMessage(message, "user");
  input.value = "";

  // Send to backend
  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    addMessage(data.reply, "bot");
  } catch (error) {
    addMessage("⚠️ Failed to connect to AI", "bot");
  }
}

function addMessage(text, sender) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// ✅ Trigger sendMessage when Enter is pressed
document.getElementById("user-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // prevent new line
    sendMessage();
  }
});
