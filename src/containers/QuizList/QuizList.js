import { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from './QuizList.module.scss';
// import axios from 'axios';

export class QuizList extends Component {
  renderQuizes() {
    return [1, 2, 3].map((quiz, i) => {
      return <li key={ i }>
        <NavLink to={ `/quiz/${quiz}` }>
          Quiz { quiz }
        </NavLink>
      </li>
    })
  }

  render() {
    return (
      <div className={ classes.QuizList }>
        <div>
          <h1>Quiz List</h1>

          <ul>
            { this.renderQuizes() }
          </ul>
        </div>
      </div>
    )
  }
}