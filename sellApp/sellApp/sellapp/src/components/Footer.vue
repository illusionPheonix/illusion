<template>
  <div>
    <!-- 底部固定 -->
    <div class="nav_footer">


        <Poptip placement="top-start" width="200">
          <img class="shapcar" :src="shapcaricon">
          <div class="api" slot="content">
            <Shapcar></Shapcar>
          </div>         
        </Poptip>

        <label>￥：{{ totalprice }}</label>

        <Button class="btn">购买</Button>


    </div>

  </div>
</template>

<script>
import Shapcar from "../pages/Shapcar";

export default {
  data() {
    return {
      //shapcar: require("../assets/img/icon_shopcar.png")
    };
  },
  components: {
    Shapcar
  },
  computed:{
    shapcaricon(){
      if(this.$store.getters.shapcargoods.length === 0)
        return require("../assets/img/icon_shopcar.png") //没有点亮的颜色

        return require("../assets/img/icon_shopcar_s.png") //点亮的颜色
      
    },

    //商品总价格
    totalprice(){
      let price=0
      for(let good of this.$store.getters.shapcargoods){
        price += good.price*good.num
      }
      return price
    }
  }
};
</script>

<style lang="less" scoped>
//固定底部栏
.nav_footer {
  width: 100%;
  background-color: #141c27;
  position: fixed;
  bottom: 0;
  z-index: 2;

  .shapcar {
    width: 4rem;
    height: 4rem;
  }

  label{
    font-size: 1.2rem;
    display: inline-block;
    
  }
  .btn{
    margin-left: 5rem;
  }

}
</style>