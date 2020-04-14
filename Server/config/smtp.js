import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  auth: {
      user: '',
      pass: ''
  }
});
export const sendMail = (data) => {
  return new Promise((reslove,reject) => {
    transporter.sendMail(Object.assign({from: {
      name: '',
      address: ''
    }}, data), (err, res) => {
      if(err) {
        console.log(err);
        reject(false);
      } else {
        reslove(true);
      }
    })
  })
} 