

import Vue from 'vue'
import Vuex from 'vuex'

import { getGoods } from '../api/api'

Vue.use(Vuex)

//创建仓库
const store=new Vuex.Store({
    //状态
    state:{
        name:'高桥',
        age:18,
        num:1,
        list:[],
        stus: [{id: '1', age: 20},{id: '2', age: 16},{id: '3', age: 11},{id: '4', age: 33}]
    },

    //同步通知：改变状态唯一方式
    mutations:{
        changName(state){
            state.name='高桥凉介'
        },

         //参数1：state本身，参数2：本次提交的通知对象
        changeNum(state,obj){
            //每个通知函数中，都会收到state，这个state就是状态对象本身
            state.num+=obj.num
        },


        
        initlist(state, obj){
            state.list = obj.list
        }
    },

    //异步通知：如果本次数据改变有异步操作，则需要写到action中
    actions:{
        async initlist(context){
           //1.先执行完所有异步操作
           let res=await getGoods()
           console.log(res);
           
           
           //2.拿到数据后，commit提交mutation 让 mutation去改变state
           context.commit({
               type:'initlist',
               list: res.data
           })
       } 
    },

    //计算器
    getters:{
       //获取年满18岁的
       getStus(state){
           return state.stus.filter(obj=>{
               return obj.age>=18
           })
       }
    }
})

//发出mutations通知  ：  commin---mutations
//方式一：直接传入要触发的函数
/* store.commit('changName') */

//方式二：使用对象的方式触发
/* store.commit({
    type:"changeNum", //type就是要触发的函数名
    num:5
}) */



//发出actions通知   ：  dispach---actions
store.dispatch("initlist")

//取状态
//获取getters的数据，访问方式通computed，不需要写()
console.log(store.getters.getStus);

export default store