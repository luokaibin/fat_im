import vue from 'vue'

// 这里就是我们刚刚创建的那个静态组件
import loginComponent from './login.vue'

// 返回一个 扩展实例构造器
const LoginConstructor = vue.extend(loginComponent)

// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showLogin() {

  // 实例化一个 toast.vue
  const LoginDom = new LoginConstructor({
    el: document.createElement('div'),
    data() {
      return {
        show:true
      }
    }
  })

  // 把 实例化的 toast.vue 添加到 body 里
  document.body.appendChild(LoginDom.$el)

  // 过了 duration 时间后隐藏
  // setTimeout(() => {toastDom.show = false} ,duration)
}

// 注册为全局组件的函数
// function registryToast() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
//   vue.prototype.$toast = showToast
// }

export default showLogin;