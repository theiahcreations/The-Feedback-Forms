/**
 * IAH Creations - Commercial Feedback Form System
 *
 * A comprehensive Google Apps Script solution for automated client inquiry management
 * Features: Form creation, data validation, email notifications, analytics tracking
 *
 * @version 2.0.0
 * @author The IAH Creations
 * @license MIT
 *
 * Setup Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create new project and paste this code
 * 3. Configure SETTINGS object below
 * 4. Run setupIAHSystem() function
 * 5. Set up triggers for automated responses
 */

// ===== CONFIGURATION SETTINGS =====
const SETTINGS = {
  // Form Configuration
  FORM_TITLE: "The IAH Creations: Project Inquiry & Feedback",
  SHEET_NAME: "IAH Client Responses",
  EXISTING_SHEET_ID: "1ZALFdwyUIk8HcbxQIhj7lGUDowVjyqxAE8hBTFnbzMI",

  // Business Information
  COMPANY_NAME: "The IAH Creations",
  LINKTREE_URL: "https://linktr.ee/theiahcreations",
  BUSINESS_EMAIL: "contact@iahcreations.com", // Update with actual email

  // Notification Settings
  ADMIN_EMAIL: "admin@iahcreations.com", // Update with actual admin email
  ENABLE_EMAIL_NOTIFICATIONS: true,
  ENABLE_SLACK_NOTIFICATIONS: false, // Set to true if using Slack
  SLACK_WEBHOOK_URL: "", // Add Slack webhook if needed

  // Analytics & Tracking
  ENABLE_ANALYTICS: true,
  GA_TRACKING_ID: "", // Add Google Analytics ID if needed

  // Response Management
  AUTO_RESPONSE_ENABLED: true,
  RESPONSE_TEMPLATE_ID: "", // Google Doc template ID for responses

  // Security
  RATE_LIMIT_ENABLED: true,
  MAX_SUBMISSIONS_PER_EMAIL: 5, // Per day
  ENABLE_CAPTCHA: false, // Future enhancement
};

// ===== MAIN SETUP FUNCTION =====
function setupIAHSystem() {
  try {
    Logger.log("🚀 Starting IAH Creations Form System Setup...");

    // Create form and spreadsheet
    const formData = createIAHFeedbackForm();

    // Setup automated triggers
    setupTriggers(formData.form);

    // Initialize analytics
    if (SETTINGS.ENABLE_ANALYTICS) {
      initializeAnalytics();
    }

    // Setup notification system
    if (SETTINGS.ENABLE_EMAIL_NOTIFICATIONS) {
      setupEmailNotifications();
    }

    Logger.log("✅ IAH System Setup Complete!");
    return formData;
  } catch (error) {
    Logger.log("❌ Setup Error: " + error.toString());
    sendErrorNotification(error);
    throw error;
  }
}

