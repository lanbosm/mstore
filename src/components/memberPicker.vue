<template>
    <div class="page-popup" >
        <p class="right" tapmode @click="showPicker()"><i class="iconfont icon-ren"></i><span class="peoplenum">共 {{member}} 人</span></p>
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
            <mt-picker :slots="dateSlots" ref="sss"  @change="onDateChange" :visible-item-count="5" :show-toolbar="true" value-key="label">
                <span class="mint-popup4-cancel mint-popup4-left" @click="cancelPicker">取消</span>
                <span class="mint-popup4-title">人数选择</span>
                <span class="mint-popup4-finish mint-popup4-right" @click="checkPicker">完成</span>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<style>

    .mint-popup-4 {
        width: 100%;

    }
    .mint-popup-4 .picker-slot-wrapper, .picker-item {
        backface-visibility: hidden;
    }
    .mint-popup4-left{float: left;}
    .mint-popup4-right{float: right}
    .mint-popup4-title{ position:relative; width:100%; padding:0rem; text-align: center; color:#333333;  display: block; background: #fcfcfc; z-index: 10; }
    .mint-popup4-finish{ position:absolute; right: 0.5rem; top: 0rem;border-radius: 0.2rem;color: #03a9f4;font-size:.7rem;z-index: 12;}
    .mint-popup4-cancel{position:absolute; left: 0.5rem; top: 0rem; border-radius: 0.2rem;color: #b5b5b5;font-size:.7rem; z-index:12;}

</style>

<script type="text/babel">

  export default {
    props:['open','close','planMember'],
    data() {
      return {
          member:1,
          popupVisible:false,
          dateSlots: [
          {
            flex: 1,
            defaultIndex:0,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      };
    },
    computed:{



    },
    methods: {
      showPicker(){
          var vm=this;
          this.member=this.planMember;

          if( this.open) {
              this.open();    //调整openframe

          }

          this.$refs.sss.setSlotValues(0,[
            {label:'1人',value:1},
            {label:'2人',value:2},
            {label:'3人',value:3},
            {label:'4人',value:4}

          ]);

          this.$refs.sss.setSlotValue(0, 1);
        this.popupVisible=true;


      },
      onDateChange(picker, values) {





              //
      },
      cancelPicker(){
            this.popupVisible = false;
            if( this.close) {
                  this.close();    //调整openframe
            }
      },
      //选择好了选择器
      checkPicker(){

          this.popupVisible=false;
          if( this.close) {
              this.close();    //调整openframe
          }

          this.$emit('change',this.member);
      }

    },
    mounted() {
        this.member=this.planMember;


     // this.buttonBottom = this.$refs.button.$el.getBoundingClientRect().bottom;
    }
  };
</script>
