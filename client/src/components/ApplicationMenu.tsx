import { useState } from 'react';

interface Application {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
}

interface ApplicationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (type: string) => void;
}

export default function ApplicationMenu({ isOpen, onClose, onOpenWindow }: ApplicationMenuProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const applications: Application[] = [
    // System Applications
    { id: 'terminal', name: 'Terminal', icon: 'fas fa-terminal', category: 'System', description: 'Command line interface' },
    { id: 'file-manager', name: 'File Manager', icon: 'fas fa-folder', category: 'System', description: 'Browse files and folders' },
    { id: 'settings', name: 'Settings', icon: 'fas fa-cog', category: 'System', description: 'System preferences' },
    
    // Portfolio Applications
    { id: 'about', name: 'About Me', icon: 'fas fa-folder', category: 'Portfolio', description: 'Personal information and background' },
    { id: 'projects', name: 'My Projects', icon: 'fas fa-folder', category: 'Portfolio', description: 'Software development projects' },
    { id: 'education', name: 'Education', icon: 'fas fa-folder', category: 'Portfolio', description: 'Academic background and qualifications' },
    { id: 'skills', name: 'Technical Skills', icon: 'fas fa-folder', category: 'Portfolio', description: 'Programming languages and technologies' },
    { id: 'achievements', name: 'Achievements', icon: 'fas fa-folder', category: 'Portfolio', description: 'Awards and recognition' },
    { id: 'contact', name: 'Contact Info', icon: 'fas fa-folder', category: 'Portfolio', description: 'Get in touch with me' },
    { id: 'hobbies', name: 'Personal Interests', icon: 'fas fa-folder', category: 'Portfolio', description: 'Hobbies and activities' },
    { id: 'resume', name: 'Resume Download', icon: 'fas fa-download', category: 'Portfolio', description: 'Download my complete resume' },
    { id: 'linkedin', name: 'Connect LinkedIn', icon: 'fab fa-linkedin', category: 'Portfolio', description: 'Open my LinkedIn profile' },
    
    // Internet Tools
    { id: 'browser', name: 'Web Browser', icon: 'fas fa-globe', category: 'Internet', description: 'Browse the web' },
    
    // Accessories
    { id: 'text-editor', name: 'Text Editor', icon: 'fas fa-file-alt', category: 'Accessories', description: 'Simple text editor' },
  ];

  const categories = ['All', 'System', 'Portfolio', 'Internet', 'Accessories'];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || app.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAppClick = (appId: string) => {
    if (appId === 'linkedin') {
      // Open LinkedIn profile directly
      window.open('https://www.linkedin.com/in/sajid72543', '_blank', 'noopener,noreferrer');
      onClose();
    } else {
      onOpenWindow(appId);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Application Menu */}
      <div className="fixed bottom-12 sm:bottom-16 left-2 sm:left-4 w-[calc(100vw-16px)] sm:w-96 h-[70vh] sm:h-96 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl z-50 flex flex-col max-w-md">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-bold text-base sm:text-lg">Applications</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm placeholder-gray-400 focus:outline-none focus:border-[var(--ubuntu-orange)]"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-3 sm:px-4 py-2 border-b border-gray-700">
          <div className="flex space-x-1 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-[var(--ubuntu-orange)] text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Applications Grid */}
        <div className="flex-1 overflow-auto p-3 sm:p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                onClick={() => handleAppClick(app.id)}
                className="flex flex-col items-center p-2 sm:p-3 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-800 rounded-lg mb-2 group-hover:bg-[var(--ubuntu-orange)] transition-colors">
                  <i className={`${app.icon} text-lg sm:text-xl text-[var(--ubuntu-orange)] group-hover:text-white`}></i>
                </div>
                <span className="text-white text-xs text-center leading-tight">{app.name}</span>
              </div>
            ))}
          </div>
          
          {filteredApplications.length === 0 && (
            <div className="text-center text-gray-400 mt-8">
              <i className="fas fa-search text-3xl mb-2"></i>
              <p>No applications found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700 bg-gray-800 rounded-b-lg">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{filteredApplications.length} applications</span>
            <span>Sajid's Desktop</span>
          </div>
        </div>
      </div>
    </>
  );
}