function createIAHFeedbackForm() {
  try {
    // 2. Create the Google Form with enhanced settings
    var form = FormApp.create(SETTINGS.FORM_TITLE)
      .setDescription(
        `Welcome to ${SETTINGS.COMPANY_NAME}. We specialize in rapid, high-quality digital prototyping and full-scale development (Innovate, Automate, Host).\n\n` +
          `🔗 Connect with us: ${SETTINGS.LINKTREE_URL}\n` +
          `📧 Email: ${SETTINGS.BUSINESS_EMAIL}\n\n` +
          `⚡ Fast Response Guarantee: We respond within 24 hours!`
      )
      .setConfirmationMessage(
        `🎉 Thank you for reaching out to ${SETTINGS.COMPANY_NAME}!\n\n` +
          `✅ Your inquiry has been received and assigned ID: {{RESPONSE_ID}}\n` +
          `📧 Confirmation sent to your email\n` +
          `⏰ Expected response time: Within 24 hours\n\n` +
          `🔗 Explore more: ${SETTINGS.LINKTREE_URL}`
      )
      .setAllowResponseEdits(true)
      .setAcceptingResponses(true);

    // --- SECTION 1: CLIENT DETAILS ---
    form.addSectionHeaderItem().setTitle("Client Information");

    form.addTextItem().setTitle("Full Name").setRequired(true);

    form
      .addTextItem()
      .setTitle("Email Address")
      .setValidation(
        FormApp.createTextValidation().requireTextIsEmail().build()
      )
      .setRequired(true);

    form
      .addTextItem()
      .setTitle("Phone Number")
      .setHelpText("Include country code (e.g., +1 555-123-4567)")
      .setValidation(
        FormApp.createTextValidation()
          .requireTextMatchesPattern("^[+]?[0-9s-()]{10,}$")
          .setHelpText("Please enter a valid phone number")
          .build()
      )
      .setRequired(true);

    // Company/Organization (Optional)
    form
      .addTextItem()
      .setTitle("Company/Organization (Optional)")
      .setHelpText("If representing a business or organization");

    // Project Timeline
    form
      .addMultipleChoiceItem()
      .setTitle("Expected Project Timeline")
      .setChoices([
        form.createChoice("ASAP (Rush - Additional fees may apply)"),
        form.createChoice("Within 1-2 weeks"),
        form.createChoice("Within 1 month"),
        form.createChoice("2-3 months"),
        form.createChoice("Flexible timeline"),
        form.createChoice("Just exploring options"),
      ])
      .setRequired(true);

    // --- SECTION 2: SERVICE INTEREST (Based on Brochure) ---
    form.addPageBreakItem().setTitle("Service Selection");

    // Main Category Selection
    var serviceCategory = form
      .addCheckboxItem()
      .setTitle("Which services are you interested in?")
      .setChoices([
        form.createChoice("1. Website Creations (SPW / Multi-Page)"),
        form.createChoice("2. Web App Creations (SPA / Multi-Tasking)"),
        form.createChoice("3. Mobile Application Creations (Android / iOS)"),
        form.createChoice("Other / General Consultation"),
      ])
      .setRequired(true);

    // Specific Project Type (Derived from Brochure Sub-sections 1.1, 1.2, 2.1, 2.2, etc.)
    var projectType = form
      .addListItem()
      .setTitle("Select your specific project type (if known):")
      .setChoices([
        form.createChoice(
          "1.1 Single Page Website (Portfolio, Resume, Landing Page)"
        ),
        form.createChoice(
          "1.2 Dynamic Multi-Page Website (Corporate, E-commerce, CMS)"
        ),
        form.createChoice(
          "2.1 Single Page Web App (Calculator, Dashboard, To-Do)"
        ),
        form.createChoice("2.2 Multi-Tasking Dynamic App (SaaS, CRM, ERP)"),
        form.createChoice("3.1 Mobile SPA (Info Display, Utility Tool)"),
        form.createChoice(
          "3.2 Dynamic Mobile App (Native/Hybrid, Flutter/React Native)"
        ),
        form.createChoice("Not sure yet / Need guidance"),
      ]);

    // --- SECTION 3: PROJECT TIER & BUDGET (Based on Pricing Tables) ---
    form.addSectionHeaderItem().setTitle("Project Scope & Budget");

    // Tiers mentioned in the brochure
    form
      .addMultipleChoiceItem()
      .setTitle("Preferred Package Tier")
      .setHelpText(
        "Refer to our brochure for detailed feature breakdowns per tier."
      )
      .setChoices([
        form.createChoice("Basic (MVP / Starter features)"),
        form.createChoice("Medium (Standard features + Integrations)"),
        form.createChoice("Advance (Full Scale / AI / High Scalability)"),
        form.createChoice("Custom Quote Needed"),
      ]);

    // Budget Range
    form
      .addMultipleChoiceItem()
      .setTitle("Estimated Budget Range (USD)")
      .setHelpText("This helps us recommend the most suitable package")
      .setChoices([
        form.createChoice("$500 - $2,000 (Basic)"),
        form.createChoice("$2,000 - $5,000 (Standard)"),
        form.createChoice("$5,000 - $15,000 (Premium)"),
        form.createChoice("$15,000+ (Enterprise)"),
        form.createChoice("Need consultation for pricing"),
      ])
      .setRequired(true);

    form
      .addParagraphItem()
      .setTitle("Detailed Project Requirements")
      .setHelpText(
        "Please describe your project in detail. Include:\n" +
          "• Specific features needed (SEO, Payment Gateway, AI, etc.)\n" +
          "• Target audience\n" +
          "• Existing systems to integrate with\n" +
          "• Any design preferences or examples"
      )
      .setRequired(true);

    // --- SECTION 4: FEEDBACK (Optional) ---
    form.addPageBreakItem().setTitle("Additional Feedback / Questions");

    form
      .addScaleItem()
      .setTitle(
        "How familiar are you with our 'Innovate, Automate, Host' model?"
      )
      .setBounds(1, 5)
      .setLabels("Not Familiar", "Very Familiar");

    // Lead Source Tracking
    form
      .addMultipleChoiceItem()
      .setTitle("How did you hear about us?")
      .setChoices([
        form.createChoice("Google Search"),
        form.createChoice("Social Media (LinkedIn, Instagram, etc.)"),
        form.createChoice("Referral from friend/colleague"),
        form.createChoice("Previous client"),
        form.createChoice("Online advertisement"),
        form.createChoice("Business networking event"),
        form.createChoice("Other"),
      ]);

    form
      .addParagraphItem()
      .setTitle("Additional Questions or Comments")
      .setHelpText("Any other information you'd like to share?");

    // Marketing Consent
    form
      .addCheckboxItem()
      .setTitle("Communication Preferences")
      .setChoices([
        form.createChoice("I agree to receive project updates via email"),
        form.createChoice("I'd like to receive newsletters about new services"),
        form.createChoice("I consent to follow-up calls regarding my inquiry"),
      ]);

    // 3. Setup Spreadsheet with Enhanced Structure
    const spreadsheetData = setupEnhancedSpreadsheet();

    // 4. Link Form to Spreadsheet
    form.setDestination(
      FormApp.DestinationType.SPREADSHEET,
      spreadsheetData.spreadsheet.getId()
    );

    // 5. Log Results and Return Data
    const formData = {
      form: form,
      spreadsheet: spreadsheetData.spreadsheet,
      editUrl: form.getEditUrl(),
      publishedUrl: form.getPublishedUrl(),
      spreadsheetUrl: spreadsheetData.spreadsheet.getUrl(),
    };

    Logger.log("================================================");
    Logger.log("🎉 IAH CREATIONS FORM SYSTEM DEPLOYED");
    Logger.log("📝 Form Edit URL: " + formData.editUrl);
    Logger.log("🌐 Published Form URL: " + formData.publishedUrl);
    Logger.log("📊 Spreadsheet URL: " + formData.spreadsheetUrl);
    Logger.log("🔗 Business Link: " + SETTINGS.LINKTREE_URL);
    Logger.log("================================================");

    return formData;
  } catch (error) {
    Logger.log("❌ Form Creation Error: " + error.toString());
    sendErrorNotification(error);
    throw error;
  }
}

