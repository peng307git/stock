import React from 'react';
import Websocket from 'react-websocket';
import { connect } from 'react-redux'
import './app.less';



// import { WEBSOCKED_URL, TIMER_INTERVAL } from '../conf/index';
// import { webstoket_timer, webstoket_timer_init } from '../redux/module/basis'
// import { webstocket_init } from '../redux/module/trade'
// import { aesEncrypt, aesDecrypt2, hexToString, Base64Binary } from './common/component/ut_1.js'
// const pako = require('pako');




class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: null
        };
    }

   render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
    //webstocket 使用
    hides(){
        // Websocket
        /* <Websocket url={WEBSOCKED_URL} debug={true}
                    onMessage={this.handleData.bind(this)}
                    onOpen={this.openWeb.bind(this)}
                    onClose={this.close.bind(this)}
                /> */
        // componentDidMount = () => {
        //     // degzip();
        //     // function degzip(){//e是回调处理函数，i是一个json数字，会存储在本地
        //     // let data = "H4sIAAAAAAAAAHXNSQrAQAhE0RuJ5RSaXK0On9hNdmbzFPxg0JZUg8ZpigtqgbTlSlCpt7Pee4nuOSZJhFiDs41VEZBorPl5hx1ki2+fwgdTXLr0vQAAAA==";
        //     // data = pako.ungzip(Base64Binary.decode(data));
        //     // let i = hexToString(data).split(";").join();
        //     // sessionStorage.setItem("local_pi_3", i);		
        //     // }
        // }
        // handleData(data) {  //链接中
        //     let result = JSON.parse(data);
        //     let ret = hexToString(pako.ungzip(Base64Binary.decode(result.bd)));
        //     ret = ret.split(";");
        //     ret = ret.map((item) => {
        //         return item.split("|");
        //     })
        //     this.props.websocket_time(ret);
        // }
        // openWeb(data) {  //Websocket链接成功
        //     this.state.timer = setInterval(() => {
        //         this.props.websocket_ok();
        //     }, TIMER_INTERVAL)
        // }
        // close(data) {  //Websocket建立关闭
        //     clearInterval(this.state.timer);
        // }
    }
}

 
const mapStateToProps = (state, ownProps) => {
    return {
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        // websocket_ok: () => {
        //     dispatch(webstoket_timer()).then(res => {  //心跳
        //         let datas = res.data;
        //         dispatch(webstoket_timer_init(res))
        //     })
        // },
        // websocket_time: (values) => {
        //     dispatch(webstocket_init(values))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
