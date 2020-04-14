import mongoose, { Schema } from 'mongoose';
import md5 from 'md5';
mongoose.connect('mongodb://dbUserName:password@host:port/DBName', { useNewUrlParser: true }, err => {
  if (err) {
    console.log('出错---------->', err)
  } else {
    console.log('链接成功');
  }
})
// 用户相关
const userSchema = new mongoose.Schema({
  headerImg: { // 用户头像
    type: String,
    require: true,
  },
  password: { // 密码
    type: String,
    require: true,
    set(pwd) {
      return md5(pwd);
    }
  },
  nickName: { // 用户签名
    type: String,
    require: true,
  },
  email: { // 用户邮箱
    type: String,
    unique: true,
    require: true,
  },
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});
export const User = mongoose.model('User', userSchema, 'user');