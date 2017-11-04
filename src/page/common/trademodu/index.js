import React from 'react'
import './index.less'
import {connect} from 'react-redux'
import {trade_21029,trade_21029_init} from '../../../redux/module/trade'

class Trademodu extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ival:0 ,  //单价
            nameVal:"",   //公司名称
            shellTotal:"",
            datas:[],
            down_name:"",
            down_id:""
        }
        this.inpchange = this.inpchange.bind(this)
        this.inpchange_name = this.inpchange_name.bind(this)
        this.input_name_up = this.input_name_up.bind(this)
        this.inpchange_shelltotal = this.inpchange_shelltotal.bind(this)
        this.idclick = this.idclick.bind(this)
        this.jia = this.jia.bind(this)
        this.jian = this.jian.bind(this)
        
    }
    componentDidMount () {
        
    }
    inpchange(ev){     //单价
        let val = ev.target.value;
        if(!isNaN(val)){
          setTimeout(()=>{
                this.setState({ival:val});
           }, 0); 
        }
    }
    inpchange_name(ev){   ///公司名称
        let val = ev.target.value;
        setTimeout(()=>{   
                this.setState({nameVal:val});
        }, 0); 
    }
    inpchange_shelltotal(ev){  //  总价／总数量
        let val = ev.target.value;
        setTimeout(()=>{   
                this.setState({shellTotal:val});
        }, 0); 
    }
    input_name_up(ev){
        let ev_val = ev.target.value;
        let local_stock = sessionStorage.getItem("local_stock") ; //全部股票数据
        local_stock = JSON.parse(local_stock);
        let {datas} = this.state;
        if (ev_val == "" || ev_val == null) {   
            datas = [];
        }else{
            datas = local_stock.ct.filter(el => {
                let val = String(el.symbol);
                if( val.indexOf(ev_val) != -1){
                    return true;
                }
            
            })
        }
        this.setState({datas});
    }
    idclick(e){
        let { types,agetotal,total,chuanzhi} = this.props;
        let {nameVal,datas,shellTotal,ival,down_id,down_name} = this.state;
        let name = e.currentTarget.getAttribute('data-name');
        let symbol = e.currentTarget.getAttribute('data-symbol');
        let age = e.currentTarget.getAttribute('data-age');
        let ids = e.currentTarget.getAttribute('data-id');
        ids = parseInt(ids);
        down_name = name;
        down_id = symbol;
        nameVal = name + "(" +symbol + ")";
        datas = [];
        ival = parseFloat(age);
        if( types == "shell" ){
            shellTotal = agetotal;
        }
        else{
            shellTotal = (total/ival).toFixed(0);
        }
        
        this.setState({nameVal,datas,shellTotal,ival,down_name,down_id});
        chuanzhi(shellTotal,ival,name,ids)
        this.props.gengxin([ids]);
    }
    jia(){
        let {ival,shellTotal,down_id,down_name} = this.state;
        ival = ival+0.01;
        shellTotal = this.props.jisuan(shellTotal,ival);
        setTimeout(()=>{
                this.setState({ival});
                this.setState({shellTotal});
                
           }, 0);
           this.props.chuanzhi(shellTotal,ival,down_name,down_id)
    }
    jian(){
        let {ival,shellTotal,down_id,down_name} = this.state;
        if(ival > 0.01 ){
            ival = ival-0.01;
            shellTotal = this.props.jisuan(shellTotal,ival);
            setTimeout(()=>{
                    this.setState({ival});
                    this.setState({shellTotal});
            }, 0); 
            this.props.chuanzhi(shellTotal,ival,down_name,down_id)
        }
    }
    
    render() {

        let {buy_name,buy_id,buy_num,buy_mony } = this.props;
        
        let {inpchange,jia,jian,inpchange_name,input_name_up,idclick,inpchange_shelltotal} = this;
        let { ival ,nameVal, datas, shellTotal } = this.state;
        ival = ival.toFixed(2); 
        let tbodyhtml = null;
        let tabhTML = null;
        buy_name = nameVal;
        buy_num = ival;
        buy_mony = shellTotal; 
        if(datas.length < 1){
            tabhTML = null;
        }
        else{
            tbodyhtml = datas.map( (item,i) => {
                    return(
                        <div key={i} 
                             onClick={idclick}
                             ref="id_val"
                             data-name={item.name}
                             data-symbol={item.symbol}
                             data-id={item.id}
                             data-age={item.scale}
                             className="thead">
                            <div>{item.name}</div>
                            <div>{item.symbol}</div>
                        </div>
                    )
                })
                tabhTML = <div className="tab_item">
                        {tbodyhtml}
                    </div>
        }
        

        return (
            <div className="trademodu">
                    <div className="leftdiv">
                        <div className="input_div">
                            <input type="text" 
                                name="name" 
                                value={nameVal} 
                                onChange = {inpchange_name}
                                onKeyUp = {input_name_up}
                                placeholder="名称代码"/>
                                {tabhTML}
                        </div>
                        <div className="warp">
                            <div>跌停：<span className="greencolor">5.99</span></div>
                            <div>涨停：<span className="redcolor">7.99</span></div>
                        </div>
                        <div className="input_div">
                            <div onClick={jian} className="jian">
                                <div>-</div>
                                <div>0.01</div>
                            </div>
                            <input 
                                className="price"
                                type="text" 
                                name="price" 
                                value={ival}
                                onChange = {inpchange}
                                id=""/>
                            <div onClick={jia} className="jia">
                                <div>+</div>
                                <div>0.01</div>
                            </div>
                        </div>
                        <div className="warp_1">
                            较昨日收盘涨：<span className="redcolor">+0.24</span>  
                                        <span className="redcolor">  +2.38%</span>
                        </div>
                        <div className="input_div">
                            <input type="text" 
                                name="total" 
                                value={shellTotal}
                                onChange = {inpchange_shelltotal}
                                id="" />
                        </div>
                    </div>
                    <div className="rightdiv">
                        <div className="list_top list">
                            <div className="list_child">
                                <div>卖5</div>
                                <div>6.96</div>
                                <div>2000</div>
                            </div>
                            <div className="list_child">
                                <div>卖4</div>
                                <div>6.96</div>
                                <div>2000</div>
                            </div>
                            <div className="list_child">
                                <div>卖3</div>
                                <div>6.96</div>
                                <div>2000</div>
                            </div>
                            <div className="list_child">
                                <div>卖2</div>
                                <div>6.96</div>
                                <div>2000</div>
                            </div>
                            <div className="list_child">
                                <div>卖1</div>
                                <div>6.96</div>
                                <div>2000</div>
                            </div>
                        </div>
                        <div className="list_left list">
                            <div className="list_child">
                                <div>买5</div>
                                <div>6.96</div>
                                <div>2000</div>
                            </div>
                            <div className="list_child">
                                <div>买4</div>
                                <div>6.96</div>
                                <div>2000</div>
                            </div>
                            <div className="list_child">
                                <div>买3</div>
                                <div>6.96</div>
                                <div>2000</div>
                            </div>
                            <div className="list_child">
                                <div>买2</div>
                                <div>6.96</div>
                                <div>2000</div>
                            </div>
                            <div className="list_child">
                                <div>买1</div>
                                <div>6.96</div>
                                <div>2000</div>
                            </div>
                            </div>
                    </div>
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
        gengxin : (values) =>{
            dispatch(trade_21029({
                add:values,
                del:[]
            })).then(res => {
                console.log(res.data)
                dispatch(trade_21029_init(res.data))
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trademodu)