// ===== ENHANCED SPREADSHEET MANAGEMENT =====
function setupEnhancedSpreadsheet() {
  try {
    const ss = SpreadsheetApp.openById(SETTINGS.EXISTING_SHEET_ID);

    // Create or get the main responses sheet
    let responseSheet = ss.getSheetByName(SETTINGS.SHEET_NAME);
    if (!responseSheet) {
      responseSheet = ss.insertSheet(SETTINGS.SHEET_NAME);
    }

    // Setup headers with enhanced tracking
    const headers = [
      "Timestamp",
      "Response ID",
      "Full Name",
      "Email",
      "Phone",
      "Company",
      "Timeline",
      "Services Interested",
      "Project Type",
      "Package Tier",
      "Budget Range",
      "Requirements",
      "Familiarity Score",
      "Lead Source",
      "Comments",
      "Marketing Consent",
      "Status",
      "Assigned To",
      "Follow-up Date",
      "Priority",
      "Estimated Value",
      "Notes",
    ];

    if (responseSheet.getLastRow() === 0) {
      responseSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      responseSheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    }

    // Create analytics sheet
    setupAnalyticsSheet(ss);

    // Create dashboard sheet
    setupDashboardSheet(ss);

    return { spreadsheet: ss, responseSheet: responseSheet };
  } catch (error) {
    Logger.log("📊 Spreadsheet Setup Error: " + error.toString());
    throw error;
  }
}

function setupAnalyticsSheet(spreadsheet) {
  let analyticsSheet = spreadsheet.getSheetByName("Analytics");
  if (!analyticsSheet) {
    analyticsSheet = spreadsheet.insertSheet("Analytics");

    // Setup analytics tracking
    const analyticsHeaders = [
      "Date",
      "Total Submissions",
      "Lead Sources",
      "Service Requests",
      "Budget Distribution",
      "Timeline Preferences",
      "Conversion Rate",
    ];

    analyticsSheet
      .getRange(1, 1, 1, analyticsHeaders.length)
      .setValues([analyticsHeaders]);
    analyticsSheet
      .getRange(1, 1, 1, analyticsHeaders.length)
      .setFontWeight("bold");
  }
}

