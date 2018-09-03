<template>
    <div>
        <yd-navbar title="navber" fixed  bgcolor="#fff" fontSize="18px" class="navBar">
                <router-link slot="left" :to="{path:pathName}" v-show="isShowReturn">
                    <yd-navbar-back-icon></yd-navbar-back-icon>
                </router-link>
                <div slot="center">{{topTit}}</div>
                <div slot="right" @click.stop="showPop()">
                <yd-icon name="setting" size="25px" color="#777"></yd-icon>
             </div>
        </yd-navbar>
        <left-nav :isShow='isShow' @closePopFn='showPopFn'></left-nav>
    </div>
</template>

<script>
import leftNav from '@/components/leftNav'

export default {
    name:'navBar',
    data(){
        return{
            isShow:false
        }
    },
    created(){
    },
    props:{
        pathName:{
            type:String,
            default:'/'
        },
        isShowReturn:{
            type:Boolean,
            default:true
        },
        topTit:{
            type:String,
            default:'home'
        }
    },
    components:{
        leftNav
    },
    methods:{
        showPop(){
            this.isShow = true;
            console.log('----1----',this.isShow);
        },
         showPopFn(val){
            this.isShow = val;
            console.log('----2---',val);
        }
    }
}
</script>

