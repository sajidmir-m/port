import Terminal from "./Terminal";
import FileManager from "./FileManager";
import ResumeDownload from "./ResumeDownload";

interface WindowContentProps {
  type: string;
}

export default function WindowContent({ type }: WindowContentProps) {
  if (type === 'terminal') {
    return <Terminal />;
  }

  // Use FileManager for folder-based content
  if (['projects', 'achievements', 'contact', 'hobbies', 'education', 'skills', 'file-manager'].includes(type)) {
    return <FileManager folderType={type} />;
  }

  // Handle resume download
  if (type === 'resume') {
    return <ResumeDownload />;
  }

  const content = getWindowContent(type);
  
  return (
    <div 
      className="p-6 space-y-6 text-white dark:text-white light:text-gray-800"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

function getWindowContent(type: string): string {
  const content: Record<string, string> = {
    settings: `
      <div class="space-y-6">
        <div class="text-center mb-6">
          <h2 class="text-2xl font-bold text-white mb-2">System Settings</h2>
          <p class="text-[var(--ubuntu-light)]">Configure your desktop environment</p>
        </div>
        
        <div class="grid gap-4">
          <div class="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <h3 class="text-lg font-bold text-[var(--ubuntu-orange)] mb-3"><i class="fas fa-palette mr-2"></i>Appearance</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-white">Theme</span>
                <button class="px-3 py-1 bg-[var(--ubuntu-orange)] text-white rounded text-sm">Dark/Light Toggle</button>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-white">Wallpaper</span>
                <span class="text-gray-400 text-sm">Ubuntu Gradient</span>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <h3 class="text-lg font-bold text-[var(--ubuntu-orange)] mb-3"><i class="fas fa-display mr-2"></i>Display</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-white">Resolution</span>
                <span class="text-gray-400 text-sm">Auto</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-white">Scale</span>
                <span class="text-gray-400 text-sm">100%</span>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-800 p-4 rounded-lg border border-gray-600">
            <h3 class="text-lg font-bold text-[var(--ubuntu-orange)] mb-3"><i class="fas fa-info-circle mr-2"></i>System Info</h3>
            <div class="space-y-2 text-sm text-gray-300">
              <div>OS: Ubuntu Desktop (Portfolio Edition)</div>
              <div>Version: 22.04 LTS</div>
              <div>Developer: Sajid Nazir</div>
              <div>Built with: React + TypeScript</div>
            </div>
          </div>
        </div>
      </div>
    `,
    
    calculator: `
      <div class="bg-gray-800 p-6 rounded-lg">
        <div class="w-full max-w-sm mx-auto">
          <div class="bg-black p-4 rounded mb-4 text-right text-2xl text-green-400 font-mono">
            0
          </div>
          <div class="grid grid-cols-4 gap-2">
            <button class="bg-gray-600 hover:bg-gray-500 text-white p-3 rounded">C</button>
            <button class="bg-gray-600 hover:bg-gray-500 text-white p-3 rounded">±</button>
            <button class="bg-gray-600 hover:bg-gray-500 text-white p-3 rounded">%</button>
            <button class="bg-[var(--ubuntu-orange)] hover:bg-opacity-80 text-white p-3 rounded">÷</button>
            
            <button class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded">7</button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded">8</button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded">9</button>
            <button class="bg-[var(--ubuntu-orange)] hover:bg-opacity-80 text-white p-3 rounded">×</button>
            
            <button class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded">4</button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded">5</button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded">6</button>
            <button class="bg-[var(--ubuntu-orange)] hover:bg-opacity-80 text-white p-3 rounded">-</button>
            
            <button class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded">1</button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded">2</button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded">3</button>
            <button class="bg-[var(--ubuntu-orange)] hover:bg-opacity-80 text-white p-3 rounded">+</button>
            
            <button class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded col-span-2">0</button>
            <button class="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded">.</button>
            <button class="bg-[var(--ubuntu-orange)] hover:bg-opacity-80 text-white p-3 rounded">=</button>
          </div>
        </div>
      </div>
    `,
    
    'text-editor': `
      <div class="h-full flex flex-col">
        <div class="bg-gray-800 p-2 border-b border-gray-600 flex items-center space-x-2">
          <button class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded">File</button>
          <button class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded">Edit</button>
          <button class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded">View</button>
        </div>
        <div class="flex-1 bg-white dark:bg-gray-900 p-4">
          <textarea 
            class="w-full h-full bg-transparent text-black dark:text-white resize-none outline-none font-mono"
            placeholder="Start typing..."
          ></textarea>
        </div>
      </div>
    `,
    
    'code-editor': `
      <div class="h-full flex flex-col bg-gray-900">
        <div class="bg-gray-800 p-2 border-b border-gray-600 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-white text-sm font-medium">untitled.js</span>
            <span class="text-gray-400 text-xs">●</span>
          </div>
          <div class="flex items-center space-x-1 text-xs text-gray-400">
            <span>JavaScript</span>
            <span>UTF-8</span>
          </div>
        </div>
        <div class="flex-1 p-4 font-mono text-sm">
          <div class="text-gray-500">1</div>
          <div class="text-gray-500">2</div>
          <div class="text-gray-500">3</div>
          <div class="absolute left-12 top-16">
            <div class="text-purple-400">function</div>
            <div class="text-blue-400 ml-4">welcomeToPortfolio</div>
            <div class="text-yellow-400">() {</div>
            <div class="text-green-400 ml-8">console.log("Welcome to Sajid's Portfolio!");</div>
            <div class="text-yellow-400">}</div>
          </div>
        </div>
      </div>
    `,
    
    browser: `
      <div class="h-full flex flex-col">
        <div class="bg-gray-800 p-3 border-b border-gray-600">
          <div class="flex items-center space-x-2">
            <div class="flex space-x-1">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div class="flex-1 bg-gray-700 rounded px-3 py-1 text-white text-sm">
              https://portfolio.sajidnazir.dev
            </div>
          </div>
        </div>
        <div class="flex-1 bg-white dark:bg-gray-100 p-8 text-black">
          <div class="text-center">
            <h1 class="text-3xl font-bold mb-4">Welcome to Sajid's Portfolio</h1>
            <p class="text-gray-600 mb-6">Software Engineer & Technology Enthusiast</p>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold text-lg mb-2">Latest Projects</h3>
                <p class="text-sm text-gray-600">AI Airport System, OSINT Framework, Firefighting Drone</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-bold text-lg mb-2">Skills</h3>
                <p class="text-sm text-gray-600">Python, React, AI/ML, Cybersecurity, IoT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    about: `
      <div class="text-center mb-6">
        <img src="/attached_assets/sajidd_1750610941624.jpeg" 
             alt="Sajid Nazir Professional Photo" 
             class="w-24 h-24 rounded-full mx-auto mb-4 border-3 border-[var(--ubuntu-orange)] object-cover">
        <h2 class="text-2xl font-bold text-white">Sajid Nazir</h2>
        <p class="text-[var(--ubuntu-light)]">Software Engineer & Technology Enthusiast</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-bold text-[var(--ubuntu-orange)] mb-3"><i class="fas fa-graduation-cap mr-2"></i>Education</h3>
          <div class="space-y-2 text-gray-300">
            <div>
              <strong>B.E. in Computer Science</strong><br>
              MVJ College of Engineering
            </div>
            <div>
              <strong>Diploma in Computer Science</strong><br>
              Kashmir Government Polytechnic
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold text-[var(--ubuntu-orange)] mb-3"><i class="fas fa-cogs mr-2"></i>Technical Skills</h3>
          <div class="flex flex-wrap gap-2">
            <span class="bg-gray-700 text-white px-2 py-1 rounded text-xs">Web Development</span>
            <span class="bg-gray-700 text-white px-2 py-1 rounded text-xs">AI/ML</span>
            <span class="bg-gray-700 text-white px-2 py-1 rounded text-xs">IoT</span>
            <span class="bg-gray-700 text-white px-2 py-1 rounded text-xs">Cloud Computing</span>
            <span class="bg-gray-700 text-white px-2 py-1 rounded text-xs">Cybersecurity</span>
            <span class="bg-gray-700 text-white px-2 py-1 rounded text-xs">Blockchain</span>
            <span class="bg-gray-700 text-white px-2 py-1 rounded text-xs">Python</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-bold text-[var(--ubuntu-orange)] mb-3"><i class="fas fa-heart mr-2"></i>Personal Statement</h3>
        <p class="text-gray-300 leading-relaxed">
          Passionate technologist with a deep love for innovation and problem-solving. I thrive on creating solutions that make a real difference, 
          from AI-driven systems that optimize complex processes to drones that can save lives. My journey in technology is driven by curiosity, 
          continuous learning, and the belief that great software can change the world. I enjoy collaborating with teams, leading projects, 
          and mentoring others in their tech journey.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-bold text-[var(--ubuntu-orange)] mb-3"><i class="fas fa-lightbulb mr-2"></i>Soft Skills</h3>
        <div class="grid grid-cols-2 gap-2 text-gray-300">
          <div><i class="fas fa-users text-[var(--ubuntu-orange)] mr-2"></i>Leadership</div>
          <div><i class="fas fa-comments text-[var(--ubuntu-orange)] mr-2"></i>Communication</div>
          <div><i class="fas fa-brain text-[var(--ubuntu-orange)] mr-2"></i>Critical Thinking</div>
          <div><i class="fas fa-clock text-[var(--ubuntu-orange)] mr-2"></i>Time Management</div>
          <div><i class="fas fa-handshake text-[var(--ubuntu-orange)] mr-2"></i>Public Relations</div>
          <div><i class="fas fa-puzzle-piece text-[var(--ubuntu-orange)] mr-2"></i>Problem Solving</div>
        </div>
      </div>
    `,
    contact: `
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-white mb-2">Get In Touch</h2>
        <p class="text-[var(--ubuntu-light)]">Let's connect and discuss opportunities</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 border border-gray-600 hover:border-[var(--ubuntu-orange)] transition-colors cursor-pointer">
          <div class="w-full h-20 bg-gradient-to-br from-green-600 to-green-500 rounded-lg mb-3 flex items-center justify-center">
            <i class="fas fa-phone text-3xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-[var(--ubuntu-orange)] mb-1">Phone</h3>
          <p class="text-white font-medium text-sm">+91 9149559393</p>
        </div>
        
        <div class="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 border border-gray-600 hover:border-[var(--ubuntu-orange)] transition-colors cursor-pointer">
          <div class="w-full h-20 bg-gradient-to-br from-red-600 to-red-500 rounded-lg mb-3 flex items-center justify-center">
            <i class="fas fa-envelope text-3xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-[var(--ubuntu-orange)] mb-1">Email</h3>
          <p class="text-white font-medium text-sm">mirsajidd7@gmail.com</p>
        </div>
        
        <a href="https://www.linkedin.com/in/sajid72543" target="_blank" rel="noopener noreferrer" 
           class="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 border border-gray-600 hover:border-[var(--ubuntu-orange)] transition-colors cursor-pointer block no-underline">
          <div class="w-full h-20 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg mb-3 flex items-center justify-center">
            <i class="fab fa-linkedin text-3xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-[var(--ubuntu-orange)] mb-1">LinkedIn</h3>
          <p class="text-[var(--ubuntu-orange)] hover:underline font-medium text-sm">linkedin.com/in/sajid72543</p>
        </a>
        
        <div class="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 border border-gray-600 hover:border-[var(--ubuntu-orange)] transition-colors cursor-pointer">
          <div class="w-full h-20 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg mb-3 flex items-center justify-center">
            <i class="fas fa-map-marker-alt text-3xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-[var(--ubuntu-orange)] mb-1">Location</h3>
          <p class="text-white font-medium text-sm">Whitefield, Bengaluru, India</p>
        </div>
      </div>
      
      <div class="mt-6 p-4 bg-[var(--ubuntu-orange)] bg-opacity-10 border border-[var(--ubuntu-orange)] rounded-lg">
        <p class="text-[var(--ubuntu-orange)] text-center">
          <i class="fas fa-coffee mr-2"></i>
          Open to new opportunities and collaborations
        </p>
      </div>
    `,
    achievements: `
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-white mb-2">Awards & Recognition</h2>
        <p class="text-[var(--ubuntu-light)]">Celebrating milestones and accomplishments</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 border border-gray-600 hover:border-yellow-400 transition-colors cursor-pointer">
          <div class="w-full h-24 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-lg mb-3 flex items-center justify-center">
            <i class="fas fa-star text-3xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-yellow-400 mb-1">Shining Star Award</h3>
          <p class="text-yellow-200 text-sm mb-1">CT University</p>
          <p class="text-gray-300 text-xs">Outstanding academic performance and leadership recognition</p>
        </div>
        
        <div class="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 border border-gray-600 hover:border-blue-400 transition-colors cursor-pointer">
          <div class="w-full h-24 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg mb-3 flex items-center justify-center">
            <i class="fab fa-google text-3xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-blue-400 mb-1">Google Developer Groups</h3>
          <p class="text-blue-200 text-sm mb-1">Active Member</p>
          <p class="text-gray-300 text-xs">Developer community participation and knowledge sharing</p>
        </div>
        
        <div class="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 border border-gray-600 hover:border-green-400 transition-colors cursor-pointer">
          <div class="w-full h-24 bg-gradient-to-br from-green-600 to-green-500 rounded-lg mb-3 flex items-center justify-center">
            <i class="fas fa-medal text-3xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-green-400 mb-1">Sports Excellence</h3>
          <p class="text-green-200 text-sm mb-1">Multiple Sports Medals</p>
          <p class="text-gray-300 text-xs">Athletic achievements and team participation recognition</p>
        </div>
        
        <div class="bg-gray-800 dark:bg-gray-900 rounded-lg p-4 border border-gray-600 hover:border-purple-400 transition-colors cursor-pointer">
          <div class="w-full h-24 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg mb-3 flex items-center justify-center">
            <i class="fas fa-code text-3xl text-white"></i>
          </div>
          <h3 class="text-lg font-bold text-purple-400 mb-1">Technical Innovation</h3>
          <p class="text-purple-200 text-sm mb-1">Project Excellence</p>
          <p class="text-gray-300 text-xs">Innovative solutions in AI and cybersecurity</p>
        </div>
      </div>
    `,
    hobbies: `
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-white mb-2">Personal Interests</h2>
        <p class="text-[var(--ubuntu-light)]">Life beyond code and technology</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-[var(--ubuntu-orange)] transition-colors">
          <div class="flex items-center space-x-3 mb-2">
            <i class="fas fa-dumbbell text-[var(--ubuntu-orange)] text-xl"></i>
            <h3 class="text-white font-bold">Fitness & Gym</h3>
          </div>
          <p class="text-gray-300 text-sm">Maintaining physical fitness and mental wellness through regular workouts</p>
        </div>
        
        <div class="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-[var(--ubuntu-orange)] transition-colors">
          <div class="flex items-center space-x-3 mb-2">
            <i class="fas fa-futbol text-[var(--ubuntu-orange)] text-xl"></i>
            <h3 class="text-white font-bold">Sports</h3>
          </div>
          <p class="text-gray-300 text-sm">Playing various sports for teamwork, competition, and staying active</p>
        </div>
        
        <div class="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-[var(--ubuntu-orange)] transition-colors">
          <div class="flex items-center space-x-3 mb-2">
            <i class="fas fa-utensils text-[var(--ubuntu-orange)] text-xl"></i>
            <h3 class="text-white font-bold">Cooking</h3>
          </div>
          <p class="text-gray-300 text-sm">Experimenting with different cuisines and creating delicious meals</p>
        </div>
        
        <div class="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-[var(--ubuntu-orange)] transition-colors">
          <div class="flex items-center space-x-3 mb-2">
            <i class="fas fa-plane text-[var(--ubuntu-orange)] text-xl"></i>
            <h3 class="text-white font-bold">Travelling</h3>
          </div>
          <p class="text-gray-300 text-sm">Exploring new places, cultures, and gaining fresh perspectives</p>
        </div>
        
        <div class="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-[var(--ubuntu-orange)] transition-colors">
          <div class="flex items-center space-x-3 mb-2">
            <i class="fas fa-microphone text-[var(--ubuntu-orange)] text-xl"></i>
            <h3 class="text-white font-bold">Singing</h3>
          </div>
          <p class="text-gray-300 text-sm">Expressing creativity through music and vocal performance</p>
        </div>
        
        <div class="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-[var(--ubuntu-orange)] transition-colors">
          <div class="flex items-center space-x-3 mb-2">
            <i class="fas fa-hammer text-[var(--ubuntu-orange)] text-xl"></i>
            <h3 class="text-white font-bold">Building Projects</h3>
          </div>
          <p class="text-gray-300 text-sm">Creating and building innovative solutions as hands-on learning</p>
        </div>
        
        <div class="bg-gray-800 p-4 rounded-lg border border-gray-600 hover:border-[var(--ubuntu-orange)] transition-colors col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-2">
            <i class="fas fa-book text-[var(--ubuntu-orange)] text-xl"></i>
            <h3 class="text-white font-bold">Learning New Technologies</h3>
          </div>
          <p class="text-gray-300 text-sm">Continuously exploring emerging technologies, frameworks, and development methodologies to stay current in the rapidly evolving tech landscape</p>
        </div>
      </div>
    `
  };

  return content[type] || '<div class="p-6"><p class="text-gray-300">Content not found</p></div>';
}
