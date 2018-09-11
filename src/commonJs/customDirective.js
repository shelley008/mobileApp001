//注删全局自定义指令
import Vue from "vue"
Vue.directive('inputActive',{
  inserted:function(el){
    //当鼠标按下时 触发
    el.onmousedown = function(e){
      console.log('--------1 mousedown')
    }
    //当获取焦点时 触发
    el.onfocus = function(e){
      console.log('--------2 focus')
      console.log(e)
      if(e.target.value === '' || e.target.value){
        e.target.parentNode.classList.add('com-input-focused')
      }
    }

    //当鼠标单击时 触发
    el.onclick = function(e){
      console.log('--------4 click')
    }
    //当值发生改变时 触发
    el.oninput = function(e){
      console.log('--------5 input')
      if(e.target.value !== ''){
        e.target.parentNode.classList.add('com-has-value')
      }else{
        e.target.parentNode.classList.remove('com-has-value')
      }
    }
    //当失去焦点时 && 值改变时 触发
    el.onchange = function(e){
      console.log('--------6 change')

    }
    //当失去焦点时 触发
    el.onblur = function(e){
      console.log('--------7 blur')
      if(e.target.value == '' || e.target.value){
        e.target.parentNode.classList.remove('com-input-focused')
      }
    }

  }
})



/* */
// Vue.directive('inputActive',{
//   inserted:function(el){
//     //当鼠标按下时 触发
//     el.onmousedown = function(e){
//       console.log('--------1 mousedown 鼠标按下')
//     }
//     //当获取焦点时 触发
//     el.onfocus = function(e){
//       console.log('--------2 focus 获取焦点')
//       console.log(e)
//       if(e.target.value == '' || e.target.value){
//         e.target.parentNode.classList.add('com-input-focused')
//       }
//     }
//     //当鼠标抬起时 触发
//     el.onmouseup = function(e){
//       console.log('--------3 mouseup 鼠标抬起')
//     }
//     //当鼠标单击时 触发
//     el.onclick = function(e){
//       console.log('--------4 click 鼠标单击')
//     }
//     //当值发生改变时 触发
//     el.oninput = function(e){
//       console.log('--------5 input 值发生改变')
//       if(e.target.value != ''){
//         e.target.parentNode.classList.add('com-has-value')
//       }else{
//         e.target.parentNode.classList.remove('com-has-value')
//       }
//     }
//     //当失去焦点时 && 值改变时 触发
//     el.onchange = function(e){
//       console.log('--------6 change 失去焦点时 && 值改变')
//
//     }
//     //当失去焦点时 触发
//     el.onblur = function(e){
//       console.log('--------7 blur 失去焦点')
//       if(e.target.value == '' || e.target.value){
//         e.target.parentNode.classList.remove('com-input-focused')
//       }
//     }
//     //当鼠标经过时
//     el.onmouseover = function(e){
//       console.log('--------8 over 当鼠标经过时')
//     }
//     //当鼠标移出时
//     el.onmouseout = function(e){
//       console.log('--------9 out 当鼠标移出时')
//     }
//     //当鼠标进入时
//     el.onmouseenter = function(e){
//       console.log('--------10 enter 当鼠标进入')
//     }
//
//   }
// })
