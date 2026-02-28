# 📍 Lead Generation System | Google Maps Places API Scraping with Exponential Backoff

> **Automated B2B Lead Discovery with ZIP-Based Search, Duplicate Prevention, Rate Limit Handling & Structured Data Export**

---

## System Overview

This lead generation system implements a **production-grade Google Maps scraper** that extracts business leads by ZIP code and category. The architecture demonstrates **exponential backoff for API rate limits**, **structured data extraction** (phone, website, GPS, reviews), and **status tracking** for resumable batch processing.

**Critical Pattern:** The system uses **ZIP-based iteration** with status tracking to enable pause/resume functionality and prevent duplicate scraping of already-processed locations.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      LEAD GENERATION SYSTEM                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    TRIGGER OPTIONS                                    │   │
│  │  • Manual Trigger (Execute Workflow)                                 │   │
│  │  • Schedule Trigger (every 15 minutes) [disabled]                    │   │
│  │  • Execute Workflow Trigger (sub-workflow call) [disabled]           │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────┴────────────────────────────────────┐   │
│  │                    SETTINGS & CONFIGURATION                           │   │
│  │  • Google Sheets URL                                                  │   │
│  │  • Sheet Name (ZIP list)                                             │   │
│  │  • Results Sheet Name                                                │   │
│  │  • Subcategory Filter                                                 │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────┴────────────────────────────────────┐   │
│  │                    ZIP CODE ITERATION                                 │   │
│  │                                                                        │   │
│  │  Get ZIPs where status != "scraped"                                  │   │
│  │         │                                                              │   │
│  │         ▼                                                              │   │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │   │
│  │  │  For Each ZIP:                                                   │ │   │
│  │  │  1. Build query: "{Subcategory} {zip}"                          │ │   │
│  │  │  2. Call Google Maps Places API                                  │ │   │
│  │  │  3. Handle Rate Limits (Exponential Backoff)                     │ │   │
│  │  │  4. Extract: title, phone, website, address, GPS, rating        │ │   │
│  │  │  5. Append to Results Sheet (with deduplication)                 │ │   │
│  │  │  6. Update ZIP status to "scraped"                              │ │   │
│  │  └─────────────────────────────────────────────────────────────────┘ │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────┴────────────────────────────────────┐   │
│  │                    ERROR HANDLING                                     │   │
│  │                                                                        │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────────────┐  │   │
│  │  │ Check Max      │  │ Exponential    │  │ Stop and Error         │  │   │
│  │  │ Retries (>10)  │  │ Backoff Wait   │  │ (After 10 retries)     │  │   │
│  │  └────────────────┘  └────────────────┘  └────────────────────────┘  │   │
│  └───────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Technical Stack Deep-Dive

### **Trigger & Configuration Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Manual Trigger** | `n8n-nodes-base.manualTrigger` | On-demand execution |
| **Schedule Trigger** | `n8n-nodes-base.scheduleTrigger` | `interval: 15 minutes` [disabled] |
| **Settings** | `n8n-nodes-base.set` | Configuration object |

### **Data Nodes**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Set Zip** | `n8n-nodes-base.set` | Extract current ZIP |
| **Subcategory** | `n8n-nodes-base.set` | Business category filter |
| **Get ZIPs** | `n8n-nodes-base.googleSheets` | Read unprocessed ZIPs |

### **API & Processing**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **GMaps API** | `n8n-nodes-base.httpRequest` | `POST places.googleapis.com/v1/places:searchText` |
| **Update Status to Success** | `n8n-nodes-base.googleSheets` | Mark ZIP as scraped |
| **Append Results** | `n8n-nodes-base.googleSheets` | `appendOrUpdate` operation |

### **Error Handling**

| Node | Type | Implementation Detail |
|------|------|----------------------|
| **Check Max Retries** | `n8n-nodes-base.if` | `retryCount > 10` |
| **Exponential Backoff** | `n8n-nodes-base.set` | Calculate wait time |
| **Stop and Error** | `n8n-nodes-base.stopAndError` | Fatal after 10 retries |

---

## ⚙️ Google Maps Places API Implementation

### **API Request Configuration**

```javascript
{
  method: "POST",
  url: "https://places.googleapis.com/v1/places:searchText",
  authentication: "predefinedCredentialType",
  nodeCredentialType: "googleOAuth2Api",
  sendHeaders: true,
  headerParameters: {
    parameters: [
      {
        name: "X-Goog-FieldMask",
        value: "places.id,places.displayName,places.addressComponents,places.formattedAddress,places.primaryType,places.primaryTypeDisplayName,places.types,places.location,places.nationalPhoneNumber,places.rating,places.userRatingCount,places.websiteUri,places.editorialSummary,places.reviews,places.attributions,places.userRatingCount"
      }
    ]
  },
  sendBody: true,
  bodyParameters: {
    parameters: [
      {
        name: "textQuery",
        value: "={{ $('Subcategory').item.json.Subcategory }} {{ $json.zip }}"
      }
    ]
  },
  options: {
    response: { fullResponse: true }
  }
}
```

