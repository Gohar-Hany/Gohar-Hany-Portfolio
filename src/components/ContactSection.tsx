import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, Bot, User, MapPin, Mail, Phone, Github, Linkedin, Twitter } from 'lucide-react';
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
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

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

    // Simulate form submission (integrate with EmailJS or similar service)
    setTimeout(() => {
      setFormSubmitting(false);
      setContactForm({ name: '', email: '', subject: '', message: '' });
      alert('Thank you for your message! I\'ll get back to you soon.');
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 lg:py-36 relative overflow-hidden section-alt">
      {/* Decorative glow orbs */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl lg:text-5xl font-bold font-syne mb-6 text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground font-dmsans max-w-3xl mx-auto">
            Ready to build something amazing together? Chat with my AI assistant or send me a direct message.
          </p>
          <div className="section-divider mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Contact info and 3D Robot */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'animate-slide-left' : 'opacity-0 -translate-x-10'}`}>
            {/* 3D Robot Model */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,200,255,0.15)] bg-[#040d1a] border border-white/5">
              <iframe
                src="https://my.spline.design/genkubgreetingrobot-mtRM3XSqB79SaWySckBPgOcq/"
                frameBorder="0"
                width="100%"
                height="100%"
                scrolling="no"
                loading="lazy"
                className="rounded-xl"
                style={{ border: 'none' }}
                title="3D Greeting Robot"
                allow="autoplay"
              />

              {/* Professional overlay to hide Spline watermark - matches background exactly */}
              <div
                className="absolute bottom-0 right-0 w-52 h-14 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 0%, #040d1a 30%, #040d1a 100%)',
                  borderRadius: '0 0 1rem 0'
                }}
              />

              {/* Floating indicators */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,150,0.8)]" />
              <div className="absolute bottom-6 left-6 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(0,200,255,0.8)]" style={{ animationDelay: '1s' }} />
            </div>

            {/* Contact Information */}
            <div className="stat-card p-8 space-y-6">
              <h3 className="text-2xl font-semibold font-syne text-white mb-6">Get in Touch</h3>

              <div className="space-y-4 font-dmsans">
                <div className="flex items-center space-x-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-[#040d1a] border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(0,200,255,0.3)] transition-all">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-white/80">Email</p>
                    <a href="mailto:goharhany9@gmail.com" className="text-white/60 hover:text-primary transition-colors">
                      goharhany9@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-[#040d1a] border border-white/5 flex items-center justify-center">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-white/80">Location</p>
                    <p className="text-white/60">Alexandria, Egypt</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-primary/10">
                <h4 className="font-semibold font-syne text-white mb-4">Connect on Social</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/Gohar-Hany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#040d1a] border border-white/5 hover:border-primary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,200,255,0.4)] group"
                  >
                    <Github size={18} className="text-white/60 group-hover:text-primary" />
                  </a>
                  <a
                    href="https://linkedin.com/in/goharhany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#040d1a] border border-white/5 hover:border-primary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,200,255,0.4)] group"
                  >
                    <Linkedin size={18} className="text-white/60 group-hover:text-primary" />
                  </a>
                  <a
                    href="https://twitter.com/goharhany"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#040d1a] border border-white/5 hover:border-primary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(0,200,255,0.4)] group"
                  >
                    <Twitter size={18} className="text-white/60 group-hover:text-primary" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Chat interface and Contact form */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-10'}`}>
            {/* AI Chat Interface */}
            <div className="stat-card p-6 h-[500px] flex flex-col">
              <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-primary/10">
                <div className="w-10 h-10 rounded-full bg-[#040d1a] border border-white/5 flex items-center justify-center">
                  <Bot size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold font-syne text-white">AI Assistant</h3>
                  <p className="text-sm font-dmsans text-white/60">Ask me anything about Gohar</p>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow-green" />
                  <span className="text-xs font-dmsans text-white/60">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scroll"
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.isUser
                      ? 'bg-[#040d1a] border border-primary/30'
                      : 'bg-[#040d1a] border border-accent/30'
                      }`}>
                      {message.isUser ? (
                        <User size={16} className="text-primary" />
                      ) : (
                        <Bot size={16} className="text-accent" />
                      )}
                    </div>

                    <div className={`max-w-[80%] p-3 rounded-2xl font-dmsans ${message.isUser
                      ? 'bg-primary/20 border border-primary/30 text-white ml-auto'
                      : 'bg-[#0b1e35] border border-white/5 text-white/80'
                      }`}>
                      <div className="text-sm leading-relaxed prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:my-0 pb-1">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ node, ...props }: any) => <p className="mb-2 last:mb-0 whitespace-pre-wrap" {...props} />,
                            a: ({ node, ...props }: any) => <a className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            strong: ({ node, ...props }: any) => <strong className="text-white font-bold" {...props} />
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                      <p className={`text-xs mt-1 opacity-70 ${message.isUser ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#040d1a] border border-accent/30 flex items-center justify-center">
                      <Bot size={16} className="text-accent" />
                    </div>
                    <div className="bg-[#0b1e35] border border-white/5 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <div className="flex items-center space-x-3 pt-4 border-t border-primary/10">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me about Gohar's experience..."
                  className="flex-1 bg-[#040d1a] border-white/10 focus:border-primary text-white font-dmsans placeholder:text-white/40"
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
                  className="bg-primary hover:bg-primary/80 text-white font-syne border-none shadow-glow-blue"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="stat-card p-6">
              <h3 className="text-xl font-semibold font-syne text-white mb-6">Send Direct Message</h3>

              <form onSubmit={handleContactFormSubmit} className="space-y-4 font-dmsans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="bg-[#040d1a] border-white/10 focus:border-accent text-white placeholder:text-white/40"
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="bg-[#040d1a] border-white/10 focus:border-accent text-white placeholder:text-white/40"
                  />
                </div>

                <Input
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                  className="bg-[#040d1a] border-white/10 focus:border-accent text-white placeholder:text-white/40"
                />

                <Textarea
                  placeholder="Your message..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  rows={4}
                  className="bg-[#040d1a] border-white/10 focus:border-accent text-white placeholder:text-white/40 resize-none"
                />

                <Button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full bg-accent hover:bg-accent/80 text-[#040d1a] font-bold font-syne shadow-glow-green border-none transition-all duration-300 hover:scale-105"
                >
                  {formSubmitting ? 'Sending...' : 'Send Message'}
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