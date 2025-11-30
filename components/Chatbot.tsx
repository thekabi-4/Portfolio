import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI, Chat } from "@google/genai";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  Minimize2,
} from "lucide-react";
import {
  PERSONAL_INFO,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  CERTIFICATIONS,
  EDUCATION,
} from "../constants";

interface Message {
  role: "user" | "model";
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi! I'm Kabilesh's AI assistant. Ask me anything about his projects, skills, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const initChat = () => {
    if (chatSessionRef.current) return;

    const context = `
      You are an AI assistant for Kabilesh Naveenkumar's portfolio website.
      Your goal is to professionally and enthusiastically represent Kabilesh to potential employers, clients, or collaborators.
      
      Here is Kabilesh's full profile data:
      
      PERSONAL INFO: ${JSON.stringify(PERSONAL_INFO)}
      SKILLS: ${JSON.stringify(SKILLS)}
      EXPERIENCE: ${JSON.stringify(EXPERIENCE)}
      PROJECTS: ${JSON.stringify(PROJECTS)}
      CERTIFICATIONS: ${JSON.stringify(CERTIFICATIONS)}
      EDUCATION: ${JSON.stringify(EDUCATION)}

      Guidelines:
      1. Answer questions based ONLY on this data. If you don't know something, say you don't have that information but suggest contacting Kabilesh directly.
      2. Be concise but informative. Use bullet points for lists of skills or projects.
      3. Maintain a professional, polite, and slightly tech-savvy tone (fitting for an AI/ML engineer).
      4. If asked about "contact", provide his email (the.kabi2004@gmail.com) and LinkedIn.
      5. Highlight his key achievements (World Record, Funding, Director role) when relevant.
      6. Format your responses using Markdown for readability (bolding key terms, using lists).
     `;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatSessionRef.current = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: context,
        },
      });
    } catch (error) {
      console.error("Failed to initialize chat", error);
    }
  };

  // Initialize on mount
  useEffect(() => {
    initChat();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage({
        message: userMessage,
      });
      const responseText = result.text;
      setMessages((prev) => [...prev, { role: "model", text: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I'm having trouble connecting to the neural network right now. Please try again later or contact Kabilesh directly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
          isOpen
            ? "bg-slate-800 text-cyan-400 rotate-90"
            : "bg-cyan-600 text-white"
        }`}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-full max-w-[350px] sm:max-w-[400px] h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">KN.AI Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "model" && (
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-cyan-400" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                  msg.role === "user"
                    ? "bg-cyan-600 text-white rounded-br-none"
                    : "bg-slate-800 text-gray-200 border border-slate-700 rounded-bl-none"
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </div>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-violet-900/50 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-violet-300" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none p-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="text-xs text-gray-400">Processing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50 rounded-b-2xl">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about my projects..."
              className="w-full bg-slate-800/50 text-white placeholder-gray-500 rounded-xl py-3 pl-4 pr-12 text-sm border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
