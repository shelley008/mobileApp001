<template>
    <div style="height:800px; background:#ccc; padding-top:80px;">
        <nav-top-bar :pathName="pathName" :isShowReturn="isShowReturn"></nav-top-bar>
        <div class="word_wrap">
             <div>翻译这些句子:</div>
             <h4>我是一个女孩子吗?</h4>

            <div>
                <span>girl</span>
                <span>girl</span>
                <span>girl</span>
                <span>girl</span>
                <span>girl</span>
                <span>girl</span>
                <span>girl</span>
                <span>girl</span>
                <span>girl</span>
                <span>girl</span>
            </div>

            <div class="check-box">
                  <yd-button @click.native="gotoStudy" size="large">检查</yd-button>
             </div>
        </div>

    </div>
</template>


<script>
import navTopBar from '@/components/nav'

export default {
    name:'word',
    data(){
         return{
             pathName:'/',
             isShowReturn:true,
             show3:false
         }
    },
    components:{
       navTopBar
    },
    props:{

    },
    methods:{
       showPop(){
           console.log('111111222224444')
           this.show3 = !this.show3
       }
    }

}
</script>
