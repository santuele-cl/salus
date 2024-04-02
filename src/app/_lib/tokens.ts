import crypto from "crypto";
import { v4 as uuid } from "uuid";

import { getVerificationTokenByEmail } from "../_data/verification-token";
import { db } from "./db";
import { getPasswordResetTokenByEmail } from "../_data/password-reset-token";
import { getTwoFactorTokenByEmail } from "../_data/two-factor";
import { EXPIRES_IN_15_MIN } from "../_data/constant";

export const generateVerficationToken = async (email: string) => {
  const token = uuid();
  const expires = EXPIRES_IN_15_MIN;
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: { email, token, expires },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = EXPIRES_IN_15_MIN;
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: { email, token, expires },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = EXPIRES_IN_15_MIN;

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
