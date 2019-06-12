<template>
<!-- 评价 -->
    <div>
        <div class="top">
            <div class="top_left">
                <h2>3.9</h2>
                <p>综合评分</p>
                <p>高于周边商家69.2%</p>
            </div>
            <div class="top_right">
                <p>服务态度 <Rate disabled :value.sync="valueDisabled"></Rate>3.9</p>
                <p>服务态度 <Rate disabled :value.sync="valueDisabled"></Rate>4.0</p>
                <p>送达时间 44分钟</p>
            </div>
        </div>
        <div class="kong"></div>
        <div class="middle">
            <i-button type="primary" class="btn">全部57</i-button>
            <i-button type="success" class="btn">满意47</i-button>
            <i-button class="btn">不满意10</i-button>
        </div>
        <div class="top_content_title">
            <p>只看内容评价</p>
        </div>
        <div class="content" v-for="item in evaluateData">
            <img :src="item.avatar" alt="">
            <div class="content_r">
                <p>{{ item.username }}</p>
                <p><Rate class="star" disabled :value.sync="item.score"></Rate>{{ item.deliveryTime?item.deliveryTime+'分钟送达' :""}}</p>
                <p>{{ item.text }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                valueDisabled:4
            }
        },
        created(){
            this.$store.dispatch("ratingsData")                
        },
        computed:{
            evaluateData(){
               
                return this.$store.state.rData
            }
        }
    }
</script>

<style lang="less" scoped>
.top{
    display: flex;
    width: 100%;
    .top_left{
        width: 40%;
        text-align: center;
        padding-top: 1rem;
    }
    .top_right{
        width: 60%;
    }
}
.kong{
    width: 100%;
    height: 1.5rem;
    background-color: #F4F5F7;
}
.middle{
    border-bottom: 0.01rem solid #ccc;
 .btn{
     margin: 0.5rem
 }
}
.top_content_title{
    border-bottom: 0.01rem solid #ccc;
    height: 3rem;
    p{
        padding: 1rem 0 1rem 3rem;
        font-size: 0.9rem;
        color:rgb(146, 143, 143)
    }
}
.content{
    display: flex;
    border-bottom: 0.01rem solid #ccc;
    padding: 0.5rem 0 0.5rem 0.5rem;
    img{
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin-right: 1rem;
    }
    .content_r{
        
        .star{
            font-size: 1rem
        }
    }
}
</style>