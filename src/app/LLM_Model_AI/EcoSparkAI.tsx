/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Modal from '@/components/ui/modal';
import { Message } from '@/interface/eco_ai.interface';
import { useEffect, useRef, useState } from 'react';

const MountainIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
);

export default function EcoSparkAI({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) {

    const [messages, setMessages] = useState<Message[]>([
        { id: "1", sender: "ai", text: "Hello! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            sender: "user",
            text: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsThinking(true);

        setTimeout(() => {
            setIsThinking(false);
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: "ai",
                text: "This is a demo response from Eco Spark Hub AI with a smooth typing experience.",
            };
            setMessages((prev) => [...prev, aiMessage]);
        }, 2000);
    };

    const handleRestartChat = () => {
        setMessages([
            { id: Date.now().toString(), sender: "ai", text: "Hello! How can I help you today?" }
        ]);
        setInput("");
        setIsThinking(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Eco Spark AI"
            animation="bounce"
            size="lg">

            <div className="flex flex-col h-150 w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 rounded-xl">
                            <MountainIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="font-semibold text-slate-800 dark:text-zinc-200 text-lg leading-tight">
                                Eco Spark Hub AI
                            </h2>
                            <p className="text-xs text-indigo-500 font-medium">Online</p>
                        </div>
                    </div>

                    {/* New Chat / Restart Option */}
                    <button
                        type="button"
                        onClick={handleRestartChat}
                        className="flex items-center cursor-pointer gap-1.5 px-3 py-1.5 text-xs font-medium bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all duration-200 shadow-sm shadow-indigo-100 dark:shadow-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                            <path d="M16 3h5v5" />
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                            <path d="M8 21H3v-5" />
                        </svg>
                        New Chat
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-zinc-900/40">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed transition-all duration-300 ${msg.sender === "user"
                                    ? "bg-indigo-500 text-white rounded-tr-none shadow-sm shadow-indigo-100 dark:shadow-none"
                                    : "bg-white dark:bg-zinc-950 text-slate-700 dark:text-zinc-300 rounded-tl-none border border-slate-100 dark:border-zinc-800/80 shadow-sm"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {/* Thinking State with Blinking Animation */}
                    {isThinking && (
                        <div className="flex justify-start items-center gap-2">
                            <div className="bg-white dark:bg-zinc-950 border border-slate-100 dark:border-zinc-800/80 rounded-2xl p-3 shadow-sm flex items-center gap-2">
                                <MountainIcon className="w-5 h-5 text-indigo-500 animate-pulse" />
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-100"></span>
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-200"></span>
                                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce delay-300"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form
                    onSubmit={handleSend}
                    className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center gap-2"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask Eco Spark Hub..."
                        className="flex-1 px-4 py-3 border border-slate-200 dark:border-zinc-800 bg-transparent rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-700 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-500"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isThinking}
                        className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-100 dark:disabled:bg-zinc-900 text-white disabled:text-slate-400 dark:disabled:text-zinc-600 p-3 rounded-xl transition-all font-medium text-sm flex items-center justify-center cursor-pointer shadow-md shadow-indigo-100 dark:shadow-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            />
                        </svg>
                    </button>
                </form>
            </div>
        </Modal>
    );
}