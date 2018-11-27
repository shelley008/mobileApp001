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
            <div class="com-input-container" :class="[isHasTitVal?'com-has-value':'']">
              <label>标题:</label>
              <textarea v-inputActive="{color: 'white', text: 'hello!'}"
                        :maxlength="newNoteData.noteTitLen"
                        class="md-input"
                        v-model="newNoteData.title"

                        @input="inputFn($event)"
                        @focus="focusFn('获取焦点')"
                        @change="changeFn($event)"
                        @blur="blurFn('失去焦点')"
                        @click="clickFn('单击时')"

                        ></textarea>
              <span>{{newNoteData.noteTitLenTxtVal}}</span>
            </div>

            <div class="com-input-container" :class="[isHasDiscript?'com-has-value':'']">
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
                     <dt>{{note.title}}<span>{{note.timeId | dateFormat}}</span></dt>
                     <dd>{{note.description}}</dd>
                   </dl>
                   <span @click="deleteNote(index)">删除</span>
                   <span @click="editNotes(index)">修改</span>
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

        <div>new</div>
        <div>
          <p>123456</p>
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
            noteTitLen:30,
            timeId:''
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
    dateFormat(val){
      let d = new Date(val)
      console.log('date:',d.getFullYear()+'年')
      let year = d.getFullYear()+'年'
      let month = Number(d.getMonth())+1+'月'
      let date = d.getDate()+'日'
      let h = d.getHours()+'点'
      let f = d.getMinutes()+'分'
      let fullTime = year + month + date + h + f
      return fullTime
    }
  },

    mounted(){},
    created(){},
    watch:{},
    computed:{
      ...mapGetters(['GET_NOTES']),
      noteDatas(){
        return this.GET_NOTES
      },

      //输入框样式控制
      isHasTitVal(){
        return !!this.newNoteData.title ? true: false
      },

      isHasDiscript(){
       return !!this.newNoteData.noteDescription ? true: false
      }


    },
    methods:{
      //调用store中的方法
      ...mapMutations(['ADD_NOTES','DELETE_NOTES','EDIT_NOTES']),

      //输入框值发生改变时
      inputFn(e,val){
        console.log(val)
        let reg = /[0-9]/
        let s = e.target.value
        this.newNoteData.title = s.replace(reg,'')
       // console.log('oninput',this.newNoteData.title)
        let txtlen = this.newNoteData.title.length;
       // console.log('noteTitLenTxt:',this.noteTitLenTxt)
        this.newNoteData.noteTitLenTxtVal = this.newNoteData.noteTitLen - txtlen
      },
      //input自动获取焦点
      focusFn(val){
       // console.log(val)
      },
      //值改变时
      changeFn(e,val){


      },
      //当失去焦点时
      blurFn(val){
       // console.log(val)
      },
      //当单击时
      clickFn(val){
       // console.log(val)
      },




      //添加新记事到列表中
      saveNewNote(t){
        let data = {}
        if(!this.newNoteData.title){
          alert('标题不能为空')
          return
        }
        if(!this.newNoteData.noteDescription){
          alert('描述不能为空')
          return
        }

        let reg = /\s+/g;
        if(this.newNoteData.title){
        // this.newNoteData.title = this.newNoteData.title.replace(reg,'')
        }

        data.title = this.newNoteData.title
        data.description = this.newNoteData.noteDescription

        //如果是新记录添加到最新位置，
        //时间是唯1性
        if(!this.newNoteData.timeId){
          let d = new Date()
          data.timeId = d.getTime()
          //调用store,暂存数据
          this.ADD_NOTES(data)
          this.clearForm()
        }else{
          data.timeId = this.newNoteData.timeId
          this.EDIT_NOTES(data)
          this.clearForm()
        }
      },


      //删除
      deleteNote(index){
        console.log('index----',index);
        //this.noteData.splice(index,1)
        this.DELETE_NOTES(index)
      },

      //编辑
      editNotes(id){
       // this.EDIT_NOTES(id)
        if(this.newNoteData.title !== '' || this.newNoteData.noteDescription){
          alert('要放弃操作么')
          return
        }
        let editObj = []
        editObj = this.noteDatas.filter((item,index)=>{
          if(index == id){
            return item
          }
        })
        this.newNoteData.title = editObj[0].title
        this.newNoteData.noteDescription = editObj[0].description
        this.newNoteData.timeId = editObj[0].timeId
       // console.log('**obj', editObj)
      },


      //清空表单
      clearForm(){
        this.newNoteData.title = ''
        this.newNoteData.noteDescription = ''
        this.newNoteData.timeId = ''

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

