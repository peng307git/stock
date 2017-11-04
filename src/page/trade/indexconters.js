import React, { Component }from 'react'
import Header from '../common/header/header'
import { URL_PATH } from '../../conf/index'
import './index.less'
import Loading from '../common/loading/loading'
const Big = require('big.js');


class Trands extends Component {
    constructor(props) {
        super(props)
        this.state={
            nameval:"", //公司名称
            trade_5:{}, //资金档位
            all_stock:[], //全部股票信息
            datas:[],  //当前查找的股票信息
            buy_data:{
                new_mony:0,  //当前价格
                name:"",   //当前股票名称
                symbol:"", //当前股票代码
                id:"",      //当前股票资金id
                pricerank:"", //资金档位
                maxLever:1,  //资金最大倍数
                lever:0,      //当前资金倍数
                shizhi:0, //市值
                stock_num:0, //可买股票数
                shizhi_1:0, //实际下单的资金数 = 买的股票数*当前价
                alr_val_1:"1.00", //止盈
                alr_val_2:"1.00", //止损
                max_val_2:"",  //最大止损
                oc_t1:"",  //建仓手续费
                bd_t1:"", // 递延费
                yes_mony:"", //实际支付价钱
                fmg:""// 当前余额
            }
        }
        this.header_shuaxin = this.header_shuaxin.bind(this);
        this.inpchange_name = this.inpchange_name.bind(this); //公司名称
        this.inputNameClick = this.inputNameClick.bind(this); //点击选择股票
        this.trade_html_5 = this.trade_html_5.bind(this); //获取资金档位
        this.click_trade_5 = this.click_trade_5.bind(this); //选择资金档位
        this.max_lever_click = this.max_lever_click.bind(this)  // 加资金倍数
        this.min_lever_click = this.min_lever_click.bind(this)  //减资金倍数
        this.jisuan = this.jisuan.bind(this)                    // 计算可买股票数，市值
        this.zhiyingChange = this.zhiyingChange.bind(this)      //止盈 change事件
        this.zhishunChange = this.zhishunChange.bind(this)       //止损 change事件
        this.zhiyingClick_1 = this.zhiyingClick_1.bind(this)   //止盈  点击加
        this.zhiyingClick_2 = this.zhiyingClick_2.bind(this)    //止盈  点击减
        this.zhishunClick_1 = this.zhishunClick_1.bind(this)    //止损  点击加
        this.zhishunClick_2 = this.zhishunClick_2.bind(this)    //止损  点击减
        this.subMit = this.subMit.bind(this)  // 点击下单
       

    }
    componentDidMount() {
        let stock =  sessionStorage.getItem("local_stock"); //全部股票信息
        let {all_stock} = this.state;
        this.props.home_info();  //获取资金信息
        if(stock){
            all_stock = JSON.parse(stock).ct;
        }
        this.setState({all_stock});
        
    }
    inpchange_name(ev){   ///公司名称
        let ev_val = ev.target.value;
        let {datas,all_stock,buy_data} = this.state;
        console.log( ev_val);
        if (ev_val == "" || ev_val == null ) {   
            datas = [];
            buy_data = {};
        }else{
            datas = all_stock.filter(el => {
                let val = String(el.symbol);
                 let name = el.name;
                 if( val.indexOf(ev_val) != -1 || name.indexOf(ev_val) != -1 ){
                    return true;
                } 
                // if(val.startWith(ev_val) || name.startWith(ev_val)){
                //     return true;
                // }       
            })
            datas = datas.splice(0,20);
        }
        setTimeout(()=>{   
            this.setState({nameval:ev_val,datas,buy_data});
        }, 0); 
        
    }
    inputNameClick (e){   // 点击选择股票
        let { nameval,buy_data,datas } = this.state;
        buy_data.name = e.currentTarget.getAttribute('data-name');      //股票名称
        buy_data.symbol = e.currentTarget.getAttribute('data-symbol');   //股票代码
        buy_data.id = e.currentTarget.getAttribute('data-id');            //股票资金ID
        nameval = buy_data.name + "(" + buy_data.symbol + ")";
        this.shihangqing([buy_data.id]);         //获取实时行情 当前价格
        this.trade_html_5(buy_data.id);         //获取资金档位
        datas = [];
        this.setState({nameval,buy_data,datas});
        
        
        
    }
    trade_html_5 (value){   //获取资金档位    资金最大倍数 初始 市值 当前默认止损 延期费  交易手续费率
        this.props.trade_5_dang(value)  //获取资金档位
        let {buy_data} = this.state;
        let {trade_5} = this.props;
        let arrays = [];
        setTimeout(() => {      //延时促发，要不props还没有更新
            let trade_5_data =  this.props.trade_5_data.mr;
            if(!trade_5_data[0]) return alert("没有数据")
            trade_5 = trade_5_data[0];
            trade_5.pricerank = JSON.parse(trade_5.pricerank)   //信用金档位
            for (let key in trade_5.pricerank) {
                    let element = trade_5.pricerank[key];
                    arrays.push(element);
            }
            trade_5.pricerank = arrays;
            buy_data.pricerank = trade_5.pricerank[0];//信用金初始档位
            buy_data.maxLever = trade_5.maxLever  //资金最大倍数
            buy_data.lever = trade_5.maxLever //默认资金最大倍数
            buy_data.shizhi = buy_data.pricerank  // 初始 市值
            buy_data.max_val_2 = trade_5.slrate;  // 最大止损
            buy_data.alr_val_2 = (parseFloat(trade_5.slrate )*100).toFixed(2);    // 当前默认止损
            buy_data.fc_t1 = trade_5.oc_t1;  //交易手续费率
            buy_data.bd_t1_1 = trade_5.bd_t1;// 延期费 = 实际下单的资金数*延期费率
            buy_data.ost = trade_5.ost  //印花税率
             this.setState({trade_5,buy_data})
        }, 500);   
    }
    click_trade_5 (e){ //选择资金档位
        let {buy_data} = this.state;
        buy_data.pricerank = e.currentTarget.getAttribute('data-pricerank'); 
        this.setState({buy_data})
    }
    shihangqing (value){  //获取实时行情 当前价格
        let {buy_data} = this.state;
        this.props.real_time_ok( value ); // 请求实时行情数据 
        setTimeout(() => {              //延时促发，要不props还没有更新
            let real_time_data =  this.props.real_time_data;
            if(!real_time_data[0]) return alert("没有数据")
            buy_data.new_mony = real_time_data[0][6]; // 获取最新价  new_price
            buy_data.jiesuan = real_time_data[0][1] //昨日结算价
            buy_data.stock_num = 0//初始买的股票数 总资金数/当前价 取1百的整数倍 
            this.setState({buy_data})
        }, 500);
        
    }
    header_shuaxin(){  //刷新
        window.location.reload();
    }
    min_lever_click(){  //减资金倍数
        let {buy_data} = this.state;
        if(buy_data.lever > 0 ){
            buy_data.lever--;
            this.setState({buy_data})
        }
    }
    max_lever_click(){  //加资金倍数
        let {buy_data} = this.state;
        if(buy_data.lever < buy_data.maxLever ){
            buy_data.lever++;
            this.setState({buy_data})
        }
    }
    jisuan (){   // 计算可买股票数，市值,实际下单资金数，买的股票数，交易手续费，延期手续费
        Big.RM = 0;
        let {buy_data} = this.state;
        if(buy_data.pricerank) {
            let lever = new Big(buy_data.lever)  //选择倍数
            let pricerank = new Big(buy_data.pricerank) // 资金档位数
            let new_mony = new Big(buy_data.new_mony)  //当前价
            buy_data.shizhi =  pricerank.times(lever).toFixed(); //  总资金
            let shizhi = new Big(buy_data.shizhi) //  总资金
            let stock_num = shizhi.div(new_mony).toFixed(0) ; //买的股票数 = 总资金数/当前价 取1百的整数倍
            let num = new Big(stock_num);
            let stock_1 = parseInt(num.div(100))*100; //num.div(100).times(100).toFixed(); //买的股票数parseInt（总资金数/当前价/100）*100
            let num_1 = new Big(stock_1);//买的股票数
            buy_data.stock_num = stock_1;  //买的股票数
            buy_data.shizhi_1  =  num_1.times(new_mony).toFixed();     //实际下单的资金数 = 买的股票数*当前价

            //交易手续费率
            let oc_t1 = new Big(buy_data.fc_t1); //交易手续费率
            let shizhi_1 = new Big(buy_data.shizhi_1);   //实际下单的资金数
            buy_data.oc_t1 = shizhi_1.times(oc_t1).toFixed();  //交易手续费 =  实际下单的资金数*交易手续费率
            buy_data.oc_t1 = parseFloat(buy_data.oc_t1).toFixed(2);  //手续费4舍5入
            // 延期费率
            let bd_t1 = new Big(buy_data.bd_t1_1);      //延期费率
            buy_data.bd_t1 =  shizhi_1.times(bd_t1).toFixed();  // 延期费 = 实际下单的资金数*延期费率
            buy_data.bd_t1 = parseFloat(buy_data.bd_t1).toFixed(2);  //延期费4舍5入
            // 实际支付
            let ost = new Big(buy_data.ost) //印花税率
            let aost = shizhi_1.times(ost).toFixed();  // 印花税
            let shouxufei = new Big(buy_data.oc_t1) //手续费
            if( stock_1 >= 100 ){
                let yes_mony = pricerank.plus(shouxufei).plus(aost).toFixed(); // 实际支付 =选中的信用金 + 印花税+交易手续费
                buy_data.yes_mony = parseFloat(yes_mony).toFixed(2);  //实际支付4舍5入
            }
            else{
                buy_data.yes_mony = 0;
            }
        }
    }
    zhiyingChange (e){  // //止盈 change事件
        let {buy_data} = this.state;
        buy_data.alr_val_1 = e.target.value;
        if( buy_data.alr_val_1 <= 800 && buy_data.alr_val_1 >= 1 ){
            this.setState({buy_data})
        }
    }
    zhishunChange (e){    //止损 change事件
        let {buy_data} = this.state;
        let max_val_2 = parseFloat(buy_data.max_val_2) * 100;
        buy_data.alr_val_2 = e.target.value;
        if( buy_data.alr_val_2 >= 0 && buy_data.alr_val_2 < max_val_2 ){
            this.setState({buy_data})
        }
        
    }
    zhiyingClick_1 (){    //止盈  点击加
        let {buy_data} = this.state;
        let alr_val_1 = parseFloat(buy_data.alr_val_1)
        if( alr_val_1 < 800){
            alr_val_1 += 1;
            buy_data.alr_val_1 = alr_val_1.toFixed(2);
            this.setState({buy_data})
        }
    }   
    zhiyingClick_2 (){    //止盈  点击减
        let {buy_data} = this.state;
        let alr_val_1 = parseFloat(buy_data.alr_val_1)
        if( alr_val_1 > 1){
            alr_val_1 -= 1;
            buy_data.alr_val_1 = alr_val_1.toFixed(2);
            this.setState({buy_data})
        }
    } 
    zhishunClick_1 (){    //止损  点击加
        let {buy_data} = this.state;
        let alr_val_1 = parseFloat(buy_data.alr_val_2)
        let max_val_2 = parseFloat(buy_data.max_val_2) * 100;
        if( alr_val_1 < max_val_2 ){
            alr_val_1 += 1;
            buy_data.alr_val_2 = alr_val_1.toFixed(2);
            this.setState({buy_data})
        }
    }
    zhishunClick_2 (){    //止损  点击减
        let {buy_data} = this.state;
        let alr_val_1 = parseFloat(buy_data.alr_val_2)
        if( alr_val_1 > 0 ){
            alr_val_1 -= 1;
            buy_data.alr_val_2 = alr_val_1.toFixed(2);
            this.setState({buy_data})
        }
    }
    subMit () {  //点击下单
        Big.RM = 0;
        let {buy_data} = this.state;
        let data = {}; // 请求参数
        let alr_val_1 = new Big(buy_data.alr_val_1);
        let alr_val_2 = new Big(buy_data.alr_val_2);
        let jiesuan = new Big(buy_data.jiesuan); //昨日结算价
        let rttime = new Date();
        
        data.margin = parseInt(buy_data.pricerank); // margin // 交易保证金
        data.ctid = parseInt( buy_data.id ) // ctid 资金id
        data.qty = buy_data.stock_num    //  qty     //数量,
        data.spprice = parseFloat( alr_val_1.div(100).toFixed() )  // spprice,   止盈率 
        data.slprice = parseFloat( alr_val_2.div(100).toFixed() )    //  slprice,  // 止损率
        data.rttime = rttime.Format("yyyy-MM-dd hh:mm:ss") ;    // rttime,//请求时间,必填字段,string类型
        data.orprice = parseFloat( jiesuan.times(1.1).toFixed() );// orprice 昨日结算价*1.1
        data.mtprice = data.orprice;  // mtprice  昨日结算价*1.1
        
        this.props.buy_submit(data); // 发送请求
        
    }

