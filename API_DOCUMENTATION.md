# 📚 API Documentation

## Overview

The IAH Creations Feedback Form System provides a comprehensive API through Google Apps Script functions for managing forms, data, and notifications.

## 🚀 Core Functions

### System Setup

#### `setupIAHSystem()`
Initializes the complete feedback form system.

**Returns:**
```javascript
{
  form: FormApp.Form,
  spreadsheet: SpreadsheetApp.Spreadsheet,
  editUrl: string,
  publishedUrl: string,
  spreadsheetUrl: string
}
```

**Example:**
```javascript
const systemData = setupIAHSystem();
console.log('Form URL:', systemData.publishedUrl);
```

#### `verifyDeployment()`
Verifies system deployment status and configuration.

**Returns:**
```javascript
{
  spreadsheet: boolean,
  form: boolean,
  triggers: boolean,
  notifications: boolean
}
```

### Form Management

#### `createIAHFeedbackForm()`
Creates the main feedback form with all sections and validation.

**Returns:**
```javascript
{
  form: FormApp.Form,
  spreadsheet: SpreadsheetApp.Spreadsheet,
  editUrl: string,
  publishedUrl: string,
  spreadsheetUrl: string
}
```

### Data Management

#### `setupEnhancedSpreadsheet()`
Creates and configures the spreadsheet structure with multiple sheets.

**Returns:**
```javascript
{
  spreadsheet: SpreadsheetApp.Spreadsheet,
  responseSheet: SpreadsheetApp.Sheet
}
```

#### `extractResponseData(itemResponses, responseId)`
Extracts and formats form response data.

**Parameters:**
- `itemResponses`: Array of form item responses
- `responseId`: Unique identifier for the response

**Returns:**
```javascript
{
  responseId: string,
  name: string,
  email: string,
  phone: string,
  company: string,
  timeline: string,
  services: string,
  budget: string,
  requirements: string
}
```

## 📧 Notification System

### Email Functions

#### `sendClientConfirmation(data)`
Sends confirmation email to the client.

**Parameters:**
```javascript
{
  responseId: string,
  name: string,
  email: string,
  services: string,
  timeline: string,
  budget: string
}
```

#### `sendAdminNotification(data)`
Sends notification to admin with lead details.

**Parameters:**
```javascript
{
  responseId: string,
  name: string,
  email: string,
  phone: string,
  company: string,
  services: string,
  timeline: string,
  budget: string,
  requirements: string
}
```

#### `checkHighPriorityLead(data)`
Checks if lead is high priority and sends urgent notification.

**Parameters:**
- `data`: Response data object

**Priority Criteria:**
- Timeline contains "ASAP"
- Budget contains "$15,000+" or "Enterprise"
- Services include "Mobile Application"

## 📊 Analytics Functions

#### `initializeAnalytics()`
Sets up analytics tracking and daily report triggers.

#### `updateAnalytics(data)`
Updates analytics data with new submission information.

**Parameters:**
- `data`: Response data object

#### `generateDailyAnalytics()`
Generates and sends daily analytics report.

#### `compileDailyReport()`
Compiles analytics data into formatted report.

**Returns:**
```javascript
string // Formatted report text
```

## 🔧 Utility Functions

#### `setupTriggers(form)`
Creates automated triggers for form submissions and analytics.

**Parameters:**
- `form`: FormApp.Form object

#### `determinePriority(data)`
Determines lead priority based on response data.

**Parameters:**
- `data`: Response data object

**Returns:**
```javascript
"HIGH" | "MEDIUM" | "LOW"
```

#### `performSystemMaintenance()`
Performs routine system maintenance and health checks.

#### `sendErrorNotification(error)`
Sends error notifications to administrators.

**Parameters:**
- `error`: Error object or string

## 🎯 Event Handlers

#### `onFormSubmit(e)`
Main event handler for form submissions.

**Parameters:**
- `e`: Form submit event object

**Process:**
1. Generates unique response ID
2. Extracts response data
3. Sends notifications
4. Updates analytics
5. Checks for high-priority leads

## 📈 Analytics API

### Metrics Available

#### Lead Volume
```javascript
// Total submissions
const totalSubmissions = sheet.getLastRow() - 1;

// Monthly submissions
const monthlySubmissions = countSubmissionsByMonth(currentMonth);
```

#### Lead Quality
```javascript
// High-value leads
const highValueLeads = countByBudgetRange("$15,000+");

// Rush projects
const rushProjects = countByTimeline("ASAP");
```

#### Conversion Tracking
```javascript
// Lead sources
const leadSources = analyzeLeadSources();

// Service distribution
const serviceDistribution = analyzeServiceRequests();
```

