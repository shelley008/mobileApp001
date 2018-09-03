
/*
* 自动申缩的输入框
* set 备注高度
* def 编辑页备注高度
* ele textarea
*/
export function AoutoExpendingArea(ele,initHeight) {
    let el = document.querySelector(ele)
    if(!el) {return}
    // if(initHeight){
    //     el.style.height = 'auto'
    //     el.style.height = initHeight + 'px'
    //     console.log('----------el-----height----',el.style.height)
    // }
    let setStyle = function(el) {
        
        if(el.scrollHeight >= 227){
            el.style.height = '227px'
        }else{
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + 'px'
        }
        console.log('----------el-----height----',el.style.height)
    }
    let delayedResize = function(el) {
        window.setTimeout(function() {
            setStyle(el)
        },0);
    }
    if (el.addEventListener) {
        el.addEventListener('input',function() {
            setStyle(el)
        },false);
        setStyle(el)
    } else if (el.attachEvent) {
        el.attachEvent('onpropertychange',function() {
            setStyle(el)
        });
        setStyle(el)
    }
    if (window.VBArray && window.addEventListener) { //IE9
        el.attachEvent("onkeydown",function() {
            let key = window.event.keyCode;
            if (key == 8 || key == 46) delayedResize(el);
        });
        el.attachEvent("oncut",function() {
            delayedResize(el);
        }); //处理粘贴
    }
}
  
  
  
  
  
  //   fixNumber(){
    //     let fix
    //    if(typeof this.number === "string"){
    //       fix = Number(this.number.replace(/\D/g,''));
    //    }else{
    //       fix = this.number
    //    }
    //    if(fix > this.max || fix < this.min){
    //       fix = this.min
    //    }
    //    this.number = fix;
    //   // this.$emit("counter",this.number);
    //    this.$store.dispatch('updataOrder',["counter",this.number])
    // }

//调用过滤数字
// fixNumber(event){
//     let fix
//     if(typeof this.accountNum === "string"){
//         fix = this.accountNum.replace(/\D/g,(e)=>{
//             if (e === '.'){
//                 return '.'
//             } else {
//                 return ''
//             }
//         })
//     }else{
//         fix = this.account
//     }
//     this.accountInfo.myAccount = fix
// }





// export function makeExpandingArea(def,ele) {
//     let el = document.querySelector(ele)
//     if(!el) {return}
//     if(def){
//         el.style.height = 'auto'
//         el.style.height = def + 'px'
//     }
//     let setStyle = function(el) {
//         el.style.height = 'auto';
//         el.style.height = el.scrollHeight + 'px'
//     }
//     let delayedResize = function(el) {
//         window.setTimeout(function() {
//             setStyle(el)
//         },0);
//     }
//     if (el.addEventListener) {
//         el.addEventListener('input',function() {
//             setStyle(el)
//         },false);
//         setStyle(el)
//     } else if (el.attachEvent) {
//         el.attachEvent('onpropertychange',function() {
//             setStyle(el)
//         });
//         setStyle(el)
//     }
//     if (window.VBArray && window.addEventListener) { //IE9
//         el.attachEvent("onkeydown",function() {
//             let key = window.event.keyCode;
//             if (key == 8 || key == 46) delayedResize(el);
//         });
//         el.attachEvent("oncut",function() {
//             delayedResize(el);
//         }); //处理粘贴
//     }
// }