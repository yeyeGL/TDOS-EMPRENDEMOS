import { useState } from 'react';
import { Send } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola quiero comprar un producto", sender: "cliente" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return; 

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "yo",
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center justify-between bg-green-600 p-4 text-white shadow-md">
        <h1 className="text-lg font-bold">Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`my-2 ${message.sender === 'yo' ? 'flex justify-end' : 'flex justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-xs ${message.sender === 'yo' ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex items-center p-2 border-t border-gray-300 bg-white shadow-md">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-green-500 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
        />
        <button type="submit" className="ml-2 p-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-500 transition duration-200">
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
