<template>
    <div id="myNode" style="padding:50px">

      <div style="padding:30px">
        <form novalidate >
          <md-input-container>
            <label>标题</label>
            <md-input ></md-input>
          </md-input-container>

          <md-input-container>
            <label>内容</label>
            <md-textarea maxlength="200"></md-textarea>
          </md-input-container>

        </form>
      </div>

      <!--<div>myTitle:{{myTitle}}</div>-->

      <div class="com-input-container">
           <label>姓名:</label>
           <textarea maxlength="200" @focus="focus($event)" @blur="blurFn($event)" v-model="myTitle" class="md-input" rows="1" style="overflow: hidden; word-wrap: break-word; height: 32px;"></textarea>
      </div>

      <div class="com-input-container">
        <label>email:</label>
        <textarea maxlength="200" @focus="focus($event)" @blur="blurFn($event)"  class="md-input" rows="1" style="overflow: hidden; word-wrap: break-word; height: 32px;"></textarea>
      </div>

      <div class="com-input-container">
        <label>电话:</label>
        <textarea maxlength="200" class="md-input" rows="1" style="overflow: hidden; word-wrap: break-word; height: 32px;"></textarea>
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
        console.log('------e------');
        console.log(event);
        console.log(event.target.parentNode)
        console.log(event.target.parentNode.className)

        event.target.parentNode.classList.add('com-input-focused')

      },

      focus(event) {

        if(event.target.value == '' || event.target.value){
          event.target.parentNode.classList.add('com-input-focused')
        }else{
          event.target.parentNode.classList.remove('com-input-focused')
        }

        console.log('1-----')
        console.log(event.target.value)

      },
      blurFn(event){
        if(event.target.value){
          event.target.parentNode.classList.add('com-input-focused')
        }else{
          event.target.parentNode.classList.remove('com-input-focused')
        }
        console.log('2-----')
        console.log(event.target.value)
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

