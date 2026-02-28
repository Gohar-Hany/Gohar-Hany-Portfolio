# 👥 HR Recruitment System | AI-Powered CV & LinkedIn Analysis

> **Intelligent Recruitment Pipeline with CV Optimization, LinkedIn Profile Auditing, Duplicate Detection & Automated Notifications**

---

## System Overview

This HR recruitment system implements an **AI-powered candidate analysis pipeline** that handles the complete hiring workflow from application submission to intelligent scoring. The architecture demonstrates **dual analysis tracks** (CV Optimization + LinkedIn Profile Audit), **enterprise-grade duplicate detection**, and **automated notification systems**.

**Critical Pattern:** The system uses **Claude 3 Haiku via OpenRouter** with structured output parsing to generate consistent, actionable recruitment insights in JSON format.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         HR RECRUITMENT SYSTEM                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────┐     ┌───────────────────────────────────┐   │
│  │    FORM TRIGGER           │────▶│  DUPLICATE                         │   │
│  │  • Full Name              │     │  DETECTION                         │   │
│  │  • Email                  │     │  Check CRM by Gmail                │   │
│  │  • CV Upload (.pdf)       │     └──────────┬────────────────────────┘   │
│  │  • Applying For           │                 │                            │
│  │  • Job Description        │        ┌────────┴────────┐                   │
│  └───────────────────────────┘        │                 │                   │
│                                    New User          Existing               │
│                                       │                 │                   │
│  ┌────────────────────────────────────┴─────┐   ┌──────┴──────────────┐   │
│  │      ARCHIVING PHASE (Parallel)          │   │  ALERT & CLEANUP     │   │
│  │  • Upload CV to Google Drive             │   │  • Telegram Alert    │   │
│  │  • Create folder per candidate           │   │  • Delete folder     │   │
│  │  • Move file to candidate folder         │   │  • Respond: Limit    │   │
│  │  • Log to Google Sheets                  │   └─────────────────────┘   │
│  └────────────────────────────────────────────┘                             │
│                                       │                                      │
│  ┌────────────────────────────────────┴─────────────────────────────────┐   │
│  │              AI ANALYSIS PHASE (Two Tracks)                           │   │
│  │                                                                        │   │
│  │   ┌─────────────────────────┐    ┌─────────────────────────────┐     │   │
│  │   │  CV OPTIMIZATION        │    │  LINKEDIN PROFILE AUDIT     │     │   │
│  │   │  Claude 3 Haiku         │    │  Claude 3 Haiku             │     │   │
│  │   │  • ATS Keyword Match    │    │  • Searchability Score      │     │   │
│  │   │  • Experience Relevance │    │  • Branding Score           │     │   │
│  │   │  • Impact & Metrics     │    │  • SEO Keywords             │     │   │
│  │   │  • Skills Gap Analysis  │    │  • Headline Options         │     │   │
│  │   │  • Formatting Score     │    │  • Action Plan              │     │   │
│  │   └─────────────────────────┘    └─────────────────────────────┘     │   │
│  │                       │                      │                        │   │
│  │                       └──────────┬───────────┘                        │   │
│  │                                  │                                     │   │
│  │                     ┌────────────┴────────────┐                       │   │
│  │                     │   STRUCTURED OUTPUT     │                       │   │
│  │                     │   JSON → Formatted Text │                       │   │
│  │                     │   → Google Sheets       │                       │   │
│  │                     │   → Web Response        │                       │   │
│  │                     └─────────────────────────┘                       │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Technical Stack Deep-Dive

### **Workflow: Résumé & LinkedIn Analyzer and Optimizer (63KB, 1852 lines)**

#### Form Trigger Configuration

| Field | Type | Validation |
|-------|------|------------|
| **Full Name** | Text | Required |
| **Email** | Email | Required, unique check |
| **Upload Your CV** | File | `.pdf` only, single file |
| **Applying For** | Text | Target job title |
| **Job Description** | Text | Optional, for ATS matching |

#### AI Analysis Components

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Resume_Intelligence_Analyzer1** | `@n8n/n8n-nodes-langchain.agent` | CV analysis with 5-criteria scoring |
| **Resume_Intelligence_Analyzer2** | `@n8n/n8n-nodes-langchain.agent` | LinkedIn profile optimization |
| **AI_Scoring_Engine1/2** | `@n8n/n8n-nodes-langchain.lmChatOpenRouter` | `model: anthropic/claude-3-haiku` |
| **Structured Output Parser1** | `@n8n/n8n-nodes-langchain.outputParserStructured` | LinkedIn audit schema |
| **Structured Output Parser2** | `@n8n/n8n-nodes-langchain.outputParserStructured` | CV optimization schema |

#### File Management Nodes

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **CV_Upload_Handler** | `n8n-nodes-base.googleDrive` | Upload to "HR System" folder |
| **Create folder** | `n8n-nodes-base.googleDrive` | Per-candidate folder naming |
| **Move file** | `n8n-nodes-base.googleDrive` | Organize files by applicant |
| **CV_Content_Extractor** | `n8n-nodes-base.extractFromFile` | `operation: pdf` |
| **Delete folder** | `n8n-nodes-base.googleDrive` | Cleanup on duplicate |

