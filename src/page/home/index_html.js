import React from 'react';
import { Link } from 'react-router';
import Info from '../common/info';
import TradeList from '../common/tradeList';
import Header from '../common/header/header';
import { URL_PATH ,WEBSOCKED_URL} from '../../conf';
import './index.less';
import Loading from '../common/loading/loading'
const Big = require('big.js');

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.fromdata = this.fromdata.bind(this);
    this.hold_fun = this.hold_fun.bind(this);
    this.header_shuaxin = this.header_shuaxin.bind(this);
  } 
  componentDidMount () {
      let local_stock = sessionStorage.getItem("local_stock");
       if(!local_stock){
        this.props.position();  //持仓单信息
        this.props.home_info();  //资金信息
        this.props.all_stock(); //全部股票数据
       }
      this.props.real_time_ok( this.hold_fun() ); // 请求实时行情数据
  }

  header_shuaxin (){   //刷新的回掉函数
    console.log("首页刷新了！");
    this.props.all_stock();//全部股票数据
    this.props.real_time_ok( this.hold_fun() ); // 请求实时行情数据
    
  }



  hold_fun(){  //持仓列表 返回合约id
    let local_hold = sessionStorage.getItem("local_hold"); 
    let datas = [];
    if( local_hold ){
      local_hold = JSON.parse(local_hold).hr;
      datas = local_hold.map( (item,i) => {
        return item.ctid
      } )
    }
    return datas;
  }


  fromdata (){  //  持仓行情列表最终数据   资金信息数据
    Big.RM = 0;
    let {real_time_data} = this.props;//实时行情
    let {hold} = this.state; //持仓数据
    let local_hold = sessionStorage.getItem("local_hold"); //持仓数据
    let stock =  sessionStorage.getItem("local_stock"); //全部股票信息
    let account = sessionStorage.getItem("local_account"); //资产信息
    let fromdata = {};
    let newjiage = 0;
    let zong = 0;
    let newzong = 0;
    let shizhi = 0;
    let keyongzhichan = 0;
    if(local_hold && stock && account ){
        stock = JSON.parse(stock).ct;
        local_hold = JSON.parse(local_hold).hr;
        account = JSON.parse(account).fs[0];
    }
    else{
        stock = this.props.all_stock_data.ct;
        local_hold = this.props.hold.hr;
        account = this.props.account;
        console.log("没有缓存了！");
    }
    if( !local_hold || !stock || !account ) return false;
        hold = local_hold.map( (item) => {
            for( let i=0; i<real_time_data.length; i++ ){
                if( item.ctid == real_time_data[i][0] ){ // 获取最新价
                  newjiage = real_time_data[i][6]; // 获取最新价  new_price
                }
            };
            for(let i=0; i<stock.length; i++){  //名称
                if( item.ctid == stock[i].id ){
                    item.name = stock[i].name;
                }
            };
            item.new_price = new Big(newjiage);
            item.qty = new Big(item.qty);      //持仓数量   qty
            item.fzqty = new Big(item.fzqty);  //冻结数量   fzqty
            item.opprice = new Big(item.opprice)  //建仓价 opprice
            item.hdprice = new Big(item.hdprice) //持仓价 昨日收盘价
            let chajia = item.new_price.minus(item.opprice).toFixed() // 差价
            chajia = new Big(chajia);
            item.total_price = item.new_price.times(item.qty).toFixed()  //市值   total_price
            item.new_qty = item.qty.minus(item.fzqty).toFixed();   //可用量        new_qty
            item.profit_num = chajia.times(item.qty).toFixed(2);   /* 盈亏价    profit_num （ 推送的最新价 - opprice）* qty   */
            item.profit_bili = chajia.div(item.opprice).times(100).toFixed(2);  /*  盈亏比没有 （ 推送的最新价 - opprice）/ opprice   */
            let chajia_2 = item.new_price.minus(item.hdprice).toFixed(); //最新价 - 昨日收盘价
            chajia_2 = new Big(chajia_2);
            newzong += parseFloat(chajia_2.times(item.qty).toFixed()); //  当日盈亏
            zong += parseFloat(item.profit_num);                    //总盈亏
            shizhi += parseFloat ( item.total_price );              //持有市值              当前市值相加
           

            item.new_price = item.new_price.toFixed();
            item.hdprice = item.hdprice.toFixed();
            item.qty = item.qty.toFixed();     //持仓数量   qty
            item.fzqty = item.fzqty.toFixed();  //冻结数量   fzqty
            item.opprice = item.opprice.toFixed(); //建仓价 opprice
            return item;
        } );
        shizhi = new Big(shizhi);
        keyongzhichan = new Big(keyongzhichan);
        account.zong = zong.toFixed(2);     //总盈亏
        account.newzong = newzong.toFixed(2);//  当日盈亏
        account.shizhi = shizhi.toFixed(2);//  持有市值
        account.keyongzhichan = account.fmg;//可用资金 
        account.total_mony = shizhi.plus(keyongzhichan).toFixed(2);//总资金 
        //  总资产 - 可用资金 - （建仓价*数量）/ 总资产 - 可用资金 - （建仓价*数量）
    fromdata.hold = hold;
    fromdata.account = account;
    return fromdata;
  }

  render() {
    let account = this.fromdata().account;
    let hold = this.fromdata().hold;
    return (
          <div>
            <Header header_shuaxin={this.header_shuaxin} path={URL_PATH} />
             {account && hold ? (
                <div className="App" >
                  <Info infos={account} />
                  <div className="linkto">
                    <div className="trade">
                      <Link to={`${URL_PATH}/trade`}> <img src={require('../img/jiaoyi_1.png')} /> </Link>
                      <div>交易</div>
                    </div>
                    <div className="weituo">
                      <Link to={`${URL_PATH}/list`}> <img src={require('../img/trade_1.png')} /> </Link>
                      <div>今日委托</div>
                    </div>
                    <div className="zuizhong">
                      <Link to={`${URL_PATH}/track`}> <img src={require('../img/zui.png')} /> </Link>
                      <div>高手追踪</div>
                    </div>
                    <div className="gengduo">
                      <Link to={`${URL_PATH}/next`}> <img src={require('../img/next.png')} /> </Link>
                      <div>更多</div>
                    </div>
                  </div>
                  <TradeList hold={hold} />
                </div>
             ):(
                <Loading/>
             )
            }
            
          </div>
      

    )
  }
}

export default Home;