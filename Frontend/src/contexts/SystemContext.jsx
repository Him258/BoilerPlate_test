import React, { createContext, useContext, useState } from 'react';

const SystemContext = createContext();

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};

const initialTemplates = [
  { id: 1, name: "Welcome Email", subject: "Welcome to Kiaan Core!", body: "Hi {{name}},\n\nWelcome to our platform. We are excited to have you on board.\n\nBest,\nTeam" },
  { id: 2, name: "Follow-up Email", subject: "Checking in", body: "Hi {{name}},\n\nI just wanted to follow up on our previous conversation.\n\nThanks,\nSales Team" },
];

const initialSmsTemplates = [
  { id: 1, name: "OTP Verification", body: "Your Kiaan Core verification code is {{otp}}." },
  { id: 2, name: "Payment Reminder", body: "Hi {{name}}, your payment of {{amount}} is due." },
];

const initialWhatsappTemplates = [
  { id: 1, name: "Order Confirmation", body: "Hi {{name}}, your order #{{order_id}} has been confirmed.", status: "Approved" },
  { id: 2, name: "Welcome Message", body: "Welcome to Kiaan Core, {{name}}!", status: "Pending" },
];

const initialAiTemplates = [
  { id: 1, name: "Blog Post Generator", model: "GPT-4", prompt: "Write a blog post about {{topic}} focusing on {{keyword}}." },
  { id: 2, name: "Code Reviewer", model: "Claude 3", prompt: "Review this code and suggest improvements: \n{{code}}" },
];

const initialAiSettings = [
  { id: 1, provider: "OpenAI", status: "Active", apiKey: "sk-..." },
  { id: 2, provider: "Anthropic", status: "Not Configured", apiKey: "" },
  { id: 3, provider: "Google Gemini", status: "Active", apiKey: "AIza..." },
];

const initialFiles = [
  { id: 1, name: "Project_Proposal_v2.pdf", type: "pdf", size: "2.4 MB", date: "Oct 12, 2023", color: "text-red-500" },
  { id: 2, name: "Dashboard_Mockup.png", type: "image", size: "4.1 MB", date: "Oct 15, 2023", color: "text-blue-500" },
  { id: 3, name: "Client_Assets", type: "folder", size: "--", date: "Oct 18, 2023", color: "text-yellow-500" },
];

const initialAuditLogs = [
  { id: 1, type: "LOGIN", message: "User Alice Freeman logged in", user: "Alice Freeman", ip: "192.168.1.1", time: new Date(Date.now() - 3600000).toLocaleString() },
  { id: 2, type: "API", message: "GET /api/v1/users", status: "200 OK", user: "System", ip: "10.0.0.1", time: new Date(Date.now() - 7200000).toLocaleString() },
];

const initialAILogs = [
  { id: 1, provider: "OpenAI", prompt: "Write a marketing email for SaaS...", tokens: 150, time: new Date(Date.now() - 5000000).toLocaleString() }
];

export const SystemProvider = ({ children }) => {
  const [emailTemplates, setEmailTemplates] = useState(initialTemplates);
  const [smsTemplates, setSmsTemplates] = useState(initialSmsTemplates);
  const [whatsappTemplates, setWhatsappTemplates] = useState(initialWhatsappTemplates);
  const [aiTemplates, setAiTemplates] = useState(initialAiTemplates);
  const [aiSettings, setAiSettings] = useState(initialAiSettings);
  
  const [files, setFiles] = useState(initialFiles);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [aiLogs, setAILogs] = useState(initialAILogs);
  const [aiTokensUsed, setAiTokensUsed] = useState(125000); // Mocks 125K tokens used

  const addAuditLog = (type, message, user = "Current User", status = "Success") => {
    const newLog = {
      id: Date.now(),
      type,
      message,
      user,
      ip: "192.168.1.100", // mock IP
      status,
      time: new Date().toLocaleString()
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const logAIUsage = (provider, promptSnippet, tokensSpent) => {
    const newLog = {
      id: Date.now(),
      provider,
      prompt: promptSnippet,
      tokens: tokensSpent,
      time: new Date().toLocaleString()
    };
    setAILogs([newLog, ...aiLogs]);
    setAiTokensUsed(prev => prev + tokensSpent);
  };

  const uploadFile = (file) => {
    setFiles([{ ...file, id: Date.now() }, ...files]);
    addAuditLog("FILE", `Uploaded file: ${file.name}`);
  };

  return (
    <SystemContext.Provider value={{ 
      emailTemplates, setEmailTemplates,
      smsTemplates, setSmsTemplates,
      whatsappTemplates, setWhatsappTemplates,
      aiTemplates, setAiTemplates,
      aiSettings, setAiSettings,
      files, uploadFile,
      auditLogs, addAuditLog,
      aiLogs, logAIUsage,
      aiTokensUsed
    }}>
      {children}
    </SystemContext.Provider>
  );
};
