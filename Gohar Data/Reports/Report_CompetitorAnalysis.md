# 🔍 Competitor Intelligence | Multi-Layer Vision Analysis with Strategic Synthesis

> **AI-Powered Brand Analysis with Groq Vision API & LangChain Agent Orchestration**

---

## Architecture Overview

This workflow implements a **comprehensive competitor intelligence system** that scrapes Facebook profiles, extracts visual assets, and performs **multi-dimensional AI analysis** using **Groq Vision API (Llama 4 Scout)**. The architecture demonstrates **parallel data collection**, **loop-based image processing**, and **tool-augmented agent synthesis** for strategic report generation.

**Critical Pattern:** The workflow processes each image through a **structured 7-dimension analysis schema** and stores results in Google Sheets for **tool-augmented agent access** during final synthesis.

---

## 🔧 Technical Stack Deep-Dive

### **Data Collection Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Webhook** | `n8n-nodes-base.webhook` | `POST /Facebook`, `responseMode: responseNode` |
| **Input_URL** | `n8n-nodes-base.set` | Extracts `body.facebook_url` from request |
| **Scrape_Profile** | `n8n-nodes-scrape-creators.scrapeCreators` | `resource: facebook`, profile data extraction |
| **Scrape_Posts** | `n8n-nodes-scrape-creators.scrapeCreators` | `operation: getFacebookProfilePosts`, `limit: 2` |
| **Merge_Scraped_Data** | `n8n-nodes-base.merge` | `mode: combine`, `combinationMode: mergeByPosition` |

### **Image Processing Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Extract_Images_Context** | `n8n-nodes-base.code` | Deduplicates, adds engagement metadata, categorizes by type |
| **Loop_Over_Images** | `n8n-nodes-base.splitInBatches` | `batchSize: 1`, sequential processing for rate limits |
| **Vision_Analysis** | `n8n-nodes-base.httpRequest` | Groq API, `model: llama-4-scout-17b-16e-instruct` |

### **AI Synthesis Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Visual_Strategy_Analyst** | `@n8n/n8n-nodes-langchain.agent` | Tool-augmented, accesses Sheets database |
| **Competitor_Visual_Database** | `n8n-nodes-base.googleSheetsTool` | Read-only tool for agent context |
| **Generate_Strategy_Report** | `@n8n/n8n-nodes-langchain.chainLlm` | Final synthesis with structured output |
| **OpenRouter_LLM** | `@n8n/n8n-nodes-langchain.lmChatOpenRouter` | `model: gpt-4o-mini` |
| **Structured_Output_Parser** | `@n8n/n8n-nodes-langchain.outputParserStructured` | SWOT + recommendations schema |

### **Data Storage Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Append_Visual_Analysis** | `n8n-nodes-base.googleSheets` | 22-column schema, per-image row |
| **Parse_Enrich_Results** | `n8n-nodes-base.code` | JSON extraction from Groq response |

---

## ⚙️ Workflow Logic Breakdown

### **Input Handling: Facebook URL Processing**

```javascript
// Request Body
{
  "facebook_url": "https://www.facebook.com/competitor_page"
}

// Parallel Data Collection
┌─────────────────┐
│    Input URL    │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌─────────┐ ┌─────────┐
│ Scrape  │ │ Scrape  │ ← Parallel execution
│ Profile │ │ Posts   │
└────┬────┘ └────┬────┘
     └─────┬─────┘
           ▼
     ┌───────────┐
     │   Merge   │ → Combined profile + posts
     └───────────┘
```

### **Image Extraction: Context-Aware Processing**

