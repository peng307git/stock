/**
 * 基础数据，放在缓存里面
 * 
 */
import axios_init from '../../conf/http';
import {HTTP_URL,DEFAULT_SESSION_ID,FID_NUM} from '../../conf/index'

//全部股票信息
const ALL_STOCKS_11029 = 11029;
// 资金信息接口pi 
const INFO_11002 = 21002;  // 模拟盘 21002  实盘 11002
//获取持仓单信息
const POSITION_11006 = 11006;   //模拟盘21006  实际11006
//获取委托单信息
const COMMISSIONED_11004 = 11004;
//心跳请求
const WEBSTOKET_TIMER = 3101;
//获取紧密的实时行情含五档(10114)(免登录)
const REAL_TIME_QUOTES = 10114 


//全部股票信息
export const all_stock_11029 = () =>  (dispatch) => {
    return axios_init.post(HTTP_URL,{ 
            "hd": {
                "pi": ALL_STOCKS_11029,
                "si": DEFAULT_SESSION_ID,
                "sq": 1
            }
        });
}

export const all_stock_injection = (values) => {
    return{
        type:ALL_STOCKS_11029,
        payload:values
    }
}

//资金
export const info_11002 = () => (dispatch) => {
    return axios_init.post(HTTP_URL,{ 
                "hd": {
                    "pi": INFO_11002,
                    "si": DEFAULT_SESSION_ID,
                    "sq": 1
                },
                "bd":{
                    "fid": FID_NUM
                }
            });
}

export const info_injection = (values) => {
    return{
        type:INFO_11002,
        payload:values
    }
}

//获取持仓单信息
export const position_11006 = () => (dispatch) => {
    return axios_init.post(HTTP_URL,{ 
                "hd": {
                    "pi": POSITION_11006,
                    "si": DEFAULT_SESSION_ID,
                    "sq": 1
                },
                "bd":{
                    "fid": FID_NUM
                }
            });
}

export const position_injection = (values) => {
    return{
        type:POSITION_11006,
        payload:values
    }
}

//获取委托单信息
export const commissioned_11004 = () => (dispatch) => {
    return axios_init.post(HTTP_URL,{ 
                "hd": {
                    "pi": COMMISSIONED_11004,
                    "si": DEFAULT_SESSION_ID,
                    "sq": 1
                },
                "bd":{
                    "fid": FID_NUM
                }
            });
}

export const commissioned_injection = (values) => {
    return{
        type:COMMISSIONED_11004,
        payload:values
    }
}

//心跳请求
export const webstoket_timer = () =>  (dispatch) => {
    return axios_init.post(HTTP_URL,{ 
            "hd": {
                "pi": WEBSTOKET_TIMER,
                "si": DEFAULT_SESSION_ID,
                "sq": 1
            }
        });
}

export const webstoket_timer_init = (values) => {
    return{
        type:WEBSTOKET_TIMER,
        payload:values
    }
}

//获取紧密的实时行情含五档(10114)(免登录)
export const real_time_10114 = (values) => (dispatch) => {
    return axios_init.post(HTTP_URL,{ 
        "hd": {
            "pi": REAL_TIME_QUOTES,
            "si": DEFAULT_SESSION_ID,
            "sq": 1
        },
        bd:{
            id:values
        }
    });
}
export const real_time_init = (values) => {
    return{
        type:REAL_TIME_QUOTES,
        payload:values
    }
}


//传递 reducer 数据
const Info = {
    all_stock:{}, 
    hold:{},
    account:{},
    commissioned:{},
    webstoket_data:{},
    real_time:{}
}

const reducer = (state = Info, action) => {
    switch (action.type){
        case ALL_STOCKS_11029:
            return Object.assign({},state,{
                all_stock:action.payload
            })
        case INFO_11002:
            return Object.assign({},state,{
                account:action.payload
            })
        case POSITION_11006:
            return Object.assign({},state,{
                hold:action.payload
            })
        case COMMISSIONED_11004:
            return Object.assign({},state,{
                commissioned:action.payload
            })
        case WEBSTOKET_TIMER:
            return Object.assign({},state,{
                webstoket_data:action.payload
            })
        case REAL_TIME_QUOTES:
            return Object.assign({},state,{
                real_time:action.payload
            })
        default:
        return state;
    }
}

export default reducer;