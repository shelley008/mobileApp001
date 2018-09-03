<template>
    <div class="leftNav">
        <yd-popup v-model="isShowFlag" position="left" width="60%">
             <yd-button type="danger" style="margin: 30px;"  @click.native.stop="closePop()">Close Left Popup</yd-button>
        </yd-popup>
    </div>
</template>


<script>
export default {
    name:'leftNav',
    data(){
        return{
        }
    },
    props:{
        isShow:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        isShowFlag(){
            return this.isShow
        }
    },
    methods:{
        closePop(){
           console.log('---------emit----')
           this.$emit('closePopFn',false)
        }
    }
}
</script>