```javascript
// Extract_Images_Context Node Logic
function extractImages(data) {
  const results = [];
  const seenUrls = new Set();  // Deduplication
  
  // Profile Picture
  if (data.profile.profilePicLarge) {
    results.push({
      url: data.profile.profilePicLarge,
      type: 'profile_picture',
      context: 'Brand identity - logo/profile image'
    });
  }
  
  // Cover Photo
  if (data.profile.coverPhoto?.photo?.image?.uri) {
    results.push({
      url: data.profile.coverPhoto.photo.image.uri,
      type: 'cover_photo',
      context: 'Brand header - key visual messaging'
    });
  }
  
  // Post Images with Engagement Metadata
  data.posts.forEach(post => {
    const postContext = {
      postId: post.id,
      text: post.text || '',
      engagement: {
        reactions: post.reactionCount || 0,
        comments: post.commentCount || 0
      },
      publishDate: post.publishTime 
        ? new Date(post.publishTime * 1000).toISOString() 
        : null
    };
    
    // Main post image (deduplicated)
    if (post.image && !seenUrls.has(post.image)) {
      seenUrls.add(post.image);
      results.push({
        url: post.image,
        type: 'post_image',
        context: 'Main post visual',
        ...postContext
      });
    }
    
    // Carousel images (deduplicated)
    if (post.images?.length > 0) {
      post.images.forEach((imgUrl, idx) => {
        if (!seenUrls.has(imgUrl)) {
          seenUrls.add(imgUrl);
          results.push({
            url: imgUrl,
            type: 'post_carousel',
            carouselIndex: idx + 1,
            context: `Carousel image ${idx + 1} of ${post.images.length}`,
            ...postContext
          });
        }
      });
    }
  });
  
  return results;
}
```

### **Vision Analysis: Groq API Integration**

**API Request Configuration:**
```javascript
{
  method: "POST",
  url: "https://api.groq.com/openai/v1/chat/completions",
  headers: {
    "Authorization": "Bearer {{ $credentials.groqApiKey }}",
    "Content-Type": "application/json"
  },
  body: {
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "system",
        content: "Expert brand strategist specializing in visual analysis..."
      },
      {
        role: "user",
        content: [
          { type: "text", text: analysisPrompt },
          { type: "image_url", image_url: { url: imageUrl } }
        ]
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_completion_tokens: 2048
  }
}
```

**7-Dimension Analysis Schema:**
```json
{
  "visual_elements": {
    "primary_colors": ["#hex1", "#hex2"],
    "color_psychology": "emotions/associations",
    "typography": {
      "fonts_used": ["font names"],
      "text_hierarchy": "description",
      "readability_score": "1-10"
    },
    "composition": "layout type",
    "design_style": "modern/minimalist/etc"
  },
  "branding": {
    "logo_visible": true,
    "logo_placement": "position",
    "brand_consistency": "1-10 with explanation",
    "brand_personality": ["traits"]
  },
  "content_analysis": {
    "main_message": "core message",
    "call_to_action": "CTA",
    "target_audience": "demographic",
    "emotional_tone": "tone",
    "content_type": "category"
  },
  "marketing_strategy": {
    "engagement_potential": "1-10",
    "engagement_factors": ["factors"],
    "value_proposition": "value offered",
    "differentiation": "unique elements",
    "improvement_suggestions": ["suggestions"]
  },
  "technical_quality": {
    "image_quality": "professional/good/average/poor",
    "resolution_estimate": "high/medium/low",
    "design_tools_likely_used": ["tools"]
  },
  "competitive_insights": {
    "industry_alignment": "alignment",
    "trend_adoption": "current/dated/ahead",
    "unique_elements": ["elements"],
    "common_elements": ["elements"]
  },
  "overall_assessment": {
    "effectiveness_score": "1-10",
    "strengths": ["3-5 strengths"],
    "weaknesses": ["3-5 weaknesses"],
    "strategy_category": "category"
  }
}
```

### **Tool-Augmented Agent: Strategic Synthesis**

