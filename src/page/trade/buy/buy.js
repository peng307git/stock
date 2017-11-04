import React from 'react';
import { Link } from 'react-router'
import Trademodu from '../../common/trademodu';
import './buy.less'
import Header from '../../common/header/header'
import Modal from '../../common/modal/modal'
import { URL_PATH } from '../../../conf'
import { connect } from 'react-redux';
import {trade_12201,trade_12201_init,Format} from '../../../redux/module/trade'


class Buy extends React.Component {
    constructor(props){
        super(props)
       this.state = {
            types:"buy",
            modaltitle:"委托买入确认",
            total:99999,  //用户总资产,
            buy_num:"",
            buy_mony:"",
            buy_name:"",
            buy_id:"",
            subclick:false
       }
       this.submits = this.submits.bind(this)
       this.jisuan = this.jisuan.bind(this)
       this.chuanzhi = this.chuanzhi.bind(this)
       this.close = this.close.bind(this)
       this.ok_submit = this.ok_submit.bind(this)
    }
    jisuan(shellTotal,ival){
        let {total} = this.state;
        shellTotal = (total/ival).toFixed(0);
        return shellTotal;
    }
    chuanzhi(buy_num,buy_mony,buy_name,buy_id){
        setTimeout(()=>{   
            this.setState({
                buy_num:buy_num,
                buy_mony:buy_mony,
                buy_name:buy_name,
                buy_id:buy_id
            });
        }, 0);
    }
    submits (){
        let {buy_num,buy_mony,buy_name,buy_id,subclick} = this.state
        if( buy_num != "" && buy_mony != "" && buy_name != ""){
            subclick = true;
            setTimeout(()=>{ 
                this.setState({subclick})
            },0)
        }
    }
    close(subclick){
        setTimeout(()=>{ 
            this.setState({subclick:subclick})
        },0)
    }
    ok_submit (data){
        this.props.trades(data);
    }
    
    render() {
        let {submits,chuanzhi} = this;
        return (
            <div>
                <Header path={URL_PATH}/>
                <div className = "App">
                    <div className="buy_reade_main reade_main">
                        <div className="head">
                        <Link to={`${URL_PATH}/trade/buy`} className="btn buy">买入</Link>
                        <Link to={`${URL_PATH}/trade/shell`} className="btn shell"> 卖出 </Link>
                        </div>
                        <div className="buy_module">
                            <Trademodu 
                                {...this.state}
                                jisuan = {this.jisuan}
                                chuanzhi = {this.chuanzhi}
                                />
                            <div onClick = {submits} className="submit"> 买入 </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.subclick ? (
                        <Modal {...this.state} close={this.close} ok_submit={this.ok_submit}/>
                     ) : ""
                }
            </div>
            
            
        );
    }
}

const mapStateToProps = (state, ownProps) =>{
    return{
    }
     
  }
  const mapDispatchToProps = (dispatch) =>{
    
     return{
         trades:(values) => {
            let hdorid = "",
                rttime = new Date(),
                fid = 22;
                rttime = rttime.Format("yyyy-MM-dd hh:mm:ss")
            let ctid = values.buy_id;
            let orqty = parseFloat(values.buy_num);
            dispatch(trade_12201({
                fid:fid,
                ctid:ctid,
                ocflag:1,
                bsflag:1,
                orprice:values.buy_mony,
                qty:orqty,
                hdorid:hdorid,
                rttime:rttime
            })).then( res => {
                console.log(res.data)
                    dispatch(trade_12201_init(res.data))
            })
        }
      
     }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Buy);