import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";
import { Terminal, Send, MessageSquare, Sparkles, X, Minimize2, Trash2 } from "lucide-react";

interface AICompanionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AICompanion({ isOpen, onClose }: AICompanionProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "seed-greeting",
      role: "assistant",
      content: "Welcome, developer. ⚡ I am J.R. Olaño's customized AI representative. Ask me regarding her CS bachelor roadmap, model optimization configurations (MobileNetV3 / EfficientNet-B0), or active projects.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userInput,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setUserInput("");

    try {
      const contextMsgs = [...messages, userMsg].slice(-8).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: contextMsgs }),
      });

      if (!res.ok) {
        throw new Error("Failed to receive feedback from J.R.'s AI backend cluster.");
      }

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "I apologies, but my connection gateway experienced an issue. Please ensure GEMINI_API_KEY is configured correctly under Secrets.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `seed-greeting-${Date.now()}`,
        role: "assistant",
        content: "Console logs flushed. Interactive connection is active. What other inquiries can I answer?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="ai-companion-drawer"
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 50 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-[400px] h-[550px] flex flex-col bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden shadow-2xl"
        >
          {/* Header Banner - High-contrast Orange Banner to match Bold Typography theme */}
          <div className="bg-zinc-900 px-4 py-4.5 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-none bg-brand-orange flex items-center justify-center text-black font-black">
                <Terminal className="w-4 h-4 text-black" />
              </div>
              <div className="text-left">
                <h4 className="font-display font-black uppercase text-xs text-white tracking-widest">
                  COGNITIVE ASSISTANT
                </h4>
                <p className="text-[9px] font-mono text-zinc-500 uppercase font-bold tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse inline-block" />
                  ONLINE &bull; SYS_STABLE
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              <button
                id="btn-flush-console"
                onClick={handleClearChat}
                title="Flush Telemetry"
                className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:text-brand-orange text-zinc-400 transition-colors rounded-none"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                id="btn-close-companion"
                onClick={onClose}
                className="p-1.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:text-red-500 text-zinc-400 transition-colors rounded-none"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick suggestions rail */}
          <div className="bg-zinc-905 px-4 py-2 border-b border-zinc-850 flex gap-1.5 overflow-x-auto select-none no-scrollbar">
            {[
              "Check Core Skills",
              "Vision Experience",
              "View Projects Summary",
              "Graduation Roadmap"
            ].map((suggest) => (
              <button
                id={`suggest-btn-${suggest.toLowerCase().replace(/\s+/g, "-")}`}
                key={suggest}
                onClick={() => setUserInput(suggest)}
                className="text-[9px] uppercase whitespace-nowrap font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-brand-orange px-2.5 py-1 rounded-none transition-all"
              >
                {suggest}
              </button>
            ))}
          </div>

          {/* Messages window scroll area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-950">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  id={`chat-msg-${message.id}`}
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2.5`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brand-orange text-[10px] font-black">
                      ⚡
                    </div>
                  )}
                  <div className="max-w-[85%] flex flex-col space-y-1">
                    <div
                      className={`p-3.5 rounded-sm text-xs leading-relaxed text-left ${
                        isUser
                          ? "bg-brand-orange text-black font-medium"
                          : "bg-zinc-900 text-zinc-200 border border-zinc-850"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <span className={`text-[9px] font-mono text-zinc-500 ${isUser ? "text-right" : "text-left"}`}>
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Loading typing state */}
            {isLoading && (
              <div id="ai-typing-placeholder" className="flex justify-start items-center gap-2.5">
                <div className="w-6 h-6 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brand-orange text-[10px] font-black">
                  ⚡
                </div>
                <div className="bg-zinc-900 border border-zinc-850 px-4 py-3 rounded-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input field Footer */}
          <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900 border-t border-zinc-850 flex gap-2">
            <input
              id="chat-input-field"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Query parameters..."
              disabled={isLoading}
              className="flex-1 text-xs bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-none text-white font-mono focus:outline-none focus:border-brand-orange disabled:opacity-50"
            />
            <button
              id="btn-chat-send"
              type="submit"
              disabled={!userInput.trim() || isLoading}
              className="p-3 bg-brand-orange hover:bg-orange-500 disabled:bg-zinc-900 text-black font-black disabled:text-zinc-500 rounded-none transition-all shrink-0"
            >
              <Send className="w-4 h-4 stroke-[3px]" />
            </button>
          </form>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
