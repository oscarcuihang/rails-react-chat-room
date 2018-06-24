import createChannel from "./cable";

let callback; // declaring a variable that will hold a function later

const chat = createChannel("ChatroomChannel", {
  received({ message }) {
    if (callback) callback.call(null, message);
  }
});

function sendMessage(message) {
  chat.perform("send_message", { message });
}

function setCallback(fn) {
  callback = fn;
}

export { sendMessage, setCallback };
