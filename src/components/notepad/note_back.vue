<template>
    <div id="myNode"  style="padding:0 30px">

      <!--<div style="padding:0 30px">-->
        <!--<form novalidate >-->
          <!--<md-input-container>-->
            <!--<label>标题</label>-->
            <!--<md-input ></md-input>-->
          <!--</md-input-container>-->

          <!--<md-input-container>-->
            <!--<label>内容</label>-->
            <!--<md-textarea maxlength="200"></md-textarea>-->
          <!--</md-input-container>-->

        <!--</form>-->
      <!--</div>-->

      <!--<div>myTitle:{{myTitle}}</div>-->

      <div class="com-input-container">
           <label>姓名:</label>
           <textarea maxlength="200" v-model="myTitle" class="md-input"
                     @mouseover="mouseoverFn($event)"
                     @mouseenter="mouseenterFn($event)"
                     @mousedown="mousedownFn($event)"
                     @focus="focusFn($event)"
                     @mouseup="mouseupFn($event)"
                     @click="clickFn($event)"
                     @input="inputFn($event)"
                     @mouseout="mouseoutFn($event)"
                     @change="changeFn($event)"
                     @blur="blurFn($event)"
                     ></textarea>
      </div>

      <!--<div class="com-input-container">-->
        <!--<label>email:</label>-->
        <!--<textarea maxlength="200" @focus="focus($event)" @blur="blurFn($event)"  class="md-input" rows="1" style="overflow: hidden; word-wrap: break-word; height: 32px;"></textarea>-->
      <!--</div>-->

      <!--<div class="com-input-container">-->
        <!--<label>电话:</label>-->
        <!--<textarea maxlength="200" class="md-input" rows="1" style="overflow: hidden; word-wrap: break-word; height: 32px;"></textarea>-->
      <!--</div>-->


      <div class="com-input-container">
        <label>输入框1:</label>
        <textarea v-inputActive maxlength="200" class="md-input" ></textarea>
      </div>

      <div class="com-input-container">
        <label>输入框2:</label>
        <textarea v-inputActive maxlength="200" class="md-input" ></textarea>
      </div>

      <div class="com-input-container">
        <label>输入框3:</label>
        <textarea v-inputActive maxlength="200" class="md-input" ></textarea>
      </div>

      <div class="com-input-container">
        <label>输入框4:</label>
        <textarea v-inputActive maxlength="200" class="md-input" ></textarea>
      </div>






      <!-- 顶部导航 -->
      <!--<yd-navbar title="navber" fixed  bgcolor="#fff" fontSize="18px" class="navBar">-->
          <!--<router-link slot="left" :to="{path:pathName}" v-show="isShowReturn">-->
            <!--<yd-navbar-back-icon></yd-navbar-back-icon>-->
          <!--</router-link>-->
          <!--<div slot="center">{{topTit}}</div>-->
        <!--<div slot="right" @click="takePic" style="margin-right:15px">-->
          <!--截图-->
        <!--</div>-->
        <!--<div slot="right" @click="deletePic">-->
          <!--删除-->
        <!--</div>-->
          <!--&lt;!&ndash;<div slot="right" @click.stop="addNewBank()">&ndash;&gt;-->
             <!--&lt;!&ndash;新建&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</yd-navbar>-->

      <!--<div class="noteWrap">-->
        <!--&lt;!&ndash;新建历史列表&ndash;&gt;-->
        <!--<div class="addNewNoteWrap">-->
          <!--<form>-->
              <!--<yd-cell-group>-->
                <!--<yd-cell-item>-->
                  <!--<span slot="left">标题：</span>-->
                  <!--<yd-input slot="right"-->
                         <!--v-model="newNoteData.title"-->
                         <!--placeholder="请输入内容">-->
                  <!--</yd-input>-->
                <!--</yd-cell-item>-->
                <!--<yd-cell-item>-->
                  <!--<yd-textarea slot="right"-->
                         <!--placeholder="输入内容"-->
                         <!--maxlength="100"-->
                         <!--v-model="newNoteData.noteDescription"-->
                  <!--&gt;</yd-textarea>-->
                <!--</yd-cell-item>-->
              <!--</yd-cell-group>-->

              <!--<div class="submitWrap">-->
                <!--<yd-button size="large" type="primary" @click.native="saveNewNote()">保存</yd-button>-->
                <!--<yd-button size="large" type="hollow" @click.native="clearForm()">重置</yd-button>-->
              <!--</div>-->

          <!--</form>-->
        <!--</div>-->


        <!--&lt;!&ndash;历史记事本列表&ndash;&gt;-->
         <!--<div class="historyList">-->
             <!--<ul>-->
                 <!--<li v-for="(note,index) in noteData">-->
                   <!--<b>{{note.title}}</b>-->
                   <!--<span @click="deleteNote(index)">删除</span>-->
                   <!--<span>修改</span>-->
                 <!--</li>-->
             <!--</ul>-->
         <!--</div>-->
      <!--</div>-->


    </div>
</template>

<script>
//引入截图工具
import domtoimage from 'dom-to-image'

