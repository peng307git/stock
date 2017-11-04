import React from 'react';
import './loading.css';

export default class Loading extends React.Component {
        render(){
            return(
                <div className="loading">
                    <img src={require("./loading.png")} alt=""/>
                    <div>loading...</div> 
                </div>
            )
        }
};
