<template>
 <div>english book

   <div>
      <button @click="foInFn()">调用1</button>
   </div>

 </div>

</template>

<script>
  export default {
    name:'EnglishBook',
      data(){
       return{

       }
    },
    mounted(){
      console.log('this mounted-------start1')
      this.testJs()
    },

    methods:{

      testJs(){
        let baz;
        (function(f){
          let foo = 10;
          let bar = 2;
          baz = function(){
            console.log(foo * bar)
            return foo * bar;
          }
        })();
        baz()
      },


      foInFn(){
        try{
          let n = Number(prompt('please input a right number'))
          let f= this.factorial(n)
          alert(f)
        }
        catch(ex){
          console.log("catch block",ex)
        }
        finally {
          console.log('f=',f)
          console.log('the end')
        }
      },
      factorial(val){
        return val*val
      }
    }


  }

</script>
