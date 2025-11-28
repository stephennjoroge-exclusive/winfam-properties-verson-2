import React, { useState, useRef, useEffect } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", from: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, from: "user" }]);
    setInput("");
    setTimeout(() => {
      // Simulate bot reply
      setMessages((prev) => [
        ...prev,
        { text: `You said: "${input}"`, from: "bot" },
      ]);
    }, 800);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-400 via-lime-300 to-green-300 p-4 text-white font-bold text-lg shadow-md">
        Chat with AI
      </div>

      {/* Chat history */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] p-2 rounded-lg ${
              msg.from === "user"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      {/* Input bar */}
      <div className="p-4 bg-white flex items-center shadow-inner">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
