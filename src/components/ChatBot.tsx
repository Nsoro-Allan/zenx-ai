
import React, { useState, useRef, useEffect } from 'react';
import { Send, Settings, Bot, Paperclip } from 'lucide-react';
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
  const { messages, sendMessage, isLoading, hasApiKey } = useChat();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !hasApiKey) return;
    
    await sendMessage(input);
    setInput('');
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen text-white flex flex-col" style={{ backgroundColor: '#161618' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-gray-900" />
          </div>
          <h1 className="text-xl font-medium text-white">ZenxAI</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className="text-gray-400 hover:text-white hover:bg-gray-800/50"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          /* Welcome Screen - Grok Style */
          <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto w-full">
            {/* Logo and Title */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center">
                <Bot className="w-8 h-8 text-gray-900" />
              </div>
              <h1 className="text-5xl font-light text-white">ZenxAI</h1>
            </div>
            
            <p className="text-gray-400 text-lg mb-12">What do you want to know?</p>
            
            {!hasApiKey && (
              <div className="bg-orange-900/20 border border-orange-800 rounded-xl p-4 mb-8 max-w-md">
                <p className="text-orange-400 text-sm text-center">
                  Please add your OpenRouter API key in settings to start chatting
                </p>
              </div>
            )}

            {/* Large Input Field - Grok Style */}
            <div className="w-full max-w-3xl">
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative bg-gray-800/50 rounded-2xl border border-gray-700/50 focus-within:border-gray-600">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={hasApiKey ? "Ask me anything..." : "Add API key in settings first"}
                    disabled={isLoading || !hasApiKey}
                    className="bg-transparent border-0 text-white placeholder-gray-500 pl-6 pr-20 py-6 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 h-auto"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white h-10 w-10 p-0"
                    >
                      <Paperclip className="w-5 h-5" />
                    </Button>
                    <Button
                      type="submit"
                      disabled={!input.trim() || isLoading || !hasApiKey}
                      className="bg-gray-700 text-white hover:bg-gray-600 h-10 w-10 p-0 rounded-xl border-0"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Chat View */
          <>
            <ScrollArea className="flex-1 px-6 py-4" ref={scrollAreaRef}>
              <div className="space-y-6 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3 max-w-4xl mx-auto">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-gray-900" />
                    </div>
                    <div className="bg-gray-800/50 rounded-2xl px-6 py-4">
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
            <div className="border-t border-gray-700/50 p-6">
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="relative bg-gray-800/50 rounded-2xl border border-gray-700/50 focus-within:border-gray-600">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={hasApiKey ? "Ask me anything..." : "Add API key in settings first"}
                      disabled={isLoading || !hasApiKey}
                      className="bg-transparent border-0 text-white placeholder-gray-500 pl-6 pr-20 py-4 text-base focus-visible:ring-0 focus-visible:ring-offset-0 h-auto"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white h-8 w-8 p-0"
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button
                        type="submit"
                        disabled={!input.trim() || isLoading || !hasApiKey}
                        className="bg-gray-700 text-white hover:bg-gray-600 h-8 w-8 p-0 rounded-lg"
                      >
                        <Send className="w-4 h-4" />
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
