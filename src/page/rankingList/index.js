import React, { Component } from 'react';
import './index.less'
import Header from '../common/header/header'
import { URL_PATH } from '../../conf'
import {connect} from 'react-redux'
import {
    ranking_21020,ranking_init,
    subscribe_21027,subscribe_21027_init,
    subscribe_21028,subscribe_21028_init,
    subscribe_21033,subscribe_21033_init
} from '../../redux/module/ranking'


class Ranking extends Component {
    constructor(props) {
        super(props)
        this.state ={
            type:0,
            click_hide:true
        }
        this.dingyue = this.dingyue.bind(this)
        this.tuiding = this.tuiding.bind(this)
        this.header_shuaxin = this.header_shuaxin.bind(this)
    }
    componentDidMount = () => {
        let title = this.props.location.state;
        let {type} = this.state;
        if(title == "总收益"){
            type = 1;
        }
        else if(title == "日收益"){
            type = 2;
        }
        else{
            type = 4;
        }
        this.props.ranhing(type);  //高手排行
        this.props.subscribe_ok(); //获取订阅信息
        this.setState({type});
    }
    dingyue(values){  //发起订阅 
        let {click_hide} = this.state;
        if(click_hide){
            click_hide = false;
            this.setState({click_hide});
            this.props.submit_ok(values);
            this.props.ranhing(this.state.type);  //高手排行
            setTimeout(()=>{
                this.props.subscribe_ok();//获取订阅信息
                click_hide = true;
                this.setState({click_hide});
             },100)
        }
    }

    tuiding (values){  //取消订阅
        let {click_hide} = this.state;
        if(click_hide){
            click_hide = false;
            this.setState({click_hide});
            this.props.submit_no(values);
            this.props.ranhing(this.state.type);  //高手排行
            setTimeout(()=>{
                this.props.subscribe_ok();//获取订阅信息
                click_hide = true;
                this.setState({click_hide});
            },100)
        }
        else{

        }
        
    }
    header_shuaxin (){   //刷新的回掉函数
        console.log("排行刷新了！订阅信息刷新了");
        this.props.ranhing(this.state.type);  //高手排行
        this.props.subscribe_ok();//获取订阅信息
    }
    
  render() {
    let rainklist = this.props.rainklist;
    let subscribe_list = this.props.subscribe.trader;
    let path = URL_PATH + '/track/tracklist';
    return (
        <div>
            <Header header_shuaxin={this.header_shuaxin} path={path}/>
            <div className="App">
                <div className="ranking_main">
                    <div className="top">   {/* 我的订阅 */}
                        <h3>您订阅的高手</h3>
                        <div className="list_head list">
                            <div>总排名</div>
                            <div>选手</div>
                            <div>总收益</div>
                            <div>交易</div>
                        </div>
                        {    subscribe_list ? (
                                subscribe_list.map( (item,i) => {
                                    return(
                                        <div key={i} className="list_body list">
                                            <div>{item.rk}</div>
                                            <div>{item.name}</div>
                                            <div>{item.yield}%</div>
                                            <div><span onClick={ () => this.tuiding(item.sfid) } >退订</span></div>
                                        </div>
                                    )
                                } )
                        ) : (
                            <div></div>
                        )
                             
                        }
                    </div>
                    <div className="foot">   {/* 高手排行 */}
                        <h3>{this.props.location.state}前100名</h3>
                        <div className="list_head list">
                            <div>总排名</div>
                            <div>选手</div>
                            <div>总收益</div>
                            <div>交易</div>
                        </div>
                        {
                            rainklist.map( (item,i) => {
                                return(
                                    <div key={i} className="list_body list">
                                        <div> 
                                            <div className={`top_${i}`}> {item.rk} </div> 
                                        </div>
                                        <div>{item.name}</div>
                                        <div>{item.yield}%</div>
                                        <div><span className="dingyue" onClick={ () => this.dingyue(item.fid) }>订阅</span></div>
                                    </div>
                                )
                            } )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
      
    )
  }
}

const mapStateToProps = (state) => {
    return{
        rainklist:state.ranking.ranhing_data,
        subscribe:state.ranking.subscribe_033
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        ranhing : (values) => {
            dispatch(ranking_21020(values)).then( res => {  //  获取高手
                let data = res.data.bd
                data = JSON.parse(data)
                // console.log("获取高手")
                // console.log(data)
                // console.log("获取高手")
                dispatch(ranking_init(data.lst))
                
            })
        },
        submit_ok : (values) => {
            dispatch(subscribe_21027(values)).then( res => {  //发起订阅信息
                // console.log("发起订阅信息")
                // console.log(res.data)
                // console.log("发起订阅信息")
                dispatch(subscribe_21027_init(res.data))
            } )
        },
        submit_no : (values) => {
            dispatch(subscribe_21028(values)).then( res => {    //取消订阅
                // console.log("取消订阅")
                // console.log(res.data)
                // console.log("取消订阅")
                dispatch(subscribe_21028_init(res.data))
            } )
        },
        subscribe_ok : () => {    
            dispatch(subscribe_21033()).then( res => {    //获取订阅信息
                let data = res.data.bd
                data = JSON.parse(data)
                // console.log("获取订阅信息")
                // console.log(data)   
                // console.log("获取订阅信息")
                dispatch(subscribe_21033_init(data))
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Ranking)