**Agent System Prompt:**
```markdown
# Role: Senior Visual Strategy Analyst & Brand Consultant

## Objective:
Provide high-level strategic analysis using the Competitor_Visual_Database.

## Instructions:
1. Access the database to retrieve all analyzed visual records
2. Synthesize findings across:
   - Color Psychology patterns
   - Typography consistency
   - Branding effectiveness
3. Identify market trends and psychological triggers
4. Provide actionable recommendations to outperform competitor

## Tone: 
Professional, data-driven, analytical. 
Avoid generic advice; focus on specific data from the sheet.
```

**Final Synthesis Structured Output:**
```json
{
  "executive_summary": "3-5 key findings",
  "brand_identity_assessment": {
    "consistency_score": 8,
    "personality_traits": ["professional", "innovative"],
    "positioning_statement": "..."
  },
  "content_strategy_breakdown": {
    "whats_working": ["..."],
    "whats_not_working": ["..."],
    "content_pillars": ["..."]
  },
  "swot_analysis": {
    "strengths": ["5 max"],
    "weaknesses": ["5 max"],
    "opportunities": ["5 max"],
    "threats": ["5 max"]
  },
  "strategic_recommendations": [
    {
      "priority": "high",
      "action": "...",
      "expected_impact": "..."
    }
  ],
  "key_metrics": {
    "total_posts_analyzed": 10,
    "avg_engagement_rate": 4.5,
    "brand_consistency_score": 7.8,
    "visual_quality_score": 8.2
  }
}
```

---

## 🛡️ Error Handling & Resilience

### **Node-Level Configuration**

| Node | Configuration |
|------|---------------|
| **Scrape_Profile** | `continueOnFail: true` |
| **Vision_Analysis** | `retryOnFail: true, maxTries: 2` |
| **Visual_Strategy_Analyst** | `retryOnFail: true, maxTries: 2` |
| **Loop_Over_Images** | Persists state across iterations |

### **Data Validation**

```javascript
// Parse_Enrich_Results Node
for (const item of $input.all()) {
  try {
    const content = item.json.Content;
    const parsed = JSON.parse(content);
    
    item.json = {
      image_metadata: {
        url: item.json.url,
        type: item.json.type,
        context: item.json.context,
        engagement: item.json.engagement
      },
      analysis: parsed,
      analyzed_at: new Date().toISOString()
    };
  } catch (error) {
    // Keep original data on parse failure
    item.json = {
      error: true,
      message: error.message,
      original_data: item.json,
      analyzed_at: new Date().toISOString()
    };
  }
}
```

---

## 📊 Google Sheets Schema (Visual Database)

| Column | Type | Source |
|--------|------|--------|
| `Image URL` | URL | Image source |
| `Content Type` | Enum | profile/cover/post |
| `Context` | String | Analysis context |
| `Analysis Date` | DateTime | Timestamp |
| `Primary Colors` | String | Comma-separated hex |
| `Color Psychology` | Text | Emotional analysis |
| `Design Style` | String | Style category |
| `Composition` | String | Layout type |
| `Typography (Fonts)` | String | Detected fonts |
| `Text Hierarchy` | Text | Layout description |
| `Readability Score` | Number | 1-10 |
| `Logo Visible` | Boolean | Yes/No |
| `Logo Placement` | String | Position |
| `Brand Consistency` | Number | 1-10 |
| `Main Message` | Text | Core communication |
| `Call To Action` | String | CTA text |
| `Target Audience` | String | Demographic |
| `Emotional Tone` | String | Tone category |
| `Strengths` | Text | Joined list |
| `Weaknesses` | Text | Joined list |
| `Improvement Suggestions` | Text | Newline-separated |
| `Strategy Category` | String | Campaign type |

---

## 📈 Performance Metrics

| Metric | Value |
|--------|-------|
| **Profile Scrape** | 2-5s |
| **Per-Image Analysis** | 3-8s |
| **Total for 10 Images** | 60-90s |
| **Agent Synthesis** | 10-20s |
| **Complete Pipeline** | 2-5 minutes |

---

*This implementation demonstrates advanced vision AI integration, tool-augmented agent patterns, and comprehensive competitive intelligence automation.*
