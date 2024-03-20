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
    padding: 1rem 2rem 2rem;
    display: flex;
    text-align: center;
    margin: 0 auto;
    border: 1px solid #bbbbbbae;
    width: 16rem;
    border-radius: 10px;
    justify-content: center !important;
    box-shadow: 3px 4px 5px 0px #a2a2a233;
  "
  >
    <div style="width: 100%">
      <p
        style="
          font-size: large;
          border-bottom: 1px solid #bbbbbbae;
          padding-bottom: 1rem;
          color: #4c4c4c;
          font-weight: 200;
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
    subject: "註冊成功！",
    html: ` <div
      style="
        padding: 1rem 2rem 2rem;
        display: flex;
        text-align: center;
        margin: 0 auto;
        border: 1px solid #bbbbbbae;
        width: 16rem;
        border-radius: 10px;
        justify-content: center !important;
        box-shadow: 3px 4px 5px 0px #a2a2a233;
      "
    >
      <div style="width: 100%">
        <p
          style="
            font-size: large;
            border-bottom: 1px solid #bbbbbbae;
            padding-bottom: 1rem;
            color: #4c4c4c;
            font-weight: 200;
          "
        >
          註冊成功 🎉
        </p>
        <p
          style="
            font-size: medium;
            font-weight: 300;
            margin: 3rem 0;
            background-color: #f4f4f4;
            border-radius: 10px;
            padding: 1rem;
            color: black;
          "
        >
          請點擊
          <strong
            ><a
              style="text-decoration: none; color: #328ab3"
              href="${confirmLink}"
              >這裡</a
            ></strong
          >
          回到網頁驗證
        </p>
        <p style="font-size: small; color: #4c4c4c; font-weight: 200">
          該連結將在
          <span id="countdownspan" class="countdown" style="font-weight: 400"
            >60 分鐘</span
          >
          後失效
        </p>
      </div>
    </div>
`,
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await transporter.sendMail({
    from: "<testmail.tobey@gmail.com>",
    to: email,
    subject: "重新設置新密碼",
    html: ` <div
      style="
        padding: 1rem 2rem 2rem;
        display: flex;
        text-align: center;
        margin: 0 auto;
        border: 1px solid #bbbbbbae;
        width: 16rem;
        border-radius: 10px;
        justify-content: center !important;
        box-shadow: 3px 4px 5px 0px #a2a2a233;
      "
    >
      <div style="width: 100%">
        <p
          style="
            font-size: large;
            border-bottom: 1px solid #bbbbbbae;
            padding-bottom: 1rem;
            color: #4c4c4c;
            font-weight: 200;
          "
        >
          重新設定密碼 🔐
        </p>
        <p
          style="
            font-size: medium;
            font-weight: 300;
            margin: 3rem 0;
            background-color: #f4f4f4;
            border-radius: 10px;
            padding: 1rem;
            color: black;
          "
        >
          請點擊
          <strong
            ><a
              style="text-decoration: none; color: #328ab3"
              href="${resetLink}"
              >這裡</a
            ></strong
          >
          重新設置新密碼
        </p>
        <p style="font-size: small; color: #4c4c4c; font-weight: 200">
          該連結將在
          <span id="countdownspan" class="countdown" style="font-weight: 400"
            >60 分鐘</span
          >
          後失效
        </p>
      </div>
    </div>
`,
  });
};
