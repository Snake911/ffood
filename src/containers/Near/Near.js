import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Near.css';

class Near extends Component {
    
    componentDidMount() {
        this.initialMap();
    }

    async initialMap(){
        let map = 0;
        let points = [];
        await fetch("https://ffood-c232d.firebaseio.com/points.json")
        .then(response => response.json())
        .then(response => points = response);
        //eslint-disable-next-line
        await DG.then(function () {            
            //eslint-disable-next-line
            map = DG.map('map', {
                center: [57.91944, 59.965],
                zoom: 12
            });        
            map.locate({setView: true, watch: true})
                .on('locationfound', function(e) {
                    //eslint-disable-next-line
                    
                })
                /*.on('locationerror', function(e) {
                    //eslint-disable-next-line
                    //DG.popup()
                        //.setLatLng(map.getCenter())
                        //.setContent('Доступ к определению местоположения отключён')
                        .openOn(map);
                    })*/;
            
            Object.keys(points).map(point => {
                //eslint-disable-next-line
                return DG.marker([points[point].coord[1], points[point].coord[0]]).addTo(map).bindPopup('<p> ' + points[point].name + ' | ' + points[point].adress + '</p><a href="/all/'+ points[point].id +'">Подробнее</a>');
            })
        });
    }

    render(){        
        return (
            <div className={classes.Near}>
                <header><NavLink to={'/'}><i className="fas fa-arrow-left"></i></NavLink><h1>Карта</h1></header>
                <div className={classes.filter}><p>Выберете заведение</p></div>
                <div>
                    <div id="map" style={{height: `90vh`, position: 'sticky'}}></div>
                </div>
            </div>
        )
    }
}

export default Near;
