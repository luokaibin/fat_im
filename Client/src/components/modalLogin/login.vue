<template>
  <Modal
    v-model="show"
    :closable="false"
    :footer-hide="true"
    :mask-closable="false"
    width="360" >
    <!-- 登录 -->
    <Form
      v-show="isLogin"
      ref="loginForm"
      :model="loginInfo"
      :rules="ruleLogin"
      :label-width="50">
      <div class="login">
        <div class="input_wrap">
          <FormItem label="账号" prop="userId">
            <Input class="input" type="text" v-model="loginInfo.userId" placeholder="请输入你的邮箱" />
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input class="input" type="password" v-model="loginInfo.password" placeholder="请输入你的密码" />
          </FormItem>
        </div>
      </div>
      <Button
        class="login_btn"
        type="primary"
        size="large"
        @click="handleLogin"
        >登录</Button
      >
      <p class="fn"><span class="span" @click="handleCutoverLogin('register')"> 注册</span> <span class="span">找回密码 </span> </p>
    </Form>
    <Form
      v-show="isRegister"
      ref="registerForm"
      :model="registerInfo"
      :rules="ruleRegister"
      :label-width="60">
      <div class="register">
        <div class="input_wrap">
          <FormItem label="头像" prop="headerImg">
            <input
              v-show="!registerInfo.headerImg"
              class="headerImg"
              @change="handleUpFile"
              ref="register_userHeaderImg"
              accept="image/*"
              type="file" />
            <img v-show="registerInfo.headerImg" class="headerImg" @click="handleImgClick" :src="image" alt="" srcset="">
          </FormItem>
          <FormItem label="昵称" prop="nickName">
            <Input class="input" type="text" v-model="registerInfo.nickName" placeholder="请输入你的昵称"/>
          </FormItem>
          <FormItem label="邮箱" prop="email">
            <Input v-model="registerInfo.email" placeholder="请输入邮箱">
              <Button
                slot="append"
                type="primary"
                class="reg_btn"
                size="large"
                :disabled="disabledSendValiCode"
                @click="handleSendValiCode"
                >{{sendValiCodeText}}</Button
              >
            </Input>
          </FormItem>
          <FormItem label="验证码" prop="validateCode">
            <Input v-model="registerInfo.validateCode" placeholder="请输入验证码">
              <!-- <Button
                slot="append"
                type="primary"
                class="reg_btn"
                size="large"
                :disabled="disabledConfirmValiCode"
                @click="confirmValiCode"
                >提交验证码</Button
              > -->
            </Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input class="input" type="password" v-model="registerInfo.password" placeholder="请输入你的密码" />
          </FormItem>
        </div>
      </div>
      <Button
        class="login_btn"
        type="primary"
        size="large"
        @click="handleRegister"
        >注册</Button
      >
      <p class="fn"><span class="span" @click="handleCutoverLogin('login')"> 返回登录</span> <span class="span">找回密码 </span> </p>
    </Form>
  </Modal>
</template>