//注删全局自定义指令
import Vue from "vue"
Vue.directive('inputActive',{
  inserted:function(el){
    //当鼠标按下时 触发
    el.onmousedown = function(e){
      console.log('--------1 mousedown 鼠标按下')
    }
    //当获取焦点时 触发
    el.onfocus = function(e){
      console.log('--------2 focus 获取焦点')
      console.log(e)
      if(e.target.value == '' || e.target.value){
        e.target.parentNode.classList.add('com-input-focused')
      }
    }
    //当鼠标抬起时 触发
    el.onmouseup = function(e){
      console.log('--------3 mouseup 鼠标抬起')
    }
    //当鼠标单击时 触发
    el.onclick = function(e){
      console.log('--------4 click 鼠标单击')
    }
    //当值发生改变时 触发
    el.oninput = function(e){
      console.log('--------5 input 值发生改变')
      if(e.target.value != ''){
        e.target.parentNode.classList.add('com-has-value')
      }else{
        e.target.parentNode.classList.remove('com-has-value')
      }
    }
    //当失去焦点时 && 值改变时 触发
    el.onchange = function(e){
      console.log('--------6 change 失去焦点时 && 值改变')

    }
    //当失去焦点时 触发
    el.onblur = function(e){
      console.log('--------7 blur 失去焦点')
      if(e.target.value == '' || e.target.value){
        e.target.parentNode.classList.remove('com-input-focused')
      }
    }

    //当鼠标经过时
    el.onmouseover = function(e){
      console.log('--------8 over 当鼠标经过时')
    }
    //当鼠标移出时
    el.onmouseout = function(e){
      console.log('--------9 out 当鼠标移出时')
    }
    //当鼠标进入时
    el.onmouseenter = function(e){
      console.log('--------10 enter 当鼠标进入')
    }

  }
})


export default {
    name:'Note',
    data(){
        return{
          isShowReturn:true,
          pathName:'/',
          topTit:'我的记事本',

          noteData:[
            {title:'title001我的记事本-1'},
            {title:'title002我的记事本-2'},
          ],
          newNoteData:{
            title:'111',
            noteDescription:'2222'
          },
          myTitle:''
        }
    },
    mounted(){
      //SetUserData.save('aaaaa')
    },
    watch:{

    },
    computed:{

    },
    methods:{

      //给输入框添加样式
      isActiveInput(){
        event.target.parentNode.classList.add('com-input-focused')
      },


      //当鼠标经过时  @mouseover="mouseoverFn($event)"
      mouseoverFn(event){
        console.log('---1-----当鼠标经过时---')
      },
      //当鼠标穿过时 @mouseenter="mouseenterFn($event)"
      mouseenterFn(event){
        console.log('----2----当鼠标穿过时---')
      },
      //当鼠标按下时  @mousedown="mousedownFn($event)"
      mousedownFn(event){
        console.log('----3----当鼠标按下时---')
      },
      //input获取焦点时   @focus="focus($event)"
      focusFn(event) {
        console.log('----4-----input获取焦点时---')
        // if(event.target.value == '' || event.target.value){
        //   event.target.parentNode.classList.add('com-input-focused')
        // }
      },
      //当鼠标抬起时  @mouseup="mouseupFn($event)"
      mouseupFn(event){
        console.log('----5----当鼠标按下时---')
      },
      //click 单击时调用 @click="clickFu($event)"
      clickFn(event){
        console.log('-----6-----单击时----')
        if(event.target.value == '' || event.target.value){
          event.target.parentNode.classList.add('com-input-focused')
        }
      },
      //input当值发生改变时  @input="addHasValue($event)"
      inputFn(event){
        console.log('----7-----值发生改变时---')
        if(event.target.value != ''){
          event.target.parentNode.classList.add('com-has-value')
        }else{
          event.target.parentNode.classList.remove('com-has-value')
        }
      },
      //当鼠标移出时
      mouseoutFn(event){
        console.log('-----8-----当鼠标移出时----')
      },
      //input，当按失去焦点 && 值改变时  @change="hasValue($event)"
      changeFn(event){
        console.log('-----9----当按失去焦点 && 值改变时----')
        if(event.target.value != ''){
          event.target.parentNode.classList.add('com-has-value')
        }else{
          event.target.parentNode.classList.remove('com-has-value')
        }
      },
      //input失去焦点时
      blurFn(event){
        console.log('---10-----失去焦点时----')
        console.log(event.target.value)
        event.target.parentNode.classList.remove('com-input-focused')
        if(event.target.value == ''){
          event.target.parentNode.classList.remove('com-input-focused')
        }
      },






      //添加新记事到列表中
      saveNewNote(){
        let data = {}
        if(!this.newNoteData.title && !this.newNoteData.noteDescription){
          return
        }
        data.title = this.newNoteData.title
        data.noteDescription = this.newNoteData.noteDescription
        this.noteData.unshift(data)
      },
      //清空表单
      clearForm(){
        this.newNoteData.title = ''
        this.newNoteData.noteDescription = ''
      },
      //删除
      deleteNote(index){
        console.log('index----',index);
        this.noteData.splice(index,1)
      },

      //截图
      takePic(){
        let node = document.getElementById('myNode');
        domtoimage.toPng(node)
          .then(function(dataUrl){
            let img = new Image();
            img.src = dataUrl;
            let s = 'height:100px';
            let c = 'test'
            img.style = s;
            img.className = c;
           // img.setAttribute('class',test);
            document.body.appendChild(img);
            //img.setAttribute('id','imgTest')
            //document.body.lastElementChild.setAttribute('class','test')
          })
          .catch(function(error){
            console.error('error------')
          })
      },
      deletePic(){
        let doms = document.querySelectorAll('.test')
        console.log(doms.length)
        doms.forEach((itme,i)=>{
          console.log('-------------i----',i)
          console.log(itme)
          document.body.removeChild(itme)
        })
      }

    }
    
}
</script>

