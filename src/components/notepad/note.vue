<template>
    <div id="myNode" ref="picNode">

       <!--顶部导航 -->
      <yd-navbar title="navber" fixed  bgcolor="#fff" fontSize="18px" class="navBar">
        <router-link slot="left" :to="{path:pathName}" v-show="isShowReturn">
         <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        <div slot="center">{{topTit}}</div>
        <div slot="right" @click="takePic1" style="margin-right:15px">
        截图
        </div>
        <div slot="right" @click="deletePic">
        删除
        </div>
      <!--<div slot="right" @click.stop="addNewBank()">-->
      <!--新建-->
      <!--</div>-->
      </yd-navbar>


      <div class="noteWrap">
        <!--新建历史列表-->
        <div class="addNewNoteWrap">
          <form>
            <div class="com-input-container">
              <label>标题:</label>
              <textarea v-inputActive
                        maxlength="200"
                        class="md-input"
                        v-model="newNoteData.title"
                        ></textarea>
            </div>

            <div class="com-input-container">
              <label>描述:</label>
              <textarea v-inputActive
                        class="md-input"
                        maxlength="100"
                        style="height:60px"
                        v-model="newNoteData.noteDescription"
              ></textarea>
            </div>

              <div class="submitWrap">
                <yd-button size="large" type="primary" @click.native="saveNewNote()">保存</yd-button>
                <yd-button size="large" type="hollow" @click.native="clearForm()">重置</yd-button>
              </div>

          </form>
        </div>


        <!--历史记事本列表-->
         <div class="historyList">
             <ul>
                 <li v-for="(note,index) in noteDatas">
                   <dl>
                     <dt>{{note.title}}</dt>
                     <dd>{{note.description}}</dd>
                   </dl>
                   <span @click="deleteNote(index)">删除</span>
                   <span>修改</span>
                 </li>
             </ul>
         </div>


        <div>now </div>
        <hr/>
        <div style="padding:5px;">
          <yd-button size="small" type="primary" @click.native="getNowtime()">t1</yd-button>
          <yd-button size="small" type="primary">t2</yd-button>
          <yd-button size="small" type="primary">t3</yd-button>
        </div>
        <hr/>
        <div style="padding:20px;">

        </div>


      </div>
    </div>
</template>

<script>
//截图工具
import domtoimage from 'dom-to-image'
//store
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'

export default {
    name:'Note',
    data(){
        return{
          isShowReturn:true,
          pathName:'/',
          topTit:'我的记事本',
          newNoteData:{
            title:'',
            noteDescription:''
          },
          myTitle:'',
          noteInfo:"",
          timeFlag:''
        }
    },
    mounted(){

    },
    watch:{

    },
    computed:{
      //...mapState(['bt','noteDatas']),
      noteDatas(){
        return this.$store.state.b.noteDatas
      },
    },
    methods:{
      //调用store中的方法
      ...mapMutations(['ADD_NOTES','DELETE_NOTES']),

      //时间处理
      getNowtime(){

        console.log('************time***********')
        let d = new Date();
        console.log('************time***********')
        console.log(d)
        console.log(d.getFullYear())           //年份
        console.log(d.getMonth())              //返回月份 (0 ~ 11)
        console.log(d.getDate())               //一个月中的某一天 (1 ~ 31)
        console.log(d.getDay())                //一周中的某一天 (0 ~ 6)
        console.log(d.getHours())              //小时 (0 ~ 23)
        console.log(d.getMinutes())            //分钟 (0 ~ 59)
        console.log(d.getMilliseconds())       //毫秒(0 ~ 999)
        console.log(d.getSeconds())            //秒数 (0 ~ 59)
        console.log(d.getTime())               //返回 1970 年 1 月 1 日至今的毫秒数
        console.log(Date.parse(new Date()))    //返回 1970 年 1 月 1 日午夜到指定日期（字符串）的毫秒数。

        console.log('************time***********')
      },

      //添加新记事到列表中
      saveNewNote(){
        let data = {}
        if(!this.newNoteData.title && !this.newNoteData.noteDescription){
          return
        }
        data.title = this.newNoteData.title
        data.description = this.newNoteData.noteDescription
        //this.noteData.unshift(data)
        //调用store,暂存数据
        this.ADD_NOTES(data)
      },
      //删除
      deleteNote(index){
        console.log('index----',index);
        //this.noteData.splice(index,1)
        this.DELETE_NOTES(index)
      },


      //清空表单
      clearForm(){
        this.newNoteData.title = ''
        this.newNoteData.noteDescription = ''
      },



      //截图 64位码编码
      takePic1(){
        console.log('-----tack img')
        let node1 = document.getElementById('myNode');
        let node2 = this.$refs.picNode;
        domtoimage.toPng(node1)
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
       // console.log(doms.length)
        doms.forEach((itme,i)=>{
          //console.log('-------------i----',i)
          //console.log(itme)
          document.body.removeChild(itme)
        })
      }

    }
    
}
</script>

