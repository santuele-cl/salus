import email from "next-auth/providers/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_APP_URL_DEV
      : process.env.NEXT_PUBLIC_APP_URL_PROD
  }/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: `${process.env.RESEND_MAIL_DOMAIN}`,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_APP_URL_DEV
      : process.env.NEXT_PUBLIC_APP_URL_PROD
  }/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: `${process.env.RESEND_MAIL_DOMAIN}`,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password</p>`,
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: `${process.env.RESEND_MAIL_DOMAIN}`,
    to: email,
    subject: "Two Factor Authentication",
    html: `<p>Your 2FA Code : ${token}</p>`,
  });
};
