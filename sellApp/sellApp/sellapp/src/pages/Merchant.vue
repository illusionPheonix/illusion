<template>
<!-- 商家 -->
    <div>
        <div class="top" v-for="item in merchantData">
            <div class="one" >
                <div class="one_l">
                    <h2>{{ item.name }}</h2>
                    <Rate disabled :value.sync="valueDisabled" class="star"></Rate>
                    <span>(661)</span>
                    <span>月售690单</span>
                </div>

                <div class="one_r">
                    <ion-icon name="heart" class="heart">1</ion-icon>
                    <p>已收藏</p>
                </div>
            </div>
            <div class="two">
                <div>
                    <p>起送价</p>
                    <p>20元</p>
                </div>
                <div>
                    <p>起送价</p>
                    <p>20元</p>
                </div>
                <div>
                    <p>起送价</p>
                    <p>20元</p>
                </div>
            </div>
            <div class="kong"></div>
            <div class="content">
                <div>
                    <p>公共与活动</p>
                    <p>粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。
                        坚守纯天然、0添加的良心品质深得消费者青睐，
                        发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
                    </p>
                </div>
                <div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                valueDisabled:3
            }
        },
        created(){
            this.$store.dispatch("sellerData")
            console.log(this.$store.state.mData);
            
        },
        computed:{
            merchantData(){
                return this.$store.state.mData
            }
        }
    }
</script>

<style lang="less" scoped>
.top{
    .one{
        display: flex;
        border-bottom: 0.01rem solid #ccc;
        .one_l{
            .star{
                font-size: 0.8rem
            }
        }
        .one_r{
            .heart{
                color: red
            }
        }
    }
    .two{
        display: flex;
        justify-content: space-around;
        border-bottom: 0.01rem solid #ccc;
        padding: 1rem;

        div:not(:last-child){

        }
    }
    .kong{
        width: 100%;
        height: 1.5rem;
        background-color: #F4F5F7;
    }
}
</style>