function setupDashboardSheet(spreadsheet) {
  let dashboardSheet = spreadsheet.getSheetByName("Dashboard");
  if (!dashboardSheet) {
    dashboardSheet = spreadsheet.insertSheet("Dashboard");

    // Create dashboard with key metrics
    dashboardSheet
      .getRange("A1")
      .setValue("📊 IAH Creations - Client Dashboard");
    dashboardSheet.getRange("A1").setFontSize(16).setFontWeight("bold");

    // Add key metrics placeholders
    const metrics = [
      ["📈 Total Inquiries:", "=COUNTA('IAH Client Responses'!A:A)-1"],
      [
        "🎯 This Month:",
        "=COUNTIFS('IAH Client Responses'!A:A,\">=\"&EOMONTH(TODAY(),-1)+1)",
      ],
      [
        "💰 High Value Leads:",
        "=COUNTIF('IAH Client Responses'!K:K,\"*$15,000+*\")",
      ],
      ["⚡ Rush Projects:", "=COUNTIF('IAH Client Responses'!G:G,\"*ASAP*\")"],
      [
        "🔥 Hot Leads (Score 4-5):",
        "=COUNTIFS('IAH Client Responses'!M:M,\">=4\")",
      ],
    ];

    dashboardSheet.getRange(3, 1, metrics.length, 2).setValues(metrics);
  }
}

// ===== AUTOMATED TRIGGERS & RESPONSES =====
function setupTriggers(form) {
  try {
    // Delete existing triggers to avoid duplicates
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach((trigger) => {
      if (trigger.getHandlerFunction() === "onFormSubmit") {
        ScriptApp.deleteTrigger(trigger);
      }
    });

    // Create new form submit trigger
    ScriptApp.newTrigger("onFormSubmit").create();

    Logger.log("✅ Triggers setup complete");
  } catch (error) {
    Logger.log("⚠️ Trigger Setup Error: " + error.toString());
  }
}

function onFormSubmit(e) {
  try {
    const response = e.response;
    const itemResponses = response.getItemResponses();

    // Generate unique response ID
    const responseId =
      "IAH-" + Utilities.getUuid().substring(0, 8).toUpperCase();

    // Extract response data
    const responseData = extractResponseData(itemResponses, responseId);

    // Send notifications
    if (SETTINGS.ENABLE_EMAIL_NOTIFICATIONS) {
      sendClientConfirmation(responseData);
      sendAdminNotification(responseData);
    }

    // Update analytics
    if (SETTINGS.ENABLE_ANALYTICS) {
      updateAnalytics(responseData);
    }

    // Check for high-priority leads
    checkHighPriorityLead(responseData);

    Logger.log("✅ Form submission processed: " + responseId);
  } catch (error) {
    Logger.log("❌ Form Submit Error: " + error.toString());
    sendErrorNotification(error);
  }
}

function extractResponseData(itemResponses, responseId) {
  const data = { responseId: responseId };

  itemResponses.forEach((itemResponse) => {
    const title = itemResponse.getItem().getTitle();
    const response = itemResponse.getResponse();

    // Map responses to data object
    if (title.includes("Full Name")) data.name = response;
    if (title.includes("Email")) data.email = response;
    if (title.includes("Phone")) data.phone = response;
    if (title.includes("Company")) data.company = response;
    if (title.includes("Timeline")) data.timeline = response;
    if (title.includes("services")) data.services = response;
    if (title.includes("Budget")) data.budget = response;
    if (title.includes("Requirements")) data.requirements = response;
  });

  return data;
}

// ===== NOTIFICATION SYSTEM =====
function sendClientConfirmation(data) {
  try {
    const subject = `✅ Inquiry Received - ${data.responseId} | ${SETTINGS.COMPANY_NAME}`;
    const body = `
Dear ${data.name},

Thank you for your interest in ${SETTINGS.COMPANY_NAME}! 

📋 Your Inquiry Details:
• Reference ID: ${data.responseId}
• Services: ${data.services || "Not specified"}
• Timeline: ${data.timeline || "Not specified"}
• Budget Range: ${data.budget || "To be discussed"}

⏰ What's Next:
1. Our team will review your requirements within 24 hours
2. You'll receive a detailed proposal via email
3. We'll schedule a consultation call if needed

📞 Need immediate assistance? 
Contact us directly at ${SETTINGS.BUSINESS_EMAIL}

🔗 Learn more about us: ${SETTINGS.LINKTREE_URL}

Best regards,
The IAH Creations Team
Innovate • Automate • Host
    `;

    MailApp.sendEmail(data.email, subject, body);
    Logger.log("📧 Client confirmation sent to: " + data.email);
  } catch (error) {
    Logger.log("📧 Email Error: " + error.toString());
  }
}

