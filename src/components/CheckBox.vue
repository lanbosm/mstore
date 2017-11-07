<template>
  <div class="diy-checkbox">
      <input type="checkbox" v-model="item.checked" @change="handleChange"  />
      <div class="inner-checkbox">
        <i></i>
      </div>
  </div>

</template>

<style lang="scss" scoped>
        .diy-checkbox {


                  width: 72px;
                  height: 72px;
                  overflow: hidden;
                  display: flex;

                  position: relative;
                  justify-content: center;
                  align-items: center;

                  .inner-checkbox{
                        width: 40px;
                        height: 40px;
                        border: solid 1px #cccccc;
                        border-radius: 50%;
                        left:16px;
                        top: 16px;
                        pointer-events: none;
                        position:absolute
                  }

                  input[type=checkbox]{
                    position: absolute;
                    width: 100%;
                    height:100%;
                    opacity:0;
                    margin: 0;
                    outline:none;
                    display: inline-block;

                  }
                  i{
                    width: 36px;
                    height:36px;
                    overflow: hidden;
                    position: absolute;
                    pointer-events: none;
                    top:0;
                    left:0;

                  }
                  i:after{
                    box-sizing: content-box;
                    content: "";
                    border: 2px solid #fff;
                    border-left: 0;
                    border-top: 0;
                    height:16px;
                    left: 10px;
                    position: absolute;
                    top: 5px;
                    transform: rotate(45deg) scaleY(0);
                    width: 10px;
                    transition: transform .15s cubic-bezier(.71,-.46,.88,.6) .05s;
                    transform-origin: center;
                  }


                  input[type=checkbox]:checked + .inner-checkbox i{
                    background:$yellow-base;
                    border-radius: 50%;
                  }
                  input[type=checkbox]:checked + .inner-checkbox i:after {
                    transform: rotate(45deg) scaleY(1);
                  }

        }

</style>
<script>



  export default {
    name: 'checkBox',
    props: {
      item: {
        type: Object,
        default: function () {
          return {checked:false}
        }
      },
    },
    data(){

        return {
            checked:false
        }
    },
    methods:{


        handleChange(val) {
          this.checked=this.item.checked;
          this.$emit('change', this.item);
        }
    }
  };
</script>
