<template>
  <div class="bigbox">
    <!-- 中间内容 -->
    <div class="item_content">
      <div class="left_div">
        <ul class="content">
          <p :class="{left_title:true,active:curIndex===i}" @click="clickActive(i)" v-for="(item,i) in goodsMenu" :key="i">{{ item.name }}</p>
        </ul>
      </div>

      <div class="right_div">
        <ul class="content">
            <div :id="i" v-for="(item,i) in goodsMenu" :key="i">
                <!-- 标题 -->
                <h4>{{ item.name }}</h4>

                <!-- 子商品 -->
                <div v-for="(obj,key) in item.foods" :key=key class="right_div_child">
                    <img v-lazy= "obj.icon">
                    <div class="cont">
                        <h3>{{ obj.name }}</h3>
                        <p>{{ obj.description }}</p>
                        <p>月售{{ obj.sellCount }}份  好评率{{ obj.rating }}%</p>
                        <p class="price">￥{{ obj.price }}</p>
                    </div>

                    <!-- 加减图标 -->
                    <div class="icon_add_dec">
                        <button @click="clickDec(obj.id)" v-show="obj.num >= 1">-</button>
                        <label v-show="obj.num>= 1">{{ obj.num }}</label>
                        <button @click="clickAdd(obj.id)" >+</button>
                        
                    </div>
                </div>
                
                
            </div>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import { getGoods } from "../api/api";
import BScroll from 'better-scroll'

export default {
  data() {
    return {
      //goodsMenu: [],
      curIndex:0,  //当前选中的左侧索引
      heightArr:[] //div的高度数组
    };
  },
  methods:{
      clickActive(index){
          //保存当前点击的索引
          this.curIndex=index         
          
          //querySelector不能选中数字ID！！！！数字ID只能getElementById
          //scrollToElement() 函数 滚动到指定元素上面
          //在this.__  代表自己定义的方法，而不是this自带的  用于区分
          this.__rightscroll.scrollToElement(document.getElementById(index),500)
          
      },
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
  created() {
    //发送action通知，初始化异步数据
    this.$store.dispatch("initData")
    
  },
  computed:{
      goodsMenu(){
          return this.$store.state.data
      }
  },
  mounted(){
   
      //左侧滚动div
      this.__leftbscroll=new BScroll('.left_div',{
          click:true //让组件允许点击
      })

      //右侧滚动Div
      this.__rightscroll=new BScroll('.right_div',{
          probeType:3 //设置滚动时实时派发scroll事件
      })

      this.__rightscroll.on("scroll",pos=>{
          let _y=Math.abs(pos.y) //将y轴的值转为 绝对值
            //console.log(_y);
                      
          let total=0
          //书写坐标计算算法
          for(let i=0;i<this.heightArr.length;i++){
             
              total+=this.heightArr[i]   //每循环一次，总高度进行增加   
              //console.log(total); 1146 1288 1418 1774 2017 2260 2616 3198 3892
              
              
              if(_y < this.heightArr[0]){
                  this.curIndex=0
              }else if(_y >= total){  // 右侧div：   i     : i+1
                  this.curIndex=i+1   // 左侧div：curIndex : 
              }
          }
          
      })
  },
  updated(){
      
      //增加判断 防止重复获取div高度
      if(this.heightArr.length === 0){
          //获取右侧所有div的高度
            for(let i=0;i<this.goodsMenu.length;i++){
                this.heightArr.push(document.getElementById(i).offsetHeight)
            }

            //console.log(this.heightArr);//[1146, 142, 130, 356, 243, 243, 356, 582, 694]
      
      }
  }
};
</script>

<style lang="less" scoped>
.bigbox{
    height: 100%;
}
//中间内容
.item_content {
  display: flex;
  height: 100%;

  .left_div {
    overflow: auto; //超出自动出现滚动条
    
    width: 5rem;
    height: 100%;
    background-color: #f4f5f7;
    
      .left_title {
        text-align: center;
        padding: 1.5rem 0.5rem;
        border-bottom: 0.05rem solid #ccc;
      }
      .active{
          background-color: #fff
      }
    
  }
  .right_div {
    width: 100%;
    overflow: auto;
    height: 100%;
    

    h4{
        background-color: #f4f5f7;
        padding-left: 1rem;
    }
    
    .right_div_child{
        display: flex;
        padding:0.5rem ;
        border-bottom: 0.05rem solid rgb(235, 235, 235);
        
        img{
            width: 4rem;
            height: 4rem;
            margin: 1rem;
        }

        .cont{
            padding-top: 1rem;
            .price{
                color: red
            }
        }

        .icon_add_dec{
            position: absolute;
            right: 0.5rem;
            label{
                padding:0 0.5rem 0 0.5rem;
            }
            
            
        }
    }
  }
}
</style>