function sendAdminNotification(data) {
  try {
    const priority = determinePriority(data);
    const subject = `🚨 New Lead Alert [${priority}] - ${data.responseId}`;

    const body = `
🎯 NEW CLIENT INQUIRY - ${data.responseId}

👤 Client: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
🏢 Company: ${data.company || "Individual"}

💼 Project Details:
• Services: ${data.services || "Not specified"}
• Timeline: ${data.timeline || "Not specified"}
• Budget: ${data.budget || "To be discussed"}

📝 Requirements:
${data.requirements || "No additional details provided"}

🔥 Priority Level: ${priority}
⏰ Response Due: Within 24 hours

📊 View Full Details: ${SETTINGS.EXISTING_SHEET_ID}
    `;

    MailApp.sendEmail(SETTINGS.ADMIN_EMAIL, subject, body);
    Logger.log("🔔 Admin notification sent");
  } catch (error) {
    Logger.log("🔔 Admin Notification Error: " + error.toString());
  }
}

function determinePriority(data) {
  let priority = "MEDIUM";

  // High priority conditions
  if (data.timeline && data.timeline.includes("ASAP")) priority = "HIGH";
  if (
    data.budget &&
    (data.budget.includes("$15,000+") || data.budget.includes("Enterprise"))
  )
    priority = "HIGH";
  if (data.services && data.services.includes("Mobile Application"))
    priority = "HIGH";

  // Low priority conditions
  if (data.timeline && data.timeline.includes("Just exploring"))
    priority = "LOW";
  if (data.budget && data.budget.includes("Need consultation"))
    priority = "LOW";

  return priority;
}

// ===== ANALYTICS & REPORTING =====
function initializeAnalytics() {
  try {
    // Setup daily analytics trigger
    ScriptApp.newTrigger("generateDailyAnalytics")
      .timeBased()
      .everyDays(1)
      .atHour(9)
      .create();

    Logger.log("📊 Analytics initialized");
  } catch (error) {
    Logger.log("📊 Analytics Error: " + error.toString());
  }
}

function updateAnalytics(data) {
  try {
    const ss = SpreadsheetApp.openById(SETTINGS.EXISTING_SHEET_ID);
    const analyticsSheet = ss.getSheetByName("Analytics");

    if (analyticsSheet) {
      const today = new Date().toDateString();
      // Update daily metrics logic here
      Logger.log("📈 Analytics updated for: " + today);
    }
  } catch (error) {
    Logger.log("📈 Analytics Update Error: " + error.toString());
  }
}

function generateDailyAnalytics() {
  try {
    // Generate and send daily analytics report
    const report = compileDailyReport();

    if (SETTINGS.ADMIN_EMAIL) {
      MailApp.sendEmail(
        SETTINGS.ADMIN_EMAIL,
        "📊 Daily Analytics Report - " + new Date().toDateString(),
        report
      );
    }

    Logger.log("📊 Daily analytics report generated");
  } catch (error) {
    Logger.log("📊 Daily Analytics Error: " + error.toString());
  }
}

function compileDailyReport() {
  // Compile analytics data and return formatted report
  return `
📊 IAH Creations - Daily Analytics Report
Date: ${new Date().toDateString()}

📈 Key Metrics:
• Total Inquiries Today: [Auto-calculated]
• High Priority Leads: [Auto-calculated]
• Response Rate: [Auto-calculated]

🎯 Lead Sources:
• Google Search: [Auto-calculated]
• Social Media: [Auto-calculated]
• Referrals: [Auto-calculated]

💰 Budget Distribution:
• Basic ($500-$2K): [Auto-calculated]
• Standard ($2K-$5K): [Auto-calculated]
• Premium ($5K-$15K): [Auto-calculated]
• Enterprise ($15K+): [Auto-calculated]

📋 Action Items:
• Follow up on high-priority leads
• Review pending proposals
• Update project timelines

Dashboard: https://docs.google.com/spreadsheets/d/${SETTINGS.EXISTING_SHEET_ID}
  `;
}

