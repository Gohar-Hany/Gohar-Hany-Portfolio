# 📢 Marketing System | AI-Powered Content Strategy & 30-Day Calendar Generation

> **Intelligent Marketing with Content Calendar Generation, Art Direction Prompts, Multi-Platform Targeting & AIDA Copywriting**

---

## System Overview

This marketing system implements an **AI-powered content strategy engine** that generates comprehensive 30-day content calendars with **art direction prompts**, **platform-optimized copy**, and **strategic alignment**. The architecture demonstrates **market research-to-content pipeline**, **batch processing**, and **structured JSON output** for immediate execution.

**Critical Pattern:** The system uses **Google Gemini AI** in a "Universal Senior Content Strategist & Master Art Director" role to transform market research and strategy plans into actionable, visual-first content matrices.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       MARKETING STRATEGY SYSTEM                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    INPUT SOURCES                                      │   │
│  │                                                                        │   │
│  │  ┌────────────────────────┐    ┌────────────────────────────────┐    │   │
│  │  │  Market Research Data  │    │  Generated Marketing Plan      │    │   │
│  │  │  (Google Sheets)       │    │  (Google Sheets)               │    │   │
│  │  │  • Audience analysis   │    │  • Authority Pillars           │    │   │
│  │  │  • Pain points         │    │  • Strategic goals             │    │   │
│  │  │  • Competitor insights │    │  • Target platforms            │    │   │
│  │  └────────────────────────┘    └────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────┴────────────────────────────────────┐   │
│  │                    AI CONTENT GENERATION                              │   │
│  │                                                                        │   │
│  │  ┌────────────────────────────────────────────────────────────────┐  │   │
│  │  │  Google Gemini AI Agent                                         │  │   │
│  │  │  Role: Universal Senior Content Strategist & Master Art Director│  │   │
│  │  │                                                                  │  │   │
│  │  │  Outputs for each of 30 days:                                   │  │   │
│  │  │  • Day_Number                                                    │  │   │
│  │  │  • Authority_Pillar                                             │  │   │
│  │  │  • Platform_Target (LinkedIn/Instagram/X/TikTok)                │  │   │
│  │  │  • Content_Format (Post/Reel/Carousel/Thread)                   │  │   │
│  │  │  • The_Hook (scroll-stopper)                                    │  │   │
│  │  │  • Full_Caption (AIDA framework)                                │  │   │
│  │  │  • Art_Direction_Prompt (ultra-precise visual direction)        │  │   │
│  │  │  • Visual_Text_Overlay                                          │  │   │
│  │  │  • Strategic_Goal                                               │  │   │
│  │  │  • Design_Reference_Style                                       │  │   │
│  │  └────────────────────────────────────────────────────────────────┘  │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────┴────────────────────────────────────┐   │
│  │                    PROCESSING & STORAGE                               │   │
│  │                                                                        │   │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐│   │
│  │  │ Parse JSON       │──│ Batch Process    │──│ Append to Calendar   ││   │
│  │  │ (Code Node)      │  │ (Split in Batches│  │ (Google Sheets)      ││   │
│  │  │ Clean markdown   │  │ Error handling   │  │ Rate limit delay     ││   │
│  │  └──────────────────┘  └──────────────────┘  └──────────────────────┘│   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────┴────────────────────────────────────┐   │
│  │                    API ENDPOINTS                                      │   │
│  │  • POST /Content-Calender-n    - Generate full calendar             │   │
│  │  • GET /Content-Calender-n     - Retrieve existing calendar          │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Technical Stack Deep-Dive

### **Data Sources**

| Node | Type | Sheet Name |
|------|------|------------|
| **Fetch Market Research Data** | `n8n-nodes-base.googleSheets` | "Report" |
| **Fetch Generated Marketing Plan** | `n8n-nodes-base.googleSheets` | "Marketing Plan" |
| **Get row(s) in sheet** | `n8n-nodes-base.googleSheets` | "Content Calendar" |

### **AI Components**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **AI Agent - Generate Content Calendar** | `@n8n/n8n-nodes-langchain.agent` | Main content generator |
| **LLM - Google Gemini (Content)** | `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` | AI model |

### **Processing**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Parse Content Calendar JSON** | `n8n-nodes-base.code` | JSON parsing with validation |
| **Batch Process Content Items** | `n8n-nodes-base.splitInBatches` | Rate limit handling |
| **Check for Errors** | `n8n-nodes-base.if` | Error routing |
| **Rate Limit Delay** | `n8n-nodes-base.wait` | API throttling |

### **Output**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Append Content to Calendar Sheet** | `n8n-nodes-base.googleSheets` | Storage with `continueOnFail: true` |
| **Respond to Webhook** | `n8n-nodes-base.respondToWebhook` | API response |
| **Log Error Details** | `n8n-nodes-base.code` | Error logging |

---

## ⚙️ AI Agent System Prompt

### **Role Definition**

```markdown
# Role: Universal Senior Content Strategist & Master Art Director

You specialize in transforming complex business strategies into 
high-impact, visual-first content matrices.

# Objective
Based on "Market Research" and "Strategy Plan", build a 30-day 
content calendar as a single, comprehensive JSON array.
```

### **Task Requirements**

```markdown
1. STRATEGIC ALIGNMENT
   - Every post links to a specific "Authority Pillar"
   - Addresses a "Psychological Pain Point" from research

2. PLATFORM LOGIC
   - Dynamically select best platform:
     • LinkedIn, Instagram, X, or TikTok
   - Select format based on audience behavior:
     • Post, Reel, Carousel, or Thread

3. THE HOOK & CAPTION
   - Hook: Must be a "scroll-stopper"
   - Caption: Follow AIDA framework:
     • Attention → Interest → Desire → Action

4. MASTERPIECE ART DIRECTION PROMPT
   Ultra-precise technical descriptions including:
   • Atmosphere & Lighting (Volumetric, cinematic)
   • Composition & Layers (Foreground depth, bokeh)
   • Typography Details (Font names, weight, placement)
   • Textures & Colors (Matte metallic, frosted glass)
```

### **Output Schema**

```json
[
  {
    "Day_Number": 1,
    "Authority_Pillar": "AI Thought Leadership",
    "Platform_Target": "LinkedIn",
    "Content_Format": "Carousel",
    "The_Hook": "🤖 The AI feature nobody is talking about...",
    "Full_Caption": "In 2025, the companies that win won't be the ones with the most data—they'll be the ones with the smartest AI agents.\n\nHere's what I discovered after building 50+ automation workflows:\n\n→ Agentic AI isn't replacing humans\n→ It's amplifying what humans can do\n→ The real ROI is in decision-making speed\n\n[Slide 1: The Problem]\n[Slide 2: The Solution]\n...\n\n💡 Save this post and share with your team.\n\n#AI #Automation #n8n #AgenticAI",
    "Art_Direction_Prompt": "Cinematic 3D render. Hero shot of holographic workflow diagram floating above sleek matte black desk. Volumetric purple-blue gradient lighting. Glass morphism UI cards with subtle frosted effect. Bokeh orbs in background. Typography: Bold sans-serif 'INTER' font, weight 700, white with subtle drop shadow. 16:9 ratio. Studio quality, octane render.",
    "Visual_Text_Overlay": "The AI Advantage",
    "Strategic_Goal": "Position as AI automation expert",
    "Design_Reference_Style": "Apple Keynote aesthetic"
  }
  // ... 29 more days
]
```

---

## 📊 Content Calendar Schema

| Column | Type | Description |
|--------|------|-------------|
| `Day_Number` | Number | 1-30 |
| `Authority_Pillar` | String | Strategic theme bucket |
| `Platform_Target` | String | LinkedIn/Instagram/X/TikTok |
| `Content_Format` | String | Post/Reel/Carousel/Thread |
| `The_Hook` | String | First line scroll-stopper |
| `Full_Caption` | String | AIDA-structured copy |
| `Art_Direction_Prompt` | String | Ultra-precise visual specs |
| `Visual_Text_Overlay` | String | Text on the image |
| `Strategic_Goal` | String | What this post achieves |
| `Design_Reference_Style` | String | Visual inspiration |
| `Design URL` | URL | Generated image link (optional) |

---

## 🔄 JSON Parsing Logic

### **Clean & Validate Code**

```javascript
// Safely parse and validate content calendar JSON
try {
  const rawOutput = $input.all()[0]?.json?.output;
  
  if (!rawOutput) {
    throw new Error('No output received from AI agent');
  }
  
  // Clean JSON string from markdown code blocks
  const cleanJsonString = rawOutput
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();
  
  // Parse the JSON array
  const calendarArray = JSON.parse(cleanJsonString);
  
  // Validate it's an array with items
  if (!Array.isArray(calendarArray) || calendarArray.length === 0) {
    throw new Error('Invalid or empty content calendar');
  }
  
  // Validate required fields for each item
  const requiredFields = [
    'Day_Number', 'Authority_Pillar', 
    'Platform_Target', 'Content_Format'
  ];
  
  return calendarArray.map((item, index) => {
    const missing = requiredFields.filter(f => !item[f]);
    if (missing.length) {
      console.warn(`Day ${index + 1} missing: ${missing.join(', ')}`);
    }
    return { json: item };
  });
  
} catch (error) {
  return [{
    json: {
      error: true,
      message: error.message,
      rawInputPreview: rawOutput?.substring(0, 500) || 'No data'
    }
  }];
}
```

---

## 🌐 Additional Marketing Workflows

### **Available in Marketing & Media folder:**

| Workflow | Size | Focus |
|----------|------|-------|
| **Marketing Strategy** | 33KB | 30-day content calendar generation |
| **Market Research** | 112KB | Competitor & audience analysis |
| **Facebook Competitor Analysis** | 38KB | Social media competitor tracking |
| **Design Brief to AI Image** | 56KB | Hugging Face image generation |
| **Graphic Designer** | 18KB | Visual content creation |

---

## 📈 Performance Metrics

| Metric | Value |
|--------|-------|
| **AI Generation** | 20-40s (30 items) |
| **Parsing** | < 100ms |
| **Sheet Append** | ~500ms per item |
| **Full Pipeline** | ~1-2 minutes |
| **Retry Config** | `maxTries: 3` |

---

## 🔗 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/Content-Calender-n` | POST | Generate new calendar |
| `/Content-Calender-n` | GET | Retrieve existing calendar |

---

*This marketing system demonstrates enterprise-grade content strategy automation with AI-powered copywriting, art direction, platform optimization, and structured data export—all designed for immediate execution by creative teams.*
