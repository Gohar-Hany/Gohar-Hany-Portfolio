import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User, MapPin, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Gohar's AI assistant. I can help answer questions about his experience, projects, and availability for collaboration. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Send to Gohar's chatbot webhook
      const response = await fetch('https://n8n-n8n.vwe4kq.easypanel.host/webhook/Gohar-Chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          chatInput: inputMessage,
          user_id: 'portfolio_visitor_' + Date.now(),
          sessionId: 'portfolio_visitor_' + Date.now(),
          timestamp: new Date().toISOString()
        })
      });

      let botResponse = "Thanks for your message! I'm currently processing your request. You can also reach out directly via email for immediate assistance.";

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        try {
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();

            // Priority 1/2: Nested array or array with output
            if (Array.isArray(data)) {
              if (Array.isArray(data[0]) && Array.isArray(data[0][0]) && data[0][0][0]?.output) {
                botResponse = data[0][0][0].output;
              } else if (data[0]?.output) {
                botResponse = data[0].output;
              } else if (data[0]?.response) {
                botResponse = data[0].response;
              }
            }
            // Priority 3: Object with output
            else if (data?.output) {
              botResponse = data.output;
            }
            // Fallbacks
            else {
              botResponse = data.response || data.message || data.reply || data.text || JSON.stringify(data);
            }
          } else {
            botResponse = await response.text();
          }

          // Ensure we have a string response
          if (typeof botResponse !== 'string') {
            botResponse = String(botResponse);
          }
        } catch (parseError) {
          console.error('Response parsing error:', parseError);
          // Keep default response if parsing fails
        }
      } else {
        console.warn('Chatbot response not OK:', response.status, response.statusText);
      }

      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);

    } catch (error) {
      console.error('Error sending message:', error);
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm having trouble connecting right now, but I'd love to hear from you! Please send an email to goharhany9@gmail.com and I'll get back to you quickly.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setFormSubmitting(false);
      setContactForm({ name: '', email: '', subject: '', message: '' });
      alert('Thank you for your message! I\'ll get back to you soon.');
    }, 2000);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-36 relative bg-background overflow-hidden selection:bg-primary/30">
      {/* Immersive background glow */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] opacity-40 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] opacity-30 pointer-events-none mix-blend-screen" />

      <div className="max-w-[85rem] mx-auto px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className={`flex flex-col md:flex-row justify-between items-end mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary font-syne font-semibold tracking-widest uppercase text-sm">Dialogue</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-syne text-white leading-tight">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">Connect</span>
            </h2>
          </div>
          <p className="text-white/50 font-dmsans text-lg max-w-sm mt-6 md:mt-0 text-left md:text-right hidden sm:block">
            Ready to build something amazing together? Chat with my AI assistant or send me a direct message.
          </p>
        </div>


        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* Left side - 3D Robot and Contact Info */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>

            {/* 3D Robot Model */}
            <div className="relative w-full h-[400px] lg:h-[450px] rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,183,255,0.15)] bg-black/40 border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none"></div>
              <iframe
                src="https://my.spline.design/genkubgreetingrobot-mtRM3XSqB79SaWySckBPgOcq/"
                frameBorder="0"
                width="100%"
                height="100%"
                scrolling="no"
                loading="lazy"
                className="scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
                style={{ border: 'none' }}
                title="3D Greeting Robot"
                allow="autoplay"
              />

              {/* Floating indicators */}
              <div className="absolute top-6 right-6 w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_15px_rgba(0,255,150,0.8)] z-20" />
              <div className="absolute bottom-10 left-8 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(0,183,255,0.8)] z-20" style={{ animationDelay: '1s' }} />

              {/* Watermark cover */}
              <div className="absolute bottom-0 right-0 w-48 h-12 bg-black/90 blur-md z-20 pointer-events-none" />
            </div>

            {/* Contact Information Bento Box */}
            <div className="p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[100px] opacity-40 pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-8 h-full">
                <div className="space-y-6 flex-1">
                  <h3 className="text-2xl font-bold font-syne text-white">Direct Access</h3>

                  <div className="space-y-5 font-dmsans">
                    <a href="mailto:goharhany9@gmail.com" className="flex items-center space-x-4 group/item cursor-pointer w-fit">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover/item:bg-primary/20 group-hover/item:border-primary/50 group-hover/item:shadow-[0_0_15px_rgba(0,183,255,0.3)] transition-all duration-300">
                        <Mail size={18} className="text-white/60 group-hover/item:text-primary transition-colors" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-0.5">Email</p>
                        <p className="text-[15px] font-medium text-white/80 group-hover/item:text-primary transition-colors">
                          goharhany9@gmail.com
                        </p>
                      </div>
                    </a>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                        <MapPin size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 mb-0.5">Location</p>
                        <p className="text-[15px] font-medium text-white/80">Alexandria, Egypt</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-4 pl-0 sm:pl-8 sm:border-l border-t sm:border-t-0 border-white/10 pt-6 sm:pt-0 shrink-0">
                  <h4 className="sr-only">Social Profiles</h4>
                  <a
                    href="https://github.com/Gohar-Hany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 hover:border-primary/50 hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,183,255,0.4)] group/social"
                  >
                    <Github size={18} className="text-white/60 group-hover/social:text-white transition-colors" />
                  </a>
                  <a
                    href="https://linkedin.com/in/goharhany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] group/social"
                  >
                    <Linkedin size={18} className="text-white/60 group-hover/social:text-blue-400 transition-colors" />
                  </a>
                  <a
                    href="https://twitter.com/goharhany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/50 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] group/social"
                  >
                    <Twitter size={18} className="text-white/60 group-hover/social:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - AI Chat & Contact Form */}
          <div className={`space-y-8 flex flex-col h-full transition-all duration-1000 delay-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

            {/* Chat Interface Bento */}
            <div className="p-6 md:p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl h-[450px] lg:h-[480px] flex flex-col relative overflow-hidden group/chat">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-[80px] opacity-0 group-hover/chat:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              <div className="relative z-10 flex items-center space-x-4 mb-6 pb-6 border-b border-white/[0.05]">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-lg">
                    <Bot size={22} className="text-accent" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,150,0.8)]" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold font-syne text-white text-lg">AI Assistant</h3>
                  <p className="text-[13px] font-dmsans text-white/50">Ask me anything about Gohar</p>
                </div>
              </div>

              {/* Messages Container */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 custom-scroll relative z-10 scroll-smooth"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-end gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-1 ${message.isUser
                        ? 'bg-primary/20 border border-primary/30'
                        : 'bg-white/[0.05] border border-white/10'
                      }`}>
                      {message.isUser ? (
                        <User size={14} className="text-primary" />
                      ) : (
                        <Bot size={14} className="text-accent" />
                      )}
                    </div>

                    <div className={`max-w-[75%] p-4 rounded-2xl font-dmsans relative ${message.isUser
                        ? 'bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 text-white rounded-br-sm shadow-[0_5px_15px_rgba(0,183,255,0.05)]'
                        : 'bg-white/[0.03] border border-white/[0.08] text-white/80 rounded-bl-sm shadow-md'
                      }`}>
                      <div className="text-[14px] leading-relaxed prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:my-0">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ node, ...props }: any) => <p className="mb-2 last:mb-0 whitespace-pre-wrap" {...props} />,
                            a: ({ node, ...props }: any) => <a className="text-accent hover:underline decoration-accent/50 underline-offset-4" target="_blank" rel="noopener noreferrer" {...props} />,
                            strong: ({ node, ...props }: any) => <strong className="text-white font-bold" {...props} />
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      <p className={`text-[10px] font-bold mt-2 uppercase tracking-widest ${message.isUser ? 'text-primary/70' : 'text-white/30'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-end gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center flex-shrink-0 mb-1">
                      <Bot size={14} className="text-accent" />
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.08] p-4 rounded-2xl rounded-bl-sm flex items-center h-12">
                      <div className="flex space-x-1.5">
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} className="h-4" />
              </div>

              {/* Message input */}
              <div className="relative z-10 flex items-center space-x-3 mt-auto">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me something..."
                  className="flex-1 h-12 bg-black/40 border border-white/10 rounded-xl px-4 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 hover:bg-black/60 transition-all text-white font-dmsans placeholder:text-white/30"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  disabled={isTyping}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="h-12 w-12 rounded-xl bg-primary hover:bg-primary/80 text-white flex items-center justify-center border-none shadow-[0_0_20px_rgba(0,183,255,0.4)] hover:shadow-[0_0_30px_rgba(0,183,255,0.6)] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
                >
                  <Send size={18} className={isTyping || !inputMessage.trim() ? "translate-x-0" : "translate-x-0.5 -translate-y-0.5"} />
                </Button>
              </div>
            </div>

            {/* Direct Message Form Bento */}
            <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl relative overflow-hidden group/form">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-[80px] opacity-0 group-hover/form:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              <h3 className="text-xl font-bold font-syne text-white mb-6 relative z-10 flex items-center gap-3">
                <Mail size={20} className="text-primary" />
                Drop a Line
              </h3>

              <form onSubmit={handleContactFormSubmit} className="space-y-4 font-dmsans relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="h-12 bg-black/40 border border-white/10 rounded-xl px-4 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 hover:bg-black/60 transition-all text-white placeholder:text-white/30"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="h-12 bg-black/40 border border-white/10 rounded-xl px-4 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 hover:bg-black/60 transition-all text-white placeholder:text-white/30"
                  />
                </div>

                <Input
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                  className="h-12 bg-black/40 border border-white/10 rounded-xl px-4 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 hover:bg-black/60 transition-all text-white placeholder:text-white/30"
                />

                <Textarea
                  placeholder="Tell me about your project..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-black/40 border border-white/10 rounded-2xl p-4 focus:ring-1 focus:ring-primary/50 focus:border-primary/50 hover:bg-black/60 transition-all text-white placeholder:text-white/30 resize-none custom-scroll"
                />

                <Button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-accent to-emerald-400 hover:from-emerald-400 hover:to-accent text-black font-bold font-syne uppercase tracking-wider text-sm rounded-xl shadow-[0_0_20px_rgba(0,255,170,0.3)] hover:shadow-[0_0_30px_rgba(0,255,170,0.5)] border-none transition-all duration-500 hover:scale-[1.02]"
                >
                  {formSubmitting ? 'Sending Transmission...' : 'Launch Message'}
                  {!formSubmitting && <Send size={16} className="ml-2" />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;