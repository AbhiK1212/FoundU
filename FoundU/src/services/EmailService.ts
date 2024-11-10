// src/services/EmailService.ts
import nodemailer from 'nodemailer';
import { CardDetails } from '../types';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  async generatePossibleEmails(name: string): Promise<string[]> {
    const [firstName, lastName] = name.split(' ').map(n => n.toLowerCase());
    const firstInitial = firstName[0];
    
    // Handle hyphenated last names
    const processedLastName = lastName.replace('-', '');
    
    // Generate possible email patterns
    const emailPatterns = [
      `${firstInitial}${processedLastName}@umass.edu`,
      `${firstName}${processedLastName}@umass.edu`,
      `${firstInitial}${processedLastName}1@umass.edu`,
      `${firstInitial}${processedLastName}2@umass.edu`,
    ];

    return emailPatterns;
  }

  async sendNotification(emails: string[], cardDetails: CardDetails) {
    let locationText = '';
    
    switch (cardDetails.status) {
      case 'KEPT':
        locationText = `Someone has your card and can be contacted at: ${cardDetails.keeperEmail}`;
        break;
      case 'LEFT':
        locationText = `The card was left at: ${cardDetails.location.description}`;
        break;
      case 'OTHER':
        locationText = `Additional Information: ${cardDetails.otherDescription}`;
        break;
    }

    const emailTemplate = {
      from: process.env.GMAIL_USER,
      to: emails.join(','),
      subject: 'Lost UCard Found - Is this yours?',
      html: `
        <h2>Lost UCard Found</h2>
        <p>A UCard has been found that may belong to you.</p>
        <p>${locationText}</p>
        <p>If this is your card, please follow up accordingly.</p>
        <p>If this is not your card, please disregard this email.</p>
        <br>
        <p>Best regards,</p>
        <p>UCard Finder App</p>
      `,
      attachments: [{
        filename: 'ucard.jpg',
        path: cardDetails.imageUri,
      }],
    };

    try {
      await this.transporter.sendMail(emailTemplate);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}