import React from 'react'
import { Link } from 'react-router'
import './list.less'
import Header from '../../common/header/header'
import { URL_PATH } from '../../../conf'
import {connect} from 'react-redux'
import{subscribe_21033,subscribe_21033_init,subscribe_21028,subscribe_21028_init} from '../../../redux/module/ranking'
 
class TrackList extends React.Component {

    constructor(props) {
        super(props)
        this.state ={
            click_hide:true
        }
        this.tuiding = this.tuiding.bind(this)
        this.header_shuaxin = this.header_shuaxin.bind(this)
    }

    componentDidMount  () {
        this.props.subscribe_ok();//获取订阅信息
    }
    tuiding (values){  //取消订阅
        let {click_hide} = this.state;
        if(click_hide){
            click_hide = false;
            this.setState({click_hide});
            this.props.submit_no(values);
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
        console.log("订阅信息刷新了");
        this.props.subscribe_ok();//获取订阅信息
    }
    
    render() {
        let list = this.props.subscribe.trader;
        let data = {id:3,pathnext:"/stock/track/list"};
        let path = {
          pathname: URL_PATH + '/account',
          state:data
        }
        return (
             <div>
                <Header header_shuaxin={this.header_shuaxin} path={URL_PATH}/>
                <div className="App">
                    <div className="reade_main tracklisttop">
                        <div className="head">
                            <Link to={`${URL_PATH}/track/tracklist`} className="btn buy">高手榜单</Link>
                            <Link to={`${URL_PATH}/track/list`} className="btn shell"> 我的订阅 </Link>
                        </div>
                        <div className="dingyue_wrap">
                            {
                                list ? (
                                    list.map( (item,i) => {
                                        return(
                                            <div key={i} className="dingyue">
                                                <div className="top">
                                                    <div>{item.name}</div>
                                                    {/* <Link to={path} className="zhanghu"> 查看TA的账户 </Link> */}
                                                    <div className="tuiding"><span onClick={ () => this.tuiding(item.sfid) }>退订</span></div>
                                                </div>
                                                <div className="foot">
                                                    <div className="text_div">
                                                        总收益
                                                        <div>{item.yield}%</div>
                                                    </div>
                                                    <span className="bor_left_right"></span>
                                                    <div className="text_div">
                                                        周收益
                                                        <div>%</div>
                                                    </div>
                                                    <span className="bor_left_right"></span>
                                                    <div className="text_div">
                                                        日收益
                                                        <div>%</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        })    
                                ):(
                                    <div></div>
                                )
                            }
                            {/* <div className="dingyue_main">   订阅用户当日交易数据
                                <div className="item item_flex">
                                    <div className="item_1">
                                        <span>09:90</span>
                                        <span className="item_span shell_color">卖出</span>
                                        <span className="color_with">坎坎坷坷</span>
                                    </div>
                                    <div className="item_1 item_2">
                                        <span className="shell_back">跟卖</span>
                                    </div>
                                </div>
                                <div className="item">
                                    <span className="vol">多少股</span>
                                    成交价<span className="ok_mony">11.11</span>
                                </div>
                                <div className="item">
                                    仓位占比<span className="ok_mony">0.90%</span>
                                </div>
                            </div>
                            <div className="dingyue_main">           订阅用户当日交易数据
                                <div className="item item_flex">
                                    <div className="item_1">
                                        <span>09:90</span>
                                        <span className="item_span shell_color">卖出</span>
                                        <span className="color_with">坎坎坷坷</span>
                                    </div>
                                    <div className="item_1 item_2">
                                        <span className="shell_back">跟卖</span>
                                    </div>
                                </div>
                                <div className="item">
                                    <span className="vol">多少股</span>
                                    成交价<span className="ok_mony">11.11</span>
                                </div>
                                <div className="item">
                                    仓位占比<span className="ok_mony">0.90%</span>
                                </div>
                            </div> */}
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        subscribe:state.ranking.subscribe_033
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        subscribe_ok : (values) => {
            dispatch(subscribe_21033()).then( res => {    //获取订阅信息
                let data = res.data.bd
                data = JSON.parse(data)
                // console.log("获取订阅信息")
                // console.log(data)   
                // console.log("获取订阅信息")
                dispatch(subscribe_21033_init(data))
            })
        },
        submit_no : (values) => {
            dispatch(subscribe_21028(values)).then( res => {    //取消订阅
                // console.log("取消订阅")
                // console.log(res.data)
                // console.log("取消订阅")
                dispatch(subscribe_21028_init(res.data))
            } )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackList)