import React from 'react'
import './index.less'
import Header from '../common/header/header'
import ListDiv from '../common/listDiv/index'
import { URL_PATH } from '../../conf'
import DatePicker from 'react-mobile-datepicker'

export default class HistoryList extends React.Component {
    state = {
        time: new Date(),
        time_1:new Date(),
        time_text:"",
        time_text_1:"",
        isOpen: false,
        isOpen_1:false,
        theme:"dark",
        list:[],
        tip_title:"当前没有历史记录",
	}

	handleClick = () => {
        let {time} = this.state;
        time = this.timejisuan(time);
        this.setState({ time,isOpen: true });
    }
    
    timejisuan = (time) =>{
        time = time.getTime();
        time = time - 604800000;   //提前7天
        time = new Date(time);
        return time;
    }

    formatDate = (date) => {
        let y = date.getFullYear();  
        let m = date.getMonth() + 1;  
        m = m < 10 ? '0' + m : m;  
        let d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        return y + '-' + m + '-' + d; 
    }

    handleClick_1 = () => {
        this.setState({ isOpen_1: true });
	}

	handleCancel = () => {
        this.setState({ isOpen: false,isOpen_1:false });
	}

	handleSelect = (time) => {
        let { time_text } = this.state;
        time_text = this.formatDate(time);
        this.setState({ time_text, isOpen: false });
    }

    handleSelect_1 = (time) => {
        let { time_text_1 } = this.state;
        time_text_1 = this.formatDate(time);
        this.setState({ time_text_1, isOpen_1:false });
    }
    
    submint = () => {
        let {time_text, time_text_1} = this.state;
        if(time_text_1 > time_text){
            alert("查询时间: " + time_text + "---" + time_text_1)
        }
        else{
            alert("结束时间必须大于开始时间")
        }
        
    }

    render() {
        let path = URL_PATH + '/next';
        return (
            <div>
                <Header path={path}/>
                <div className="App">
                    <header className="hist_head">
                        <div onClick={this.handleClick} className="hist_list_div list_inp"> {this.state.time_text} <img src={ require("../img/hist_next.png") }/> </div>
                        <div className="hist_list_div list_next"> <img src={ require("../img/hist_right.png") }/> </div>
                        <div onClick={this.handleClick_1} className="hist_list_div list_inp"> {this.state.time_text_1} <img src={ require("../img/hist_next.png") }/>  </div>
                        <div onClick={this.submint} className="hist_list_div list_btn">查询</div>
                    </header>
                    <DatePicker
                            value={this.state.time}
                            isOpen={this.state.isOpen}
                            onSelect={this.handleSelect}
                            onCancel={this.handleCancel} 
                            theme = {this.state.theme}
                            />
                    <DatePicker
                            value={this.state.time_1}
                            isOpen={this.state.isOpen_1}
                            onSelect={this.handleSelect_1}
                            onCancel={this.handleCancel} 
                            theme = {this.state.theme}
                            />
                    <ListDiv {...this.state}/>
                </div>
            </div>
        );
    }
    componentWillMount(){
        
    }
    componentDidMount(){   //请求数据
        let {list} = this.state;
        let {time_text,time_text_1} = this.state;
        time_text = new Date();
        time_text_1 = new Date();
        time_text = this.timejisuan(time_text);
        time_text = this.formatDate(time_text);      //七天前时间
        time_text_1 = this.formatDate(time_text_1);  // 当前时间
        list = [ {
            name:"工商银行",   // 名称
            name_id:601398, //   名称代码
            status:1,          //1 == 买入    2 ==  卖出
            status_btn:1,          // 1 = 可以撤销（显示按钮） 2 = 撤销成功（全部撤销） 3 = 全部成交   4 = 部分成交
            time:'10:30',     //  时间
            numer_id:98765111, // 合同号
            ok_num:100,         //已成交量
            trust_num:1000,     //委托量
            trust_mony:6.68,   // 委托价
            ok_mony:6.66,       //成交价
            chexiao_text:"撤销" // 右侧文案（撤销，全部撤销，全部成交，部分成交）
            }, {
            name:"工商银行",
            name_id:601398,
            status:2, 
            status_btn:2,
            time:'10:30',
            numer_id:98765111,
            ok_num:100,
            trust_num:1000,
            trust_mony:6.68,
            ok_mony:6.66,
            chexiao_text:"全部撤销"
            }, {
            name:"工商银行",
            name_id:601398,
            status:1, 
            status_btn:3,
            time:'10:30',
            numer_id:98765111,
            ok_num:100,
            trust_num:1000,
            trust_mony:6.68,
            ok_mony:6.66,
            chexiao_text:"全部成交"
            }, {
            name:"工商银行",
            name_id:601398,
            status:2, 
            status_btn:4,
            time:'10:30',
            numer_id:98765111,
            ok_num:100,
            trust_num:1000,
            trust_mony:6.68,
            ok_mony:6.66,
            chexiao_text:"部分成交"
            }];
        this.setState({list,time_text,time_text_1})
    }
}