## 🔒 Security Functions

#### Rate Limiting
```javascript
// Check submission rate
function checkRateLimit(email) {
  const submissions = countSubmissionsByEmail(email, today);
  return submissions < SETTINGS.MAX_SUBMISSIONS_PER_EMAIL;
}
```

#### Data Validation
```javascript
// Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number
function validatePhone(phone) {
  const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}
```

## 🔧 Configuration API

### Settings Object
```javascript
const SETTINGS = {
  // Form Configuration
  FORM_TITLE: string,
  SHEET_NAME: string,
  EXISTING_SHEET_ID: string,
  
  // Business Information
  COMPANY_NAME: string,
  LINKTREE_URL: string,
  BUSINESS_EMAIL: string,
  
  // Notification Settings
  ADMIN_EMAIL: string,
  ENABLE_EMAIL_NOTIFICATIONS: boolean,
  ENABLE_SLACK_NOTIFICATIONS: boolean,
  SLACK_WEBHOOK_URL: string,
  
  // Analytics & Tracking
  ENABLE_ANALYTICS: boolean,
  GA_TRACKING_ID: string,
  
  // Response Management
  AUTO_RESPONSE_ENABLED: boolean,
  RESPONSE_TEMPLATE_ID: string,
  
  // Security
  RATE_LIMIT_ENABLED: boolean,
  MAX_SUBMISSIONS_PER_EMAIL: number,
  ENABLE_CAPTCHA: boolean
};
```

## 📊 Data Structures

### Response Data Schema
```javascript
{
  timestamp: Date,
  responseId: string,
  fullName: string,
  email: string,
  phone: string,
  company?: string,
  timeline: string,
  servicesInterested: string[],
  projectType: string,
  packageTier: string,
  budgetRange: string,
  requirements: string,
  familiarityScore: number,
  leadSource: string,
  comments?: string,
  marketingConsent: string[],
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Closed",
  assignedTo?: string,
  followUpDate?: Date,
  priority: "HIGH" | "MEDIUM" | "LOW",
  estimatedValue?: number,
  notes?: string
}
```

### Analytics Data Schema
```javascript
{
  date: Date,
  totalSubmissions: number,
  leadSources: {
    [source: string]: number
  },
  serviceRequests: {
    [service: string]: number
  },
  budgetDistribution: {
    [range: string]: number
  },
  timelinePreferences: {
    [timeline: string]: number
  },
  conversionRate: number
}
```

## 🚀 Usage Examples

### Basic Setup
```javascript
// Initialize the system
const system = setupIAHSystem();

// Verify deployment
const status = verifyDeployment();
if (status.spreadsheet && status.form && status.triggers) {
  console.log('✅ System ready for production');
}
```

### Custom Notifications
```javascript
// Send custom notification
function sendCustomAlert(data) {
  if (data.budget.includes('Enterprise')) {
    MailApp.sendEmail(
      SETTINGS.ADMIN_EMAIL,
      '🚨 Enterprise Lead Alert',
      `High-value lead: ${data.name} - ${data.email}`
    );
  }
}
```

### Analytics Query
```javascript
// Get monthly statistics
function getMonthlyStats() {
  const ss = SpreadsheetApp.openById(SETTINGS.EXISTING_SHEET_ID);
  const sheet = ss.getSheetByName(SETTINGS.SHEET_NAME);
  
  const data = sheet.getDataRange().getValues();
  const thisMonth = new Date().getMonth();
  
  const monthlyData = data.filter(row => {
    const date = new Date(row[0]);
    return date.getMonth() === thisMonth;
  });
  
  return {
    totalSubmissions: monthlyData.length,
    highPriorityLeads: monthlyData.filter(row => 
      row[19] === 'HIGH'
    ).length
  };
}
```

## 🔍 Error Handling

### Common Error Codes
- `SPREADSHEET_ACCESS_ERROR`: Cannot access the spreadsheet
- `EMAIL_QUOTA_EXCEEDED`: Daily email limit reached
- `FORM_CREATION_ERROR`: Failed to create form
- `TRIGGER_SETUP_ERROR`: Cannot create automated triggers

### Error Response Format
```javascript
{
  error: true,
  code: string,
  message: string,
  timestamp: Date,
  function: string
}
```

## 📞 Support

For API support and questions:
- **Documentation**: GitHub repository
- **Email**: support@iahcreations.com
- **Community**: Stack Overflow (google-apps-script tag)

---

**API Version**: 2.0.0
**Last Updated**: 2024-12-19
**Compatibility**: Google Apps Script Runtime V8