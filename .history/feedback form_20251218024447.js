/**
 * Google Apps Script to create a specialized Inquiry/Feedback Form for "The IAH Creations"
 * based on the uploaded brochure.
 * * Instructions:
 * 1. Go to https://script.google.com/
 * 2. Paste this code into the editor.
 * 3. Run the function 'createIAHFeedbackSystem'.
 */

function createIAHFeedbackSystem() {
  // 1. Configuration
  var formTitle = "The IAH Creations: Project Inquiry & Feedback";
  var sheetName = "IAH Client Responses";
  var linkTreeUrl = "https://linktr.ee/theiahcreations";

  try {
    // 2. Create the Google Form
    var form = FormApp.create(formTitle)
      .setDescription(
        "Welcome to The IAH Creations. We specialize in rapid, high-quality digital prototyping and full-scale development (Innovate, Automate, Host).\n\nConnect with us: " +
          linkTreeUrl
      )
      .setConfirmationMessage(
        "Thank you for reaching out to The IAH Creations! We will review your submission and get back to you shortly.\n\nExplore more about us here: " +
          linkTreeUrl
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

    form.addTextItem().setTitle("Phone Number").setRequired(true);

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

    form
      .addParagraphItem()
      .setTitle(
        "Please describe your project requirements or any specific features you need (e.g., SEO, Payment Gateway, AI Integration):"
      );

    // --- SECTION 4: FEEDBACK (Optional) ---
    form.addPageBreakItem().setTitle("Additional Feedback / Questions");

    form
      .addScaleItem()
      .setTitle(
        "How familiar are you with our 'Innovate, Automate, Host' model?"
      )
      .setBounds(1, 5)
      .setLabels("Not Familiar", "Very Familiar");

    form.addParagraphItem().setTitle("Any other questions or comments?");

    // 3. Create the Destination Spreadsheet
    var ss = SpreadsheetApp.create(sheetName);

    // 4. Link the Form to the Spreadsheet
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

    // 5. Log the URLs
    Logger.log("------------------------------------------------");
    Logger.log("IAH CREATIONS FORM GENERATED");
    Logger.log("Form Edit URL: " + form.getEditUrl());
    Logger.log("Published Form URL: " + form.getPublishedUrl());
    Logger.log("Linked Spreadsheet URL: " + ss.getUrl());
    Logger.log("Linktree added to description: " + linkTreeUrl);
    Logger.log("------------------------------------------------");
  } catch (e) {
    Logger.log("Error: " + e.toString());
  }
}
