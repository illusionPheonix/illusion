

import Vue from 'vue'
import Vuex from 'vuex'

import { getGoods } from '../api/api'
import { getRatings } from '../api/api'
import { getSeller } from '../api/api'

Vue.use(Vuex)

//创建仓库
export default new Vuex.Store({
    state:{
        data:[], //商品页数据数组
        rData:[], //评价页面数据
        mData:[]  //商家页面数据
    },
    mutations:{
        //同步通知(商品数据)
        initData(state,obj){
            state.data=obj.data
        },
        //评论数据
        ratingsData(state,obj){
            state.rData=obj.data
        },
        //商家数据
        sellerData(state,obj){
            state.mData=obj.data           
        },
        //改变商品数量 
        changeFoodsNum(state,obj){
            for(var item of state.data){
                for(var food of item.foods){
                    if(food.id === obj.id){
                        food.num += obj.num
                        return //性能优化
                    }
                    
                }
            }
        }
    },
    actions:{
        //异步通知
        //1.先拿异步数据
        async initData(context){
            let data=await getGoods()
            let id=0
            //2.点击加减都是通过id，如果前端要用某些字段，而后台没有，后台又不给加，前端可以自己增加
            for(var obj of data.data.data){
                for(var food of obj.foods){
                    food.id=id++
                    food.num=0                   
                }
                
            }
         
            //3.使用commit提交mutation改变数据
            context.commit({
                type:"initData",
                data:data.data.data
            })           
        },
        //拿评价页面数据
        async ratingsData(context){
            let res=await getRatings()
            
            context.commit({
                type:"ratingsData",
                data:res.data.data
            })            
        },
        //拿商家页面数据
        async sellerData(context){
            let resdata=await getSeller()
            
            context.commit({
                type:"sellerData",
                data:resdata.data.data
            })
            
            
        }

    },
    getters:{
        //计算属性
        shapcargoods(state){
            let arr=[]
            //嵌套循环，把所有数量 >=1 的商品，装进新数组中,返回出去
            for(var item of state.data){
                for(var food of item.foods){
                    if(food.num >= 1){
                        arr.push(food)
                    }
                }
            }

            return arr
        }

    }
})







