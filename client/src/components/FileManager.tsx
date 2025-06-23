import { useState } from 'react';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  icon: string;
  content?: string;
  children?: FileItem[];
  size?: string;
  modified?: string;
}

interface FileManagerProps {
  folderType: string;
}

export default function FileManager({ folderType }: FileManagerProps) {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const getFolderData = (type: string): FileItem[] => {
    switch (type) {
      case 'education':
        return [
          {
            id: 'bachelor-degree',
            name: 'Bachelor Degree',
            type: 'folder',
            icon: 'fas fa-graduation-cap',
            modified: '2024-05-15',
            children: [
              { id: 'be-transcript', name: 'BE_Transcript.pdf', type: 'file', icon: 'fas fa-certificate', size: '2.5 MB', content: 'Bachelor of Engineering in Computer Science\nMVJ College of Engineering\n\nDuration: 2020-2024\nCGPA: 8.2/10\nSpecialization: Computer Science & Engineering\n\nKey Subjects:\n- Data Structures and Algorithms\n- Machine Learning and AI\n- Database Management Systems\n- Computer Networks\n- Software Engineering\n- Object-Oriented Programming\n- Web Technologies\n- Cybersecurity Fundamentals\n- IoT and Embedded Systems\n\nFinal Year Project: AI-Based Airport Baggage and Passenger Flow Management System\nProject Grade: A+\nProject Guide: Dr. Rajesh Kumar\n\nAcademic Achievements:\n- Dean\'s List for 3 consecutive semesters\n- Best Project Award for Final Year Project\n- Active participation in technical symposiums\n- Member of Computer Science Association' },
              { id: 'project-report', name: 'Final_Year_Project_Report.pdf', type: 'file', icon: 'fas fa-file-pdf', size: '8.3 MB', content: 'AI-Based Airport Baggage and Passenger Flow Management System\nFinal Year Project Report\n\nProject Overview:\nDeveloped an intelligent system using machine learning algorithms to optimize baggage handling and passenger flow in airports. The system reduces wait times by 35% and improves operational efficiency.\n\nTechnologies Used:\n- Python (Primary Language)\n- TensorFlow and Scikit-learn (ML Libraries)\n- OpenCV (Computer Vision)\n- Flask (Web Framework)\n- PostgreSQL (Database)\n- Docker (Containerization)\n\nKey Features:\n1. Real-time passenger flow prediction\n2. Baggage tracking using RFID and computer vision\n3. Queue management optimization\n4. Predictive analytics for peak hours\n5. Mobile app for passenger notifications\n\nResults:\n- 35% reduction in average wait time\n- 28% improvement in baggage handling efficiency\n- 92% accuracy in passenger flow prediction\n- Successfully tested at 3 airport terminals\n\nTeam Members: 4\nRole: Team Lead and ML Engineer\nDuration: 8 months\nBudget: ₹75,000' },
              { id: 'coursework', name: 'coursework_details', type: 'folder', icon: 'fas fa-folder', children: [
                { id: 'semester-grades', name: 'semester_grades.xlsx', type: 'file', icon: 'fas fa-table', size: '156 KB', content: 'Semester-wise Academic Performance\n\nSemester 1 (2020): CGPA 7.8\n- Mathematics I: A\n- Physics: A-\n- Chemistry: B+\n- Programming in C: A+\n- Engineering Graphics: A\n\nSemester 2 (2021): CGPA 8.1\n- Mathematics II: A+\n- Data Structures: A+\n- Object-Oriented Programming: A\n- Digital Electronics: A-\n- Communication Skills: A\n\nSemester 3 (2021): CGPA 8.3\n- Database Management: A+\n- Computer Networks: A\n- Operating Systems: A+\n- Software Engineering: A\n- Web Technologies: A+\n\nSemester 4 (2022): CGPA 8.5\n- Machine Learning: A+\n- Cybersecurity: A+\n- Mobile App Development: A\n- Cloud Computing: A\n- Project Management: A-\n\nOverall CGPA: 8.2/10\nClass Rank: 15/120' }
              ]}
            ]
          },
          {
            id: 'diploma',
            name: 'Diploma',
            type: 'folder',
            icon: 'fas fa-school',
            modified: '2020-06-15',
            children: [
              { id: 'diploma-certificate', name: 'Diploma_Certificate.pdf', type: 'file', icon: 'fas fa-certificate', size: '1.8 MB', content: 'Diploma in Computer Science Engineering\nKashmir Government Polytechnic\n\nDuration: 2017-2020\nPercentage: 78.5%\nRank: 8th in class\n\nCore Subjects:\n- Programming Fundamentals (C, C++)\n- Database Systems\n- Web Development (HTML, CSS, JavaScript)\n- Computer Hardware and Networking\n- Software Development Life Cycle\n- Digital Electronics\n- Computer Graphics\n- System Analysis and Design\n\nMajor Projects:\n1. Student Management System (Final Year)\n2. E-commerce Website\n3. Library Management System\n\nSkills Developed:\n- Strong foundation in programming\n- Understanding of software development\n- Database design and management\n- Web development basics\n- Problem-solving and logical thinking\n\nExtracurricular Activities:\n- Technical Club Member\n- Participated in coding competitions\n- Organized tech events\n- Peer tutoring for junior students' },
              { id: 'project-portfolio', name: 'diploma_projects', type: 'folder', icon: 'fas fa-folder', children: [
                { id: 'student-mgmt', name: 'Student_Management_System.zip', type: 'file', icon: 'fas fa-file-archive', size: '45 MB', content: 'Student Management System - Diploma Final Project\n\nTechnology Stack:\n- Frontend: HTML, CSS, JavaScript\n- Backend: PHP\n- Database: MySQL\n- Server: Apache (XAMPP)\n\nFeatures:\n- Student registration and profile management\n- Course enrollment system\n- Grade tracking and report generation\n- Teacher portal for grade entry\n- Admin dashboard for system management\n- Attendance tracking\n- Fee management module\n\nProject Duration: 6 months\nTeam Size: 3 members\nRole: Lead Developer and Database Designer\nGrade: A+ (95/100)\n\nKey Learning Outcomes:\n- Full-stack web development\n- Database design and normalization\n- User interface design\n- Project management\n- Team collaboration\n- Documentation and testing' }
              ]}
            ]
          },
          {
            id: 'certifications',
            name: 'Certifications & Courses',
            type: 'folder',
            icon: 'fas fa-award',
            children: [
              { id: 'online-courses', name: 'online_learning', type: 'folder', icon: 'fas fa-laptop', children: [
                { id: 'ml-course', name: 'Machine_Learning_Certificate.pdf', type: 'file', icon: 'fas fa-brain', size: '1.2 MB', content: 'Machine Learning Specialization\nCoursera - Stanford University\n\nInstructor: Andrew Ng\nCompletion Date: March 2023\nGrade: 96.8%\n\nCourse Content:\n1. Machine Learning Foundations\n2. Advanced Learning Algorithms\n3. Unsupervised Learning\n4. Recommender Systems\n5. Reinforcement Learning\n\nProjects Completed:\n- Linear Regression for House Price Prediction\n- Neural Network for Image Classification\n- K-means Clustering for Customer Segmentation\n- Recommender System for Movie Recommendations\n- Q-learning for Game AI\n\nSkills Gained:\n- Supervised and Unsupervised Learning\n- Neural Networks and Deep Learning\n- Feature Engineering\n- Model Evaluation and Validation\n- Python for Machine Learning\n- TensorFlow and Scikit-learn' },
                { id: 'cyber-cert', name: 'Cybersecurity_Fundamentals.pdf', type: 'file', icon: 'fas fa-shield-alt', size: '980 KB', content: 'Cybersecurity Fundamentals Certificate\nCisco Networking Academy\n\nCompletion Date: January 2024\nDuration: 70 hours\nGrade: A (92%)\n\nTopics Covered:\n- Information Security Fundamentals\n- Network Security Principles\n- Cryptography and PKI\n- Incident Response and Forensics\n- Risk Assessment and Management\n- Security Policies and Procedures\n- Ethical Hacking Basics\n- OSINT (Open Source Intelligence)\n\nHands-on Labs:\n- Network vulnerability scanning\n- Password cracking techniques\n- Digital forensics investigation\n- Security audit procedures\n- Penetration testing basics\n\nCertification validates understanding of:\n- CIA Triad (Confidentiality, Integrity, Availability)\n- Common attack vectors and mitigation\n- Security frameworks and standards\n- Legal and ethical considerations' }
              ]},
              { id: 'workshops', name: 'workshops_seminars', type: 'folder', icon: 'fas fa-users', children: [
                { id: 'gdg-workshop', name: 'GDG_DevFest_2023.pdf', type: 'file', icon: 'fab fa-google', size: '750 KB', content: 'Google Developer Groups DevFest 2023\nParticipation Certificate\n\nEvent: GDG DevFest Bangalore\nDate: November 25-26, 2023\nVenue: Microsoft Bangalore\n\nWorkshops Attended:\n1. "Building Scalable Web Apps with React"\n2. "Machine Learning with TensorFlow"\n3. "Cloud Computing with Google Cloud Platform"\n4. "Mobile Development with Flutter"\n\nKey Takeaways:\n- Modern web development best practices\n- ML model deployment strategies\n- Cloud architecture patterns\n- Cross-platform mobile development\n\nNetworking:\n- Connected with 50+ developers\n- Exchanged ideas with industry experts\n- Learned about latest tech trends\n- Participated in hackathon (Top 10 finish)\n\nFollow-up Actions:\n- Implemented learnings in personal projects\n- Joined local developer community\n- Started contributing to open source projects' }
              ]}
            ]
          }
        ];
      
      case 'skills':
        return [
          {
            id: 'programming-languages',
            name: 'Programming Languages',
            type: 'folder',
            icon: 'fas fa-code',
            children: [
              { id: 'python-skills', name: 'Python_Expertise.md', type: 'file', icon: 'fab fa-python', size: '3.2 KB', content: 'Python Programming Expertise\n\nProficiency Level: Advanced (4+ years)\n\nCore Strengths:\n- Object-Oriented Programming\n- Data Structures and Algorithms\n- Web Development (Django, Flask)\n- Machine Learning (TensorFlow, Scikit-learn)\n- Data Analysis (Pandas, NumPy, Matplotlib)\n- API Development (FastAPI, REST)\n- Database Integration (SQLAlchemy, PyMongo)\n- Testing (pytest, unittest)\n- Automation Scripts and Tools\n\nProjects Using Python:\n✓ AI Airport Management System\n✓ OSINT Threat Profiling Framework\n✓ Machine Learning Models for Prediction\n✓ Web Scraping and Data Collection Tools\n✓ Automated Testing Frameworks\n\nLibraries & Frameworks:\n- Web: Django, Flask, FastAPI\n- ML/AI: TensorFlow, PyTorch, Scikit-learn\n- Data: Pandas, NumPy, Matplotlib, Seaborn\n- Testing: pytest, unittest, coverage\n- Others: Requests, BeautifulSoup, Selenium\n\nCertifications:\n- Python for Data Science (IBM)\n- Django Web Development\n- Machine Learning with Python' },
              { id: 'javascript-skills', name: 'JavaScript_TypeScript.md', type: 'file', icon: 'fab fa-js', size: '2.8 KB', content: 'JavaScript & TypeScript Skills\n\nProficiency Level: Advanced (3+ years)\n\nFrontend Technologies:\n- React.js (Hooks, Context, Redux)\n- Vue.js (Vue 3, Composition API)\n- TypeScript (Strong typing, interfaces)\n- HTML5 & CSS3 (Responsive design)\n- Tailwind CSS, Bootstrap\n- Modern ES6+ features\n\nBackend Technologies:\n- Node.js & Express.js\n- RESTful API development\n- Database integration (MongoDB, PostgreSQL)\n- Authentication & Authorization\n- Real-time applications (Socket.io)\n\nTools & Build Systems:\n- Webpack, Vite, Parcel\n- npm, yarn package managers\n- ESLint, Prettier for code quality\n- Jest, Cypress for testing\n- Git version control\n\nCurrent Projects:\n✓ Linux Desktop Portfolio (React + TypeScript)\n✓ Real-time Chat Applications\n✓ E-commerce Platforms\n✓ Progressive Web Applications\n\nBest Practices:\n- Component-based architecture\n- State management patterns\n- Performance optimization\n- Accessibility (WCAG guidelines)\n- SEO optimization' },
              { id: 'other-languages', name: 'other_languages.md', type: 'file', icon: 'fas fa-laptop-code', size: '2.1 KB', content: 'Additional Programming Languages\n\nJava (Intermediate - 2+ years):\n- Object-Oriented Programming\n- Spring Boot framework\n- Android Development basics\n- Data Structures implementation\n- Database connectivity (JDBC)\n\nC/C++ (Intermediate - 3+ years):\n- System programming fundamentals\n- Memory management\n- Data structures and algorithms\n- Embedded systems basics\n- Performance-critical applications\n\nPHP (Intermediate - 2+ years):\n- Web development (Laravel framework)\n- Database integration (MySQL)\n- Session management\n- Form handling and validation\n- Content Management Systems\n\nSQL (Advanced - 4+ years):\n- Complex queries and joins\n- Database design and normalization\n- Stored procedures and functions\n- Performance optimization\n- Multiple database systems (MySQL, PostgreSQL, SQLite)\n\nBash/Shell Scripting (Intermediate):\n- Automation scripts\n- System administration\n- File processing\n- Task scheduling\n- Linux system management\n\nR (Basic - for Data Analysis):\n- Statistical computing\n- Data visualization\n- Basic machine learning' }
            ]
          },
          {
            id: 'web-technologies',
            name: 'Web Technologies',
            type: 'folder',
            icon: 'fas fa-globe',
            children: [
              { id: 'frontend-skills', name: 'frontend_expertise.md', type: 'file', icon: 'fas fa-palette', size: '2.9 KB', content: 'Frontend Development Expertise\n\nCore Technologies:\n- HTML5: Semantic markup, accessibility\n- CSS3: Flexbox, Grid, animations, responsive design\n- JavaScript: ES6+, async/await, DOM manipulation\n- TypeScript: Type safety, interfaces, generics\n\nFrameworks & Libraries:\n- React.js (Expert level)\n  • Hooks (useState, useEffect, custom hooks)\n  • Context API for state management\n  • React Router for navigation\n  • Performance optimization (memo, lazy loading)\n  • Component lifecycle management\n\n- Vue.js (Intermediate level)\n  • Vue 3 Composition API\n  • Vuex for state management\n  • Vue Router\n  • Component communication\n\nCSS Frameworks & Preprocessors:\n- Tailwind CSS (Current favorite)\n- Bootstrap (Grid system, components)\n- SCSS/Sass (Variables, mixins, nesting)\n- CSS Modules for component styling\n\nBuild Tools & Development:\n- Vite (Modern build tool)\n- Webpack (Module bundling)\n- npm/yarn (Package management)\n- ESLint + Prettier (Code quality)\n\nTesting:\n- Jest (Unit testing)\n- React Testing Library\n- Cypress (E2E testing)\n\nDesign & UX:\n- Figma for design collaboration\n- Responsive design principles\n- Mobile-first approach\n- Cross-browser compatibility\n- Performance optimization' },
              { id: 'backend-skills', name: 'backend_expertise.md', type: 'file', icon: 'fas fa-server', size: '2.7 KB', content: 'Backend Development Skills\n\nServer-Side Technologies:\n- Node.js & Express.js\n  • RESTful API development\n  • Middleware implementation\n  • Error handling and logging\n  • Authentication & authorization\n  • Rate limiting and security\n\n- Python Web Frameworks\n  • Django (Full-featured framework)\n  • Flask (Lightweight, microservices)\n  • FastAPI (Modern, high-performance)\n\n- PHP Development\n  • Laravel framework\n  • MVC architecture\n  • Eloquent ORM\n\nDatabase Technologies:\n- SQL Databases:\n  • PostgreSQL (Advanced)\n  • MySQL (Advanced)\n  • SQLite (For development)\n  • Database design and optimization\n\n- NoSQL Databases:\n  • MongoDB (Document-based)\n  • Redis (Caching and sessions)\n\nAPI Development:\n- RESTful API design principles\n- GraphQL basics\n- API documentation (Swagger/OpenAPI)\n- Authentication (JWT, OAuth)\n- Rate limiting and throttling\n\nCloud & DevOps:\n- AWS services (EC2, S3, Lambda)\n- Docker containerization\n- CI/CD pipelines\n- Environment management\n- Monitoring and logging\n\nSecurity Best Practices:\n- Input validation and sanitization\n- SQL injection prevention\n- XSS protection\n- HTTPS implementation\n- Security headers and CORS' }
            ]
          },
          {
            id: 'specialized-skills',
            name: 'Specialized Technologies',
            type: 'folder',
            icon: 'fas fa-brain',
            children: [
              { id: 'ai-ml-skills', name: 'AI_ML_expertise.md', type: 'file', icon: 'fas fa-robot', size: '3.5 KB', content: 'Artificial Intelligence & Machine Learning\n\nMachine Learning Algorithms:\n- Supervised Learning:\n  • Linear/Logistic Regression\n  • Decision Trees and Random Forest\n  • Support Vector Machines (SVM)\n  • Neural Networks and Deep Learning\n  • Gradient Boosting (XGBoost, LightGBM)\n\n- Unsupervised Learning:\n  • K-Means and Hierarchical Clustering\n  • Principal Component Analysis (PCA)\n  • Association Rule Mining\n  • Anomaly Detection\n\n- Reinforcement Learning (Basic):\n  • Q-Learning\n  • Policy Gradients\n  • Multi-armed Bandits\n\nDeep Learning:\n- Neural Network Architectures:\n  • Feedforward Networks\n  • Convolutional Neural Networks (CNN)\n  • Recurrent Neural Networks (RNN/LSTM)\n  • Transformer models (basic understanding)\n\nFrameworks & Libraries:\n- TensorFlow (Advanced)\n  • Model building and training\n  • TensorFlow Serving for deployment\n  • Custom layers and loss functions\n\n- Scikit-learn (Expert)\n  • Model selection and evaluation\n  • Feature engineering\n  • Pipeline creation\n  • Cross-validation strategies\n\n- PyTorch (Intermediate)\n  • Dynamic computation graphs\n  • Model training and optimization\n  • Transfer learning\n\nComputer Vision:\n- OpenCV for image processing\n- Image classification and object detection\n- Feature extraction and matching\n- Real-time video analysis\n\nNatural Language Processing (Basic):\n- Text preprocessing and tokenization\n- Sentiment analysis\n- Named Entity Recognition\n- Word embeddings (Word2Vec, GloVe)\n\nData Science Tools:\n- Pandas for data manipulation\n- NumPy for numerical computing\n- Matplotlib/Seaborn for visualization\n- Jupyter Notebooks for experimentation\n- Statistical analysis and hypothesis testing\n\nReal-world Applications:\n✓ Airport passenger flow prediction\n✓ Baggage tracking system using computer vision\n✓ Predictive analytics for operational efficiency\n✓ Anomaly detection in network traffic\n✓ Customer behavior analysis' },
              { id: 'cybersecurity-skills', name: 'cybersecurity_expertise.md', type: 'file', icon: 'fas fa-shield-alt', size: '3.1 KB', content: 'Cybersecurity & Information Security\n\nCore Security Concepts:\n- CIA Triad (Confidentiality, Integrity, Availability)\n- Risk assessment and management\n- Threat modeling and analysis\n- Security frameworks (NIST, ISO 27001)\n- Compliance and regulatory requirements\n\nOSINT (Open Source Intelligence):\n- Information gathering techniques\n- Social media intelligence\n- Domain and network reconnaissance\n- Digital footprint analysis\n- Threat actor profiling\n- Automated data collection tools\n\nTools & Technologies:\n- OSINT Frameworks:\n  • Maltego for data visualization\n  • theHarvester for email gathering\n  • Shodan for device discovery\n  • Custom Python scripts\n\n- Network Security:\n  • Nmap for network scanning\n  • Wireshark for traffic analysis\n  • Metasploit for penetration testing\n  • Burp Suite for web application testing\n\n- Programming for Security:\n  • Python for automation and analysis\n  • Bash scripting for system tasks\n  • Regular expressions for pattern matching\n  • API integration for threat feeds\n\nSecurity Practices:\n- Secure coding practices\n- Input validation and sanitization\n- Authentication and authorization\n- Encryption and cryptography basics\n- Incident response procedures\n- Security awareness and training\n\nCurrent Projects:\n✓ OSINT-based threat profiling framework\n✓ Automated vulnerability assessment tools\n✓ Social engineering awareness training\n✓ Network traffic anomaly detection\n\nEthical Considerations:\n- Legal frameworks and compliance\n- Responsible disclosure practices\n- Privacy protection principles\n- Ethical hacking guidelines\n- Data protection regulations (GDPR)' }
            ]
          }
        ];
      
      case 'projects':
        return [
          {
            id: 'ai-airport',
            name: 'AI Airport System',
            type: 'folder',
            icon: 'fas fa-robot',
            modified: '2024-01-15',
            children: [
              { id: 'readme', name: 'README.md', type: 'file', icon: 'fas fa-file-alt', size: '2.1 KB', content: 'AI-Based Airport Baggage and Passenger Flow Management System\n\nAn intelligent system leveraging AI and machine learning to optimize baggage handling processes and passenger flow management in airports, reducing wait times and improving operational efficiency.\n\nTechnologies: Python, Machine Learning, Computer Vision\nStatus: Completed\nTeam Size: 4 members' },
              { id: 'src', name: 'source_code', type: 'folder', icon: 'fas fa-folder', children: [
                { id: 'main', name: 'main.py', type: 'file', icon: 'fab fa-python', size: '15.3 KB', content: '# AI Airport System Main Module\nimport cv2\nimport numpy as np\nfrom sklearn.cluster import KMeans\n\nclass AirportFlowManager:\n    def __init__(self):\n        self.baggage_tracker = BaggageTracker()\n        self.passenger_flow = PassengerFlow()\n    \n    def optimize_flow(self):\n        # AI optimization logic\n        pass' },
                { id: 'model', name: 'ml_model.pkl', type: 'file', icon: 'fas fa-brain', size: '45.2 MB', content: 'Pre-trained machine learning model for passenger flow prediction and baggage optimization.' }
              ]},
              { id: 'docs', name: 'documentation', type: 'folder', icon: 'fas fa-folder', children: [
                { id: 'design', name: 'system_design.pdf', type: 'file', icon: 'fas fa-file-pdf', size: '3.8 MB', content: 'System architecture and design documentation for the AI Airport Management System.' }
              ]}
            ]
          },
          {
            id: 'osint-framework',
            name: 'OSINT Framework',
            type: 'folder',
            icon: 'fas fa-shield-alt',
            modified: '2024-02-10',
            children: [
              { id: 'readme2', name: 'README.md', type: 'file', icon: 'fas fa-file-alt', size: '1.8 KB', content: 'OSINT-Based Threat Profiling & Reconnaissance Framework\n\nAdvanced automation tool for cybersecurity professionals, combining open-source intelligence gathering with threat analysis capabilities for comprehensive security assessments.\n\nTechnologies: Python, Cybersecurity, OSINT, Automation\nStatus: In Development\nSecurity Level: Confidential' },
              { id: 'tools', name: 'osint_tools', type: 'folder', icon: 'fas fa-folder', children: [
                { id: 'scanner', name: 'threat_scanner.py', type: 'file', icon: 'fab fa-python', size: '8.9 KB', content: '# OSINT Threat Scanner\nimport requests\nimport json\nfrom bs4 import BeautifulSoup\n\nclass ThreatProfiler:\n    def __init__(self, target):\n        self.target = target\n        self.results = {}\n    \n    def scan_domain(self):\n        # Domain reconnaissance\n        pass' }
              ]}
            ]
          },
          {
            id: 'firefighting-drone',
            name: 'Firefighting Drone',
            type: 'folder',
            icon: 'fas fa-helicopter',
            modified: '2024-03-05',
            children: [
              { id: 'readme3', name: 'README.md', type: 'file', icon: 'fas fa-file-alt', size: '1.5 KB', content: 'Hexacopter-Based Firefighting Drone\n\nCost-effective drone prototype designed for rapid fire response, featuring autonomous navigation, thermal imaging, and fire suppression capabilities for emergency situations.\n\nTechnologies: IoT, Drone Technology, Emergency Response\nStatus: Prototype Complete\nFunding: Self-funded' },
              { id: 'hardware', name: 'hardware_specs', type: 'folder', icon: 'fas fa-folder', children: [
                { id: 'schematic', name: 'drone_schematic.pdf', type: 'file', icon: 'fas fa-file-pdf', size: '2.3 MB', content: 'Technical schematic and hardware specifications for the hexacopter firefighting drone.' }
              ]}
            ]
          },
          {
            id: 'portfolio-site',
            name: 'Portfolio Website',
            type: 'folder',
            icon: 'fas fa-desktop',
            modified: '2024-06-22',
            children: [
              { id: 'readme4', name: 'README.md', type: 'file', icon: 'fas fa-file-alt', size: '1.2 KB', content: 'Linux Desktop Portfolio Website\n\nInteractive Linux desktop-inspired portfolio website with cyberpunk hacker terminal interface and Ubuntu-style desktop environment.\n\nTechnologies: React, TypeScript, UI/UX Design\nStatus: Live\nURL: Available on request' }
            ]
          }
        ];
      
      case 'achievements':
        return [
          {
            id: 'academic',
            name: 'Academic Awards',
            type: 'folder',
            icon: 'fas fa-graduation-cap',
            children: [
              { id: 'star-award', name: 'Shining_Star_Award.pdf', type: 'file', icon: 'fas fa-certificate', size: '1.2 MB', content: 'Shining Star Award Certificate from CT University\n\nAwarded for outstanding academic performance and leadership qualities.\n\nDate: March 2023\nInstitution: CT University\nCategory: Academic Excellence' }
            ]
          },
          {
            id: 'professional',
            name: 'Professional Recognition',
            type: 'folder',
            icon: 'fas fa-briefcase',
            children: [
              { id: 'gdg-cert', name: 'GDG_Membership.pdf', type: 'file', icon: 'fab fa-google', size: '800 KB', content: 'Google Developer Groups Membership Certificate\n\nActive participation in developer community events and knowledge sharing initiatives.\n\nOrganization: Google Developer Groups\nRole: Active Member\nContributions: Community Events, Tech Talks' }
            ]
          },
          {
            id: 'sports',
            name: 'Sports Excellence',
            type: 'folder',
            icon: 'fas fa-medal',
            children: [
              { id: 'sports-medals', name: 'Sports_Achievements.pdf', type: 'file', icon: 'fas fa-trophy', size: '1.5 MB', content: 'Sports Excellence Recognition\n\nMultiple medals and recognition for athletic achievements and team participation.\n\nSports: Football, Basketball, Track & Field\nLevel: Inter-college competitions\nAchievements: Multiple medals and certificates' }
            ]
          }
        ];
      
      case 'contact':
        return [
          {
            id: 'personal-info',
            name: 'Personal Information',
            type: 'folder',
            icon: 'fas fa-user',
            children: [
              { id: 'vcard', name: 'contact_card.vcf', type: 'file', icon: 'fas fa-address-card', size: '1 KB', content: 'BEGIN:VCARD\nVERSION:3.0\nFN:Sajid Nazir\nORG:Software Engineer\nTEL:+91 9149559393\nEMAIL:mirsajidd7@gmail.com\nURL:https://www.linkedin.com/in/sajid72543\nADR:;;Whitefield;Bengaluru;Karnataka;560067;India\nEND:VCARD' }
            ]
          },
          {
            id: 'social-media',
            name: 'Social Profiles',
            type: 'folder',
            icon: 'fas fa-share-alt',
            children: [
              { id: 'linkedin', name: 'LinkedIn_Profile.url', type: 'file', icon: 'fab fa-linkedin', size: '200 B', content: '[InternetShortcut]\nURL=https://www.linkedin.com/in/sajid72543\nIconFile=linkedin.ico' }
            ]
          }
        ];
      
      case 'hobbies':
        return [
          {
            id: 'fitness',
            name: 'Fitness & Sports',
            type: 'folder',
            icon: 'fas fa-dumbbell',
            children: [
              { id: 'workout-log', name: 'workout_log.txt', type: 'file', icon: 'fas fa-chart-line', size: '5.2 KB', content: 'Personal Fitness Journey\n\nDaily workout routines and fitness goals tracking.\n\nActivities:\n- Gym workouts (5x/week)\n- Football (weekends)\n- Basketball (occasional)\n- Running (morning routine)\n\nGoals: Maintaining physical fitness and mental wellness' }
            ]
          },
          {
            id: 'creative',
            name: 'Creative Pursuits',
            type: 'folder',
            icon: 'fas fa-palette',
            children: [
              { id: 'music', name: 'singing_recordings', type: 'folder', icon: 'fas fa-music', children: [
                { id: 'recording1', name: 'practice_session_01.mp3', type: 'file', icon: 'fas fa-file-audio', size: '4.8 MB', content: 'Audio recording of singing practice session focusing on vocal range and technique improvement.' }
              ]},
              { id: 'cooking', name: 'recipe_collection.txt', type: 'file', icon: 'fas fa-utensils', size: '3.1 KB', content: 'Personal Recipe Collection\n\nFavorite recipes and cooking experiments:\n\n1. Traditional Kashmiri Cuisine\n2. Italian Pasta variations\n3. Healthy breakfast options\n4. Weekend special dishes\n\nCooking Philosophy: Experimenting with flavors and creating memorable meals' }
            ]
          },
          {
            id: 'travel',
            name: 'Travel Memories',
            type: 'folder',
            icon: 'fas fa-plane',
            children: [
              { id: 'travel-log', name: 'travel_journal.txt', type: 'file', icon: 'fas fa-map', size: '7.8 KB', content: 'Travel Journal\n\nExploring new places and cultures:\n\n• Kashmir - Home region exploration\n• Bengaluru - Tech city life\n• Delhi - Capital city experiences\n• Goa - Beach and culture\n\nTravel Goals: Experiencing diverse cultures and gaining fresh perspectives through exploration' }
            ]
          }
        ];
      
      default:
        return [];
    }
  };

  const getCurrentItems = (): FileItem[] => {
    let items = getFolderData(folderType);
    
    for (const pathSegment of currentPath) {
      const currentFolder = items.find(item => item.id === pathSegment);
      if (currentFolder && currentFolder.children) {
        items = currentFolder.children;
      }
    }
    
    return items;
  };

  const navigateToFolder = (folderId: string) => {
    setCurrentPath([...currentPath, folderId]);
    setSelectedFile(null);
  };

  const navigateBack = () => {
    setCurrentPath(currentPath.slice(0, -1));
    setSelectedFile(null);
  };

  const openFile = (fileId: string) => {
    setSelectedFile(fileId);
  };

  const getSelectedFileContent = () => {
    const items = getCurrentItems();
    const file = items.find(item => item.id === selectedFile);
    return file?.content || '';
  };

  const currentItems = getCurrentItems();
  const selectedFileContent = selectedFile ? getSelectedFileContent() : null;

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col sm:flex-row">
      {/* File Browser */}
      <div className={`${selectedFile ? 'hidden sm:flex sm:w-1/2' : 'flex w-full'} border-r border-gray-700 flex-col`}>
        {/* Navigation Bar */}
        <div className="bg-gray-800 p-2 sm:p-3 border-b border-gray-700 flex items-center space-x-2">
          {currentPath.length > 0 && (
            <button
              onClick={navigateBack}
              className="px-2 sm:px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs sm:text-sm flex items-center space-x-1"
            >
              <i className="fas fa-arrow-left text-xs"></i>
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-300 overflow-hidden">
            <i className="fas fa-folder"></i>
            <span className="truncate">{folderType}</span>
            {currentPath.map((path, index) => (
              <span key={index} className="hidden sm:inline">
                <i className="fas fa-chevron-right mx-1"></i>
                {path}
              </span>
            ))}
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 overflow-auto p-2 sm:p-4">
          <div className="grid gap-1 sm:gap-2">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded hover:bg-gray-800 cursor-pointer transition-colors ${
                  selectedFile === item.id ? 'bg-gray-800 border border-[var(--ubuntu-orange)]' : ''
                }`}
                onClick={() => item.type === 'folder' ? navigateToFolder(item.id) : openFile(item.id)}
              >
                <i className={`${item.icon} text-[var(--ubuntu-orange)] w-4 sm:w-5 text-sm sm:text-base`}></i>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm sm:text-base truncate">{item.name}</div>
                  {item.size && (
                    <div className="text-xs text-gray-400">{item.size} • {item.modified}</div>
                  )}
                </div>
                {item.type === 'folder' && (
                  <i className="fas fa-chevron-right text-gray-500 text-xs sm:text-sm"></i>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* File Preview */}
      {selectedFile && (
        <div className="flex flex-col w-full sm:w-1/2">
          <div className="bg-gray-800 p-2 sm:p-3 border-b border-gray-700 flex items-center justify-between">
            <span className="font-medium text-sm sm:text-base truncate">File Preview</span>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
          <div className="flex-1 overflow-auto p-2 sm:p-4">
            <pre className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
              {selectedFileContent}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}