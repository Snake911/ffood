import React, {Component} from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);                 
            this.state = { 
                users: {}
            };        
        fetch("https://ffood-c232d.firebaseio.com/users.json")
        .then(response => response.json())
        .then(response => this.setState({users: response}))
        this.log = this.log.bind(this);
        this.gets = this.gets.bind(this);
    }

    makeState(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    init(){
        const url = "https://oauth.vk.com/authorize?";
        const clientId = "client_id=6864672";
        const redirectUrl = "&redirect_uri=" + window.location.origin + window.location.pathname;
        const display = "&display=popup";
        const scope = "&scope=offline";
        const responseType = "&response_type=token";
        const versionAPI = "&v=5.95";
        const state = "&state=" + this.makeState(6);
        const fullURL = url + clientId + redirectUrl + display + scope + responseType + versionAPI + state;
        this.log();
        return fullURL;        
    }

    gets() {
        var a = window.location.hash;
        var b = {};
        a = a.substring(1).split("&");
        for (var i = 0; i < a.length; i++) {
         var c = a[i].split("=");
            b[c[0]] = c[1];
        }
        return b;
    };  

    log(){ 
        const dataUser = this.gets();      
        if(window.location.hash) {
            let user = {
                favourites:[],
                likes:[],
                user_id: dataUser.user_id,
                access_token: dataUser.access_token
            }
            let usersDB;
            fetch("https://ffood-c232d.firebaseio.com/users.json")
            .then(response => response.json())
            .then(response => {
                usersDB = response;
                let i = 0;
                setTimeout(()=>{
                    Object.keys(usersDB).map(userDB => {
                        if(usersDB[userDB].user_id === user.user_id){
                            i = userDB;
                        }
                        return i;
                    });
                    if(i === 0) {
                        fetch("https://ffood-c232d.firebaseio.com/users.json",{  
                            method: 'post',
                            headers: {  
                                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                            },   
                            body: JSON.stringify(user)
                        })
                        .then(()=>this.setState({user: user}))
                    } else {
                        fetch("https://ffood-c232d.firebaseio.com/users/"+i+".json",{
                            method: 'DELETE'
                        })
                        fetch("https://ffood-c232d.firebaseio.com/users.json",{  
                            method: 'post',
                            headers: {  
                                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
                            },   
                            body: JSON.stringify(user)
                        })
                    }
            });
        })
                                        
        }                  
    }


    render() { 
        console.log(this.state);
           
        return (<a href={this.init()}><button>Авторизоваться</button></a>)
    }
}

export default Profile;