
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Plus, User, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import SettingsPanel from './SettingsPanel';
import { useChat } from '@/hooks/useChat';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading, hasApiKey, clearMessages } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !hasApiKey) return;
    
    await sendMessage(input);
    setInput('');
  };

  const handleNewChat = () => {
    clearMessages();
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ backgroundColor: '#161618' }}>
      {/* Top Navigation Bar - Simplified */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#161618' }}>
        <div className="flex items-center gap-3">
          {/* ZenxAI Logo with Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#161618', border: '1px solid #333' }}>
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">ZenxAI</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-white p-2"
            style={{ backgroundColor: 'transparent' }}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          /* Welcome Screen */
          <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto w-full">
            {/* Logo and Title */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#161618', border: '1px solid #333' }}>
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white">ZenxAI</h1>
            </div>
            
            {!hasApiKey && (
              <div className="rounded-xl p-4 mb-8 max-w-md" style={{ backgroundColor: '#161618', border: '1px solid #333' }}>
                <p className="text-orange-400 text-sm text-center">
                  Please add your OpenRouter API key in settings to start chatting
                </p>
              </div>
            )}

            {/* Large Input Field */}
            <div className="w-full max-w-4xl mb-8">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative rounded-2xl" style={{ backgroundColor: '#161618', border: '1px solid #333' }}>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What do you want to know?"
                    disabled={isLoading || !hasApiKey}
                    className="border-0 text-white placeholder-gray-400 pl-6 pr-16 py-6 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 h-auto rounded-2xl"
                    style={{ backgroundColor: 'transparent' }}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Button
                      type="submit"
                      disabled={!input.trim() || isLoading || !hasApiKey}
                      className="text-gray-900 h-10 w-10 p-0 rounded-xl"
                      style={{ backgroundColor: 'white' }}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            {/* Feature Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button
                variant="outline"
                className="text-gray-300 px-6 py-3 rounded-xl border"
                style={{ backgroundColor: '#161618', borderColor: '#333' }}
              >
                <Bot className="w-4 h-4 mr-2" />
                Ask AI
              </Button>
            </div>
          </div>
        ) : (
          /* Chat View */
          <>
            {/* Chat Header with New Chat Button */}
            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#333' }}>
              <h2 className="text-lg font-medium text-white">Chat</h2>
              <Button
                onClick={handleNewChat}
                className="text-white px-4 py-2 rounded-xl flex items-center gap-2"
                style={{ backgroundColor: '#161618', border: '1px solid #333' }}
              >
                <Plus className="w-4 h-4" />
                New Chat
              </Button>
            </div>

            <ScrollArea className="flex-1 px-6 py-4" ref={scrollAreaRef}>
              <div className="space-y-6 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3 max-w-4xl mx-auto">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#161618', border: '1px solid #333' }}>
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="rounded-2xl px-6 py-4" style={{ backgroundColor: '#161618', border: '1px solid #333' }}>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area - Chat View */}
            <div className="border-t p-6" style={{ borderColor: '#333' }}>
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative rounded-2xl" style={{ backgroundColor: '#161618', border: '1px solid #333' }}>
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="What do you want to know?"
                      disabled={isLoading || !hasApiKey}
                      className="border-0 text-white placeholder-gray-400 pl-6 pr-16 py-4 text-base focus-visible:ring-0 focus-visible:ring-offset-0 h-auto rounded-2xl"
                      style={{ backgroundColor: 'transparent' }}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Button
                        type="submit"
                        disabled={!input.trim() || isLoading || !hasApiKey}
                        className="text-gray-900 h-8 w-8 p-0 rounded-lg"
                        style={{ backgroundColor: 'white' }}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
