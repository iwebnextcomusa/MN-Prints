import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User, CornerDownLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      sender: "bot",
      text: "Hello! Welcome to MN Prints. I am your Virtual Apparel Assistant. How can I help you with custom screen printing, embroidery, or bulk apparel quotes today?",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat history to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userText = inputMessage.trim();
    setInputMessage("");

    // Append user message
    const userMsg: ChatMessage = {
      id: "msg-" + Math.random().toString(36).substring(2, 9),
      sender: "user",
      text: userText,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Securely fetch response from our Express API proxy
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-10), // pass recent context to support conversation flow
        }),
      });

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: "msg-" + Math.random().toString(36).substring(2, 9),
        sender: "bot",
        text: data.text || "I am processing your request. Please call 612-286-3469 to speak to our production team directly.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errMsg: ChatMessage = {
        id: "msg-err-" + Math.random().toString(36).substring(2, 9),
        sender: "bot",
        text: "I experienced a connection issue, but the MN Prints team is ready! Email harmony.fundsfi@gmail.com or call 612-286-3469.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="ai-chatbot-wrapper" className="fixed bottom-6 right-6 z-[60] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-[90vw] sm:w-[380px] h-[450px] max-h-[calc(100vh-140px)] flex flex-col mb-4"
          >
            {/* Header */}
            <div className="bg-[#0A2342] text-white p-4 flex items-center justify-between border-b border-[#1E5EFF]/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1E5EFF] rounded-lg">
                  <Bot className="w-5 h-5 text-white animate-bounce" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm tracking-tight text-white">
                    MN Prints Assistant
                  </h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                    <span>AI Online • Secure</span>
                  </p>
                </div>
              </div>
              <button
                id="close-chat-btn"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4 text-gray-300 hover:text-white" />
              </button>
            </div>

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isBot ? "" : "flex-row-reverse"}`}
                  >
                    <div
                      className={`p-1.5 rounded-lg shrink-0 ${
                        isBot ? "bg-[#0A2342] text-white" : "bg-[#1E5EFF] text-white"
                      }`}
                    >
                      {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div
                      className={`max-w-[75%] p-3.5 rounded-2xl text-xs sm:text-sm shadow-sm ${
                        isBot
                          ? "bg-white text-gray-800 rounded-tl-none border border-gray-200/80 leading-relaxed"
                          : "bg-[#1E5EFF] text-white rounded-tr-none leading-relaxed"
                      }`}
                    >
                      {/* Formatted Text rendering helper */}
                      <p className="whitespace-pre-wrap font-sans">
                        {msg.text.split("**").map((part, i) =>
                          i % 2 === 1 ? <strong key={i} className="font-bold underline">{part}</strong> : part
                        )}
                      </p>
                      <span className="block text-[9px] text-gray-400 mt-1 text-right">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 bg-[#0A2342] text-white rounded-lg shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-gray-200 text-gray-600 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#1E5EFF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[#1E5EFF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-[#1E5EFF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
              <input
                type="text"
                id="chatbot-input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about pricing, screen prints, embroidery..."
                className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#1E5EFF] focus:bg-white transition-all text-gray-800"
                disabled={isTyping}
              />
              <button
                type="submit"
                id="chatbot-submit"
                className="p-2.5 bg-[#1E5EFF] hover:bg-[#FF7A00] text-white rounded-xl transition-all shadow-md shadow-[#1E5EFF]/10 disabled:opacity-50 cursor-pointer flex items-center justify-center shrink-0"
                disabled={!inputMessage.trim() || isTyping}
                aria-label="Send Message"
              >
                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        id="chatbot-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#1E5EFF] hover:bg-[#FF7A00] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#1E5EFF]/30 cursor-pointer relative group border-2 border-white/20 transition-all z-50"
        aria-label="Toggle AI Support Assistant"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#FF7A00]"></span>
        </span>
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
