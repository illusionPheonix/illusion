<template>
  <!-- 头部 -->
  <div class="nav_title">
    <div class="nav_top">
      <img class='avatar' :src="avatar">

      <div class="nav_title_right">
        <div class="nav_pt">
          <img src="../assets/img/brand@2x.png">
          {{ name }}
        </div>
        <p class="nav_pm">{{ description }}/30分钟送达</p>
        <div class="nav_pb">
          <img src="../assets/img/decrease_1@2x.png">
          {{ descriptionplay }}，满50减10
        </div>
      </div>
    </div>

    <div class="nav_bottom">
      <img src="../assets/img/bulletin@2x.png">
      <p>{{ bulletin }}</p>
    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/api";

export default {
  data() {
    return {
      name: "",
      description: "",
      avatar: "",
      descriptionplay: "",
      bulletin: ""
    };
  },
  async created() {
    //ES7：
    let res = await getSeller();
    let data = res.data.data;

    //保存数据
    this.name = data.name;
    this.description = data.description;
    this.avatar = data.avatar;
    (this.descriptionplay = data.supports[0].description),
      (this.bulletin = data.bulletin);
    //console.log(res.data.data);

    //ES6：
    /* getSeller()
            .then((res)=>{
                let data=res.data.data

                this.name=data.name
                this.description=data.description
                this.avatar=data.avatar
                
                
            }) */
  }
};
</script>

<style lang="less" scoped>
//头部
.nav_title {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .nav_top {
    display: flex;
    width: 100%;
    height: 80%;
    box-sizing: border-box;

    .avatar {
      width: 30%;
      padding: 1rem;
    }

    .nav_title_right {
      width: 70%;
      color: #fff;
      line-height: 1.5rem;
      padding-top: 1rem;
      img{
        width: 2rem;
        height: 2rem;
      }

      .nav_pt {
        font-size: 1rem;
        font-weight: bold;

        img {
          width: 2.5rem;
          height: 1.6rem;
          margin-right: 0.5rem;
        }
      }
      .nav_pm {
        font-size: 1rem;
        font-weight: lighter;
      }
      .nav_pb {
        font-weight: lighter;
        padding: 0;
        margin: 0;
        img {
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }
      }
    }
  }

  //公告
  .nav_bottom {
    display: flex;
    color: #fff;
    background-color: rgba(51, 51, 51, 0.6);
    height: 20%;
    img {
      width: 2rem;
      height: 1rem;
      margin: 0.5rem 0.5rem 0.5rem 1rem;
    }
    p {
      line-height: 2rem;
      font-weight: lighter;

      overflow: hidden; //溢出隐藏
      text-overflow: ellipsis; //文本溢出显示省略号
      white-space: nowrap; //文本不会换行（单行文本溢出）
    }
  }
}
</style>