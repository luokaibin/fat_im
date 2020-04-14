import Koa from 'koa';
import logger from 'koa-logger';
import koaBody from 'koa-body';
// 引入路由
import auth from './routes/auth';
// 引入cors
import cors from './middleware/cors';
// 引入moment
import moment from 'moment';
// 引入md5
import md5 from 'md5';
// 引入smtp
import {sendMail} from './config/smtp';
// 引入工具库
import {create_validate_code, user_find, user_save } from './utils/tool';
// 引入redis
import {setItem, getItem, hsetItem, hgetall, hdel} from './config/redis';
// 引入文件上传
import { putStream } from './config/upload'

const app = new Koa()

app.use(cors);
app.use(logger());

app.use(koaBody({
  multipart: true
}));

app.use(auth.routes());
app.use(async (ctx, next) => {
  ctx.body = 'hello world';
})
app.on('error', err => {
  log.error('server error', err)
});
// socket
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
server.listen({port: '3939', host: '0.0.0.0'}, () => {
  console.log(`服务器启动完成`);
})

io.on('connection', socket => {
  socket.on('client msg', (rooms ,msg) => {
    msg.sendTime = moment().valueOf();
    io.to(rooms[0]).to(rooms[1]).emit('service msg',msg);
  })
  socket.on('disconnect', async () => {
    io.emit('user Offline', {socketId: socket.id, msg: '用户下线了'});
    const res = await hdel(`${socket.id}`);
  })
  socket.on('send validate code', async data => {
    const user = await user_find({email: data.email});
    if(user) {
      socket.emit('register fail', {code: 0, msg: '该邮箱已被注册'});
      return;
    }
    const code = await create_validate_code();
    const state = await sendMail({
      to: data.email,
      subject: '【FatChat】注册验证码',
      html: `<p>欢迎注册【FatChat】，您的验证码是<b>${code}</b>，验证码15分中内有效，请及时使用</p>`
    })
    const res = await setItem(data.email, code, 15 * 60);
    socket.emit('validate code sucess', {code: 200, msg: '验证码发送成功' });
  })
  socket.on('register', async data => {
    const user = await user_find({email: data.email});
    if(user) {
      socket.emit('register fail', {code: 0, msg: '该邮箱已被注册'});
      return;
    }
    const validateCode = await getItem(data.email);
    if(validateCode !== data.validateCode) {
      socket.emit('register fail', {code: 0, msg: '验证码不正确或已过期'});
      return;
    }
    socket.emit('register sucess', {code: 200, msg: '注册成功'});
    let {email, nickName, password, headerImg } = data;
    headerImg = await putStream(headerImg);
    const state = await user_save({ email, nickName, password, headerImg });
  })
  socket.on('login', async data => {
    const user = await user_find({email: data.userId});
    if(!user || user.password !== md5(data.password)) {
      socket.emit('login fail', {code: 0, msg: '账号或密码错误'});
      return;
    }
    socket.emit('login sucess', {code: 200, msg: '登录成功', data: {updated: moment(user.updated).format('YYYY-MM-DD HH:mm'), email: user.email, headerImg: user.headerImg, nickName: user.nickName, _id: user._id}});
  })
  socket.on('upload', async data => {
    const res = await putStream(data)
  })
  socket.on('user online list', async data => {
    const onlineUserList = await hgetall('FatChat_user_online_list');
    socket.emit('online list', onlineUserList);
    data.socketId = socket.id;
    await hsetItem(`${socket.id}`, JSON.stringify(data));
    io.emit('new user online', data);
  })
})
