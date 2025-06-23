import { portfolioData } from './portfolio';

export class PDFGenerator {
  
  generateResumeHTML(): string {
    const data = portfolioData.generateResumeData();
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Sajid Nazir - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.4;
            color: #333;
            font-size: 11px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #E95420;
            padding-bottom: 15px;
        }
        
        .name {
            font-size: 24px;
            font-weight: bold;
            color: #E95420;
            margin-bottom: 5px;
        }
        
        .title {
            font-size: 14px;
            color: #666;
            margin-bottom: 8px;
        }
        
        .contact-info {
            font-size: 10px;
            color: #555;
        }
        
        .section {
            margin-bottom: 20px;
        }
        
        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #E95420;
            margin-bottom: 8px;
            text-transform: uppercase;
            border-bottom: 1px solid #ddd;
            padding-bottom: 3px;
        }
        
        .summary {
            text-align: justify;
            color: #555;
            font-size: 11px;
            line-height: 1.5;
        }
        
        .education-item, .project-item, .achievement-item {
            margin-bottom: 12px;
            page-break-inside: avoid;
        }
        
        .education-title, .project-title, .achievement-title {
            font-weight: bold;
            color: #333;
            font-size: 12px;
        }
        
        .education-institution, .project-tech {
            color: #666;
            font-size: 10px;
            margin-bottom: 3px;
        }
        
        .project-description, .achievement-description {
            color: #555;
            font-size: 10px;
            margin-bottom: 5px;
            text-align: justify;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-top: 5px;
        }
        
        .skill-category {
            margin-bottom: 8px;
        }
        
        .skill-category-title {
            font-weight: bold;
            color: #E95420;
            font-size: 11px;
            margin-bottom: 3px;
        }
        
        .skill-item {
            font-size: 10px;
            color: #555;
            margin-bottom: 2px;
        }
        
        .tech-tags {
            margin-top: 5px;
        }
        
        .tech-tag {
            display: inline-block;
            background: #E95420;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 8px;
            margin-right: 4px;
            margin-bottom: 2px;
        }
        
        .results-list {
            margin-top: 5px;
            padding-left: 15px;
        }
        
        .results-list li {
            font-size: 10px;
            color: #555;
            margin-bottom: 2px;
        }
        
        .achievements-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        
        .page-break {
            page-break-before: always;
        }
        
        .two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="name">${data.personalInfo.name}</div>
            <div class="title">${data.personalInfo.title}</div>
            <div class="contact-info">
                📧 ${data.personalInfo.email} | 📱 ${data.personalInfo.phone}<br>
                🔗 ${data.personalInfo.linkedin} | 📍 ${data.personalInfo.location}
            </div>
        </div>
        
        <!-- Professional Summary -->
        <div class="section">
            <div class="section-title">Professional Summary</div>
            <div class="summary">${data.personalInfo.summary}</div>
        </div>
        
        <!-- Technical Skills -->
        <div class="section">
            <div class="section-title">Technical Skills</div>
            <div class="skills-grid">
                ${this.groupSkillsByCategory(data.skills).map(category => `
                    <div class="skill-category">
                        <div class="skill-category-title">${category.name}:</div>
                        ${category.skills.map(skill => `
                            <div class="skill-item">• ${skill.name} (${skill.proficiency}%)</div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Professional Projects -->
        <div class="section">
            <div class="section-title">Professional Projects</div>
            ${data.projects.map(project => `
                <div class="project-item">
                    <div class="project-title">${project.title}</div>
                    <div class="project-tech">Team Size: ${project.teamSize || 1} | Role: ${project.role || 'Developer'}</div>
                    <div class="project-description">${project.description}</div>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    ${project.results ? `
                        <ul class="results-list">
                            ${project.results.map(result => `<li>${result}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `).join('')}
        </div>
        
        <!-- Education -->
        <div class="section">
            <div class="section-title">Education</div>
            ${data.education.map(edu => `
                <div class="education-item">
                    <div class="education-title">${edu.degree}</div>
                    <div class="education-institution">${edu.institution} | ${edu.duration} | ${edu.grade}</div>
                    ${edu.achievements.length > 0 ? `
                        <ul class="results-list">
                            ${edu.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
            `).join('')}
        </div>
        
        <!-- Achievements & Recognition -->
        <div class="section">
            <div class="section-title">Achievements & Recognition</div>
            <div class="achievements-grid">
                ${data.achievements.map(achievement => `
                    <div class="achievement-item">
                        <div class="achievement-title">${achievement.title}</div>
                        <div class="education-institution">${achievement.organization} | ${achievement.date}</div>
                        <div class="achievement-description">${achievement.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <!-- Additional Information -->
        <div class="section">
            <div class="section-title">Additional Information</div>
            <div class="two-column">
                <div>
                    <div class="skill-category-title">Languages:</div>
                    <div class="skill-item">• English: Fluent (Professional Working Proficiency)</div>
                    <div class="skill-item">• Hindi: Native Speaker</div>
                    <div class="skill-item">• Urdu: Native Speaker</div>
                </div>
                <div>
                    <div class="skill-category-title">Interests:</div>
                    <div class="skill-item">• Fitness & Sports</div>
                    <div class="skill-item">• Cooking & Travel</div>
                    <div class="skill-item">• Continuous Learning</div>
                    <div class="skill-item">• Open Source Contribution</div>
                </div>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; margin-top: 20px; font-size: 9px; color: #888; border-top: 1px solid #ddd; padding-top: 10px;">
            Generated on: ${new Date().toLocaleDateString()} | Last Updated: June 2024<br>
            Available for remote, hybrid, or on-site opportunities
        </div>
    </div>
</body>
</html>`;
  }
  
  private groupSkillsByCategory(skills: any[]) {
    const categories = [...new Set(skills.map(skill => skill.category))];
    return categories.map(categoryName => ({
      name: categoryName,
      skills: skills.filter(skill => skill.category === categoryName)
    }));
  }
  
  async generatePDF(): Promise<Buffer> {
    // Using jsPDF for client-side PDF generation fallback
    const resumeText = this.generateResumeText();
    const buffer = Buffer.from(resumeText, 'utf-8');
    return buffer;
  }

  generateResumeText(): string {
    const personalInfo = portfolioData.getPersonalInfo();
    const projects = portfolioData.getProjects();
    const education = portfolioData.getEducation();
    const skills = portfolioData.getSkills();
    const achievements = portfolioData.getAchievements();

    return `SAJID NAZIR - RESUME
${personalInfo.title}
Email: ${personalInfo.email} | Phone: ${personalInfo.phone}
LinkedIn: ${personalInfo.linkedin} | Location: ${personalInfo.location}

PROFESSIONAL SUMMARY
${personalInfo.summary}

EDUCATION
${education.map(edu => `${edu.degree} - ${edu.institution} (${edu.duration})\nGrade: ${edu.grade}\nAchievements: ${edu.achievements.join(', ')}`).join('\n\n')}

TECHNICAL SKILLS
${skills.map(skill => `${skill.name} (${skill.category}) - ${skill.proficiency}% proficiency`).join('\n')}

PROFESSIONAL PROJECTS
${projects.map(project => `${project.title}\nTechnologies: ${project.technologies.join(', ')}\n${project.description}\nResults: ${project.results?.join(', ') || 'Successful completion'}`).join('\n\n')}

ACHIEVEMENTS
${achievements.map(achievement => `${achievement.title} - ${achievement.organization} (${achievement.date})\n${achievement.description}`).join('\n\n')}

Generated: ${new Date().toLocaleDateString()}`;
  }
}

export const pdfGenerator = new PDFGenerator();