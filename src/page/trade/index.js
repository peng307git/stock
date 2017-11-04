import React, { Component } from 'react'
import {connect} from 'react-redux'
import Trands from './indexconters'
import {real_time_10114,real_time_init,info_injection,info_11002} from '../../redux/module/basis'
import {trade_21030,trade_21030_init,trade_buy,trade_buy_init} from '../../redux/module/trade'


const mapStateToProps = (state, ownProps) =>{
    return{
        real_time_data:state.basis.real_time,
        trade_5_data:state.trade.trede_21030,
        account:state.basis.account,
        buy_init:state.trade.buy_init
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        real_time_ok: (values) => {    //获取紧密的5档实时行情  10114
            dispatch(real_time_10114(values))
                    .then( res => {
                        let data = res.data.bd;
                        if (!data) return alert("没有数据")
                        data = data.split(";");
                        data = data.map((item) => {
                            return item.split("|");
                        });
                        dispatch(real_time_init(data));
                    } )
        },
        trade_5_dang:(values) => {    //获取资金档位
            dispatch(trade_21030(values))
                    .then( res => {
                        let data = res.data.bd
                        data = JSON.parse(data)
                        
                        dispatch(trade_21030_init(data));
                    } )
        },
        home_info :() =>{
            dispatch(info_11002()).then( res => {  //资金信息
               let datas = res.data.bd;
                sessionStorage.setItem("local_account", datas);
                datas = JSON.parse(datas)
                datas = datas.fs[0];
                // console.log("==资金信息==")
                // console.log(datas)
                // console.log("==资金信息==")
                dispatch( info_injection(datas) )
            })
        },
        buy_submit :(values) => {  
            dispatch(trade_buy(values))
                .then( res => {
                    let data = res.data.hd;
                    if(data.rid < 0){
                        console.log(data)
                        alert("交易失败："+data.rmsg)
                    }else{
                        alert("交易成功")
                        window.location.reload();
                    }
                    dispatch(trade_buy_init);
                } )
        }
    }
}


 export default connect(mapStateToProps, mapDispatchToProps)(Trands)

