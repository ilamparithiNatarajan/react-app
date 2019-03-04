import React, { Component } from 'react';
import Iframe from 'react-iframe';
import $ from 'jquery';

export default class Search extends Component{
   constructor(props) {
    super(props);
    this.state = {
    result: null,
    query: null,
    embeddedUrl: null,
    }
    this.handleInput = this.handleInput.bind(this);  
    this.prepareYTLink = this.prepareYTLink.bind(this);
    this.ajaxCall = this.ajaxCall.bind(this); 
   }
    prepareYTLink (str) {
        var result = 'https://youtube.com/watch?v=' + str;
        var embedUrl = "http://www.youtube.com/embed/"+str+"?&start=3";
        this.setState({
            result: result,
            embeddedUrl: embedUrl,
        })
        console.log(`result in state is ${this.state.result}`)
        console.log(`result in method is ${result}`)
        console.log(`firstLink in method is ${str}`)
        return;
        };

   async ajaxCall(){
        // var query = 'super+star+theme+music';
        //aju
        // var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAwk7P3ZnNLiXx7xHq9sxnEQhPAWmFyrfU&q="+this.state.query;
        //ife
        var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAnVzAChBHO3fZmPLbNvIUoqwUd3IP3PQk&q="+this.state.query;
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
        // var body = JSON.stringify(response);
        console.log('response fetched');
        var firstVideo;
        for(var i=0;i < response.items.length; i++ ){
            console.log(`i value is ${i}`);
            if(response.items[i].id.kind.includes('video')){
                firstVideo = response.items[i].id.videoId;
                console.log(`i value inside is ${i}`);
                break;
            }
        } 
        console.log(`first video value is ${firstVideo}`);
        if(typeof firstVideo !== 'undefined'){
        this.prepareYTLink(firstVideo)
        // window.open(this.state.result);
        this.setState({
            query : '',
        });
        }
        });
        console.log(new Date());
        setTimeout(this.doNothing(), 1000);
        
        
    }

    doNothing(){
        console.log(new Date());
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
            <input 
            type="text"
            onChange={this.handleInput} 
            style={{width: "250px"}} 
            placeholder="Search">
            </input>
            <br/>
            
        </label>
        </form>
        <br/>
        <button onClick={() => this.ajaxCall()} color="#841584">Play the first result from Youtube</button>
        <br/>
        <br/>
        <br/>
        {this.state.result !== null ?
        (
        <Iframe url={this.state.embeddedUrl}
        width="850px"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        allow="autoplay; encrypted-media"
        allowFullScreen/>
        ) : null }
        </div>
        )
    }
}