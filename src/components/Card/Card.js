import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Card.css';

class Card extends Component {
    render(){
        const link = '/all/' + this.props.point.id;
        return (
            <div className={classes.Card}>
                <div className={classes.imgCard}>
                    <NavLink to={link}>
                        <div className={classes.imgBack} style={{backgroundImage:'url('+this.props.point.logo+')'}}></div>
                    </NavLink>
                </div>
                <div className={classes.textCard}>
                    <NavLink to={link}><h2>{this.props.point.name}</h2></NavLink>
                    <p className={classes.adress}><i className="fas fa-home"></i>&nbsp;&nbsp;{this.props.point.adress}</p>
                    <p className={classes.price}>Цена от: {this.props.point.minPrise} руб.</p>
                </div>      
            </div>
        )
    }
}

export default Card;