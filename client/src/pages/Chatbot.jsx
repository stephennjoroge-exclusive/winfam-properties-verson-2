import React from 'react'
import {useState, useEffect, useRef} from 'react'

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you today?", from: "bot" },
    ])
    const [input, setInput] = useState('')
    const chatEndRef = useRef(null)

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, {text: input, from: 'user'}]);
        setInput('')
        setTimeout(() =>{
            setMessages((prev) => [...prev, {text: `You said" ${input}"`, from: 'bot'}])
        },800)
    }

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({behavior: 'smooth'})
    },[messages])


  return (
    <div className='flex flex-col'>
        <header className='flex items-center justify-center w-full bg-gradient-to-r  from-sky-400 via-lime-300 to-teal-300 text-white h-[50px] '>
            <p className='font-bold font-mono text-2xl'>Chat with AI</p>
        </header>

        <div className='flex flex-1 flex-col justify-between'>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((msg, id) => (
                <div
                    key={id}
                    className={`max-w-[50%] text-start p-2 rounded-lg ${
                    msg.from === "user"
                        ? "bg-blue-200 text-black ml-auto"
                        : "bg-gray-200 text-gray-800"
                    }`}
                >
                    {msg.text}
                </div>
                ))}
                <div ref={chatEndRef}></div>
            </div>

            <div className="p-4 w-[70%] mx-auto bg-white rounded-2xl flex items-center justify-center sticky bottom-0 shadow-inner">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                <button onClick={sendMessage}
                className="ml-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full">
                Send
                </button>
            </div>

        </div>
      
    </div>
  )
}

export default Chatbot
