"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
    Menu,
    Plus,
    Search,
    Image as ImageIcon,
    FolderHeart,
    NotebookPen,
    Settings,
    Sparkles,
    ChevronDown,
    Mic,
    ArrowUpRight,
    History,
    X
} from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

export default function GeminiClonePremium() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [busy, setBusy] = useState(false);
    const [streamText, setStreamText] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);

    // Sidebar State for desktop shrink and mobile toggle
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);

    const handleReset = () => {
        setMessages([]);
        setInput('');
        setBusy(false);
        setStreamText('');
        setShowWelcome(true);
    };

    const scrollToBottom = () => {
        if (bottomRef.current) {
            window.requestAnimationFrame(() => {
                bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamText, busy, showWelcome]);

    const typewrite = (text: string, done: () => void) => {
        let i = 0;
        setStreamText('');
        const iv = setInterval(() => {
            if (i < text.length) {
                setStreamText(text.slice(0, ++i));
            } else {
                clearInterval(iv);
                setStreamText('');
                done();
            }
        }, 15);
    };

    const send = async (preset?: string) => {
        const txt = preset ?? input.trim();
        if (!txt || busy) return;

        setInput('');
        setShowWelcome(false);
        setBusy(true);

        const newHistory: Message[] = [...messages, { role: 'user', content: txt }];
        setMessages(newHistory);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newHistory }),
            });
            const data = await res.json();
            const reply = data.reply ?? 'Something went wrong.';

            setBusy(false);
            typewrite(reply, () => {
                setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
            });
        } catch {
            setBusy(false);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
        }
    };

    const chips = [
        'How do I book a doctor?',
        'When do I need to pay?',
        'How do I create an account?',
        'What is your privacy policy?',
    ];

    return (
        <div className="flex h-screen w-full bg-[#0e0e11] text-[#e3e3e3] font-sans antialiased overflow-hidden relative">

            {/* Overlay for Mobile Sidebar */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Main Sidebar Component */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 md:static flex flex-col justify-between p-3 
        bg-[#131314] border-r border-[#1e1f20]/30 select-none transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'w-[280px]' : 'md:w-[70px]'}
        ${isMobileOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full md:translate-x-0'}
      `}>
                <div className="flex flex-col gap-6 overflow-y-auto no-scrollbar flex-1">

                    {/* Sidebar Top Header controls */}
                    <div className={`flex items-center ${isSidebarOpen ? 'justify-between px-2' : 'justify-center'} pt-1`}>
                        {isSidebarOpen && (
                            <span className="text-sm font-semibold tracking-wider text-[#80868b] animate-fade-in">MENU</span>
                        )}
                        <button
                            onClick={() => {
                                setIsSidebarOpen(!isSidebarOpen);
                                setIsMobileOpen(false);
                            }}
                            className="p-2 hover:bg-[#1e1f20] rounded-full transition-colors hidden md:block text-[#c4c7c5] hover:text-white"
                        >
                            <Menu size={20} />
                        </button>
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="p-2 hover:bg-[#1e1f20] rounded-full transition-colors md:hidden text-[#c4c7c5]"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* New Chat Button */}
                    <div className={`flex ${isSidebarOpen ? 'px-1' : 'justify-center'}`}>
                        <button
                            onClick={handleReset}
                            className={`flex items-center gap-3 bg-[#1a1a1c] hover:bg-[#222224] text-[#c4c7c5] hover:text-white border border-[#2f3032]/20 rounded-full transition-all duration-200 shadow-sm
                ${isSidebarOpen ? 'px-4 py-3 w-full' : 'p-3'}
              `}
                            title="New Chat"
                        >
                            <Plus size={18} className="text-orange-400" />
                            {isSidebarOpen && <span className="text-sm font-medium">New chat</span>}
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex flex-col gap-0.5 text-sm text-[#c4c7c5]">
                        <button className={`flex items-center gap-3 hover:bg-[#1e1f20] hover:text-white rounded-full transition-colors w-full text-left ${isSidebarOpen ? 'px-4 py-2.5' : 'p-3 justify-center'}`}>
                            <Search size={18} />
                            {isSidebarOpen && <span>Search chats</span>}
                        </button>
                        <button className={`flex items-center gap-3 hover:bg-[#1e1f20] hover:text-white rounded-full transition-colors w-full text-left ${isSidebarOpen ? 'px-4 py-2.5' : 'p-3 justify-center'}`}>
                            <ImageIcon size={18} />
                            {isSidebarOpen && <span>Images</span>}
                        </button>
                        <button className={`flex items-center gap-3 hover:bg-[#1e1f20] hover:text-white rounded-full transition-colors w-full text-left ${isSidebarOpen ? 'px-4 py-2.5' : 'p-3 justify-center'}`}>
                            <FolderHeart size={18} />
                            {isSidebarOpen && <span>Library</span>}
                        </button>
                    </nav>

                    {/* Notebooks Sub-system */}
                    <div className="flex flex-col gap-1">
                        {isSidebarOpen ? (
                            <span className="text-xs font-semibold text-[#80868b] px-3 mb-1 uppercase tracking-wider">Notebooks</span>
                        ) : (
                            <div className="border-t border-[#1e1f20] my-1" />
                        )}
                        <button className={`flex items-center gap-3 hover:bg-[#1e1f20] rounded-lg text-sm text-[#c4c7c5] w-full text-left ${isSidebarOpen ? 'px-3 py-2' : 'p-3 justify-center'}`}>
                            <Plus size={16} />
                            {isSidebarOpen && <span>New notebook</span>}
                        </button>
                        <button className={`flex items-center gap-3 hover:bg-[#1e1f20] rounded-lg text-sm text-[#c4c7c5] w-full text-left ${isSidebarOpen ? 'px-3 py-2' : 'p-3 justify-center'}`}>
                            <NotebookPen size={16} />
                            {isSidebarOpen && <span>Untitled notebook</span>}
                        </button>
                    </div>

                    {/* Recents Area with Required Custom Safe-fallback */}
                    <div className="flex flex-col gap-0.5">
                        {isSidebarOpen ? (
                            <span className="text-xs font-semibold text-[#80868b] px-3 mb-2 uppercase tracking-wider">Recents</span>
                        ) : (
                            <div className="border-t border-[#1e1f20] my-1" />
                        )}

                        {isSidebarOpen ? (
                            <div className="mx-3 my-2 p-4 rounded-xl bg-[#1a1a1c]/50 border border-[#2f3032]/10 text-center flex flex-col items-center justify-center gap-2">
                                <History size={16} className="text-[#80868b]" />
                                <span className="text-xs text-[#80868b]">No history found</span>
                            </div>
                        ) : (
                            <div className="flex justify-center text-[#80868b] py-2" title="No history found">
                                <History size={16} />
                            </div>
                        )}
                    </div>

                </div>

                {/* Action Footers Container */}
                <div className="flex flex-col gap-2 pt-2 border-t border-[#1e1f20] w-full">
                    <div className={`flex items-center justify-between ${isSidebarOpen ? 'px-2' : 'justify-center'}`}>
                        <div className={`flex items-center gap-3 cursor-pointer hover:bg-[#1e1f20] rounded-full transition-colors flex-1 ${isSidebarOpen ? 'p-1.5' : 'p-1 justify-center'}`}>
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-600 flex items-center justify-center text-xs font-bold text-white shadow-inner flex-shrink-0">
                                R
                            </div>
                            {isSidebarOpen && (
                                <span className="text-sm text-[#e3e3e3] font-medium truncate">Rafsun</span>
                            )}
                        </div>
                        {isSidebarOpen && (
                            <button className="p-2 hover:bg-[#1e1f20] rounded-full transition-colors text-[#c4c7c5] hover:text-white">
                                <Settings size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Container Layer */}
            <main className="flex-1 flex flex-col justify-between relative bg-gradient-to-b from-[#0e0e11] via-[#0e0e11] to-[#121216] overflow-hidden">

                {/* Navigation Layer Header */}
                <header className="flex items-center justify-between px-4 md:px-6 py-4 z-10 bg-[#0e0e11]/30 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        {/* Sidebar toggle for mobile or layout-collapsed modes */}
                        {(!isSidebarOpen || isMobileOpen) && (
                            <button
                                onClick={() => {
                                    if (window.innerWidth < 768) {
                                        setIsMobileOpen(true);
                                    } else {
                                        setIsSidebarOpen(true);
                                    }
                                }}
                                className="p-2 hover:bg-[#1e1f20] rounded-full transition-colors text-[#c4c7c5]"
                            >
                                <Menu size={20} />
                            </button>
                        )}
                        <div className="flex items-center gap-1.5 cursor-pointer select-none">
                            <span className="text-xl font-medium tracking-tight text-white flex items-center gap-1">
                                Gemini
                                <span className="text-[#80868b] text-[10px] ml-1">▼</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white px-4 py-2 rounded-full text-xs md:text-sm font-medium shadow-lg transition-all border border-blue-500/20">
                            <Sparkles size={14} className="text-amber-400" />
                            <span>Upgrade</span>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-[#1e1f20] flex items-center justify-center cursor-pointer hover:bg-[#2a2b2d] transition-colors border border-[#2f3032]/30">
                            <ArrowUpRight size={16} className="text-[#c4c7c5]" />
                        </div>
                    </div>
                </header>

                {/* Core Screen Log Flow */}
                <div className="flex-1 flex flex-col items-center justify-between overflow-y-auto w-full max-w-3xl mx-auto no-scrollbar px-4 relative">

                    {showWelcome ? (
                        /* Splash Element Box */
                        <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full py-12">
                            <h1 className="text-3xl md:text-5xl font-normal text-[#e3e3e3] tracking-tight text-center select-none bg-gradient-to-r from-white via-[#e3e3e3] to-[#80868b] bg-clip-text text-transparent">
                                Any new ideas to explore?
                            </h1>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl px-2">
                                {chips.map((c, i) => (
                                    <button
                                        key={i}
                                        onClick={() => send(c)}
                                        className="p-4 rounded-2xl border border-[#2f3032]/40 bg-[#131314]/60 text-left text-sm text-[#c4c7c5] hover:bg-[#1a1a1c] hover:border-[#3c3d3f] transition-all hover:text-white flex justify-between items-center group shadow-md"
                                    >
                                        <span className="line-clamp-2 pr-2">{c}</span>
                                        <span className="p-1 rounded-full bg-[#1e1f20] opacity-0 group-hover:opacity-100 transition-opacity text-orange-400">
                                            <ArrowUpRight size={14} />
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Complete Stream Output Flow */
                        <div className="w-full flex flex-col gap-6 py-6 pb-36">
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] text-sm px-4 py-3 rounded-2xl leading-relaxed shadow-sm ${m.role === 'user'
                                        ? 'bg-[#1e1f20] text-white rounded-br-none border border-[#2f3032]/30'
                                        : 'text-[#e3e3e3] rounded-bl-none bg-transparent'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}

                            {/* Loader Render Component */}
                            {busy && (
                                <div className="flex justify-start w-full">
                                    <div className="flex gap-1.5 items-center bg-[#131314]/40 px-4 py-3 rounded-2xl rounded-tl-none border border-[#2f3032]/20">
                                        {[0, 1, 2].map(i => (
                                            <span
                                                key={i}
                                                className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce"
                                                style={{ animationDelay: `${i * 0.2}s` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Live Streaming Render Layer */}
                            {streamText && (
                                <div className="flex justify-start w-full">
                                    <div className="max-w-[85%] text-sm text-[#e3e3e3] px-4 py-3 rounded-2xl rounded-tl-none leading-relaxed">
                                        {streamText}
                                        <span className="inline-block w-1.5 h-4 bg-orange-400 ml-1 align-middle animate-pulse" />
                                    </div>
                                </div>
                            )}

                            <div ref={bottomRef} className="h-2 w-full clear-both" />
                        </div>
                    )}

                </div>

                {/* Input Absolute Bottom Frame Layout */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#121216] via-[#121216]/95 to-transparent pt-12 pb-6 px-4 z-20">
                    <div className="max-w-3xl mx-auto w-full">

                        <div className="relative flex items-center bg-[#1e1f20] rounded-full px-4 md:px-5 py-3.5 border border-[#2f3032]/50 focus-within:border-[#424345] shadow-2xl transition-all">

                            <button className="text-[#c4c7c5] hover:text-white transition-colors mr-3 flex-shrink-0">
                                <Plus size={20} />
                            </button>

                            <input
                                type="text"
                                placeholder="Ask Gemini"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && send()}
                                className="flex-1 bg-transparent border-none outline-none text-[#e3e3e3] placeholder-[#80868b] text-base"
                                disabled={busy}
                            />

                            <div className="flex items-center gap-2 md:gap-3 ml-2 flex-shrink-0">
                                <button className="flex items-center gap-1 text-xs font-medium text-[#c4c7c5] bg-[#131314] px-3 py-1.5 rounded-full hover:bg-[#28292a] transition-colors border border-[#2f3032]/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                    <span>Flash</span>
                                    <ChevronDown size={12} />
                                </button>

                                <button className="text-[#c4c7c5] hover:text-white transition-colors p-1">
                                    <Mic size={19} />
                                </button>
                            </div>

                        </div>

                        <div className="text-center text-[11px] text-[#80868b] mt-3 select-none">
                            Gemini may display inaccurate info, so double-check its responses.
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}