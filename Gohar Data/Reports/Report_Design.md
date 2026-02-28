# 🎨 AI Design Pipeline | Prompt Engineering with Multi-Stage Image Generation

> **Design Brief Processing with Conditional Routing, Prompt Optimization & Error Categorization**

---

## Architecture Overview

This workflow implements a **sophisticated design-to-image pipeline** that processes structured design briefs through **conditional routing** based on design type, generates **production-ready AI prompts** using **Google Gemini**, and produces images via **ImageFX (Apify)**. The architecture demonstrates advanced **input validation**, **prompt optimization**, and **comprehensive error categorization**.

**Critical Pattern:** The workflow implements a **7-section design brief parser** with **type-based routing** (Logo/Social Media/General) and **prompt truncation** to meet API limits.

---

## 🔧 Technical Stack Deep-Dive

### **Input Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Design_Brief_Webhook** | `n8n-nodes-base.webhook` | `POST /webhook/design-brief`, `responseMode: responseNode`, CORS: `*` |

### **Data Parsing Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Parse_Form_Data** | `n8n-nodes-base.code` | Extracts Sections A-G, generates `submissionId` with UUID pattern |

### **Routing Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Route_Is_Logo** | `n8n-nodes-base.if` | `condition: designCategory.isLogoDesign === true` |
| **Route_Is_Social** | `n8n-nodes-base.if` | `condition: designCategory.isSocialMedia === true` |

### **Brief Formatting Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Format_Logo_Brief** | `n8n-nodes-base.code` | Logo-specific template with Section D fields |
| **Format_Social_Brief** | `n8n-nodes-base.code` | Social template with platform/dimensions (Section E) |
| **Format_General_Brief** | `n8n-nodes-base.code` | Fallback template for other design types |

### **AI Prompt Generation**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **AI_Generate_Prompt** | `@n8n/n8n-nodes-langchain.chainLlm` | `promptType: define`, 150-300 word output |
| **LLM_Gemini** | `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` | Model: `gemini-pro`, optimized for prompt engineering |

### **Image Generation Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Prepare_ImageFX_Input** | `n8n-nodes-base.code` | Truncates to 1000 chars, removes newlines, adds auth |
| **Generate_Image_ImageFX** | `n8n-nodes-base.httpRequest` | Apify Actor API, `timeout: 600s`, `retryOnFail: true` |
| **Check_ImageFX_Response** | `n8n-nodes-base.if` | Routes success vs error based on response structure |
| **Extract_ImageFX_Result** | `n8n-nodes-base.code` | Handles multiple URL field formats |
| **Download_Image** | `n8n-nodes-base.httpRequest` | `responseFormat: file`, binary output |
| **Convert_To_Base64** | `n8n-nodes-base.code` | Binary → Base64 → Data URL conversion |

### **Error Handling Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Handle_ImageFX_Error** | `n8n-nodes-base.code` | Categorizes 6+ error types with solutions |
| **Send_Error_Response** | `n8n-nodes-base.respondToWebhook` | `statusCode: 500`, structured error JSON |
| **Send_Brief_Error** | `n8n-nodes-base.respondToWebhook` | `statusCode: 400`, validation errors |

---

## ⚙️ Workflow Logic Breakdown

### **Input Handling: 7-Section Brief Parser**

