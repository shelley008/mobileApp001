<template>
    <yd-tabbar fixed>
        <yd-tabbar-item title="home" link="word">
            <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="study" link="">
            <yd-icon name="order" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
         <yd-tabbar-item title="shop" link="">
            <yd-icon name="shopcart-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
         <yd-tabbar-item title="setting" link="">
            <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
   </yd-tabbar> 
</template>
<script>
export default {
    name:'Footer',
    data(){
        return{

        }
    }
}
</script>

