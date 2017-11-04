import React from 'react'
import { Link } from 'react-router'
import './header.less'




class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.shuaxin = this.shuaxin.bind(this)
    }

    shuaxin(){
        this.props.header_shuaxin();
    }

    render() {
        return (
            <div className="header">
                <div className="left">
                    <Link to={this.props.path} ><img src={require('../../img/home.png')} /></Link>
                    <span>关闭</span>
                </div>
                <div className="content">
                    A股大赛
                </div>
                <div className="right">
                    <img onClick={this.shuaxin} src={require("../../img/shuaxin.png")} />
                </div>
            </div>
        )
    }
}

export default Header;