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

// export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
//   await transporter.sendMail({
//     from: "<testmail.tobey@gmail.com>",
//     to: email,
//     subject: "AUTH 雙重驗證碼",
//     html: `
//     驗證碼:<strong>${token}</strong>`,
//   });
// };
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: "<testmail.tobey@gmail.com>",
    to: email,
    subject: "AUTH 雙重驗證碼",
    html: ` <div
    style="
      padding: 3rem 2rem;
      display: flex;
      text-align: center;
      margin: 0 auto;
      border: 1px solid #bbbbbbae;
      width: 16rem;
      border-radius: 10px;
      "
  >
    <div style="width: 100%">
      <p
        style="
          font-size: large;
          border-bottom: 1px solid #bbbbbbae;
          padding-bottom: 1rem;
          color: #4c4c4c;
        "
      >
        驗證您的信箱 📩
      </p>
      <div style="font-weight: 900; font-size: xx-large">${token}</div>
      <p style="font-size: small; margin-top: 2rem; color: #4c4c4c">
        該代碼將在 <span style="font-weight: 500">5 </span>分鐘後過期
      </p>
    </div>
  </div>`,
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