#### CRM & Logging

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Check CRM** | `n8n-nodes-base.googleSheets` | Filter by Gmail for duplicate check |
| **Applicant_Database_Logger** | `n8n-nodes-base.googleSheets` | Append with ID, Name, CV Link, Timestamp |
| **Add Analysis** | `n8n-nodes-base.googleSheets` | Update with analysis results |

#### Notification System

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Send Alert** | `n8n-nodes-base.telegram` | Duplicate application notification |
| **Send text** | `n8n-nodes-evolution-api-english.evolutionApi` | WhatsApp alert via Evolution API |

---

## ⚙️ AI Analysis Implementation

### **CV Optimization System Prompt**

```markdown
# Role: Expert AI Career Coach and Technical Recruiter (15+ years)

## Mission:
Perform deep-gap analysis between Resume and Job Description.
Provide actionable advice to pass ATS and impress recruiters.

## Analysis Rules:
1. **Strict Parsimony:** Only output JSON structure
2. **ATS Focus:** Identify keywords in JD missing from Resume
3. **Quantification:** Demand metrics (e.g., "Improved by 20%")
4. **Tone:** Constructive, professional, direct about weaknesses

## Analysis Criteria (0-10 each):
1. ATS Keyword Match
2. Experience Relevance  
3. Impact & Metrics
4. Skills Gap Analysis
5. Formatting & Structure

## Classification Thresholds:
- 0-60%: "Needs Improvement"
- 60-80%: "Strong Candidate"
- 80-100%: "Top Tier"
```

### **CV Analysis Output Schema**

```json
{
  "report_type": "CV Optimization Report",
  "analysis_date": "2025-01-20",
  "basic_information": {
    "applicant_name": "Gohar Hany",
    "position_applied": "AI Automation Engineer",
    "years_experience": 3,
    "education": "B.Sc. Computer Science"
  },
  "analysis_results": [
    {
      "criteria": "ATS Keyword Match",
      "score": 8,
      "grade": "Excellent",
      "notes": "Found: n8n, LangChain, Gemini API. Missing: FastAPI, Docker"
    },
    {
      "criteria": "Impact & Metrics",
      "score": 6,
      "grade": "Good",
      "notes": "Add numbers: '500+ users served' → keep. Add more quantification."
    }
  ],
  "overall_assessment": {
    "total_score": { "obtained": 40, "max": 50, "percent": 80 },
    "classification": "Strong Candidate",
    "job_match": "85%"
  },
  "recommendations": {
    "final_recommendation": "Add Docker, FastAPI to skills. Quantify project impacts.",
    "interview_priority": "High",
    "interview_focus_areas": ["System Design", "AI Agent Architecture"]
  },
  "summary_minimal": {
    "score": 0.8,
    "reason": "Strong technical fit, needs better quantification."
  }
}
```

---

### **LinkedIn Profile Audit System Prompt**

```markdown
# Role: Expert LinkedIn Profile Strategist and Personal Branding Coach

## Mission:
Optimize profile for maximum visibility (SEO), engagement, and job opportunities.

## Analysis Focus:
1. **Searchability** (Keywords)
2. **Convertibility** (Impressing visitors)

## Audit Criteria:
1. **Headline:** Catchy? Keywords + value proposition?
2. **About Section:** Story or list? First 3 lines (Hook) critical
3. **Experience:** Achievements shown?
4. **SEO Keywords:** Hard skills repeated for algorithm?

## Output Includes:
- Profile strength score (0-100)
- Searchability score (0-100)
- Branding score (0-100)
- 3 headline rewrite options
- About section hook draft
- Step-by-step action plan
```

### **LinkedIn Audit Output Schema**

```json
{
  "report_type": "LinkedIn Profile Audit",
  "analysis_date": "2025-01-20",
  "profile_basics": {
    "name": "Gohar Hany",
    "current_headline": "AI Automation Engineer | n8n Workflow Architect"
  },
  "metrics": {
    "profile_strength": 75,
    "searchability_score": 80,
    "branding_score": 85
  },
  "audit_results": [
    {
      "section": "Headline",
      "status": "Strong",
      "score": 8,
      "feedback": "Good keywords. Could add more value proposition."
    }
  ],
  "seo_keywords": {
    "found": ["n8n", "Agentic AI", "LangChain"],
    "missing": ["FastAPI", "RAG", "Agent"]
  },
  "suggested_optimizations": {
    "headline_options": [
      "AI Automation Engineer | Building Agentic Systems that Scale | n8n + LangChain",
      "Helping Businesses Automate with Intelligent AI Agents | GenAI Developer",
      "Agentic AI Developer | n8n Expert | 500+ Users Served"
    ],
    "about_hook": "AI should be agentic, adaptable, and aligned with people. I build the systems that make that possible..."
  },
  "action_plan": [
    "Update headline with Option 1",
    "Add FastAPI and RAG to Skills",
    "Request 3 recommendations from colleagues"
  ]
}
```