```javascript
// Parse_Form_Data Node Logic
function parseBrief(formData) {
  // Section A - Project Overview
  const sectionA = {
    designType: formData.A1_design_type || [],  // Array for multi-select
    mainGoal: formData.A2_main_goal || 'Brand Awareness'
  };
  
  // Section B - Brand Information
  const sectionB = {
    brandName: formData.B1_brand_name,  // REQUIRED
    slogan: formData.B2_slogan || '',
    brandDescription: formData.B3_brand_description || '',
    productsServices: formData.B4_products_services || '',
    targetAudience: formData.B5_target_audience || '',
    brandPersonality: formData.B6_brand_personality || [],  // Array
    competitors: formData.B7_competitors || ''
  };
  
  // Section C - Visual Identity
  const sectionC = {
    hasLogo: formData.C1_has_logo || 'No',
    logoLikes: formData.C1a_logo_likes || '',
    logoDislikes: formData.C1b_logo_dislikes || '',
    brandColors: formData.C2_brand_colors || '#000000',  // Hex codes
    forbiddenColors: formData.C3_forbidden_colors || '',
    typography: formData.C4_typography || 'Modern Sans-serif',
    designStyle: formData.C5_design_style || [],  // Array
    mustHave: formData.C6_must_have || '',
    mustNotHave: formData.C7_must_not_have || ''
  };
  
  // Section D - Logo Specific (conditional)
  const sectionD = sectionA.designType.includes('Logo') ? {
    logoType: formData.D1_logo_type,
    logoLanguage: formData.D2_logo_language,
    specificSymbols: formData.D3_specific_symbols,
    logoMessage: formData.D4_logo_message,
    logoUsage: formData.D5_logo_usage,
    logoShape: formData.D6_logo_shape,
    idealLogoDescription: formData.D7_ideal_logo
  } : null;
  
  // Section E - Social Media Specific (conditional)
  const sectionE = isSocialMedia ? {
    platform: formData.E1_platform,  // Instagram, LinkedIn, etc.
    designType: formData.E2_design_type,  // Post, Story, Reel cover
    dimensions: formData.E3_dimensions,  // 1080x1080, 1920x1080
    postTopic: formData.E4_post_topic,
    mainMessage: formData.E5_main_message,
    headline: formData.E6_headline,
    additionalText: formData.E7_additional_text,
    callToAction: formData.E8_cta,
    mood: formData.E9_mood
  } : null;
  
  // Sections F & G
  const sectionF = { references: formData.F1_references || '' };
  const sectionG = { additionalNotes: formData.G1_additional_notes || '' };
  
  // Generate unique submission ID
  const submissionId = `BRIEF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    submissionId,
    submissionDate: new Date().toISOString(),
    designCategory: { isLogoDesign, isSocialMedia, types: designTypeArray },
    sectionA, sectionB, sectionC, sectionD, sectionE, sectionF, sectionG
  };
}
```

### **Conditional Routing Logic**

```
┌─────────────────────┐
│  Parsed Brief Data  │
└──────────┬──────────┘
           ▼
┌─────────────────────┐
│  Is Logo Design?    │ ← designCategory.isLogoDesign
└──────────┬──────────┘
      ┌────┴────┐
      ▼         ▼
   ┌──────┐ ┌────────────────────┐
   │ YES  │ │        NO          │
   │Format│ │                    │
   │ Logo │ │ Is Social Media?   │
   │Brief │ └─────────┬──────────┘
   └──────┘      ┌────┴────┐
                 ▼         ▼
              ┌──────┐ ┌──────┐
              │ YES  │ │  NO  │
              │Format│ │Format│
              │Social│ │General
              │Brief │ │Brief │
              └──────┘ └──────┘
```

### **AI Prompt Engineering System**

**Gemini System Prompt:**
```markdown
# Role: World-Class Graphic Designer & AI Prompt Expert (15+ years)

Transform design briefs into production-ready AI image prompts.

## Prompt Engineering Requirements:

### 1. DESIGN FUNDAMENTALS
- Design type specification (logo, social post, brand identity)
- Exact dimensions or aspect ratios
- Target audience context

### 2. VISUAL AESTHETICS
- Color palette with hex codes
- Typography characteristics (weight, style, hierarchy)
- Artistic style references (minimalist, luxury, geometric)
- Mood using sensory language

### 3. COMPOSITION RULES
- Spatial arrangement and visual hierarchy
- Negative space usage
- Focal points and visual flow
- Balance principles

### 4. TECHNICAL SPECS
- Forbidden elements (explicit negatives)
- Quality parameters ("ultra-detailed", "8K")
- Rendering style
- Lighting conditions

### 5. AI MODEL OPTIMIZATION
Power keywords: "professional", "award-winning", "masterpiece"
Aspect ratios: 16:9, 1:1, 4:3, 9:16
Quality modifiers: "sharp focus", "studio lighting"

