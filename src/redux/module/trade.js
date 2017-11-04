import axios_init from '../../conf/http';
import {HTTP_URL,DEFAULT_SESSION_ID,FID_NUM} from '../../conf/index'

// 获取资金档位 合约参数值(21030)
const TRADR_HEYUE_21030 = 21030;
// 下单 买入
const TRADE_BUY_12201 = 12201;
// 下单 卖出
const TRADE_SHELL_12201 = 12201;

// 获取资金档位 合约参数值(21030)
export const trade_21030 = (values) => (dispatch) => {
    return axios_init.post(HTTP_URL,{
        hd:{
            "pi":TRADR_HEYUE_21030, 
            "si":DEFAULT_SESSION_ID,
            "sq":1
        },
        bd:{
            ctid:values,
            fid:FID_NUM
        }
    })
}
export const trade_21030_init = (values) => {
    return {
        type:TRADR_HEYUE_21030,
        payload:values
    }
}

// 下单 买入
export const trade_buy = (values) => (dispatch) => {
    console.log("买入传参===")
    console.log(values);
    console.log("买入传参===")
    return axios_init.post(HTTP_URL,{
        hd:{
            "pi":TRADE_BUY_12201, 
            "si":DEFAULT_SESSION_ID,
            "sq":1
        },
        bd:{
            fid:FID_NUM,
            ctid:values.ctid,
            "hdorid":-1,
            "ortype":2,//委托类型,必填字段,int类型
            "ocflag":1,//建平标志,必填字段,int类型
            "bsflag":1,//买卖标志,必填字段,int类型
            "lttype":0,//交易类型限制,必填字段,int类型
            "orprice":values.orprice, // 昨日结算价*1.1 委托价格,必填字段,double类型
            "mtprice":values.mtprice, // 昨日结算价*1.1 委托价格,必填字段,double类型
            "qty":values.qty,//数量,必填字段,double类型
            "rnno":-1,//关联单号,选填字段,允许为空,string类型
            "rttime":values.rttime,//请求时间,必填字段,string类型
            "slprice":values.slprice,  // 止损率  传小数，除以100
            "spprice":values.spprice,   //止盈率 传小数，除以100
            "point":0,
            "bhqty":0,
            "orderType":1,
            "margin":values.margin // 交易保证金
        }
    })
}
export const trade_buy_init = (values) => {
    return{
        type:TRADE_BUY_12201,
        payload:values
    }
}

// 下单 卖出
export const trade_shell = (values) => (dispatch) => {
    return axios_init.post(HTTP_URL,{
        hd:{
            "pi":TRADE_SHELL_12201, 
            "si":DEFAULT_SESSION_ID,
            "sq":1
        },
        bd:{
            fid:FID_NUM,//交易商id,必填字段,int类型
            ctid:values.ctid,//商品id,必填字段,int类型
            "hdorid":values.hdorid,// 持仓单号
            "ortype":2,//委托类型,必填字段,int类型
            "ocflag":2,//建平标志,必填字段,int类型
            "bsflag":2,//买卖标志,必填字段,int类型
            "lttype":0,//交易类型限制,必填字段,int类型
            "orprice":values.orprice,//委托价格,  昨日结算价*0.9必填字段,double类型
            "mtprice":values.mtprice, //和上面一样
            "personid":values.personid,
            "qty":values.qty,//数量,必填字段,double类型
            "rnno":-1,//关联单号,选填字段,允许为空,string类型
            "rttime":values.rttime,//请求时间,必填字段,string类型
            "slprice":0,
            "spprice":0,
            "point":0,
            "bhqty":0,
            "orderType":1,
            "margin":1000
        }
    })
}
export const trade_shell_init = (values) => {
    return{
        type:TRADE_SHELL_12201,
        payload:values
    }
}



const Trade = {
    trede_21030:{},
    buy_init:{},
    shell_init:{}
}

const reducer = (state = Trade, action) => {
    switch (action.type){
        case TRADR_HEYUE_21030:
            return Object.assign({},state,{
                trede_21030:action.payload
            })
        case TRADE_BUY_12201:
            return Object.assign({},state,{
                buy_init:action.payload
            })
        case TRADE_BUY_12201:
            return Object.assign({},state,{
                shell_init:action.payload
            })
        default:
        return state;
    }
}

//当前时间
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// 匹配
String.prototype.startWith=function(str){     
    var reg=new RegExp("^"+str);     
    return reg.test(this);        
  }  

export default reducer;

