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
                        :maxlength="newNoteData.noteTitLen"
                        class="md-input"
                        v-model="newNoteData.title"
                        @input="getTitLength()"
                        ></textarea>
              <span>{{newNoteData.noteTitLenTxtVal}}</span>
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
            <div class="btn-group-inline">
               <z-button size="large" type="danger" @click.native="saveNewNote()">保存</z-button>
               <z-button size="large" type="hollow" @click.native="clearForm()">重置</z-button>
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


        <!--<div>now </div>-->
        <!--<hr/>-->
        <!--<div style="padding:5px;">-->
          <!--<yd-button size="small" type="primary" @click.native="getNowtime()">t1</yd-button>-->
          <!--<yd-button size="small" type="primary">t2</yd-button>-->
          <!--<yd-button size="small" type="primary">t3</yd-button>-->
        <!--</div>-->

        <div class="btn-group-inline">
             <z-button size="large" v-on:click.native="testJs">test</z-button>
        </div>



      </div>
    </div>
</template>

<script>
//截图工具
import domtoimage from 'dom-to-image'
//store
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'

//引入自定义组件按钮
import zButton from '../../globalComponents/button'



export default {
    name:'Note',
    data(){
        return{
          isShowReturn:true,
          pathName:'/',
          topTit:'我的记事本',
          newNoteData:{
            title:'',
            noteDescription:'',
            noteTitLen:10,
            noteTitLenTxtVal:10
          },
          myTitle:'',
          noteInfo:"",
          timeFlag:'',

          messgae:'shelley'
        }
    },
     components:{
       zButton
     },


  //过滤器
  filters:{
    capitalize:function(value){
      return value+'001'
    }
  },

    mounted(){
      console.log('------localStorage----start-')
      console.log(this.msgSt)
      console.log('------localStorage----end-')
    },
    created(){

    },

    watch:{

    },
    computed:{
      ...mapGetters(['GET_NOTES']),
      noteDatas(){
        return this.GET_NOTES
      },

      //剩余字数长度
      // noteTitLenTxt(){
      //   let txtlen = this.newNoteData.title.length;
      //   return this.newNoteData.noteTitLen - txtlen
      // }
    },
    methods:{

      testJs(){
          let arrs = [
            { name: "tom", age: 18,sex: "boy",tel:123 },
            { name: "tom",  age: 19, sex: "boy"},
            { name: "anchor", age: 20, sex: "boy" },
            {name: "lucy", age: 18, sex: "girl"},
            {name: "lily", age: 19, sex: "girl"},
            {name: "andy",age: 20,sex: "girl"}
          ];
          for(let v of arrs){
            if(v.name == 'lucy') break
            console.log(v)
          }

      },




      //输入框值发生改变时
      getTitLength(){
       // console.log('oninput',this.newNoteData.title)
        let txtlen = this.newNoteData.title.length;
       // console.log('noteTitLenTxt:',this.noteTitLenTxt)
        this.newNoteData.noteTitLenTxtVal = this.newNoteData.noteTitLen - txtlen
      },


      //调用store中的方法
      ...mapMutations(['ADD_NOTES','DELETE_NOTES']),

      //时间处理
      getNowtime(){

        console.log('************time***********')
        let d = new Date();
        // console.log('************time***********')
        // console.log(d)
        // console.log(d.getFullYear())           //年份
        // console.log(d.getMonth())              //返回月份 (0 ~ 11)
        // console.log(d.getDate())               //一个月中的某一天 (1 ~ 31)
        // console.log(d.getDay())                //一周中的某一天 (0 ~ 6)
        // console.log(d.getHours())              //小时 (0 ~ 23)
        // console.log(d.getMinutes())            //分钟 (0 ~ 59)
        // console.log(d.getMilliseconds())       //毫秒(0 ~ 999)
        // console.log(d.getSeconds())            //秒数 (0 ~ 59)
        // console.log(d.getTime())               //返回 1970 年 1 月 1 日至今的毫秒数
        // console.log(Date.parse(new Date()))    //返回 1970 年 1 月 1 日午夜到指定日期（字符串）的毫秒数。
        //
        // console.log('************time***********')
      },

      //添加新记事到列表中
      saveNewNote(){
        let data = {}
        // if(!this.newNoteData.title || !this.newNoteData.noteDescription){
        //   return
        // }

        if(!this.newNoteData.title){
          alert('标题不能为空')
          return
        }
        if(!this.newNoteData.noteDescription){
          alert('描述不能为空')
          return
        }

        let reg = /[0-9]+/g;
        if(this.newNoteData.title){
          this.newNoteData.title = this.newNoteData.title.replace(reg,'***')
        }



        data.title = this.newNoteData.title
        data.description = this.newNoteData.noteDescription
        //this.noteData.unshift(data)
        //调用store,暂存数据
        this.ADD_NOTES(data)
        this.clearForm()
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

        let ele = document.querySelectorAll('.com-input-container')
        console.log(ele)

        ele.forEach((item,index,arr)=>{
          item.removeAttribute('class')
          item.setAttribute('class','com-input-container')
        })


        // ele.removeAttribute('class')
        // console.log(ele)
        // ele.setAttribute('class','com-input-container')
        // console.log(ele)
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

