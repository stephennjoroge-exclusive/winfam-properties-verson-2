import React, { useState } from "react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-5 right-5 flex flex-col items-end">
        <div className="relative">
          <button
            onClick={() => setOpen(prev => !prev)}
            className="group bg-gradient-to-r from-teal-400 via-lime-300 to-green-300 
                       shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] 
                       rounded-full w-14 h-14 flex items-center justify-center cursor-pointer
                       hover:scale-110 transition-transform duration-200"
          >
            🤖
          </button>
          {/* Tooltip */}
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 
                          bg-black text-white text-xs px-2 py-1 rounded opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
            Chat with AI
          </div>
        </div>

        {/* Chat Window */}
        {open && (
          <div className="mt-3 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg 
                          flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-400 via-lime-300 to-green-300 p-3 flex justify-between items-center">
              <h2 className="text-white font-semibold">AI Assistant</h2>
              <button onClick={() => setOpen(false)} className="text-white text-lg font-bold">
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-sm">
                Hello! I’m your AI assistant. Ask me anything!
              </div>
              {/* Example user message */}
              <div className="bg-blue-100 dark:bg-blue-600 rounded-lg p-2 text-sm self-end">
                Hi ChatBot!
              </div>
            </div>

            {/* Input */}
            <div className="p-2 border-t border-gray-200 dark:border-gray-700 flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 dark:bg-gray-700"
              />
              <button className="ml-2 bg-teal-400 dark:bg-lime-300 text-white px-3 py-1 rounded-full text-sm hover:brightness-110 transition">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatBot;
