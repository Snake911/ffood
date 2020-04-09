import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import classes from './Want.css';


class Want extends Component {
    render(){
        return (
            <div className={classes.Want}>
                <img src="./img/shaurma.png" alt="Шаурма"/>
                <h1>Хочу шаурму!</h1>
                <div>
                    <NavLink to={'/all'}><Button>Все</Button></NavLink>
                    <NavLink to={'/near'}><Button>Рядом</Button></NavLink>
                </div>
            </div>
        )
    }
}

export default Want;