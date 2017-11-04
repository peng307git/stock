import React, { Component } from 'react'
import './index.less'
import Header from '../common/header/header'
import ListDiv from '../common/listDiv/index'
import { URL_PATH } from '../../conf'
import {connect} from "react-redux"
import {  commissioned_11004,commissioned_injection }from '../../redux/module/basis'

class Trands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tip_title: "当前无委托信息"
    }
    this.fromdata = this.fromdata.bind(this);
    this.header_shuaxin = this.header_shuaxin.bind(this);
  }
  componentDidMount() {  
    this.props.commiss();     //委托列表
  }

  fromdata (){
      let data = [];
      let stock =  sessionStorage.getItem("local_stock"); //全部股票信息
      let commissioned = this.props.commissioned.lr;
      if(stock){
        stock = JSON.parse(stock).ct;
        data = commissioned.map( (item,i) => {
            for (let i = 0; i < stock.length; i++) {
                if( item.ctid == stock[i].id ) {
                    item.name = stock[i].name;
                    item.symbol = stock[i].symbol;
                }
            }
            return item;
        })
      }
      return data;
  }

  header_shuaxin (){   //刷新的回掉函数
    console.log("委托单刷新了！");
    this.props.commiss();     //委托列表
    
  }

  render() {
    let list = [];
    if(this.props.commissioned.lr){
        list = this.fromdata();
    }
    return (
      <div>
        <Header header_shuaxin={this.header_shuaxin} path={URL_PATH} />
        <div className="App">
            <ListDiv list = {list} />
        </div>
      </div>

    )
  }

}

const mapStateToProps = (state,owt) => {
  return{
    commissioned:state.basis.commissioned //委托单信息
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    commiss : () => {       //委托列表
        dispatch(commissioned_11004()).then( res => {
            let datas = res.data.bd;
            sessionStorage.setItem("local_commis", datas);
            datas = JSON.parse(datas)
            // console.log("==委托列表==")
            // console.log(datas)
            // console.log("==委托列表==")
            dispatch( commissioned_injection(datas) )
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trands)
