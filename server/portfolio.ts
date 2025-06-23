// Portfolio data backend service
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  details: string;
  teamSize?: number;
  role?: string;
  results?: string[];
  status: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  grade: string;
  specialization?: string;
  achievements: string[];
  projects?: string[];
}

export interface Skill {
  name: string;
  category: string;
  proficiency: number;
  projects: string[];
  certifications?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  summary: string;
}

// Portfolio data store
class PortfolioData {
  private personalInfo: PersonalInfo = {
    name: "Sajid Nazir",
    title: "Software Engineer & Technology Enthusiast",
    email: "mirsajidd7@gmail.com",
    phone: "+91 9149559393",
    linkedin: "https://www.linkedin.com/in/sajid72543",
    location: "Whitefield, Bengaluru, India, 560067",
    summary: "Recent Computer Science graduate passionate about software engineering, AI/ML, and cybersecurity. Eager to apply academic knowledge and project experience to create innovative solutions. Strong foundation in full-stack development with hands-on experience in AI-based systems and security frameworks."
  };

  private projects: Project[] = [
    {
      id: "ai-airport",
      title: "AI-Based Airport Baggage and Passenger Flow Management System",
      description: "Intelligent system leveraging AI and machine learning to optimize baggage handling processes and passenger flow management in airports, reducing wait times and improving operational efficiency.",
      technologies: ["Python", "TensorFlow", "Scikit-learn", "OpenCV", "Flask", "PostgreSQL", "Docker"],
      details: "Developed an intelligent system using machine learning algorithms to optimize airport operations. The system uses computer vision for baggage tracking and predictive analytics for passenger flow management.",

      teamSize: 4,
      role: "Team Lead and ML Engineer",
      results: [
        "35% reduction in average wait time",
        "28% improvement in baggage handling efficiency",
        "92% accuracy in passenger flow prediction",
        "Successfully tested at 3 airport terminals"
      ],
      status: "Completed"
    },
    {
      id: "osint-framework",
      title: "OSINT-Based Threat Profiling & Reconnaissance Framework",
      description: "Advanced automation tool for cybersecurity professionals, combining open-source intelligence gathering with threat analysis capabilities for comprehensive security assessments.",
      technologies: ["Python", "Web Scraping", "Data Analysis", "Security APIs", "Automation"],
      details: "Built a comprehensive framework for automated threat intelligence gathering using open-source intelligence techniques. The system aggregates data from multiple sources to create detailed threat profiles.",

      teamSize: 2,
      role: "Lead Developer",
      results: [
        "Automated 80% of manual OSINT processes",
        "Reduced threat assessment time by 60%",
        "Successfully deployed in 3 security firms"
      ],
      status: "In Development"
    },
    {
      id: "firefighting-drone",
      title: "Hexacopter-Based Firefighting Drone",
      description: "Cost-effective drone prototype designed for rapid fire response, featuring autonomous navigation, thermal imaging, and fire suppression capabilities for emergency situations.",
      technologies: ["IoT", "Embedded Systems", "Computer Vision", "Flight Control", "Thermal Imaging"],
      details: "Designed and built a hexacopter drone specifically for firefighting applications. Features include autonomous navigation, thermal imaging for hotspot detection, and fire suppression mechanisms.",

      teamSize: 3,
      role: "Lead Engineer",
      results: [
        "Successfully tested fire suppression capability",
        "Autonomous navigation with 95% accuracy",
        "Thermal imaging detection range of 500m"
      ],
      status: "Prototype Complete"
    },
    {
      id: "portfolio-website",
      title: "Linux Desktop Portfolio Website",
      description: "Interactive Linux desktop-inspired portfolio website with cyberpunk hacker terminal interface and Ubuntu-style desktop environment.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Express.js", "Node.js"],
      details: "Created an innovative portfolio website that simulates a complete Linux desktop environment with working applications, file manager, and terminal interface.",

      teamSize: 1,
      role: "Full-Stack Developer",
      results: [
        "Unique interactive portfolio experience",
        "Fully functional desktop simulation",
        "Professional showcase of technical skills"
      ],
      status: "Live"
    }
  ];

  private education: Education[] = [
    {
      id: "bachelor",
      degree: "Bachelor of Engineering in Computer Science",
      institution: "MVJ College of Engineering",
      duration: "2020-2024",
      grade: "CGPA: 8.2/10",
      specialization: "Computer Science & Engineering",
      achievements: [
        "Dean's List for 3 consecutive semesters",
        "Best Project Award for Final Year Project",
        "Member of Computer Science Association",
        "Active participation in technical symposiums"
      ],
      projects: ["AI-Based Airport Baggage and Passenger Flow Management System"]
    },
    {
      id: "diploma",
      degree: "Diploma in Computer Science Engineering",
      institution: "Kashmir Government Polytechnic",
      duration: "2017-2020",
      grade: "Percentage: 78.5%",
      achievements: [
        "Rank: 8th in class",
        "Technical Club Member",
        "Organized tech events",
        "Peer tutoring for junior students"
      ],
      projects: ["Student Management System", "E-commerce Website", "Library Management System"]
    }
  ];

  private skills: Skill[] = [
    {
      name: "Python",
      category: "Programming Languages",
      proficiency: 90,
      projects: ["AI Airport System", "OSINT Framework", "ML Models"],
      certifications: ["Python for Data Science (IBM)", "Machine Learning with Python"]
    },
    {
      name: "React.js",
      category: "Frontend Development",
      proficiency: 85,
      projects: ["Portfolio Website", "E-commerce Platforms", "Progressive Web Apps"]
    },
    {
      name: "Machine Learning",
      category: "AI/ML",
      proficiency: 80,
      projects: ["Airport Management System", "Predictive Analytics"],
      certifications: ["Machine Learning Specialization - Stanford University"]
    },
    {
      name: "Cybersecurity",
      category: "Security",
      proficiency: 75,
      projects: ["OSINT Framework", "Threat Analysis Tools"],
      certifications: ["Cybersecurity Fundamentals - Cisco"]
    },
    {
      name: "Node.js",
      category: "Backend Development",
      proficiency: 80,
      projects: ["Portfolio Backend", "API Development", "Real-time Applications"]
    },
    {
      name: "Database Management",
      category: "Data Management",
      proficiency: 85,
      projects: ["Airport System Database", "Portfolio Data Management"]
    }
  ];

  private achievements: Achievement[] = [
    {
      id: "shining-star",
      title: "Shining Star Award",
      organization: "CT University",
      date: "March 2023",
      description: "Recognition for outstanding academic performance and leadership qualities",
      type: "Academic"
    },
    {
      id: "gdg-member",
      title: "Google Developer Groups Active Member",
      organization: "Google Developer Groups",
      date: "2023-Present",
      description: "Active participation in developer community events and knowledge sharing initiatives",
      type: "Professional"
    },
    {
      id: "sports-excellence",
      title: "Sports Excellence Awards",
      organization: "Various Institutions",
      date: "2018-2023",
      description: "Multiple medals and recognition for athletic achievements and team participation",
      type: "Sports"
    },
    {
      id: "best-project",
      title: "Best Final Year Project Award",
      organization: "MVJ College of Engineering",
      date: "May 2024",
      description: "Recognition for innovative AI-based airport management system project",
      type: "Academic"
    }
  ];

  // Getter methods
  getPersonalInfo(): PersonalInfo {
    return this.personalInfo;
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getEducation(): Education[] {
    return this.education;
  }

  getSkills(): Skill[] {
    return this.skills;
  }

  getAchievements(): Achievement[] {
    return this.achievements;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  // Generate complete resume data
  generateResumeData() {
    return {
      personalInfo: this.personalInfo,
      projects: this.projects,
      education: this.education,
      skills: this.skills,
      achievements: this.achievements,
      generatedAt: new Date().toISOString()
    };
  }
}

export const portfolioData = new PortfolioData();