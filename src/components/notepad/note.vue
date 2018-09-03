<template>
    <div>
      <!-- 顶部导航 -->
      <yd-navbar title="navber" fixed  bgcolor="#fff" fontSize="18px" class="navBar">
          <router-link slot="left" :to="{path:pathName}" v-show="isShowReturn">
            <yd-navbar-back-icon></yd-navbar-back-icon>
          </router-link>
          <div slot="center">{{topTit}}</div>
          <div slot="right" @click.stop="addNewBank()">
                 新建
          </div>
      </yd-navbar>

      <div class="noteWrap">
        <!--新建历史列表-->
        <div class="addNewNoteWrap">
          <form>
              <yd-cell-group>
                <yd-cell-item>
                  <span slot="left">标题：</span>
                  <yd-input slot="right"
                         v-model="newNoteData.title"
                         placeholder="请输入内容">
                  </yd-input>
                </yd-cell-item>
                <yd-cell-item>
                  <yd-textarea slot="right"
                         placeholder="输入内容"
                         maxlength="100"
                         v-model="newNoteData.noteDescription"
                  ></yd-textarea>
                </yd-cell-item>
              </yd-cell-group>

              <div class="submitWrap">
                <yd-button size="large" type="primary" @click.native="saveNewNote()">保存</yd-button>
                <yd-button size="large" type="hollow" @click.native="clearForm()">重置</yd-button>
              </div>

          </form>
        </div>


        <!--历史记事本列表-->
         <div class="historyList">
             <ul>
                 <li v-for="(note,index) in noteData">
                   <b>{{note.title}}</b>
                   <span @click="deleteNote(index)">删除</span>
                   <span>修改</span>
                 </li>
             </ul>
         </div>
      </div>


    </div>
</template>

<script>
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
            {title:'title003我的记事本-3'},
            {title:'title004我的记事本-4'},
            {title:'title001我的记事本-5'},
            {title:'title002我的记事本-6'},
            {title:'title003我的记事本-7'},
            {title:'title004我的记事本-8'},
          ],
          newNoteData:{
            title:'111',
            noteDescription:'2222'
          }
        }
    },
    mounted(){
    },
    watch:{

    },
    computed:{

    },
    methods:{
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
      }
    }
    
}
</script>

