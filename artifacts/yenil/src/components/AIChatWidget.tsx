import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';
import { useSendChatMessage } from '@workspace/api-client-react';
import { useTranslation } from '@/lib/i18n';
import { useAnalytics } from '@/hooks/use-analytics';
import { ChatMessageRole } from '@workspace/api-client-react';

export function AIChatWidget() {
  const { t, locale } = useTranslation();
  const { trackEvent } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: ChatMessageRole, content: string}[]>([
    { role: ChatMessageRole.assistant, content: "Salam! 👋 Men Ýeňiliň akylly kömekçisidirin. Saýt döretmek, bahalar ýa-da hyzmatlarymyz barada islendik soralyňyza jogap berip bilerin!" }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutate, isPending } = useSendChatMessage();

  // Auto-trigger bubble
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowBubble(true);
    }, 15000); // Triggering after 15s instead of 30s for better visibility
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPending]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowBubble(false);
    trackEvent('ai_chat_opened', {}, true);
  };

  const handleSend = (text: string) => {
    if (!text.trim() || isPending) return;
    
    const userMsg = { role: ChatMessageRole.user, content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    trackEvent('ai_chat_message', { messageLength: text.length });

    mutate({ data: { messages: newMessages, locale } }, {
      onSuccess: (res: { role: string; message: string }) => {
        setMessages([...newMessages, { role: res.role as ChatMessageRole, content: res.message }]);
      },
      onError: () => {
        setMessages([...newMessages, { role: ChatMessageRole.assistant, content: "Bagyşlaň, tehniki näsazlyk ýüze çykdy. Biraz soňra synanşyň." }]);
      }
    });
  };

  const quickReplies = ["Bahalar barada", "Hyzmatlar barada", "Habarlaşmak"];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {showBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-4 bg-surface-2 border border-primary/30 rounded-2xl p-4 shadow-xl shadow-black/50 relative cursor-pointer group"
            onClick={handleOpen}
          >
            <p className="text-sm font-medium text-foreground pr-4">
              Kömek gerekmi? 🤔
              <br />
              <span className="text-xs text-muted">Islendik soralyňyza jogap berip bilerin!</span>
            </p>
            <button 
              className="absolute top-2 right-2 text-muted hover:text-foreground transition-colors"
              onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-surface-2 border-r border-b border-primary/30 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] max-h-[calc(100vh-6rem)] bg-surface border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-surface-2 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center relative">
                  <Bot className="w-5 h-5 text-primary-light" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface-2 rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Ýeňil AI Kömekçisi</h3>
                  <p className="text-xs text-muted">TK · RU · EN · UZ · TR — Online 🟢</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors text-muted hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === ChatMessageRole.user ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.role === ChatMessageRole.user 
                      ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                      : 'bg-surface-2 border border-border text-foreground rounded-tl-sm'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {isPending && (
                <div className="flex justify-start">
                  <div className="bg-surface-2 border border-border p-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-muted rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-muted rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-muted rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => handleSend(qr)}
                    className="px-3 py-1.5 bg-surface-2 border border-border rounded-full text-xs text-muted hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border bg-surface">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2 bg-surface-2 border border-border rounded-xl p-1 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/25 transition-all"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Soraň..."
                  className="flex-1 bg-transparent border-none text-sm px-3 py-2 focus:outline-none text-foreground placeholder:text-muted"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isPending}
                  className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleOpen}
        className={`w-16 h-16 rounded-full overflow-hidden shadow-xl shadow-black/60 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'hover:scale-110 hover:shadow-primary/30'
        }`}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/ai-bot-icon.png`}
          alt="AI Kömekçi"
          className="w-full h-full object-cover object-center scale-105"
        />
      </button>
    </div>
  );
}