---

## 🔒 Duplicate Detection Logic

### **Check Flow**

```javascript
// Check CRM Node - Filter Configuration
{
  "filtersUI": {
    "values": [
      {
        "lookupColumn": "Gmail",
        "lookupValue": "={{ $('Candidate_Application_Trigger').item.json.Email }}"
      }
    ]
  }
}

// If Node - Check if Gmail exists
{
  "conditions": {
    "string": [
      {
        "value1": "={{ $json.Gmail }}",
        "operation": "isEmpty"  // True = New User, False = Duplicate
      }
    ]
  }
}
```

### **Duplicate Alert Message (Telegram)**

```
⚠️ Duplicate Application Detected

👤 Name: {{ $('Candidate_Application_Trigger').item.json['Full Name'] }}
📧 Email: {{ $('Candidate_Application_Trigger').item.json.Email }}
📅 Previous Application: {{ $('Check CRM').item.json['Timestamp'] }}

Action: Application rejected and folder deleted.
```

---

## 📊 Report Formatting Logic

### **Telegram-Friendly Text Formatter**

```javascript
// Format Node - Convert JSON to Readable Text
return items.map(item => {
  const data = item.json.output;
  let text = `📄 *CV Analysis Report*\n`;
  text += `━━━━━━━━━━━━━━━━━━\n`;
  text += `👤 *Candidate:* ${data.basic_information.applicant_name}\n`;
  text += `🎯 *Role:* ${data.basic_information.position_applied}\n`;
  
  // Score with emoji based on percentage
  const score = data.overall_assessment;
  const emoji = score.total_score.percent >= 70 ? "🟢" : 
                score.total_score.percent >= 50 ? "🟡" : "🔴";
  
  text += `${emoji} **Score:** ${score.total_score.obtained}/${score.total_score.max}\n`;
  text += `🏷️ **Verdict:** ${score.classification}\n`;
  
  // Improvements section
  data.areas_for_improvement.forEach(point => {
    text += `• ${point}\n`;
  });
  
  return { json: { formatted_text: text } };
});
```

---

## 📁 File Organization Structure

```
Google Drive/
└── HR System/
    ├── Gohar Hany/
    │   └── Gohar_Hany_CV.pdf
    ├── Ahmed Mohamed/
    │   └── Ahmed_Resume_2025.pdf
    └── ... (per-candidate folders)
```

### **Folder Naming Convention**

```javascript
// Candidate folder name from form input
name: "={{ $('Candidate_Application_Trigger').item.json['Full Name'] }}"

// Unique ID generation
ID: "={{ $json['Full Name'] }}-{{ Math.floor(Math.random() * 1000) }}"
```

---

## 🌐 API & Integration Points

| Integration | Type | Purpose |
|-------------|------|---------|
| **OpenRouter** | LLM API | Claude 3 Haiku access |
| **Google Drive** | OAuth2 | CV storage & organization |
| **Google Sheets** | OAuth2 | CRM database |
| **Telegram** | Bot API | HR team notifications |
| **Evolution API** | WhatsApp | WhatsApp alerts |

---

## 📈 Data Schema

### **Google Sheets CRM Structure**

| Column | Type | Description |
|--------|------|-------------|
| `ID` | String | `{Name}-{RandomNum}` |
| `Name` | String | Full name |
| `Gmail` | String | Email (unique key) |
| `Applied to` | String | Target position |
| `CV Link` | URL | Google Drive link |
| `Timestamp` | DateTime | `Africa/Cairo` timezone |
| `Analysis` | Text | Formatted analysis result |

---

## ⚡ Performance Metrics

| Metric | Value |
|--------|-------|
| **CV Processing** | < 3s (PDF extraction) |
| **AI Analysis** | 5-10s (Claude 3 Haiku) |
| **Duplicate Check** | < 500ms |
| **Full Pipeline** | ~15-20s end-to-end |
| **Retry Config** | `maxTries: 3` on all nodes |

---

## 🔄 Workflow Connections

```
Form Trigger → Upload CV → Create Folder → Move File → Check CRM
                                                            │
                                              ┌─────────────┴─────────────┐
                                           New User                   Duplicate
                                              │                           │
                                    Data Sanitization              Telegram Alert
                                              │                           │
                                    Log to Sheets                   Delete Folder
                                              │                           │
                                    Download CV                   Respond (Limit)
                                              │
                                    Extract PDF Text
                                              │
                                    AI Analysis (Claude)
                                              │
                                    Format Output
                                              │
                                    ┌─────────┴─────────┐
                                Update Sheets      Respond to User
```

---

*This HR recruitment system demonstrates enterprise-grade candidate management with AI-powered analysis, automated file organization, duplicate prevention, and multi-channel notifications—all orchestrated through n8n workflows.*
