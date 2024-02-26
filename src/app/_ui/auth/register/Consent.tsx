import { Box, Typography } from "@mui/material";
import React from "react";
import Markdown from "react-markdown";
const consent = `
# Privacy and Consent Form

## Introduction

Salus is committed to safeguarding the privacy and security of your personal health information. This Privacy and Consent Form explains how we collect, use, and disclose your information when you use our electronic health record system.

## Information We Collect

- **Personal Information**: We collect personal information such as your name, date of birth, contact information, and health history to create and maintain your electronic health record.

- **Health Information**: We collect information about your medical conditions, treatments, medications, allergies, and other health-related data necessary for providing healthcare services.

- **Usage Data**: We collect data about how you interact with the Salus app, including your device information, IP address, and usage patterns.

## How We Use Your Information

We use the information we collect for the following purposes:

- **Providing Healthcare Services**: Your health information is used to facilitate the provision of healthcare services, including diagnosis, treatment, and monitoring.

- **Improving Our Services**: We may use aggregated and anonymized data for research, analytics, and improving the functionality and performance of the Salus app.

- **Communications**: We may use your contact information to send important updates, notifications, and reminders related to your healthcare.

## Data Sharing and Disclosure

We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:

- **With Healthcare Providers**: We may share your health information with your healthcare providers to coordinate your care and treatment.

- **With Service Providers**: We may engage third-party service providers to assist us in delivering our services, such as hosting providers and analytics services. These providers are contractually obligated to maintain the confidentiality and security of your information.

- **Legal Compliance**: We may disclose your information as required by law, regulation, or legal process, or to protect the rights, property, or safety of Salus, our users, or others.

## Data Security

We employ industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction.

## Your Consent

By using the Salus app, you consent to the collection, use, and disclosure of your information as described in this Privacy and Consent Form.

## Your Rights

You have the right to:

- **Access**: Request access to your personal health information.
- **Rectification**: Request corrections to any inaccuracies in your information.
- **Erasure**: Request the deletion of your information, subject to legal and contractual obligations.
- **Objection**: Object to the processing of your information for certain purposes.

## Contact Us

If you have any questions or concerns about our privacy practices or this Privacy and Consent Form, please contact us at team@salustech.online.
`;
const Consent = () => {
  return (
    <Box width="100%" p={4}>
      <Typography component="div">
        <Markdown>{consent}</Markdown>
      </Typography>
    </Box>
  );
};

export default Consent;
