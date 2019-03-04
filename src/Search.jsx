import React, { Component } from 'react';
import $ from 'jquery';

export default class Search extends Component{
   constructor(props) {
    super(props);
    this.state = {
    result: null,
    query: null,
    }
    this.handleInput = this.handleInput.bind(this);  
    this.prepareYTLink = this.prepareYTLink.bind(this);
    this.ajaxCall = this.ajaxCall.bind(this); 
   }
    prepareYTLink (str) {
        var result = 'https://youtube.com/watch?v=' + str;
        this.setState({
            result: result,
        })
        console.log(`result is ${this.state.result}`)
        return;
        };

    ajaxCall(){
        // var query = 'super+star+theme+music';
        var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAwk7P3ZnNLiXx7xHq9sxnEQhPAWmFyrfU&q="+this.state.query;
        $.ajax({
        // url: "http://apply.lloydsbank.co.uk/sales-savings-api/application/version",
        url: url,
        type: "GET",
        crossDomain: true,
        error: function (xhr, status) {
            alert(`error with status: ${xhr.statusText}`); 
        },
        headers: {
        "accept": "application/json",
        "Access-Control-Allow-Origin":"*"
        },
        dataType: "JSON"
        }).done(response =>{ 
        var body = JSON.stringify(response);
        console.log(body);
        var firstVideo = response.items[0].id.videoId;
        this.prepareYTLink(firstVideo)
        });
        // window.open(this.state.result);
        
    }

    handleInput(event) {
        this.setState({
            query: event.target.value
        });
      }


    render(){
        return (
            <div>
        <a
        className="App-link"
        href="https://github.com/ilamparithiNatarajan/react-app"
        target="_blank"
        rel="noopener noreferrer"
        >
        
        I'm feeling lucky on YouTube
        </a>

        <br/>
        <br/>
        <form autoComplete="off">
        <label>
            <input type="text" onChange={this.handleInput}/>
            <br/>
            
        </label>
        </form>
        <br/>
        <button onClick={() => this.ajaxCall()}>Play the first result from Youtube</button>
        <br/>
        <a
        className="App-link"
        href={this.state.result}
        target="_blank"
        rel="noopener noreferrer"
        >
        
        watch video
        </a>
        </div>
        )
    }
}