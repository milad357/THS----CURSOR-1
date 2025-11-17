import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      addressLine1,
      addressLine2,
      city,
      state,
      zip,
      country,
      emergencyFirstName,
      emergencyLastName,
      emergencyPhone,
      driversLicenseNumber,
      driversLicenseState,
      isAdult,
      mediaConsent,
      emailOptIn,
      signatureConsent,
      ackFinalRead,
      sections,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const dob = `${dateOfBirth.month}/${dateOfBirth.day}/${dateOfBirth.year}`;
    const fullAddress = `${addressLine1}${addressLine2 ? `, ${addressLine2}` : ''}, ${city}, ${state} ${zip}, ${country}`;

    // Format waiver sections
    const sectionsList = Object.entries(sections || {})
      .map(([id, acknowledged]) => `- ${id}: ${acknowledged ? '✓ Acknowledged' : '✗ Not acknowledged'}`)
      .join('\n');

    // Send email to info@ths247.com
    const { data, error } = await resend.emails.send({
      from: 'Tactical Home Solutions <noreply@ths247.com>',
      to: ['info@ths247.com'],
      replyTo: email,
      subject: `New Waiver Submission - ${firstName} ${lastName}`,
      html: `
        <h2>New Training Waiver & Release Submission</h2>
        
        <h3>Participant Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        
        <h3>Address</h3>
        <p>${fullAddress}</p>
        
        <h3>Emergency Contact</h3>
        <p><strong>Name:</strong> ${emergencyFirstName} ${emergencyLastName}</p>
        <p><strong>Phone:</strong> ${emergencyPhone}</p>
        
        <h3>Identification</h3>
        <p><strong>Driver's License/ID Number:</strong> ${driversLicenseNumber}</p>
        <p><strong>Issuing State:</strong> ${driversLicenseState}</p>
        
        <h3>Consents</h3>
        <p><strong>Is Adult (18+):</strong> ${isAdult ? 'Yes' : 'No'}</p>
        <p><strong>Media Consent:</strong> ${mediaConsent === 'allow' ? 'Allowed' : 'Denied'}</p>
        <p><strong>Email Opt-In:</strong> ${emailOptIn ? 'Yes' : 'No'}</p>
        <p><strong>Electronic Signature Consent:</strong> ${signatureConsent ? 'Yes' : 'No'}</p>
        <p><strong>Final Acknowledgment:</strong> ${ackFinalRead ? 'Yes' : 'No'}</p>
        
        <h3>Waiver Sections Acknowledged</h3>
        <pre style="white-space: pre-wrap; font-family: monospace;">${sectionsList}</pre>
        
        <hr>
        <p><small>This waiver was submitted electronically through the Tactical Home Solutions website.</small></p>
        <p><small>Submission Date: ${new Date().toLocaleString()}</small></p>
      `,
      text: `
New Training Waiver & Release Submission

Participant Information:
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Date of Birth: ${dob}

Address:
${fullAddress}

Emergency Contact:
Name: ${emergencyFirstName} ${emergencyLastName}
Phone: ${emergencyPhone}

Identification:
Driver's License/ID Number: ${driversLicenseNumber}
Issuing State: ${driversLicenseState}

Consents:
Is Adult (18+): ${isAdult ? 'Yes' : 'No'}
Media Consent: ${mediaConsent === 'allow' ? 'Allowed' : 'Denied'}
Email Opt-In: ${emailOptIn ? 'Yes' : 'No'}
Electronic Signature Consent: ${signatureConsent ? 'Yes' : 'No'}
Final Acknowledgment: ${ackFinalRead ? 'Yes' : 'No'}

Waiver Sections Acknowledged:
${sectionsList}

---
This waiver was submitted electronically through the Tactical Home Solutions website.
Submission Date: ${new Date().toLocaleString()}
      `,
    });

    // Also send confirmation email to the participant
    if (email) {
      await resend.emails.send({
        from: 'Tactical Home Solutions <noreply@ths247.com>',
        to: [email],
        subject: 'Waiver Submission Confirmation - Tactical Home Solutions',
        html: `
          <h2>Waiver Submission Confirmation</h2>
          <p>Dear ${firstName} ${lastName},</p>
          <p>Thank you for submitting your Training Waiver & Release form. We have received your submission and it has been recorded.</p>
          <p>This email serves as confirmation that your waiver was submitted on ${new Date().toLocaleString()}.</p>
          <p>Please keep this email for your records.</p>
          <hr>
          <p><strong>Tactical Home Solutions</strong></p>
          <p>Email: info@ths247.com</p>
          <p>Phone: 818-825-3104</p>
        `,
        text: `
Waiver Submission Confirmation

Dear ${firstName} ${lastName},

Thank you for submitting your Training Waiver & Release form. We have received your submission and it has been recorded.

This email serves as confirmation that your waiver was submitted on ${new Date().toLocaleString()}.

Please keep this email for your records.

---
Tactical Home Solutions
Email: info@ths247.com
Phone: 818-825-3104
        `,
      });
    }

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: `Failed to send email: ${error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error('Waiver form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