    render() {
        
        let {buy_data,trade_5} = this.state;
        this.jisuan();
        let fmg = parseFloat(this.props.account.fmg); // 账户余额
        let yes_mony = parseFloat(buy_data.yes_mony); //支付金额
        if( isNaN(yes_mony) ){
            yes_mony = 0;
        }
        return (
            <div className="buy_main">
                <Header header_shuaxin={this.header_shuaxin}  path={URL_PATH} />
                <section className="App">
                    <header className="buy_top_name">  {/* 名称选择 及价格 */}
                        <div className="item item_1">
                           <input type="text" name="name" placeholder="名称代码" 
                                value = {this.state.nameval}
                                onChange = {this.inpchange_name}
                                id="name"/>
                            <div className="tables">
                                {
                                    this.state.datas.map( (item,i) => {
                                        return(
                                            <div key={i} 
                                                onClick = {this.inputNameClick}
                                                data-name = {item.name}   //名称
                                                data-symbol = {item.symbol} //代码
                                                data-slrate = {item.slrate} //最大止损率
                                                data-id={item.id}  //商品id
                                                className="td">
                                                {item.name} 
                                                <span>({item.symbol})</span> 
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="item item_2">
                            {buy_data.new_mony}
                        </div>
                    </header>
                    <div className="dangci">   {/* 资金档位  */}
                        <div className="item_1">
                            <div>选择信用金(元)</div>
                            <div className="color_buy">{buy_data.pricerank}</div>
                        </div>
                        <div className="item_2">
                            <div className="divs div_1">
                                你也可以选择
                            </div>
                            <div className="divs div_2 clearfix"> 
                                {     //资金档位
                                    trade_5.pricerank ? (
                                        trade_5.pricerank.map( (item,i) => {
                                            return (
                                                <div  
                                                    data-pricerank = {item}  key={i} 
                                                    onClick={this.click_trade_5}
                                                    className="textbtn">{item}</div>
                                            )
                                        } )
                                        
                                    ):(
                                        <div></div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="beishu">  {/* 策略倍数  */}
                        <div className="item_1">  策略匹配 </div>
                        <div className="item_2">
                            <div className="item_div item_div_1">
                                <div onClick={this.min_lever_click} className="font_20">-</div>
                                <div>{buy_data.lever}倍</div>
                                <div onClick={this.max_lever_click} className="font_20">+</div>
                            </div>
                            <div className="item_div item_div_2">
                                <div>{buy_data.stock_num}股</div>
                                <div>{buy_data.shizhi_1}元</div> 
                            </div>
                        </div>
                    </div>
                   <div className="slrate">   {/*  止盈  止损 价  */}
                        <div className="item item_1">
                            <div className="divs divs_1">止盈</div>
                            <div className="divs btns">
                                <div  onClick={this.zhiyingClick_2}className="alr_btn">-</div>&nbsp;&nbsp;
                                <div className="text">
                                    <input type="text" 
                                    onChange ={this.zhiyingChange}
                                        value={buy_data.alr_val_1  }
                                    name="" id=""/>
                                    &nbsp;%
                                </div>&nbsp;
                                <div onClick={this.zhiyingClick_1} className="alr_btn">+</div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="divs divs_1">止损</div>
                            <div className="divs btns">
                                <div onClick={this.zhishunClick_2} className="alr_btn">-</div>&nbsp;&nbsp;
                                    <div className="text">
                                        <input type="text" 
                                            onChange ={this.zhishunChange}
                                            value={buy_data.alr_val_2}
                                            />
                                        &nbsp;%
                                    </div>&nbsp;
                                <div onClick={this.zhishunClick_1} className="alr_btn">+</div>
                            </div>
                        </div>
                    </div>
                    <div className="list_div jiancang">  {/* 建仓 */}
                            <div className="item_1">建仓费</div>
                            <div className="item_2">{buy_data.oc_t1}元</div>
                            <div className="item_3">说明> </div>
                    </div>
                    <div className="list_div marbotom_60">  {/* 建仓 */}
                            <div className="item_1">递延费</div>
                            <div className="item_2">{buy_data.bd_t1}元／天／万元</div>
                            <div className="item_3">说明> </div>
                    </div>
                    <div className="foot">
                        <div className="item">
                            <div className="top">
                                需支付&nbsp;<span className="col_lan">{yes_mony}</span>&nbsp;元
                            </div>
                            <div className="fot">
                                (账户余额{ fmg }元)
                            </div>
                        </div>
                        {
                            fmg >  yes_mony ? (
                                yes_mony > 0 ?(
                                    <div onClick={this.subMit}  className="submit">立即支付</div>
                                ):(
                                    <div className="submit huiback">立即支付</div>
                                )
                                
                            ):(
                                <div className="submit no_sub">余额不足，立即充值</div>
                            )
                        }
                        
                    </div>
                                
                
                
                </section>
                
                
            </div>
        );
    }
}

export default Trands;