import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

export default function HackerLanding() {
  const [, setLocation] = useLocation();
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string }>>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const sequences = [
    "Initializing secure connection...",
    "Scanning network protocols...",
    "Bypassing firewall...",
    "Access granted.",
    "Welcome to SAJID_NAZIR.exe"
  ];

  useEffect(() => {
    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (phase >= sequences.length) return;

    const currentSequence = sequences[phase];
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= currentSequence.length) {
        setTypedText(currentSequence.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          if (phase < sequences.length - 1) {
            setPhase(prev => prev + 1);
            setTypedText("");
          } else {
            // Show terminal after boot sequence
            setTimeout(() => {
              setShowTerminal(true);
              setTerminalHistory([{
                command: "",
                output: `SYSTEM READY - TYPE 'help' FOR AVAILABLE COMMANDS`
              }]);
            }, 1500);
          }
        }, 1000);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [phase]);

  useEffect(() => {
    if (showTerminal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTerminal]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const processCommand = (command: string): string => {
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case 'help':
        return `AVAILABLE COMMANDS:
├── about sajid   - Display user information
├── skills        - Show technical capabilities
├── projects      - List recent exploits/projects
├── education     - Academic background
├── achievements  - Awards and recognition
├── contact       - Contact information
├── hobbies       - Personal interests
├── status        - Current availability
├── portfolio     - Access visual portfolio
├── clear         - Clear terminal screen
└── exit          - Terminate session`;

      case 'about sajid':
        return `USER: SAJID NAZIR
ROLE: Software Engineer & Cybersecurity Specialist
CLEARANCE: CLASSIFIED
LOCATION: Whitefield, Bengaluru, India
MOTTO: "Innovation through code, security through knowledge"`;

      case 'skills':
        return `TECHNICAL ARSENAL:
┌─ CORE SYSTEMS
├── Web Development (Frontend & Backend)
├── Artificial Intelligence & Machine Learning
├── Internet of Things (IoT)
├── Cloud Computing Architecture
├── Cybersecurity & OSINT Frameworks
├── Blockchain Technology
└── Python Programming Mastery

┌─ SOFT SKILLS
├── Leadership & Team Management
├── Public Relations & Communication
├── Critical Thinking & Problem Solving
└── Time Management & Project Coordination`;

      case 'projects':
        return `RECENT SECURITY EXPLOITS & INNOVATIONS:

[PROJECT_001] AI-Based Airport Baggage & Passenger Flow
├── STATUS: DEPLOYED
├── TECH: Python, Machine Learning, Computer Vision
└── IMPACT: Optimized baggage handling, reduced wait times

[PROJECT_002] OSINT-Based Threat Profiling Framework
├── STATUS: ACTIVE
├── TECH: Cybersecurity, OSINT, Automation
└── IMPACT: Enhanced threat intelligence gathering

[PROJECT_003] Hexacopter-Based Firefighting Drone
├── STATUS: PROTOTYPE
├── TECH: IoT, Drone Technology, Emergency Response
└── IMPACT: Cost-effective fire suppression solution`;

      case 'education':
        return `ACADEMIC CREDENTIALS:

[DEGREE_001] Bachelor of Engineering - Computer Science
├── INSTITUTION: MVJ College of Engineering
├── STATUS: COMPLETED
└── FOCUS: Software Engineering, AI/ML

[DEGREE_002] Diploma in Computer Science
├── INSTITUTION: Kashmir Government Polytechnic
├── STATUS: COMPLETED
└── FOCUS: Programming Fundamentals, System Design`;

      case 'achievements':
        return `RECOGNITION & AWARDS:

[AWARD_001] Shining Star Award
├── ISSUER: CT University
├── CATEGORY: Academic Excellence & Leadership
└── YEAR: Recent

[MEMBERSHIP_001] Google Developer Groups
├── STATUS: Active Member
├── ROLE: Community Contributor
└── FOCUS: Knowledge Sharing & Development

[AWARD_002] Sports Excellence Medals
├── CATEGORY: Athletic Performance
├── STATUS: Multiple Awards
└── DISCIPLINE: Team Sports & Individual Events`;

      case 'contact':
        return `SECURE COMMUNICATION CHANNELS:

[PRIMARY] Email: mirsajidd7@gmail.com
[VOICE]   Phone: +91 9149559393
[SOCIAL]  LinkedIn: linkedin.com/in/sajid72543
[LOCATION] Whitefield, Bengaluru, India, 560067

ENCRYPTION: PGP Available upon request
AVAILABILITY: Open to new opportunities`;

      case 'hobbies':
        return `PERSONAL INTERESTS & ACTIVITIES:

[PHYSICAL]
├── Fitness & Gym Training
└── Sports (Team & Individual)

[CREATIVE]
├── Cooking & Culinary Experiments
├── Singing & Musical Expression
└── Travel & Cultural Exploration

[TECHNICAL]
├── Building Personal Projects
├── Learning New Technologies
└── Contributing to Open Source`;

      case 'status':
        return `CURRENT STATUS:
├── AVAILABILITY: Open for opportunities
├── LOCATION: Bengaluru, India
├── FOCUS: AI/ML, Cybersecurity, Full-Stack
├── SEEKING: Challenging projects & collaborations
└── RESPONSE_TIME: 24-48 hours`;

      case 'portfolio':
        setLocation("/desktop");
        return 'LAUNCHING VISUAL PORTFOLIO INTERFACE...';

      case 'clear':
        setTerminalHistory([]);
        return '';

      case 'exit':
        return 'SESSION TERMINATED. CONNECTION CLOSED.';

      default:
        return `COMMAND NOT RECOGNIZED: ${command}
TRY 'help' FOR AVAILABLE COMMANDS`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentCommand.trim() === 'clear') {
      setTerminalHistory([]);
      setCurrentCommand("");
      return;
    }

    const output = processCommand(currentCommand);
    setTerminalHistory(prev => [...prev, { command: currentCommand, output }]);
    setCurrentCommand("");
  };

  const enterPortfolio = () => {
    setLocation("/desktop");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-hidden relative">
      {/* Matrix-style background animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-bg"></div>
      </div>
      
      {/* Scan lines effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="scanlines"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8">
        {/* Terminal Header */}
        <div className="w-full max-w-6xl">
          <div className="border border-green-400 bg-black bg-opacity-80 rounded-lg shadow-2xl">
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between bg-gray-900 border-b border-green-400 px-2 sm:px-4 py-2 rounded-t-lg">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-green-400 text-xs sm:text-sm hidden sm:block">SECURE_TERMINAL v2.4.1</div>
              <div className="text-green-400 text-xs">ENCRYPTED</div>
            </div>

            {/* Terminal Content */}
            <div className="p-4 sm:p-6 md:p-8 space-y-4">
              {/* ASCII Art Header */}
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <pre className="text-green-400 text-[0.5rem] xs:text-[0.6rem] sm:text-xs md:text-sm leading-tight overflow-x-auto">
{`
 ███████╗ █████╗      ██╗██╗██████╗     ███╗   ██╗ █████╗ ███████╗██╗██████╗ 
 ██╔════╝██╔══██╗     ██║██║██╔══██╗    ████╗  ██║██╔══██╗╚══███╔╝██║██╔══██╗
 ███████╗███████║     ██║██║██║  ██║    ██╔██╗ ██║███████║  ███╔╝ ██║██████╔╝
 ╚════██║██╔══██║██   ██║██║██║  ██║    ██║╚██╗██║██╔══██║ ███╔╝  ██║██╔══██╗
 ███████║██║  ██║╚█████╔╝██║██████╔╝    ██║ ╚████║██║  ██║███████╗██║██║  ██║
 ╚══════╝╚═╝  ╚═╝ ╚════╝ ╚═╝╚═════╝     ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═╝
`}
                </pre>
              </div>

              {/* System Info */}
              <div className="border border-green-400 p-3 sm:p-4 bg-green-400 bg-opacity-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <div className="text-red-400">SYSTEM_USER:</div>
                    <div className="text-white ml-2 sm:ml-4">SAJID_NAZIR</div>
                  </div>
                  <div>
                    <div className="text-red-400">ACCESS_LEVEL:</div>
                    <div className="text-white ml-2 sm:ml-4">ROOT_ADMIN</div>
                  </div>
                  <div>
                    <div className="text-red-400">SPECIALIZATION:</div>
                    <div className="text-white ml-2 sm:ml-4">AI_CYBERSEC_ENGINEER</div>
                  </div>
                  <div>
                    <div className="text-red-400">LOCATION:</div>
                    <div className="text-white ml-2 sm:ml-4">BENGALURU_INDIA</div>
                  </div>
                </div>
              </div>

              {/* Boot Sequence */}
              <div className="space-y-2">
                {sequences.slice(0, phase + 1).map((seq, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-green-400">[{String(index + 1).padStart(2, '0')}]</span>
                    <span className="text-gray-300">
                      {index === phase ? typedText : seq}
                      {index === phase && showCursor && <span className="text-green-400">█</span>}
                    </span>
                    {index < phase && <span className="text-green-400 ml-auto">✓</span>}
                  </div>
                ))}
              </div>

              {/* Terminal Interface */}
              {showTerminal && (
                <div className="mt-8 animate-fade-in">
                  <div 
                    ref={terminalRef}
                    className="bg-black border border-green-400 rounded p-2 sm:p-4 h-48 sm:h-64 overflow-y-auto font-mono text-xs sm:text-sm"
                    onClick={() => inputRef.current?.focus()}
                  >
                    {/* Terminal History */}
                    {terminalHistory.map((entry, index) => (
                      <div key={index} className="mb-2">
                        {entry.command && (
                          <div className="mb-1">
                            <span className="text-green-400">root@sajid-system:~# </span>
                            <span className="text-white">{entry.command}</span>
                          </div>
                        )}
                        {entry.output && (
                          <div className="whitespace-pre-line mb-2 text-green-400">{entry.output}</div>
                        )}
                      </div>
                    ))}

                    {/* Current Input Line */}
                    <form onSubmit={handleSubmit} className="flex items-center">
                      <span className="text-green-400">root@sajid-system:~# </span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={currentCommand}
                        onChange={(e) => setCurrentCommand(e.target.value)}
                        className="bg-transparent border-none outline-none text-white ml-1 flex-1"
                        autoFocus
                      />
                      <span className="animate-pulse text-green-400">█</span>
                    </form>
                  </div>

                  {/* Quick Access Buttons */}
                  <div className="mt-3 sm:mt-4 text-center">
                    <div className="text-gray-500 text-xs mb-2">Quick Access:</div>
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                      <button
                        onClick={() => setCurrentCommand("help")}
                        className="px-2 sm:px-3 py-1 bg-gray-800 text-green-400 border border-green-400 rounded text-xs hover:bg-green-400 hover:text-black transition-colors"
                      >
                        help
                      </button>
                      <button
                        onClick={() => setCurrentCommand("whoami")}
                        className="px-2 sm:px-3 py-1 bg-gray-800 text-green-400 border border-green-400 rounded text-xs hover:bg-green-400 hover:text-black transition-colors"
                      >
                        whoami
                      </button>
                      <button
                        onClick={() => setCurrentCommand("skills")}
                        className="px-2 sm:px-3 py-1 bg-gray-800 text-green-400 border border-green-400 rounded text-xs hover:bg-green-400 hover:text-black transition-colors"
                      >
                        skills
                      </button>
                      <button
                        onClick={() => setCurrentCommand("projects")}
                        className="px-2 sm:px-3 py-1 bg-gray-800 text-green-400 border border-green-400 rounded text-xs hover:bg-green-400 hover:text-black transition-colors"
                      >
                        projects
                      </button>
                      <button
                        onClick={() => setCurrentCommand("contact")}
                        className="px-2 sm:px-3 py-1 bg-gray-800 text-green-400 border border-green-400 rounded text-xs hover:bg-green-400 hover:text-black transition-colors"
                      >
                        contact
                      </button>
                      <button
                        onClick={enterPortfolio}
                        className="px-3 sm:px-4 py-1 bg-green-400 text-black border border-green-400 rounded text-xs hover:bg-transparent hover:text-green-400 transition-colors font-bold"
                      >
                        VISUAL PORTFOLIO
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-4 left-4 text-xs text-gray-600">
          SECURE_CONNECTION_ESTABLISHED :: PORT_443 :: SSL_ENCRYPTED
        </div>
        <div className="absolute bottom-4 right-4 text-xs text-gray-600">
          SYSTEM_UPTIME: 99.9% :: INTRUSION_DETECTED: 0
        </div>
      </div>


    </div>
  );
}