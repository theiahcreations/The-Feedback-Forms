# 🚀 IAH Creations - Commercial Feedback Form System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)](https://script.google.com/)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/iahcreations/feedback-form)

A comprehensive, production-ready Google Apps Script solution for automated client inquiry management with advanced features including real-time notifications, analytics tracking, and automated response systems.

## 🌟 Features

### 📋 **Smart Form Management**
- Dynamic form creation with validation
- Multi-section inquiry form with conditional logic
- Real-time data validation and error handling
- Mobile-responsive design

### 📊 **Advanced Analytics**
- Real-time dashboard with key metrics
- Lead source tracking and conversion analytics
- Budget distribution analysis
- Daily/weekly/monthly reporting

### 🔔 **Automated Notifications**
- Instant client confirmation emails
- Priority-based admin alerts
- High-value lead notifications
- System health monitoring

### 💼 **Business Intelligence**
- Lead scoring and prioritization
- Revenue potential tracking
- Response time monitoring
- Performance analytics

### 🛡️ **Enterprise Security**
- Rate limiting protection
- Data validation and sanitization
- Error handling and logging
- Backup and recovery systems

## 🚀 Quick Start

### Prerequisites
- Google Account with Apps Script access
- Google Sheets for data storage
- Gmail for notifications (recommended)

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/iahcreations/feedback-form.git
   cd feedback-form
   ```

2. **Setup Google Apps Script**
   - Go to [Google Apps Script](https://script.google.com/)
   - Create a new project
   - Copy the contents of `feedback form.js`
   - Paste into the Apps Script editor

3. **Configure Settings**
   ```javascript
   const SETTINGS = {
     EXISTING_SHEET_ID: "YOUR_GOOGLE_SHEETS_ID",
     BUSINESS_EMAIL: "your-business@email.com",
     ADMIN_EMAIL: "admin@your-domain.com",
     // ... other settings
   };
   ```

4. **Deploy the System**
   ```javascript
   // Run this function in Apps Script
   setupIAHSystem();
   ```

5. **Verify Deployment**
   ```javascript
   // Check system status
   verifyDeployment();
   ```

## 📖 Configuration Guide

### 🔧 **Basic Configuration**

Update the `SETTINGS` object in the script:

```javascript
const SETTINGS = {
  // Form Configuration
  FORM_TITLE: "Your Company: Project Inquiry & Feedback",
  SHEET_NAME: "Client Responses",
  EXISTING_SHEET_ID: "1ZALFdwyUIk8HcbxQIhj7lGUDowVjyqxAE8hBTFnbzMI",
  
  // Business Information
  COMPANY_NAME: "Your Company Name",
  LINKTREE_URL: "https://linktr.ee/yourcompany",
  BUSINESS_EMAIL: "contact@yourcompany.com",
  
  // Notification Settings
  ADMIN_EMAIL: "admin@yourcompany.com",
  ENABLE_EMAIL_NOTIFICATIONS: true,
  
  // Analytics & Tracking
  ENABLE_ANALYTICS: true,
  
  // Security
  RATE_LIMIT_ENABLED: true,
  MAX_SUBMISSIONS_PER_EMAIL: 5
};
```

### 📧 **Email Templates**

The system includes professional email templates:

- **Client Confirmation**: Automatic acknowledgment with inquiry details
- **Admin Notifications**: Priority-based alerts for new leads
- **High-Priority Alerts**: Immediate notifications for urgent inquiries
- **Daily Reports**: Analytics summaries and action items

### 📊 **Analytics Dashboard**

The system creates three main sheets:

1. **Client Responses**: Main data collection
2. **Analytics**: Automated metrics and trends
3. **Dashboard**: Real-time KPI overview

## 🎯 Usage Examples

### Creating a New Form
```javascript
// Basic setup
const formData = setupIAHSystem();
console.log('Form URL:', formData.publishedUrl);
```

### Manual Analytics Generation
```javascript
// Generate custom reports
generateDailyAnalytics();
```

### System Maintenance
```javascript
// Perform routine maintenance
performSystemMaintenance();
```

## 📈 Analytics & Reporting

### Key Metrics Tracked
- **Lead Volume**: Daily, weekly, monthly submissions
- **Lead Quality**: Budget ranges and project complexity
- **Response Times**: Time to first contact
- **Conversion Rates**: Inquiry to project conversion
- **Lead Sources**: Marketing channel effectiveness

### Automated Reports
- **Daily Summary**: Key metrics and action items
- **Weekly Trends**: Performance analysis
- **Monthly Review**: Comprehensive business intelligence

## 🔒 Security Features

### Data Protection
- Input validation and sanitization
- Rate limiting to prevent spam
- Error handling and logging
- Secure data transmission

### Privacy Compliance
- GDPR-ready consent management
- Data retention policies
- Secure data storage
- Audit trail maintenance

## 🛠️ Customization

### Adding Custom Fields
```javascript
// Add new form fields
form.addTextItem()
  .setTitle("Custom Field")
  .setRequired(true);
```

### Custom Notifications
```javascript
// Modify notification templates
function sendCustomNotification(data) {
  // Your custom logic here
}
```

### Analytics Extensions
```javascript
// Add custom metrics
function trackCustomMetric(data) {
  // Your tracking logic here
}
```

## 🚨 Troubleshooting

### Common Issues

**Form Not Creating**
- Check Google Apps Script permissions
- Verify Google Sheets access
- Review error logs in Apps Script console

**Emails Not Sending**
- Confirm email addresses in settings
- Check Gmail quota limits
- Verify Apps Script email permissions

**Data Not Saving**
- Validate Google Sheets ID
- Check sheet permissions
- Review form-to-sheet connection

### Debug Mode
```javascript
// Enable detailed logging
Logger.log('Debug info:', debugData);
```

## 📞 Support

### Documentation
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Google Forms API](https://developers.google.com/forms)
- [Google Sheets API](https://developers.google.com/sheets)

### Community
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-apps-script)
- [Google Apps Script Community](https://developers.google.com/apps-script/support)

### Professional Support
For enterprise implementations and custom development:
- 📧 Email: contact@iahcreations.com
- 🔗 Website: [The IAH Creations](https://linktr.ee/theiahcreations)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Acknowledgments

- Google Apps Script team for the platform
- Open source community for inspiration
- Beta testers and early adopters

## 📊 Project Stats

- **Version**: 2.0.0
- **Last Updated**: 2024
- **Language**: JavaScript (Google Apps Script)
- **Dependencies**: Google Workspace APIs
- **License**: MIT

---

**Made with ❤️ by [The IAH Creations](https://linktr.ee/theiahcreations)**

*Innovate • Automate • Host*