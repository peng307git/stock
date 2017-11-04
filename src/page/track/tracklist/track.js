import React from 'react'
import { Link } from 'react-router'
import './track.less'
import Header from '../../common/header/header'
import { URL_PATH } from '../../../conf'
import {connect} from 'react-redux'


class TrackList extends React.Component {

    constructor (props){
        super(props)
        this.state = {
            subscribe_list:[]
        }
    this.header_shuaxin = this.header_shuaxin.bind(this)
    }

    componentDidMount() {
        
    }

    header_shuaxin (){   //刷新的回掉函数
        console.log("高手追踪刷新了！");
    }

    render() {
        let path = {
            a:{
            pathname:URL_PATH + '/rankingList',
            state:'总收益'
            },
            b:{
                pathname:URL_PATH + '/rankingList',
                state:'月收益'
            },
            c:{
                pathname:URL_PATH + '/rankingList',
                state:'日收益'
            }
        }
        return (
            <div>
                <Header header_shuaxin={this.header_shuaxin} path={URL_PATH}/>
                <div className="App">
                    <div className="reade_main tracklist">
                        <div className="head">
                            <Link to={`${URL_PATH}/track/tracklist`}  className="btn buy">高手榜单</Link>
                            <Link to={`${URL_PATH}/track/list`} className="btn shell"> 我的订阅 </Link>
                        </div>
                        <Link to={path.a} className="rightList_right">
                            <div>总收益榜</div>
                            <div className="right_div">点击查看详情</div>
                            <div className="img_div"><img src={require('../../img/right.png')}/></div>
                        </Link>
                        <Link to={path.b} className="rightList_right">
                            <div>周收益榜</div>
                            <div className="right_div">点击查看详情</div>
                            <div className="img_div"><img src={require('../../img/right.png')}/></div>
                        </Link>
                        <Link to={path.c} className="rightList_right">
                            <div>日收益</div>
                            <div className="right_div">点击查看详情</div>
                            <div className="img_div"><img src={require('../../img/right.png')}/></div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state,owt) => {
    return{

    }
}

const mapDispatchToProps = (dispatch) => {
    return{
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackList)