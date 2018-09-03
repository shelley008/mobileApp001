<template>
  <div class="wrapper">
        <yd-layout class="main">
           <!-- 导航 -->
           <nav-top-bar :pathName="pathName" :isShowReturn="isShowReturn"></nav-top-bar>

           <!-- 主体菜单 -->
           <menu-bar></menu-bar>

        </yd-layout>
    </div>
</template>

<script>
import MenuBar from '@/components/menuBar'
import navTopBar from '@/components/nav'


export default{
    name:'navigation',
    data(){
        return{
            pathName:'',
            isShowReturn:false
        }
    },
   components: {
       MenuBar,
       navTopBar
   },
   methods:{
        //设置中间内容高度
    setMainHeight(){
         //整个网页高度
        let wHeight = parseInt(document.documentElement.clientHeight)
        console.log('----1---win height--',wHeight)
        
        //根字体大小
        let htmlRoot = document.documentElement;
        if(wHeight > 414) {
           htmlRoot.style.fontSize = htmlFontSize * 54/41.4 + 'px'
        }
        let htmlFontSize = parseFloat(htmlRoot.style.fontSize)
        console.log('---2----html fontSize---------',htmlFontSize)

        //顶部导航的rem倍数
        let topDomRem = parseFloat(this.$refs.confTopBar.height)
        let topDomHeight = htmlFontSize * topDomRem;
        //console.log('---2-----top.height---------',topDom.height)
        console.log('---4-----top.rem---------',topDomRem)
        console.log('---5-----top.Height---------',topDomHeight)

        //底部控制条的高
        let confDownBar = this.$refs.confDownBar;
        let confDownBarH = parseFloat(confDownBar.getBoundingClientRect().height)
        console.log('---6-----bottom height---------',confDownBarH)


        //中间内容的高度  整个网页高度 - 顶部Height - 底部 Height
        let mainBodyHeight = wHeight - topDomHeight - confDownBarH
        let mH = (mainBodyHeight + 'px').toString()
        console.log('-------7--中间内容高底------',mainBodyHeight)

        //设置中间元素的高底 
        // let mainDom =  this.$refs.mainBodyConf
        let mainDom = document.querySelector('.confControl-body')
        console.log('-------8--get main-----',mainDom)
        //mainDom.setAttribute("style","height:mH")
        mainDom.style.height = mH;
        this.$forceUpdate()
    }
   }

  
}
</script>


// //x 设置底部位置上移30
// export function setFootPosition(ele){
//     let winH =  parseInt(document.documentElement.clientHeight)
//     if(winH === 812){
//         //set footer
//         let pos = '30px'
//         let footEle = document.querySelector(ele)
//         footEle.setAttribute('style',`bottom:${pos}`)
//         //footEle.style.bottom = 30 + 'px';
//         console.log('--------footEle-----',footEle)
//     }
// }


