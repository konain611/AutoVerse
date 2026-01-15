import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Send, Bot, User, Sparkles, ArrowRight, BookOpen, Layers } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { RAGSetupPanel } from "@/components/rag/RAGSetupPanel";
import { queryRAG, getRAGState } from "@/lib/localRAG";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! I'm your Autoverse RAG assistant. First, set up the knowledge base on the left, then ask me anything about the scraped content!",
    sender: "bot",
    timestamp: new Date(),
  },
];

const LiveDemo = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRagReady, setIsRagReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll removed - user controls their own scroll position

  useEffect(() => {
    // Check if RAG is already set up
    const state = getRAGState();
    setIsRagReady(state.isInitialized && state.documentCount > 0);
  }, []);

  const getBotResponse = async (userMessage: string): Promise<string> => {
    try {
      const state = getRAGState();
      if (!state.isInitialized || state.documentCount === 0) {
        return "Please set up the knowledge base first by loading the embedding model and scraping a website URL.";
      }
      
      const answer = await queryRAG(userMessage);
      return answer;
    } catch (error) {
      console.error("RAG error:", error);
      return `Error: ${error instanceof Error ? error.message : "Something went wrong. Make sure Ollama is running."}`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    const answer = await getBotResponse(currentInput);
    
    const botResponse: Message = {
      id: messages.length + 2,
      text: answer,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRagReady = () => {
    setIsRagReady(true);
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: "Great! The knowledge base is ready. You can now ask me questions about the content I've learned!",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              {/* <span className="text-sm text-muted-foreground">100% Local RAG Demo</span> */}
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              <span className="gradient-text">Autoverse RAG Assistant</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Scrape any website, create embeddings in your browser, 
              and chat with your data using Google Gemini API!
            </p>
          </motion.div>

          {/* Main Layout */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Setup Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <RAGSetupPanel onReady={handleRagReady} />
            </motion.div>

            {/* Chat Interface */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="glass rounded-2xl overflow-hidden border border-border">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={logo} alt="AutoVerse" className="h-10 w-10 rounded-full bg-secondary p-1" />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${isRagReady ? 'bg-green-500' : 'bg-amber-500'} rounded-full border-2 border-background`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Local RAG Assistant</h3>
                      <p className="text-sm text-muted-foreground">
                        {isRagReady ? "Ready" : "Setup required • See panel"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="h-[450px] overflow-y-auto p-4 space-y-4 bg-secondary/30">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === "user" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-secondary border border-border"
                        }`}>
                          {message.sender === "user" ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className={`max-w-[80%] rounded-2xl p-4 ${
                          message.sender === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-md"
                            : "bg-card border border-border rounded-tl-md"
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-card border border-border rounded-2xl rounded-tl-md p-4">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={isRagReady ? "Ask about the scraped content..." : "Set up the knowledge base first..."}
                      className="flex-1 bg-secondary border-border"
                      disabled={!isRagReady}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                      disabled={!inputValue.trim() || isTyping || !isRagReady}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    {isRagReady 
                      ? "Ask questions about the content you've scraped!" 
                      : "Complete the setup on the left to start chatting"
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-border hover:bg-secondary group">
                <BookOpen className="mr-2 h-5 w-5" />
                See How It Works
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg px-8 py-6 group">
                <Layers className="mr-2 h-5 w-5" />
                Explore Features
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
          >
            {[
              { title: "Browser Embeddings", desc: "HuggingFace Transformers runs in your browser" },
              { title: "Gemini Powered", desc: "Google's Gemini API provides intelligent answers" },
              { title: "URL Scraping", desc: "Paste any URL to build your knowledge base" },
            ].map((feature, index) => (
              <div key={index} className="glass rounded-xl p-6 text-center hover-lift">
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LiveDemo;
