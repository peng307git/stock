/**
 * 各种排行榜
 * 用户订阅的信息
 * 
 */
import axios_init from '../../conf/http';
import {HTTP_URL,DEFAULT_SESSION_ID,FID_NUM} from '../../conf/index'

//高手收益排行
const RANKING_21020 = 21020
//发起订阅
const SUBSCRIBE_21027 = 21027
//取消订阅
const SUBSCRIBE_21028 = 21028
//获取订阅信息
const SUBSCRIBE_21033 = 21033


//高手收益排行
export const ranking_21020 = (value) => (dispatch) => {
    return axios_init.post(HTTP_URL,{
        hd:{
            pi:RANKING_21020,
            si:DEFAULT_SESSION_ID,
            sq:1
        },
        bd:{
            type:value,
            page:0,
            pecount:100
        }
    })
}
export const ranking_init = (values) =>{
    return {
        type:RANKING_21020,
        payload:values
    }
}

//发起订阅
export const subscribe_21027 = (values) => (dispatch) => {
    return axios_init.post(HTTP_URL,{
        hd:{
            pi:SUBSCRIBE_21027,
            si:DEFAULT_SESSION_ID,
            sq:1
        },
        bd:{
            fid:FID_NUM,
            superiorId:values
        }
    })
}
export const subscribe_21027_init = (values) => {
    return{
        type:SUBSCRIBE_21027,
        payload:values
    }
}

//取消订阅
export const subscribe_21028 = (values) => (dispatch) => {
    return axios_init.post(HTTP_URL,{
        hd:{
            pi:SUBSCRIBE_21028,
            si:DEFAULT_SESSION_ID,
            sq:1
        },
        bd:{
            fid:FID_NUM,
            superiorId:values
        }
    })
}
export const subscribe_21028_init = (values) => {
    return{
        type:SUBSCRIBE_21028,
        payload:values
    }
}

//获取订阅信息
export const subscribe_21033 = () => (dispatch) => {
    return axios_init.post(HTTP_URL,{
        hd:{
            pi:SUBSCRIBE_21033,
            si:DEFAULT_SESSION_ID,
            sq:1
        },
        bd:{
            fid:FID_NUM
        }
    })
}
export const subscribe_21033_init = (values) =>{
    return {
        type:SUBSCRIBE_21033,
        payload:values
    }
}

const info = {
    ranhing_data:[],
    subscribe_027:{},
    subscribe_028:{},
    subscribe_033:{}
}

const reducer = (state = info, action) => {
    switch (action.type) {
        case RANKING_21020:
            return Object.assign({},state,{
                ranhing_data:action.payload
            })
        case SUBSCRIBE_21027:
            return Object.assign({},state,{
                subscribe_027:action.payload
            })
        case SUBSCRIBE_21028:
            return Object.assign({},state,{
                subscribe_028:action.payload
            })
        case SUBSCRIBE_21033:
            return Object.assign({},state,{
                subscribe_033:action.payload
            })
        default:
            return state
    }
}
export default reducer