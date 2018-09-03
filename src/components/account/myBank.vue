<template>
  <div class="mar">
        <!-- 顶部导航 -->
        <yd-navbar title="navber" fixed  bgcolor="#fff" fontSize="18px" class="navBar">
                <router-link slot="left" :to="{path:pathName}" v-show="isShowReturn">
                    <yd-navbar-back-icon></yd-navbar-back-icon>
                </router-link>
                <div slot="center">{{topTit}}</div>
                <div slot="right" @click.stop="addNewBank()">
                     记账
                 </div>
        </yd-navbar>

        <yd-cell-group class="top-box top-box-line-red bank-wrap">
            <yd-cell-item>
                <label slot="left">累计总收入:</label>
                <div slot="right" class="bank-num red">
                    {{$store.state.a.msg}}
                </div>
            </yd-cell-item>
            <yd-cell-item>
                <label slot="left">累计总支出:</label>
                <div slot="right" class="bank-num green">
                    -2514514
                </div>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group class="top-box top-box-line-blue bank-wrap">
            <yd-cell-item>
                <label slot="left">本月总收入：</label>
                <div slot="right"  class="bank-num red">
                    88544514478
                </div>
            </yd-cell-item>
            <yd-cell-item>
                <label slot="left">本月支收入：</label>
                <div slot="right"  class="bank-num green">
                    12024451
                </div>
            </yd-cell-item>
        </yd-cell-group>


        <!-- 历史明细 -->
        <yd-cell-group class="bank-table-box-t">
             <yd-cell-item>
                 <span slot="left">
                     历史明细:{{selected||'最近30天'}}
                 </span>
                 <div slot="right">
                     <select v-model="selected">
                         <option :value="1">最近30天</option>
                         <option :value="2">上月</option>
                         <option :value="3">本季度</option>
                         <option :value="4">本年</option>
                         <option :value="5">去年</option>
                     </select> 
                 </div>
             </yd-cell-item>
        </yd-cell-group>
        
        <div class="bank-table-box-main">
           <yd-flexbox class="table-t">
               <yd-flexbox-item>时间</yd-flexbox-item>
               <yd-flexbox-item>收支项</yd-flexbox-item>
               <yd-flexbox-item>备注</yd-flexbox-item>
           </yd-flexbox>
           <yd-flexbox>
               <yd-flexbox-item>2018-07-30</yd-flexbox-item>
               <yd-flexbox-item>151</yd-flexbox-item>
               <yd-flexbox-item>投资</yd-flexbox-item>
           </yd-flexbox>
           <yd-flexbox>
               <yd-flexbox-item>2018-07-30</yd-flexbox-item>
               <yd-flexbox-item>151</yd-flexbox-item>
               <yd-flexbox-item>投资</yd-flexbox-item>
           </yd-flexbox>
           <yd-flexbox>
               <yd-flexbox-item>2018-07-30</yd-flexbox-item>
               <yd-flexbox-item>151</yd-flexbox-item>
               <yd-flexbox-item>投资</yd-flexbox-item>
           </yd-flexbox>
        </div>

  </div>
</template>

<script>

export default {
    name:'Bank',
    data(){
        return{
             isShowReturn:true,
             pathName:'/',
             topTit:'我的记账本',
             selected:1
        }
    },
    components:{
       
    },
    methods:{
        addNewBank(){
           this.$router.push({
                name:'addNewCharge'
            })
        }
    }


}
</script>

