import React from 'react'
import {connect} from 'react-redux'
import Home from './index_html'
import { 
    position_11006,position_injection,
    all_stock_11029,all_stock_injection,
    info_injection,info_11002,
    real_time_10114,real_time_init
} from '../../redux/module/basis'
import { webstocket_init } from "../../redux/module/trade"



const mapStateToProps = (state, ownProps) =>{
  return{
      account:state.basis.account,//资金信息
      hold:state.basis.hold,  //获取持仓单信息
      real_time_data:state.basis.real_time, //获取紧密的实时行情含五档(10114)(免登录)
      all_stock_data:state.basis.all_stock, //全部股票信息
  }
   
}
const mapDispatchToProps = (dispatch) =>{
    return{
        real_time_ok: (values) => {    //获取紧密的5档实时行情  10114
            dispatch(real_time_10114(values))
                    .then( res => {
                        let data = res.data.bd;
                        data = data.split(";");
                        data = data.map((item) => {
                            return item.split("|");
                        });
                        dispatch(real_time_init(data));
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
        all_stock : () => {    //全部股票数据
                    dispatch(all_stock_11029()).then( res => {
                    let datas = res.data.bd
                    sessionStorage.setItem("local_stock", datas);
                    datas = JSON.parse(datas)
                    // console.log("==全部股票数据==")
                    // console.log(datas)
                    // console.log("==全部股票数据==")
                    dispatch( all_stock_injection(datas) )
                })
        },
        position : () => {      //持仓单信息
            dispatch(position_11006()).then( res => {
                let datas = res.data.bd;
                sessionStorage.setItem("local_hold", datas);
                datas = JSON.parse(datas)
                // console.log("==持仓单信息==")
                // console.log(datas)
                // console.log("==持仓单信息==")
                dispatch( position_injection(datas) )
            })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);