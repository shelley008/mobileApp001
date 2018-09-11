<template>
    <div id="myNode" ref="picNode">

       <!--顶部导航 -->
      <yd-navbar title="navber" fixed  bgcolor="#fff" fontSize="18px" class="navBar">
        <router-link slot="left" :to="{path:pathName}" v-show="isShowReturn">
         <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        <div slot="center">{{topTit}}</div>
        <div slot="right" @click="takePic4" style="margin-right:15px">
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
                 <li v-for="(note,index) in noteData">
                   <b>{{note.title}}</b>
                   <span @click="deleteNote(index)">删除</span>
                   <span>修改</span>
                 </li>
             </ul>
         </div>

        <div id="result" name="result"></div>

        <!--导入文件-->
         <div>
           <input id="file" type="file" accept=".json"/>
           <button @click="importJSON">导入json</button>
           <button @click="readAsDataURL">导入图像</button>
         </div>




      </div>
    </div>
</template>

<script>
//截图工具
import domtoimage from 'dom-to-image'

import FileSaver from 'file-saver'


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
            title:'',
            noteDescription:''
          },
          myTitle:'',
          // 将导入的json保存在这个对象下
          ImportJSON: {}
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

      //导出生成json文件
      downloadJson(data) {
        var blob = new Blob([JSON.stringify(data)], { type: "" });
        FileSaver.saveAs(blob, "hello.json");
      },

      //导出生成文本
      downloadText(data) {
        var blob = new Blob([JSON.stringify(data)], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, "hello.txt");
      },

      //导入json文件
      importJSON () {
        const file = document.getElementById('file').files[0]
        const reader = new FileReader()
        reader.readAsText(file)
        const _this = this
        reader.onload = function () {
          // this.result为读取到的json字符串，需转成json对象
          _this.ImportJSON = JSON.parse(this.result)
          // 检测是否导入成功
          console.log(_this.ImportJSON)
        }
      },

      //导入图片
      readAsDataURL(){
        //检验是否为图像文件
        var file = document.getElementById("file").files[0];
        if(!/image\/\w+/.test(file.type)){
          alert("看清楚，这个需要图片！");
          return false;
        }
        var reader = new FileReader();
        //将文件以Data URL形式读入页面
        reader.readAsDataURL(file);
        reader.onload=function(e){
          var result=document.getElementById("result");
          console.log('--------re-----')
          console.log(this.result)
          //显示文件
          result.innerHTML='<img src="' + this.result +'" alt="" />';
        }
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
     //截图 PNG图并下载
      takePic2(){
        domtoimage.toBlob(document.getElementById('myNode'))
          .then(function (blob) {
            FileSaver.saveAs(blob, 'myNode.png');
          });
      },
      //截图 JPEG 并 save
      takePic3(){
        domtoimage.toJpeg(document.getElementById('myNode'), { quality: 0.95 })
          .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
          });
      },
      //截图 SVG
      takePic4(){
        domtoimage.toSvg(document.getElementById('myNode'), {})
          .then(function (dataUrl) {
            let img = new Image();
            img.src = dataUrl;
            let s = 'height:100px';
            let c = 'test'
            img.style = s;
            img.className = c;
            document.body.appendChild(img);
          });
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

