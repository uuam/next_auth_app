import nodemailer from "nodemailer";

const domain = process.env.NEXT_PUBLIC_APP_URL;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  // host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "testmail.tobey@gmail.com",
    pass: process.env.NODEMAILER_SECRET,
  },
});

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: "<testmail.tobey@gmail.com>",
    to: email,
    subject: "2FA Code",
    html: `2FA Code:<strong>${token}`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await transporter.sendMail({
    from: "<testmail.tobey@gmail.com>",
    to: email,
    subject: "Verify your email",
    html: `<p>Click <strong><a style="color:#168db5" href="${confirmLink}">here</a><strong> to confirm email.</p>`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await transporter.sendMail({
    from: "<testmail.tobey@gmail.com>",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <strong><a style="color:#168db5" href="${resetLink}">here</a><strong>  to reset password.</p>`,
  });
};
