import {DirectiveOptions} from "vue";
//自定义指令clickoutside，当点击的不是当前元素的时候执行绑定的方法
const clickoutside: DirectiveOptions = {
    // 初始化指令
    bind (el: any, binding: any, vnode) {
      function documentHandler (e: any) {
        // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
          return false
        }
        // 判断指令中是否绑定了函数
        if (binding.expression) {
          // 如果绑定了函数 则调用那个函数
          binding.value(e)
        }
      }
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      
      el.vueClickOutside = documentHandler
      document.addEventListener('click', documentHandler)
    },
    update () { },
    unbind (el: any, binding) {
      // 解除事件监听
      document.removeEventListener('click', el.vueClickOutside)
      delete el.vueClickOutside
    }
  }

  export default clickoutside;