### **Field Mask Optimization**

The field mask limits API response to only required fields:

| Field | Description |
|-------|-------------|
| `places.id` | Unique place identifier |
| `places.displayName` | Business name |
| `places.formattedAddress` | Full address |
| `places.nationalPhoneNumber` | Phone number |
| `places.rating` | Star rating |
| `places.userRatingCount` | Review count |
| `places.websiteUri` | Website URL |
| `places.location` | GPS coordinates |
| `places.reviews` | Customer reviews |

---

## 🔄 Exponential Backoff Algorithm

### **Retry Logic**

```javascript
// Check Max Retries Node
{
  "conditions": {
    "conditions": [
      {
        "leftValue": "={{ $('Exponential Backoff').item.json['retryCount'] }}",
        "rightValue": 10,
        "operator": { "type": "number", "operation": "gt" }
      }
    ]
  }
}
```

### **Backoff Calculation**

```javascript
// Wait time increases exponentially:
// Retry 1: 2s
// Retry 2: 4s
// Retry 3: 8s
// Retry 4: 16s
// ...
// Retry 10: 1024s (~17 minutes)

waitTime = Math.pow(2, retryCount) * 1000  // milliseconds
```

---

## 📊 Results Data Schema

### **Google Sheets Output Columns**

| Column | Source | Description |
|--------|--------|-------------|
| `title` | `place.displayName.text` | Business name |
| `phone` | `place.nationalPhoneNumber` | Phone number |
| `website` | `place.websiteUri` | Website URL |
| `address` | `place.formattedAddress` | Full address |
| `rating` | `place.rating` | Star rating (1-5) |
| `reviews` | `place.reviews` | Review array |
| `type` | Subcategory | Business category |
| `place_id` | `place.id` | Google Place ID |
| `gps_coordinates` | `place.location` | `{latitude, longitude}` |
| `types` | `place.types` | Category array |

### **Additional Available Columns**

| Column | Description |
|--------|-------------|
| `ACTION` | Processing action |
| `STATUS` | Lead status |
| `email` | Email (if extracted) |
| `facebook`, `instagram`, `linkedin`, etc. | Social links |

---

## 🔒 Status Tracking System

### **ZIP Status Values**

| Status | Meaning |
|--------|---------|
| *(empty)* | Not yet processed |
| `scraped` | Successfully processed |
| `error` | Failed after retries |

### **Status Update Configuration**

```javascript
{
  operation: "update",
  documentId: { value: "={{ $('Settings').first().json.gs_url }}" },
  sheetName: { value: "={{ $('Settings').first().json.sheet }}" },
  columns: {
    value: {
      zip: "={{ $('Set Zip').first().json.zip }}",
      status: "scraped",
      subcat: "={{ $('Subcategory').first().json.Subcategory }}"
    },
    matchingColumns: ["zip"]
  }
}
```

---

## 🌐 Deduplication Strategy

### **AppendOrUpdate Operation**

```javascript
{
  operation: "appendOrUpdate",  // Key: automatically handles duplicates
  matchingColumns: ["place_id"] // Unique key based on Google Place ID
}
```

This ensures:
- New places are appended
- Existing places are updated (not duplicated)
- Place ID serves as unique identifier

---

## ⚡ Performance Metrics

| Metric | Value |
|--------|-------|
| **API Call** | ~500ms per query |
| **Results per Query** | 20 places max |
| **Rate Limit** | ~100 QPM (Google Places) |
| **Retry Delay** | 2s → 1024s (exponential) |
| **Max Retries** | 10 before failure |

---

## 📈 Usage Flow

```
1. Configure Settings (Sheet URL, Category)
          │
2. Read ZIPs (where status != "scraped")
          │
3. For Each ZIP:
   ├── Build Query: "{category} {zip}"
   ├── Call Google Maps API
   │       │
   │   ┌───┴───┐
   │   │Success│─────▶ Extract Data ──▶ Append Results ──▶ Mark "scraped"
   │   └───────┘
   │       │
   │   ┌───┴───┐
   │   │ Error │─────▶ Exponential Backoff ──▶ Retry (max 10)
   │   └───────┘                                    │
   │                                                │
   │                              ┌─────────────────┘
   │                              ▼
   │                         Stop & Error (after 10)
   │
4. Repeat until all ZIPs processed
```

---

*This lead generation system demonstrates production-grade API integration with exponential backoff, structured data extraction, status-based resumability, and deduplication—essential for scalable B2B lead discovery.*
