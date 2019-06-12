<template>
  <div class="bigdiv">
    <h2 v-if="shapcargoods.length==0">购物车空空如也~~~~~~</h2>
    <div v-else>
      <div v-for="(item,id) in shapcargoods" :key=id>
        <label>{{ item.name }}</label>
        <button @click="clickDec(item.id)" v-show="item.num >= 1">-</button>
        <label v-show="item.num>= 1">{{ item.num }}</label>
        <button @click="clickAdd(item.id)">+</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    //点击减少
      clickDec(id){
          this.$store.commit({
              type:"changeFoodsNum",
              id,
              num:-1
          })
          
      },

      //点击增加
      clickAdd(id){
          this.$store.commit({
              type:"changeFoodsNum",
              id,
              num:1
          })
          
      }
  },
  computed:{
      shapcargoods(){
          return this.$store.getters.shapcargoods
      }
  }
};
</script>

<style lang="less" scoped>
.bigdiv{
    
}
</style>