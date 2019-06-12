

import axios from 'axios'

//IP
const ip="http://192.168.43.250:80/"


//获取商家信息
//ES5:
export function getSeller(){
    return axios.get(ip+'api/seller')
}

//ES6:
export var getGoods=()=>{
    return axios.get(ip+'api/goods')
}

//获取评论数据
export var getRatings=()=>{
    return axios.get(ip+"api/ratings")
}
