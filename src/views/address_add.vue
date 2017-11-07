<template>
  <div class="page full flex flex-col proile">
    <my-header :title="title"></my-header>
    <ul class="item_content">
      <li class="item_li">
          <span class="font-14">联系人</span>
          <div><input class="font-14" type="text" placeholder="请输入联系人姓名" v-model="name"></div>
      </li>
      <li class="item_li">
          <span class="font-14">联系电话</span>
          <div><input class="font-14" type="tel" placeholder="请输入联系电话" maxlength="11" v-model="phone"></div>
      </li>
      <li class="item_li">
            <span class="font-14">地址名称</span>
           <div><input class="font-14" type="text" placeholder="如:公司地址、住宅地址" v-model="addressDescribe"></div>
      </li>
      <li class="item_li">
          <span class="font-14">地址</span>
          <div @click="showPicker()" ref="select3"><input class="font-14 read" type="text" placeholder="" v-model="selectedText[0]"></div>
          <city-picker @select="handleSelect(0,arguments)" :data="area" :selected-index="selectedIndex"
                     ref="picker1" :title="title" :cancelTxt="cancelTxt"
                     :confirmTxt="confirmTxt"></city-picker>
      </li>
      <li class="item_areatext">
          <span class="font-14">详细地址</span>
          <div><textarea class="font-14" rows="4" placeholder="请输入详细地址" v-model="addressDetail"></textarea></div>

      </li>
    </ul>
    <div class="item_save" @click="submitAddress()">
      保存
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .proile-main{
    margin-top: $gutter;
    flex: 1;
    background-color: #fff;
  }
  .read{pointer-events:none;}
  .item_li{
    width: 750px;
    height: 100px;
    border-bottom: 1px solid #eee;
    line-height: 100px;
  }
  .item_areatext{
    width: 750px;
    height: 200px;
    border-bottom: 1px solid #eee;
  }
  .item_areatext{line-height: 100px;}
  .item_content div{overflow: hidden;}
  .item_content span{margin-left: 30px;float: left;width:180px}
  input,textarea{width: 100%;height: 100%;color: #666}
  textarea{padding-top:40px}
  ::-webkit-input-placeholder{
         font-size: 12px;
    }
  .item_save{position: absolute;bottom: 0;left: 0;width: 750px;height: 100px;background-color: $orange;line-height: 100px;text-align: center;font-size: 16px;color: #fff;}
</style>
<script>
  import { mapState,mapGetters ,mapMutations, mapActions } from 'vuex';
  import {provinceList, cityList, areaList } from '../packages/cityPicker/areaData';
  import Page from '../packages/cityPicker/page.vue';
//  import Picker from '../packages/cityPicker/picker.vue';
  import CityPicker from '../packages/cityPicker/city-picker.vue';

  export default {
    name: 'address_add',
    data () {
      return {
        title:'填写地址信息',
        loading:true,
        cartList:[],
        area:[provinceList,cityList,areaList],
        selectedIndex: [0,0,0],
        selectedText:['省、市、区/县'],
        title:'选择地址',
        cancelTxt:'取消',
        confirmTxt:'确认',
        name:'',
        phone:'',
        addressDescribe:'',
        address:'',
        addressDetail:''
      }
    },
    components:{
      Page,
      CityPicker
    },
    computed: {
      ...mapState('cart', {
        list:state=>state.list
      }),
      ...mapGetters('cart', ['totalPrice'])
    },
    mounted(){
//      this.$refs.picker1.setData([provinceList,cityList,areaList])
//      this.$refs.picker1.setSelectedIndex([1])
    },
    created(){
      this.getCartList().then(res=>{
        this.loading=false;
      })
      console.log(234)
      console.log(this);
    },

    methods:{
      ...mapActions('cart', ['getCartList']),

      addList(){
        this.$store.dispatch('addList',this.value).then(res=>{
          console.log(this.$store.state);
          this.$messagebox.alert(res.msg);
        }).catch(res=>{

          this.$messagebox.alert('出错了');
        })
      },
      handleClick(){
        this.back('/login');
      },
      showPicker() {
        let picker = this.$refs['picker1'];
        picker.show()
      },
      handleSelect(index, args){
        console.log(args);
        this.selectedText.splice(index, 1, args[2].join(''));
        this.address=this.selectedText;
        console.log(JSON.stringify(this.selectedText))
      },
      submitAddress(){
        var _this=this;
        var testPhone=/^(1[345678][0-9]{1})[0-9]{8}$/;
        if(!_this.name){
            alert('请输入姓名');
            return false;
        }
        if(!testPhone.test(_this.phone)){
            alert('请输入正确手机号');
            return false;
        };
        if(!_this.phone){
            alert('请输入手机号');
            return false;
        }
        if(!_this.address){
          alert('请输入地址');
           return false
        };
        if(!_this.addressDetail){
            alert('请输入详细地址');
            return false
        };
      }
    },

  }
</script>
