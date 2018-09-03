<template>
    <div class="menu_wrapper">
        <div class="menu_box">
             <a @click="openPopMsg()">英语学习</a>
             <router-link to="/Bank">我的银行</router-link>
             <router-link to="/Note">记事本</router-link>
             <router-link to="/word">4</router-link>
             <router-link to="/word">5</router-link>
             <router-link to="/word">6</router-link>
        </div>

        <yd-popup v-model="show1" position="center" width="90%">
            <div class="popLayout">
                <div class="papLayout_con">
                  基础英语学习!!!!加油
                </div>
                <p style="text-align: center;">
                    <yd-button @click.native="gotoStudy" size="large">start</yd-button>
                </p>
            </div>
        </yd-popup>

    </div>
</template>

<script>
export default {
    name:'menuBar',
    data(){
        return{
            show3:false,
            show1:false
        }
    },
    methods:{
        openPopMsg(){
            console.log(111)
            this.show1 = true
        },
        gotoStudy(){
            console.log('-------111-----',)
            this.$router.push({
                path:'/word'
            })
        }
    },

}
</script>

