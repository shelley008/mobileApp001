<!--<template>-->
  <!--<button>-->
     <!--<slot></slot>-->
  <!--</button>-->
<!--</template>-->


<!--具名插槽-->
<template>
  <button :class="btnClass">
    <slot name="a"></slot>
    <slot></slot>
    <slot name="b"></slot>
  </button>
</template>
<script>
  export default{
  name:'zButton',
    data(){
      return{
        classN:''
      }
    },
    props:{
       size:{
         type:String,
         default:'small'
       },
      type:{
         type:String,
         default:'primary'
      }
    },
    mounted(){

    },
    computed:{
      //设置button样式
      btnClass:function(){
        switch(this.size){
          case 'small':
            return 'z-btn'+' '+'z-btn-' + this.type
            break;
          case 'large':
            return 'z-btn-block'+' '+'z-btn-' + this.type
            break;
          default:
            this.setEleClassName('z-btn-block')
            break;
        }
      }
    },
    methods:{



      }
  }
</script>