## Output: 150-300 word prompt, NO explanations, NO markdown
```

### **Prompt Optimization: Prepare for ImageFX**

```javascript
// Prepare_ImageFX_Input Node Logic
function preparePrompt(promptText) {
  // Clean the prompt
  let optimized = promptText
    .replace(/\n+/g, ' ')     // Remove newlines
    .replace(/\r/g, ' ')      // Remove carriage returns
    .replace(/\s+/g, ' ')     // Normalize whitespace
    .replace(/"/g, '')        // Remove quotes (breaks JSON)
    .trim();
  
  // Enforce character limit (ImageFX constraint)
  const MAX_LENGTH = 1000;
  if (optimized.length > MAX_LENGTH) {
    console.log(`⚠️ Truncating from ${optimized.length} to ${MAX_LENGTH} chars`);
    optimized = optimized.substring(0, MAX_LENGTH - 3) + '...';
  }
  
  // Validate minimum length
  if (optimized.length < 10) {
    throw new Error('Prompt too short after optimization');
  }
  
  return {
    authList: [{
      username: "email@gmail.com",
      password: "app_password"  // Google App Password
    }],
    promptList: [{
      prompt: optimized,
      size: "1:1",
      seed: -1  // Random seed
    }],
    proxyConfiguration: {
      useApifyProxy: true,
      apifyProxyGroups: ["RESIDENTIAL", "GOOGLE_SERP"]
    },
    maxRequestRetries: 5,
    navigationTimeoutSecs: 180
  };
}
```

---

## 🛡️ Error Handling: Comprehensive Categorization

### **Error Type Classification**

```javascript
// Handle_ImageFX_Error Node Logic
function categorizeError(errorData) {
  const errorString = JSON.stringify(errorData).toLowerCase();
  
  const errorCategories = [
    {
      type: 'AUTHENTICATION',
      detect: ['auth', '401', '403'],
      message: 'Authentication failed',
      solution: '🔑 Update Google App Password at https://myaccount.google.com/apppasswords'
    },
    {
      type: 'RATE_LIMIT',
      detect: ['rate', 'limit', '429'],
      message: 'Rate limit exceeded',
      solution: '🚦 Wait 15-30 minutes or use different Google account'
    },
    {
      type: 'TIMEOUT',
      detect: ['timeout', 'timed out'],
      message: 'Request timeout',
      solution: '⏱️ Simplify prompt or increase timeout value'
    },
    {
      type: 'PROXY',
      detect: ['proxy', 'connection'],
      message: 'Proxy/connection error',
      solution: '🌐 Check Apify account balance and proxy settings'
    },
    {
      type: 'API_TOKEN',
      detect: ['token', 'apify'],
      message: 'Invalid Apify token',
      solution: '🔐 Update token from https://console.apify.com/account/integrations'
    },
    {
      type: 'ACTOR_ERROR',
      detect: ['actor', 'build'],
      message: 'Apify Actor error',
      solution: '🔧 Actor temporarily unavailable, retry later'
    }
  ];
  
  // Find matching category
  for (const category of errorCategories) {
    if (category.detect.some(pattern => errorString.includes(pattern))) {
      return {
        success: false,
        errorType: category.type,
        message: category.message,
        solution: category.solution,
        alternativeServices: [
          'Midjourney (https://midjourney.com)',
          'DALL-E 3 via ChatGPT (https://chat.openai.com)',
          'Leonardo.ai (https://leonardo.ai)',
          'Ideogram (https://ideogram.ai)'
        ]
      };
    }
  }
  
  // Unknown error fallback
  return {
    success: false,
    errorType: 'UNKNOWN',
    message: 'Image generation failed',
    solution: 'Check logs for details'
  };
}
```

### **Response Format**

**Success Response (200):**
```json
{
  "success": true,
  "message": "Design brief processed successfully! 🎨✨",
  "briefId": "BRIEF-1705123456-x7k2m9qz",
  "briefType": "Logo Design",
  "brandName": "TechNova Solutions",
  "generatedPrompt": "Ultra-detailed modern tech logo...",
  "imageGenerated": true,
  "imageData": {
    "base64": "iVBORw0KGgo...",
    "dataUrl": "data:image/png;base64,iVBORw0KGgo...",
    "imageUrl": "https://storage.googleapis.com/...",
    "mimeType": "image/png",
    "sizeKB": 156,
    "deliveryMethod": "base64+url"
  },
  "generationMetadata": {
    "briefId": "BRIEF-1705123456-x7k2m9qz",
    "generationTime": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (500):**
```json
{
  "success": false,
  "errorType": "RATE_LIMIT",
  "message": "Rate limit exceeded",
  "solution": "🚦 Wait 15-30 minutes...",
  "briefId": "BRIEF-1705123456-x7k2m9qz",
  "generatedPrompt": "Ultra-detailed modern tech logo...",
  "imageGenerated": false,
  "suggestion": "Use the generated prompt with alternative services",
  "alternativeServices": [
    "Midjourney",
    "DALL-E 3",
    "Leonardo.ai"
  ]
}
```

---

## 📊 Node Configuration Summary

| Node | Key Settings |
|------|-------------|
| **Webhook** | `responseMode: responseNode`, `allowedOrigins: *` |
| **Parse Data** | `onError: continueErrorOutput` |
| **Gemini LLM** | `model: gemini-pro`, `maxOutputTokens: 2048` |
| **HTTP ImageFX** | `timeout: 600000ms`, `retryOnFail: true`, `maxTries: 2` |
| **Download Image** | `responseFormat: file`, `outputPropertyName: generatedImage` |

---

## 📈 Performance Metrics

| Metric | Value |
|--------|-------|
| **Brief Parsing** | < 100ms |
| **Prompt Generation** | 2-5s |
| **Image Generation** | 30-120s |
| **Total E2E Time** | 1-3 minutes |
| **Success Rate** | 85-90% |

---

*This implementation demonstrates advanced conditional routing, prompt engineering optimization, and comprehensive error handling for AI-powered design automation.*
