import React from 'react';
import './index.less';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import  Modal  from '../modal/modal'
import {URL_PATH} from '../../../conf/index'
import {  trade_shell_init, trade_shell } from '../../../redux/module/trade'

const Big = require('big.js');

class TradeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            holdList:[],
            subclick:false,
            subclick_1:false,
            data:{}
        }
        this.trShowHide = this.trShowHide.bind(this);
        this.shell_submit = this.shell_submit.bind(this);
        this.shell_submit_1 = this.shell_submit_1.bind(this);
        this.close = this.close.bind(this)
        this.ok_submit = this.ok_submit.bind(this)
        this.ok_submit_1 = this.ok_submit_1.bind(this)
    }

    componentDidMount  () {
        let {hold} = this.props;
        let {holdList} = this.state;
        holdList = hold;
        this.setState({holdList});
    }
    

    trShowHide(e){
       let {hold} = this.props;
       let {holdList} = this.state;
       holdList = hold;
        for(let i=0; i<holdList.length; i++){
            holdList[i].tr_show = false;
        }
        holdList[e].tr_show = !holdList[e].tr_show;
        this.setState({holdList})
    }

    shell_submit (e){
        Big.RM = 0;
        let { data,subclick }= this.state; //卖出传参数
        data.rttime = new Date();
        data.personid = parseInt(e.currentTarget.getAttribute('data-persionid')) ; //data-persionId 
        data.ctid = parseInt(e.currentTarget.getAttribute('data-id')) ; //ctid:values.ctid,//商品id,必填字段,int类型
        data.hdorid = parseInt( e.currentTarget.getAttribute('data-hdorid') ) ;// 持仓单号
        data.qty = parseInt( e.currentTarget.getAttribute('data-newqty') ) ;//qty,//数量
        data.rttime = data.rttime.Format("yyyy-MM-dd hh:mm:ss"); //rttime,//请求时间,必填字段,string类型
        let qty = new Big( e.currentTarget.getAttribute('data-hdprice') ) ;//orprice,//委托价格,  昨日结算价*0.9必填字段,double类型
        data.orprice = parseFloat( qty.times(0.8).toFixed() ) ; //orprice,//委托价格,  昨日结算价*0.9必填字段,double类型
        data.mtprice = data.orprice;//mtprice, //和上面一样
        data.name = e.currentTarget.getAttribute('data-name');//
        data.title = "卖出确认";
        data.action=null;
        
        this.setState({subclick:!subclick})
        this.setState({data})
        
    }
    shell_submit_1 (e){
        let {subclick_1,data} = this.state; 
        data.orprice = "9.80"
        data.action = "是否提交递延申请？" 
        data.title = "申请递延";
        this.setState({subclick_1:!subclick_1})
    }

    close(subclick){
        setTimeout(()=>{ 
            this.setState({subclick:subclick,subclick_1:subclick})
        },0)
    }
    ok_submit (){
        let { data,subclick }= this.state; //卖出传参数
        this.props.shell_ok(data);
        this.setState({subclick:!subclick})
    }
    ok_submit_1 (){
        let { subclick_1 }= this.state; //卖出传参数
        alert("交易失败，系统繁忙！")
        this.setState({subclick_1:!subclick_1})
    }
    
    render() {
            let tbody = null;
            let { holdList ,subclick,subclick_1} = this.state;
            let hold = this.props.hold;
            holdList = hold;
            if(!holdList) return false;
            if(holdList.length < 1 ){
                tbody = <div className="nobody">
                            <img src={require('../../img/gouwu.png')} />
                        </div>
            }
            else{
                tbody = holdList.map( (item,i) =>{
                    return(
                        <div key={i}>
                            <div onClick = {()  => {this.trShowHide(i)} } className={`tr tr_${i}` } >
                                <div className="td">
                                    <div>{item.name}</div>  {/* 用ctid 去全部股票信息里面找 */}
                                    <div>{item.total_price}</div>  {/* 推送的最新价 * 持有数量qty */}
                                </div>
                                <div className="td">
                                    <div>{item.new_price}</div>  { /* 现价 推送的最新价 */}
                                    <div>{item.opprice}</div> {/* 成本价 opprice */}
                                </div>
                                <div className="td">
                                    <div>{item.qty}股</div>{/*  qty */}
                                    <div>{item.new_qty}股</div> {/* 可用量 qty - fzqty */}
                                </div>
                                <div className="td">
                                    <div className={ item.profit_num>0 ? 'redcolor' : 'greencolor' }>
                                        {item.profit_num > 0 ? '+' + item.profit_num : item.profit_num}
                                    </div>
                                    <div className={ item.profit_bili>0 ? 'redcolor' : 'greencolor' }>
                                        {item.profit_bili > 0 ? '+' + item.profit_bili : item.profit_bili}%
                                        
                                    </div>
                                </div>
                            </div>
                            { item.tr_show ? (
                                <div  className={`tr_x tr_${i}` }>
                                    <Link to={`${URL_PATH}/trade`} className="td">
                                    <img src={require('../../img/home_buy.png')} />买入</Link>
                                    <Link 
                                        data-name = {item.name}
                                        data-persionid = {item.persionId}
                                        data-hdprice = {item.hdprice}
                                        data-newqty = {item.new_qty}
                                        data-hdorid = {item.hdorid}
                                        data-id={item.ctid} 
                                        onClick={this.shell_submit} 
                                        className="td"> 
                                        <img src={require('../../img/home_shell.png')} 
                                        />卖出</Link>
                                    <Link 
                                        data-name = {item.name}
                                        onClick={this.shell_submit_1}
                                        className="td"> 
                                        <img src={require('../../img/home_hang.png')} 
                                        />申请递延</Link>
                                </div>
                            ):(
                                <div></div>
                            )
                            }
                        </div>
                    )
                } )
            }
       return (
           <div className="tradelist_main">
               <div className="head">
                   <div>市值</div>
                   <div>现价/成本</div>
                   <div>持有/可用</div>
                   <div>参考盈亏</div>
               </div>
               <div className="body">
                   {tbody}
               </div>
               { subclick ? (
                <Modal data = {this.state.data} close={this.close} ok_submit={this.ok_submit}/>
                ) : ""
                }
                { subclick_1 ? (
                <Modal data = {this.state.data} close={this.close} ok_submit={this.ok_submit_1}/>
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
          shell_ok : (values)  => {
            dispatch(trade_shell(values))
            .then( res => {
                let data = res.data.hd;
                if(data.rid < 0){
                    console.log(data)
                    alert("交易失败："+data.rmsg)
                }else{
                    alert("交易成功")
                    window.location.reload();
                }
                dispatch( trade_shell_init(res.data) )
            } )
          }
      }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(TradeList)