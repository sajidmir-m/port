import { useState, useRef, useEffect } from "react";

export default function Terminal() {
  const [history, setHistory] = useState<Array<{ command: string; output: string }>>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize terminal with welcome message
    setHistory([
      {
        command: "",
        output: `Welcome to Sajid's Ubuntu Terminal v1.0
Type 'help' for available commands
=========================================

sajid@ubuntu:~$ about sajid
Sajid Nazir - Software Engineer & Tech Enthusiast

sajid@ubuntu:~$ skills --list
Technical Skills:
├── Web Development (Frontend & Backend)
├── Artificial Intelligence & Machine Learning
├── Internet of Things (IoT)
├── Cloud Computing
├── Cybersecurity & OSINT
├── Blockchain Technology
└── Python Programming

sajid@ubuntu:~$ status
Status: Available for new opportunities
Location: Whitefield, Bengaluru, India
Contact: mirsajidd7@gmail.com`
      }
    ]);

    // Focus input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new content is added
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (command: string): string => {
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case 'help':
        return `Available commands:
├── about sajid - Display user information
├── skills - Show technical skills
├── status - Current availability status
├── projects - List recent projects
├── contact - Show contact information
├── clear - Clear terminal screen
└── exit - Close terminal window`;

      case 'about sajid':
        return 'Sajid Nazir - Software Engineer & Technology Enthusiast';

      case 'skills':
      case 'skills --list':
        return `Technical Skills:
├── Web Development (Frontend & Backend)
├── Artificial Intelligence & Machine Learning
├── Internet of Things (IoT)
├── Cloud Computing
├── Cybersecurity & OSINT
├── Blockchain Technology
└── Python Programming`;

      case 'status':
        return `Status: Available for new opportunities
Location: Whitefield, Bengaluru, India
Contact: mirsajidd7@gmail.com
LinkedIn: linkedin.com/in/sajid72543`;

      case 'projects':
        return `Recent Projects:
├── AI-Based Airport Baggage System
├── OSINT Threat Profiling Framework
└── Hexacopter Firefighting Drone`;

      case 'contact':
        return `Contact Information:
├── Email: mirsajidd7@gmail.com
├── Phone: +91 9149559393
├── LinkedIn: linkedin.com/in/sajid72543
└── Location: Whitefield, Bengaluru, India`;

      case 'clear':
        setHistory([]);
        return '';

      case 'exit':
        // Close terminal functionality would be handled by parent
        return 'Terminal session ended.';

      default:
        return `Command not found: ${command}
Type 'help' for available commands.`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentCommand.trim() === 'clear') {
      setHistory([]);
      setCurrentCommand("");
      return;
    }

    const output = processCommand(currentCommand);
    setHistory(prev => [...prev, { command: currentCommand, output }]);
    setCurrentCommand("");
  };

  return (
    <div 
      ref={terminalRef}
      className="bg-black p-2 sm:p-4 font-mono text-green-400 h-full overflow-y-auto terminal-text text-xs sm:text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal History */}
      {history.map((entry, index) => (
        <div key={index} className="mb-2">
          {entry.command && (
            <div className="mb-1">
              sajid@ubuntu:~$ <span className="text-white">{entry.command}</span>
            </div>
          )}
          {entry.output && (
            <div className="whitespace-pre-line mb-2">{entry.output}</div>
          )}
        </div>
      ))}

      {/* Current Input Line */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span>sajid@ubuntu:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          className="bg-transparent border-none outline-none text-white ml-1 flex-1 text-xs sm:text-sm"
          autoFocus
        />
        <span className="animate-pulse">█</span>
      </form>
    </div>
  );
}
