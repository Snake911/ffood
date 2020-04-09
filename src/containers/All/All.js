import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Card from '../../components/Card/Card';
import classes from './All.css';

class All extends Component {
    state = {
        points: {},
        arr:[]
    }

    fetching() {
        fetch("https://ffood-c232d.firebaseio.com/points.json")
        .then(response => response.json())
        .then(response =>{
            const arr = Object.keys(response);
            this.setState({points: response, arr: arr.sort(function(){
                return Math.random() - 0.5;
              })});         
        } )
    }

    randomPoint(points) {
        let arr = Object.keys(points);
        arr = arr.sort(function(){
            return Math.random() - 0.5;
          })
        this.setState({arr: arr})
    }

    async componentWillMount() {
        await this.fetching();
        await this.randomPoint(this.state.points)
    }

    render(){    
        const points = this.state.points;        
        return (
            <div className={classes.All}>
                <header><NavLink to={'/'}><i className="fas fa-arrow-left"></i></NavLink><h1>Заведения</h1></header>
                <div className={classes.filter}><p>Великий рандом</p><span onClick={()=>this.randomPoint(points)}><i className="fas fa-redo"></i></span></div>            
                <div className={classes.Cards}>
                    {
                        this.state.arr.map((point, index) => <Card point={points[point]} key={index}/>)
                    }
                </div>
            </div>
        )
    }
}

export default All;