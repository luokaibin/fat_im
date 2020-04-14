import qiniu from 'qiniu';
import { Duplex } from 'stream';

const ACCESS_KEY = 'ACCESS_KEY';
const SECRET_KEY = 'SECRET_KEY';
const bucketName = 'bucketName';
const domin = 'domin';
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
// 构造配置类
const qiniuConfig = new qiniu.conf.Config();
qiniuConfig.useCdnDomain = true; // 上传是否使用cdn加速
qiniuConfig.zone = qiniu.zone.Zone_z2
qiniuConfig.prefix = 'static/fat_im/';
// 生成token
const getUp_token = fileName => {
  try {
    const options = {
      scope: `${bucketName}:static/fat_im/images/${fileName}`,
      expires: 7200,
      returnBody: `{"key":"$(key)","fileName":"$(fname)","fsize": "$(fsize)", "url": "${domin}$(key)"}`,
    }
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(mac);
    return token
  } catch (error) {
    return;
  }
}
// 构造上传函数
export const uploadFile = (file) => {
  const token = getUp_token(file.fileName);
  const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
  const putExtra = new qiniu.form_up.PutExtra();
  const fileName = `static/fat_im/images/${file.fileName}`;
  return new Promise((resolve, reject) => {
    formUploader.putFile(token, fileName, file.imgBlob, putExtra, (err, body, info) => {
      if (!err) {
        console.log(body);
        return resolve(`${domin}${body.key}`)
      } else {
        return reject();
      }
    })
  })
}
// 二进制文件上传
export const putStream = ({fileName, imgBase}) => {
  const token = getUp_token(fileName);
  const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
  const putExtra = new qiniu.form_up.PutExtra();
  const file_name = `static/fat_im/images/${fileName}`;
  const buff = new Buffer(imgBase, 'base64')
  const stream = new Duplex();
  stream.push(buff);
  stream.push(null);
  return new Promise((resolve, reject) => {
    formUploader.putStream(token, file_name, stream, putExtra, (err, body, info) => {
      if (!err) {
        return resolve(body.url);
      } else {
        return reject();
      }
    })
  })
}
