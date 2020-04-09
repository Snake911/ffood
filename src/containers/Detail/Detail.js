import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Detail.css'

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointDetail: {},
            namePoint:'',
            linkTel: '',
            timeWork: ''
        };
    
        this.fetching = this.fetching.bind(this);
        this.initialMap = this.initialMap.bind(this);
    }

    // rating(r){
    //     let thisPoint;
    //     // console.log(this.state.namePoint);
    //     fetch("https://ffood-c232d.firebaseio.com/points/"+this.state.namePoint+".json")
    //     .then(response => response.json())
    //     .then(response => {
    //         thisPoint = response;
    //         thisPoint.rating += r;
    //         thisPoint.chosen++;
    //         thisPoint.resultRating = thisPoint.rating/thisPoint.chosen;
    //         fetch("https://ffood-c232d.firebaseio.com/points/"+this.state.namePoint+".json",{
    //             method: 'PATCH',
    //             headers: {  
    //                 "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
    //               },   
    //             body: JSON.stringify(thisPoint)
    //         })
    //     });        
    // }

    async fetching() {
        const path = document.location.pathname.split('/');
        let points={}  
        await fetch("https://ffood-c232d.firebaseio.com/points.json")
        .then(response => response.json())
        .then(response => points = response)
        Object.keys(points).map(point => {                
            if(+points[point].id === +path[path.length-1]){                    
                this.setState({
                    pointDetail: points[point], 
                    namePoint: point, 
                    linkTel: "tel:"+ points[point].phone.replace(/[()]/g, ''),
                    timeWork: points[point].time.replace(/[;]/g, "\n") 
                 });
            }
            return false;
        })
    }

    async initialMap(){
        let map = 0; 
        let lat = this.state.pointDetail.coord[1];
        let long = this.state.pointDetail.coord[0];     
        //eslint-disable-next-line
        await DG.then(function () {            
            //eslint-disable-next-line
            map = DG.map('map', {
                center: [lat, long],
                zoom: 14
            });              
            
            //eslint-disable-next-line
            return DG.marker([lat, long]).addTo(map);            
        });
    }

    async componentWillMount() {
        await this.fetching();
        this.initialMap();
    }

    render(){  
        console.log(this.state);
        let vk;
        let ok;
        let site;
        let inst;
        let fb;
        let phone;
        if(this.state.pointDetail.vk){
           vk = <a href={this.state.pointDetail.vk}><i className="fab fa-vk"></i></a>
        }
        if(this.state.pointDetail.ok){
            ok = <a href={this.state.pointDetail.ok}><i className="fab fa-odnoklassniki"></i></a>
         } 
         if(this.state.pointDetail.site){
            site = <a href={this.state.pointDetail.site}><i className="fas fa-globe"></i></a>
         } 
         if(this.state.pointDetail.inst){
            inst = <a href={this.state.pointDetail.inst}><i className="fab fa-instagram"></i></a>
         } 
         if(this.state.pointDetail.fb){
            fb = <a href={this.state.pointDetail.fb}><i className="fab fa-facebook-f"></i></a>
         } 
         if(this.state.pointDetail.phone){
            phone = <i className="fas fa-phone" style={{transform: `scale(-1, 1)`}}></i>
         } 

        return (
            <div className={classes.Detail}>
                <header style={{backgroundImage:`url(${this.state.pointDetail.logo})`}}><NavLink to={'/all'}><i className="fas fa-arrow-left"></i></NavLink></header>
                <div className={classes.info}>
                    <h1>{this.state.pointDetail.name}</h1>
                    <hr/>
                    <p><i className="fas fa-home"></i> &nbsp;&nbsp;{this.state.pointDetail.adress}</p>
                    <hr/>
                    <div className={classes.time}><i className="far fa-clock"></i> &nbsp;&nbsp;{this.state.timeWork}</div>
                    {phone ? (
                    <p>{phone} &nbsp;&nbsp;
                        <a href={this.state.linkTel}>
                            {this.state.pointDetail.phone}
                        </a>
                    </p>) : <div></div>}
                    <div className={classes.soc}>
                        {vk}
                        {ok}
                        {site}
                        {inst}
                        {fb}
                    </div>
                </div>
                <div className={classes.filter}>Заведение на карте</div>
                <div className={classes.map}>
                    <div id="map" style={{width:100 +'%', margin:'auto',height: 'inherit', position: 'absolute'}}></div>            
                </div>
            </div>
        );
    }
}

export default Detail;