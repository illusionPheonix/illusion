<template>
  <div class="bigDiv">
    <!-- 头部 -->
    <div class="top">
      <Top></Top>
    </div>

    <div class="middle">
      <!-- 中间小标题 -->
      <div class="nav_box">
        <router-link to="/"><span :class="{active:curIndex==='item'}" @click="clickFn('item')">商品</span></router-link>
        <router-link to="/evaluate"><span :class="{active:curIndex==='evaluate'}" @click="clickFn('evaluate')">评价</span></router-link>
        <router-link to="/merchant"><span :class="{active:curIndex==='merchant'}" @click="clickFn('merchant')">商家</span></router-link>
      </div>
    </div>

    <div class="main">
      <router-view></router-view>
    </div>

    <div class="footer">
      <Footer></Footer>
    </div>

    <!-- 底部 -->
  </div>
</template>


<script>
import Top from "../components/Top.vue"; //引入头部组件
import Footer from "../components/Footer.vue"; //引入尾部组件

export default {
  data(){
    return{
      curIndex:"item"
    }
  },
  components: {
    Top,
    Footer
  },
  methods:{
    clickFn(val){
      this.curIndex=val
    }
  }
};
</script>


<style lang="less" scoped>
//scoped：设置此属性后，所有样式只对当前组件生效！！！！

.bigDiv {
  height: 90%;
  .top {
    height: 20%;
  }
  .middle {
    height: 7%;
    box-sizing: border-box;
    background: #fff;
    //中间 小标题
    .nav_box {
      display: flex;
      justify-content: space-around;
      border-bottom: 0.1rem solid #ccc;
      background-color: #fff;
      height: 100%;
      align-items: center;
      a {
        font-size: 1rem;
        color: rgb(99, 94, 94);
      }
      .active{
        color: red
      }
    }
  }

  .main {
    height: 73%;

  }
  .footer {
    height: 10%;
  }
}
</style>