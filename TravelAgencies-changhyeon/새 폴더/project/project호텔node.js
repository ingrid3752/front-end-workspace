const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/reserve", (req, res) => {
  const { name, email, checkin, checkout, roomType } = req.body;

  // 이메일 발송 설정
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "호텔 예약 확인",
    text: `${name}님, 예약이 완료되었습니다. 체크인: ${checkin}, 체크아웃: ${checkout}, 객실 타입: ${roomType}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("예약 확인 이메일 발송 실패");
    } else {
      res.send("예약이 완료되었습니다.");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
