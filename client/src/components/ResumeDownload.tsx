import { useState } from 'react';
import jsPDF from 'jspdf';

export default function ResumeDownload() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndDownloadResume = async () => {
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/resume/text');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Sajid_Nazir_Resume.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error('Failed to download resume');
      }
    } catch (error) {
      console.error('Resume download failed:', error);
      alert('Failed to download resume. Please try again or contact mirsajidd7@gmail.com directly.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDFResume = async () => {
    setIsGenerating(true);
    
    try {
      // Fetch portfolio data from API
      const response = await fetch('/api/portfolio/complete');
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio data');
      }
      
      const apiResponse = await response.json();
      if (!apiResponse.success) {
        throw new Error(apiResponse.error || 'Failed to fetch portfolio data');
      }
      
      const data = apiResponse.data;
      
      // Create PDF using jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - (2 * margin);
      let yPosition = margin;
      
      // Helper function to add text with proper spacing
      const addText = (text: string, fontSize: number = 10, isBold: boolean = false, color: string = '#000000') => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
        pdf.setTextColor(color);
        
        const lines = pdf.splitTextToSize(text, contentWidth);
        lines.forEach((line: string) => {
          if (yPosition > 270) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin, yPosition);
          yPosition += fontSize * 0.5;
        });
        yPosition += 5;
      };
      
      const addSection = (title: string) => {
        yPosition += 5;
        addText(title, 14, true, '#0077B5');
        yPosition += 2;
      };
      
      // Header Section
      addText('SAJID NAZIR', 20, true, '#0077B5');
      addText(data.personalInfo.title, 14, false, '#333333');
      addText(`${data.personalInfo.email} | ${data.personalInfo.phone}`, 10);
      addText(`${data.personalInfo.linkedin} | ${data.personalInfo.location}`, 10);
      
      // Professional Summary
      addSection('PROFESSIONAL SUMMARY');
      addText(data.personalInfo.summary, 10);
      
      // Technical Skills
      addSection('TECHNICAL SKILLS');
      const skillsByCategory = data.skills.reduce((acc: any, skill: any) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      }, {});
      
      Object.entries(skillsByCategory).forEach(([category, skills]: [string, any]) => {
        addText(`${category}:`, 11, true);
        (skills as any[]).forEach(skill => {
          addText(`• ${skill.name} (${skill.proficiency}% proficiency)`, 10);
        });
      });
      
      // Professional Projects
      addSection('PROFESSIONAL PROJECTS');
      data.projects.forEach((project: any) => {
        addText(project.title, 12, true);
        addText(`Role: ${project.role || 'Developer'} | Team Size: ${project.teamSize || 1}`, 10);
        addText(`Technologies: ${project.technologies.join(', ')}`, 10);
        addText(project.description, 10);
        
        if (project.results && project.results.length > 0) {
          addText('Key Results:', 10, true);
          project.results.forEach((result: string) => {
            addText(`• ${result}`, 10);
          });
        }
        yPosition += 3;
      });
      
      // Education
      addSection('EDUCATION');
      data.education.forEach((edu: any) => {
        addText(`${edu.degree}${edu.specialization ? ' - ' + edu.specialization : ''}`, 12, true);
        addText(`${edu.institution} | ${edu.duration} | Grade: ${edu.grade}`, 10);
        if (edu.achievements && edu.achievements.length > 0) {
          addText(`Achievements: ${edu.achievements.join(', ')}`, 10);
        }
        if (edu.projects && edu.projects.length > 0) {
          addText(`Notable Projects: ${edu.projects.join(', ')}`, 10);
        }
        yPosition += 2;
      });
      
      // Achievements & Certifications
      addSection('ACHIEVEMENTS & CERTIFICATIONS');
      data.achievements.forEach((achievement: any) => {
        addText(`${achievement.title}`, 11, true);
        addText(`${achievement.organization} | ${achievement.date}`, 10);
        addText(achievement.description, 10);
        yPosition += 2;
      });
      
      // Footer
      yPosition += 10;
      addText(`Generated on: ${new Date().toLocaleDateString()} | Contact: mirsajidd7@gmail.com`, 8, false, '#666666');
      
      // Save the PDF
      pdf.save('Sajid_Nazir_Resume.pdf');
      
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF resume. Please try the text version or contact mirsajidd7@gmail.com directly.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 space-y-6 text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Resume Download</h2>
        <p className="text-gray-300">Download my complete professional resume</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Text Resume */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <div className="text-center mb-4">
            <i className="fas fa-file-alt text-4xl text-[var(--ubuntu-orange)] mb-3"></i>
            <h3 className="text-xl font-bold text-white mb-2">Text Format</h3>
            <p className="text-gray-300 text-sm mb-4">Complete resume in readable text format</p>
          </div>
          
          <div className="space-y-3 text-sm text-gray-300 mb-4">
            <div className="flex justify-between">
              <span>Format:</span>
              <span className="text-white">.txt</span>
            </div>
            <div className="flex justify-between">
              <span>Size:</span>
              <span className="text-white">~8 KB</span>
            </div>
            <div className="flex justify-between">
              <span>Compatibility:</span>
              <span className="text-white">Universal</span>
            </div>
          </div>

          <button
            onClick={generateAndDownloadResume}
            disabled={isGenerating}
            className="w-full bg-[var(--ubuntu-orange)] hover:bg-opacity-80 disabled:bg-opacity-50 text-white font-medium py-3 px-4 rounded transition-colors flex items-center justify-center space-x-2"
          >
            {isGenerating ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <i className="fas fa-download"></i>
                <span>Download Text Resume</span>
              </>
            )}
          </button>
        </div>

        {/* PDF Resume */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
          <div className="text-center mb-4">
            <i className="fas fa-file-pdf text-4xl text-red-500 mb-3"></i>
            <h3 className="text-xl font-bold text-white mb-2">PDF Format</h3>
            <p className="text-gray-300 text-sm mb-4">Professionally formatted PDF resume</p>
          </div>
          
          <div className="space-y-3 text-sm text-gray-300 mb-4">
            <div className="flex justify-between">
              <span>Format:</span>
              <span className="text-white">.pdf</span>
            </div>
            <div className="flex justify-between">
              <span>Size:</span>
              <span className="text-white">~200 KB</span>
            </div>
            <div className="flex justify-between">
              <span>Layout:</span>
              <span className="text-white">Professional</span>
            </div>
          </div>

          <button
            onClick={generatePDFResume}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded transition-colors flex items-center justify-center space-x-2"
          >
            <i className="fas fa-file-pdf"></i>
            <span>Request PDF Resume</span>
          </button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-600">
        <h3 className="text-lg font-bold text-[var(--ubuntu-orange)] mb-4">
          <i className="fas fa-eye mr-2"></i>Resume Preview
        </h3>
        <div className="bg-gray-900 p-4 rounded font-mono text-sm text-gray-300 max-h-64 overflow-y-auto">
          <div className="text-white font-bold">SAJID NAZIR</div>
          <div className="text-gray-400">Software Engineer & Technology Enthusiast</div>
          <div className="mt-2 text-xs">
            📧 mirsajidd7@gmail.com | 📱 +91 9149559393<br/>
            🔗 linkedin.com/in/sajid72543 | 📍 Bengaluru, India
          </div>
          <div className="mt-4 text-[var(--ubuntu-orange)]">TECHNICAL SKILLS</div>
          <div className="text-xs mt-1">
            • Programming: Python, JavaScript, TypeScript, Java, C++<br/>
            • Web: React.js, Node.js, Django, Flask, Express.js<br/>
            • AI/ML: TensorFlow, PyTorch, Scikit-learn, OpenCV<br/>
            • Databases: PostgreSQL, MongoDB, MySQL, Redis<br/>
            • Cloud: AWS, Docker, CI/CD Pipelines
          </div>
          <div className="mt-4 text-[var(--ubuntu-orange)]">KEY PROJECTS</div>
          <div className="text-xs mt-1">
            • AI Airport Management System - 35% efficiency improvement<br/>
            • OSINT Threat Profiling Framework - Cybersecurity automation<br/>
            • Firefighting Drone - Emergency response prototype<br/>
            • Linux Desktop Portfolio - Interactive web experience
          </div>
          <div className="mt-4 text-gray-500 text-center">... [Complete resume available for download] ...</div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-[var(--ubuntu-orange)] bg-opacity-10 border border-[var(--ubuntu-orange)] rounded-lg p-4">
        <div className="flex items-center justify-center space-x-4 text-[var(--ubuntu-orange)]">
          <i className="fas fa-info-circle"></i>
          <span className="font-medium">
            For a custom formatted resume or additional information, feel free to contact me directly
          </span>
        </div>
      </div>
    </div>
  );
}