<script>
const cutoverLogin = new Map([
  ['login', (self) => {
    self.isLogin = true;
    self.isRegister = false;
  }],
  ['register', self => {
    self.isLogin = false;
    self.isRegister = true;
  }]
])
const reduceImg = file => {
  return new Promise((reslove,reject) => {
    const reader = new FileReader(),img = new Image();
    if(file.size/1024/1024 < 0.6) {
      // 将文件以Data URL形式进行读入页面
      reader.readAsArrayBuffer(file);
      reader.onload = e => {
        reslove(e.target.result);
      }
    } else {
      reader.readAsDataURL(file);
      reader.onload = e => {
        img.src = e.target.result;
      }
      img.onload = function () {
        // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        // 图片原始尺寸
        const originWidth = this.width,originHeight = this.height;
        // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
        const maxWidth = 720,maxHeight = 1280;
        // 目标尺寸
        let targetWidth = originWidth,targetHeight = originHeight;
        if(originWidth > maxWidth || originHeight > maxHeight) {
          if(originWidth / originHeight > maxWidth / maxHeight) {
            // 更宽，按照宽度限定尺寸
            targetWidth = maxWidth;
            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
          } else {
            targetHeight = maxHeight;
            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
          }
        }
        // canvas对图片进行缩放
        canvas.width = targetWidth,canvas.height = targetHeight;
        // 清除画布
        context.clearRect(0, 0, targetWidth, targetHeight);
        // 图片压缩
        context.drawImage(img, 0, 0, targetWidth, targetHeight);
        /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/

        //压缩后的图片转base64 url
        /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
          * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
        const imgBase = canvas.toDataURL('image/jpeg', 0.96);//base64 格式
        canvas.toBlob(blob => {
          reslove({imgBlob: blob, imgBase,});
        })
      }
    }
  })
}
export default {
  name: "list",
  components: {},
  watch: {
    'email': function(n) {
      this.disabledValiCode = !n;
    }
  },
  computed: {
    image() {
      const blob = this.headerImgBlob;
      console.log(typeof blob);
      const url = blob && URL.createObjectURL(blob);
      return url;
    },
    disabledSendValiCode() {
      return this.disabledValiCode;
    },
    email() {
      return this.registerInfo.email;
    },
    disabledConfirmValiCode() {
      const disabled = !this.registerInfo.validateCode;
      return disabled;
    }
  },
  data() {
    const validateEmail = (rule, value, cb) => {
      const email = value.trim();
      const reg = /^(\w+\.?)*\w+@(?:\w+\.)\w+$/
      if(!email.length) {
        cb(new Error('邮箱不能为空'));
        return
      }
      if(!reg.test(email)) {
        cb(new Error('邮箱格式错误'));
        return
      }
      cb();
    };
    const validateCode = (rule, value, cb) => {
      const code = value.trim();
      const reg = /^\d{6}$/
      if(!code.length) {
        cb(new Error('验证码不能为空'));
        return
      }
      if(!reg.test(code)) {
        cb(new Error('验证码格式错误'));
        return
      }
      cb();
    };
    const validatePaw = (rule, value, cb) => {
      const paw = value;
      const reg = /^(\w){6,16}$/
      if(!paw.length) {
        cb(new Error('密码不能为空'));
        return
      }
      if(paw.length < 6) {
        cb(new Error('密码长度不能小于6位'));
        return
      }
      if(paw.length > 16) {
        cb(new Error('密码长度不能大于16位'));
        return
      }
      if(!reg.test(paw)) {
        cb(new Error('密码格式不正确,密码只能由数字字母下划线组成'));
        return
      }
      cb();
    };
    return {
      loginInfo: {
        userId: '',
        password: ''
      },
      registerInfo: {
        headerImg: '',
        email: '',
        nickName: '',
        validateCode: '',
        password: '',
      },
      ruleRegister: {
        headerImg: [
          { required: true, validator: (rule, value, cb) => {
            if(!Boolean(value)) {
              cb(new Error('头像必须上传'));
              return;
            }
            cb();
          }, trigger: 'blur'}
        ],
        email: [
          { required: true,validator: validateEmail, trigger: 'blur'}
        ],
        nickName: [{ required: true, validator: (rule, value, cb) => {
          const nickName = value.trim();
            if(!nickName.length) {
              cb(new Error('昵称不能为空'));
              return;
            }
            cb();
          }, trigger: 'blur' }
        ],
        validateCode: [
          { required: true, validator: validateCode, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePaw, trigger: 'blur' }
        ],
      },
      ruleLogin: {
        userId: [{ required: true, message: '邮箱不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      show: false,
      isLogin: true, // 是否显示登录
      isRegister: false, // 是否显示注册
      sendValiCodeText: '发送验证码',
      timeCount: 90,
      disabledValiCode: true, // 禁用发送验证码按钮
      headerImgBlob: '',
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.$refs.loginForm.validate();
      this.$socket.emit("login", this.loginInfo);
      const {code, msg, data = {}} = await Promise.race([this.receive_server_msg('login fail'), this.receive_server_msg('login sucess')]);
      if(code !== 200) {
        this.$Message.error(msg);
      } else {
        this.$Message.success(msg);
        const {_id, nickName, headerImg, email} = data;
        this.$socket.emit('user online list', {_id, nickName, headerImg, email})
        localforage.setItem("userInfo", data);
        this.show = false;
      }
    },
    handleCutoverLogin(type) {
      const fn = cutoverLogin.get(type);
      fn(this);
    },
    async handleRegister() {
      const res = await this.$refs.registerForm.validate();
      if(!res) return;
      this.$socket.emit("register", this.registerInfo);
      const {code, msg } = await Promise.race([this.receive_server_msg('register fail'), this.receive_server_msg('register sucess')]);
      if(code !== 200) {
        this.$Message.error(msg);
      } else {
        this.$Message.success('注册成功');
        this.$refs.registerForm.resetFields();
        const fn = cutoverLogin.get('login');
        fn(this);
      }
      
    },
    // 发送验证码
    async handleSendValiCode() {
      const res = await this.validate('email');
      if(!res) return;
      this.$socket.emit("send validate code", {email: this.registerInfo.email});
      const timer = setInterval(() => {
        if(this.timeCount < 1) {
          this.timeCount = 90;
          this.sendValiCodeText = '发送验证码';
          this.disabledValiCode = false;
          clearInterval(timer);
        } else {
          this.timeCount = this.timeCount - 1;
          this.sendValiCodeText = `${this.timeCount} S`;
          this.disabledValiCode = true;
        }
      }, 1000);
      const state = await this.receive_server_msg('validate code sucess');
    },
    // 提交验证码
    async confirmValiCode() {
      const email = await this.$refs.registerForm.validateField('email');
      const validateCode = await this.$refs.registerForm.validateField('validateCode');
      if(!res || !validateCode) return;
    },
    // 上传头像
    async handleUpFile({target: {files:[file]}}) {
      if(!file) return;
      let {imgBase, imgBlob} = await reduceImg(file);
      this.registerInfo.headerImg = { imgBase: imgBase.replace(/^data:image\/\w+;base64,/, ""), fileName: file.name};
      this.headerImgBlob = imgBlob;
    },
    // 重新上传头像
    handleImgClick() {
      const input_file = this.$refs.register_userHeaderImg;
      input_file.click();
    },
    // 注册验证封装
    validate(prop) {
      return new Promise((reslove, reject) => {
        this.$refs.registerForm.validateField(prop, err => {
          if (err) {
            reject(false);
          } else {
            reslove(true);
          }
        })
      })
    },
    // 验证码发送成功封装
    receive_server_msg(eventName) {
      return new Promise((reslove, reject) => {
        this.$socket.on(eventName, data => {
          reslove(data);
        });
      })
    }
  },
  async created() {
  },
  mounted() {
    
  },
  updated() {
  }
};
</script>

<style lang="less" scoped>
.login {
  box-sizing: border-box;
  padding-top: 0.4rem;
}
.login_btn {
  width: 100%;
}
.login_btn + .fn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.2rem;
  .span {
    cursor: pointer;
    font-size: 0.7rem;
  }
}
.register {
  .headerImg {
    opacity: 1;
    width: 3rem;
    height: 2.9rem;
    border-radius: 0.3rem;
    overflow: hidden;
    outline: none;
  }
  .headerImg::before {
    content: '+';
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    background-color: #c3c3c3;
    border-radius: 0.3rem;
  }
  .reg_btn {
    background-color: #2d8cf0;
    color: #ffffff;
  }
  .reg_btn:disabled {
    opacity: 0.5;
  }
}
</style>
