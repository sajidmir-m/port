import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { logPageView, getAnalytics } from "./database";
import { portfolioData } from "./portfolio";
import { pdfGenerator } from "./pdfGenerator";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add CORS and security headers
  app.use("/api", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');
    next();
  });

  // Portfolio API endpoints with error handling
  app.get("/api/portfolio/personal", (req, res) => {
    try {
      const data = portfolioData.getPersonalInfo();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch personal information" });
    }
  });

  app.get("/api/portfolio/projects", (req, res) => {
    try {
      const data = portfolioData.getProjects();
      res.json({ success: true, data, count: data.length });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch projects" });
    }
  });

  app.get("/api/portfolio/projects/:id", (req, res) => {
    try {
      const project = portfolioData.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, error: "Project not found" });
      }
      res.json({ success: true, data: project });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch project" });
    }
  });

  app.get("/api/portfolio/education", (req, res) => {
    try {
      const data = portfolioData.getEducation();
      res.json({ success: true, data, count: data.length });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch education data" });
    }
  });

  app.get("/api/portfolio/skills", (req, res) => {
    try {
      const category = req.query.category as string;
      const data = category 
        ? portfolioData.getSkillsByCategory(category)
        : portfolioData.getSkills();
      res.json({ success: true, data, count: data.length, category: category || 'all' });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch skills data" });
    }
  });

  app.get("/api/portfolio/achievements", (req, res) => {
    try {
      const data = portfolioData.getAchievements();
      res.json({ success: true, data, count: data.length });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch achievements" });
    }
  });

  app.get("/api/portfolio/complete", (req, res) => {
    try {
      const data = portfolioData.generateResumeData();
      res.json({ 
        success: true, 
        data,
        meta: {
          generated: new Date().toISOString(),
          version: '1.0',
          contact: data.personalInfo.email
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to generate complete portfolio data" });
    }
  });

  // Resume download endpoints
  app.get("/api/resume/text", (req, res) => {
    const data = portfolioData.generateResumeData();
    
    const textResume = `
SAJID NAZIR
Software Engineer & Technology Enthusiast
📧 ${data.personalInfo.email} | 📱 ${data.personalInfo.phone}
🔗 ${data.personalInfo.linkedin} | 📍 ${data.personalInfo.location}

==================================================
PROFESSIONAL SUMMARY
==================================================
${data.personalInfo.summary}

==================================================
TECHNICAL SKILLS
==================================================
${data.skills.map(skill => `• ${skill.name}: ${skill.proficiency}% proficiency`).join('\n')}

==================================================
PROFESSIONAL PROJECTS
==================================================
${data.projects.map(project => `
${project.title}
Team Size: ${project.teamSize || 1} | Role: ${project.role || 'Developer'}
Technologies: ${project.technologies.join(', ')}

${project.description}

${project.results ? 'Key Results:\n' + project.results.map(result => `• ${result}`).join('\n') : ''}
Status: ${project.status}
`).join('\n' + '='.repeat(50) + '\n')}

==================================================
EDUCATION
==================================================
${data.education.map(edu => `
${edu.degree}
${edu.institution} | ${edu.duration} | ${edu.grade}
${edu.specialization ? 'Specialization: ' + edu.specialization : ''}

Key Achievements:
${edu.achievements.map(achievement => `• ${achievement}`).join('\n')}
`).join('\n')}

==================================================
ACHIEVEMENTS & RECOGNITION
==================================================
${data.achievements.map(achievement => `
${achievement.title} - ${achievement.organization} (${achievement.date})
${achievement.description}
`).join('\n')}

==================================================
CONTACT INFORMATION
==================================================
Email: ${data.personalInfo.email}
Phone: ${data.personalInfo.phone}
LinkedIn: ${data.personalInfo.linkedin}
Location: ${data.personalInfo.location}

Generated on: ${new Date().toLocaleDateString()}
Available for remote, hybrid, or on-site opportunities
    `.trim();

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="Sajid_Nazir_Resume.txt"');
    res.send(textResume);
  });

  app.get("/api/resume/pdf", async (req, res) => {
    try {
      const textBuffer = await pdfGenerator.generatePDF();
      
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Disposition', 'attachment; filename="Sajid_Nazir_Resume.txt"');
      res.setHeader('Content-Length', textBuffer.length);
      
      res.send(textBuffer);
    } catch (error) {
      console.error('Resume generation failed:', error);
      res.status(503).json({ 
        error: "Resume generation temporarily unavailable. Please contact mirsajidd7@gmail.com" 
      });
    }
  });

  // Analytics endpoint
  app.get("/api/analytics", (req, res) => {
    try {
      const analytics = getAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // Log page views
  app.post("/api/log-view", (req, res) => {
    try {
      const { page } = req.body;
      const ipAddress = req.ip || req.connection.remoteAddress || "unknown";
      const userAgent = req.get("User-Agent") || "unknown";
      
      logPageView(ipAddress, userAgent, page);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to log page view" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