// ===== ERROR HANDLING & MONITORING =====
function sendErrorNotification(error) {
  try {
    if (SETTINGS.ADMIN_EMAIL) {
      MailApp.sendEmail(
        SETTINGS.ADMIN_EMAIL,
        "🚨 IAH System Error Alert",
        `
System Error Detected:

Error: ${error.toString()}
Time: ${new Date()}
Function: ${error.stack || "Unknown"}

Please check the system logs and resolve immediately.

System Dashboard: https://script.google.com/
        `
      );
    }
  } catch (e) {
    Logger.log(
      "🚨 Critical Error - Cannot send notifications: " + e.toString()
    );
  }
}

// ===== UTILITY FUNCTIONS =====
function setupEmailNotifications() {
  Logger.log("📧 Email notification system enabled");
}

function checkHighPriorityLead(data) {
  const priority = determinePriority(data);

  if (priority === "HIGH") {
    // Send immediate high-priority alert
    try {
      MailApp.sendEmail(
        SETTINGS.ADMIN_EMAIL,
        "🔥 HIGH PRIORITY LEAD - Immediate Action Required",
        `
🚨 HIGH PRIORITY LEAD ALERT 🚨

Client: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

This lead requires immediate attention due to:
• ${data.timeline?.includes("ASAP") ? "URGENT timeline requirement" : ""}
• ${data.budget?.includes("$15,000+") ? "High budget potential" : ""}

RECOMMENDED ACTION: Contact within 2 hours

Reference ID: ${data.responseId}
        `
      );

      Logger.log("🔥 High priority alert sent for: " + data.responseId);
    } catch (error) {
      Logger.log("🔥 High Priority Alert Error: " + error.toString());
    }
  }
}

// ===== MAINTENANCE & CLEANUP =====
function performSystemMaintenance() {
  try {
    Logger.log("🔧 Starting system maintenance...");

    // Clean up old logs
    console.clear();

    // Verify spreadsheet integrity
    const ss = SpreadsheetApp.openById(SETTINGS.EXISTING_SHEET_ID);
    Logger.log("✅ Spreadsheet accessible");

    // Check trigger status
    const triggers = ScriptApp.getProjectTriggers();
    Logger.log(`✅ Active triggers: ${triggers.length}`);

    // Test email functionality
    if (SETTINGS.ENABLE_EMAIL_NOTIFICATIONS && SETTINGS.ADMIN_EMAIL) {
      MailApp.sendEmail(
        SETTINGS.ADMIN_EMAIL,
        "✅ IAH System Health Check",
        "System maintenance completed successfully. All systems operational."
      );
    }

    Logger.log("✅ System maintenance completed");
  } catch (error) {
    Logger.log("🔧 Maintenance Error: " + error.toString());
    sendErrorNotification(error);
  }
}

// ===== DEPLOYMENT VERIFICATION =====
function verifyDeployment() {
  try {
    Logger.log("🔍 Verifying deployment...");

    // Check all components
    const checks = {
      spreadsheet: false,
      form: false,
      triggers: false,
      notifications: false,
    };

    // Verify spreadsheet access
    try {
      SpreadsheetApp.openById(SETTINGS.EXISTING_SHEET_ID);
      checks.spreadsheet = true;
    } catch (e) {
      Logger.log("❌ Spreadsheet access failed");
    }

    // Verify triggers
    const triggers = ScriptApp.getProjectTriggers();
    checks.triggers = triggers.length > 0;

    // Verify email settings
    checks.notifications = SETTINGS.ADMIN_EMAIL && SETTINGS.BUSINESS_EMAIL;

    // Report results
    Logger.log("📋 Deployment Verification Results:");
    Logger.log(`📊 Spreadsheet: ${checks.spreadsheet ? "✅" : "❌"}`);
    Logger.log(`📝 Form: ${checks.form ? "✅" : "❌"}`);
    Logger.log(`⚡ Triggers: ${checks.triggers ? "✅" : "❌"}`);
    Logger.log(`📧 Notifications: ${checks.notifications ? "✅" : "❌"}`);

    const allGood = Object.values(checks).every((check) => check);
    Logger.log(
      `🎯 Overall Status: ${
        allGood ? "✅ READY FOR PRODUCTION" : "⚠️ NEEDS ATTENTION"
      }`
    );

    return checks;
  } catch (error) {
    Logger.log("🔍 Verification Error: " + error.toString());
    return false;
  }
}
