<template>
    <div class="addNewCharge-wrap preventOverflowXY" @click="openDescriptArea(2)">
        <nav-top-bar :pathName="pathName" :topTit="topTit" :isShowReturn="isShowReturn"></nav-top-bar>
        
        <div class="topToggleMenu">
            <yd-scrollnav color="#fff" current-color="#ffd800" toggle-text="选择分类" bgcolor="#00BBD3" 
            :border-color="borColor">
                <yd-scrollnav-panel :index=2 :label="item.value" v-for="(item,key) in bankOptions" :key="key"
                 :callback="selectNavBar(key)" >
                       <p>{{key}}---{{item.value}}</p>
                       <yd-list>
                            <yd-list-item>
                                <!-- <span slot="title" @click="getClassify(key)"><p>222222---{{item.value}}</p></span> -->
                                
                            </yd-list-item>
                       </yd-list>
                </yd-scrollnav-panel>
            </yd-scrollnav>
        </div>

        <yd-cell-group>
            <yd-cell-item>
                    <span slot="left" class="icon iconfont icon-clock baseIcon"></span>
                    <span slot="left">时间:</span>
                    <div slot="right" class="r_box">
                        <yd-datetime v-model="accountInfo.day" class="input_box"></yd-datetime>
                    </div>
            </yd-cell-item>
            <yd-cell-item>
                    <span slot="left" class="icon iconfont icon-dollar baseIcon"></span>
                    <span slot="left">数目:</span>
                    <div slot="right" class="r_box">
                       <!-- <input class="input_sr" v-model.trim="accountInfo.myAccount" @keyup="fixNumber($event)" placeholder="请输入收入或支出" /> -->
                       <yd-input class="input_sr" 
                       v-model="accountInfo.myAccount" 
                       placeholder="请输入收支" 
                       regex="^\d{1,32}" 
                       :show-success-icon="false">
                       </yd-input>
                    </div>
            </yd-cell-item>
            <yd-cell-item :arrow="true">
                    <span slot="left" class="icon iconfont icon-scanning baseIcon"></span>
                    <span slot="left">分类:{{selectedCategory}}</span>
                    <div slot="right">
                       <select v-model="selectedCategory" class="select-bar">
                           <option v-for="(o,i) in bankOptions" :value="o.value" :key="i">{{o.value}}</option>
                       </select>
                    </div>
            </yd-cell-item>

             <div class="wrap-out">
                   <div class="wrap-description" v-show="flagText" @click.stop="openDescriptArea(1)">
                        <div>备注</div>
                        <textarea class="description-self descriptionEle" rows="1" placeholder="请输入备注" v-model="accountInfo.description"></textarea>
                   </div>
                   <div class="wrap-description-def" v-show="!flagText" @click.stop="openDescriptArea(1)">
                        <div>备注....</div>
                   </div>
            </div>
          
        </yd-cell-group>
        <div>accountInfo:{{accountInfo | chargeFilter}}</div>

        <div style="border:1px solid #fff;margin:50px;background:#fff;padding:30px">msg is1:
           <span style="font-size:40px;color:green">{{getStateMsg}}</span>
           <div style="margin-top:40px" @click="ADD_FLOW(50)">get bank</div>
        </div>


        <div class="posBottom-wrap">
            <!-- <div class="averageSub-box">
               <div class="btn-default" @click="SET_CHARGE_DATAS(accountInfo)"><i class="icon iconfont icon-message"></i>保存</div>
            </div> -->
             <div class="averageSub-box">
               <div class="btn-default" @click="addNewRecord()"><i class="icon iconfont icon-message"></i>保存</div>
            </div>
            <div class="averageSub-box">
               <div class="btn-cancel"><i class="icon iconfont icon-guanbi2fill"></i>取消</div>
            </div>
        </div>
       
    </div>
</template>


<script>
import navTopBar from '@/components/nav'
import {AoutoExpendingArea} from '../../commonJs/unities.js'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'


export default {
    name:'addNewCharge',
    data(){
        return{
           pathName:'/Bank',
           isShowReturn:true,
           topTit:'记账',
           flagText:false,
           borColor:'#000000',


           selectedCategory:'餐饮',
           bankOptions:[
               {tag:0,value:'投资'},
               {tag:1,value:'餐饮'},
               {tag:2,value:'工资'},
               {tag:3,value:'食物'},
               {tag:4,value:'转账'},
               {tag:5,value:'金融'},
               {tag:6,value:'电费'},
               {tag:7,value:'商品'},
               {tag:8,value:'茶'},
               {tag:9,value:'工资'}
           ],

           accountInfo:{
               day:'',
               myAccount:'',
               category:'',
               description:'',
               id:''
           },


               
        }
    },
    //过滤器
    filters:{
       chargeFilter(value){
           value.description = value.description ? value.description : '其他'
           return value  
       }
    },
    components:{
        navTopBar
    },
    mounted(){
       //添加自动申缩监控
       AoutoExpendingArea('.descriptionEle',24)
    },
    watch:{
       selectedCategory(n,o){
           this.accountInfo.category = n;
           return n
       }
    },
    computed:{
        //调用store中的数据
        getMsg(){
            return this.$store.state.a.msg
        },
       ...mapState(['msg']),
       ...mapGetters(['getStateMsg','getNewRecord'])
    },
    methods:{

        ...mapMutations(['ADD_FLOW','SET_CHARGE_DATAS']),

        addNewRecord(){
            console.log('-------record-1--',this.getNewRecord)
            this.SET_CHARGE_DATAS(this.accountInfo)
            console.log('-------record-2--',this.getNewRecord)
        },

        //设置显示隐藏多文本输入框
        openDescriptArea(ele){
            switch(ele){
                case 1 :
                     this.flagText = true
                     break;
                case 2 :
                     this.flagText = this.accountInfo.description ? true :false
                     break;
                default:
                     this.flagText = false
                     console.log('this.flagText----3--',this.flagText)
                     
            }
        },

        //从store中取数据
        getBank(){
            //$store.state.a.msg
             this.$store.commit('ADD_FLOW',333)
        },

        selectNavBar(val){
            //console.log(val)
            let categoryDom = document.querySelectorAll('.yd-scrollnav-tab-item li') 
            //console.log('-----1---',categoryDom)
            //let categoryDom = document.querySelectorAll('.yd-scrollnav-current')
            //    if(categoryDom.addEventListener){
            //       categoryDom.addEventListener('click',function(){
            //         console.log('-----1---')
            //       })
            //    }else{
            //         console.log('-----2---')
            //    }
          
        },
        getClassify(key){
            console.log('------index----',key)
        },
        
    }



}
</script>
