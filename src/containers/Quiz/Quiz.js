import { Component } from "react";
import classes from './Quiz.module.scss';
import { ActiveQuiz } from '../../components/ActiveQuiz/ActiveQuiz';
import { FinishedQuiz } from "../../components/FinishedQuiz/FinishedQuiz";

export class Quiz extends Component {
  state = {
    isFinished: false,
    activeQuestion: 0,
    answerstate: null, // {[id]: 'success' 'error'}
    results: {}, //  {[id]: 'success' 'error'}
    quiz: [
      {
        question: 'Какого цвета небо?',
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: 'Черный', id: 1  },
          { text: 'Синий', id: 2 },
          { text: 'Красный', id: 3 },
          { text: 'Зеленый', id: 4 },
        ]
      },
      {
        question: 'Какого цвета солнце?',
        rightAnswerId: 4,
        id: 2,
        answers: [
          { text: 'Черный', id: 1  },
          { text: 'Синий', id: 2 },
          { text: 'Красный', id: 3 },
          { text: 'Желтый', id: 4 },
        ]
      },
      {
        question: 'Как настроение?',
        rightAnswerId: 1,
        id: 3,
        answers: [
          { text: 'Лучше всех', id: 1  },
          { text: 'Нормально', id: 2 },
          { text: 'Пойдет', id: 3 },
          { text: 'Бывало и лучше', id: 4 },
        ]
      },
    ],
  };

  onAnswerClickHandler = answerId =>  {
    const rightAnswer = this.state.quiz[this.state.activeQuestion].rightAnswerId;
    const results = this.state.results;

    if (this.state.answerstate) {
      const key = Object.keys(this.state.answerstate)[0]

      if (this.state.answerstate[key] === 'success') {
        return
      }
    }

    if (answerId === rightAnswer) {
      if (!results[this.state.activeQuestion + 1]) {
        results[this.state.activeQuestion + 1] = 'success';
      }

      this.setState({
        answerstate: { [answerId]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerstate: null
          })
        }

        window.clearTimeout(timeout);
      }, 1000)
    } else {
      results[this.state.activeQuestion + 1] = 'error';
      this.setState({
        answerstate: { [answerId]: 'error'},
        results
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  onRepitHandler = () => {
    this.setState({
      isFinished: false,
      activeQuestion: 0,
      answerstate: null,
      results: {},
    })
  }

  render() {
    return(
      <div className={ classes.Quiz }>
        <div className={ classes.QuizWrapper }>
          <h1>Answer all of the questions</h1>
          {
            this.state.isFinished
              ? <FinishedQuiz
                results={ this.state.results }
                questions={ this.state.quiz }
                onRepitHandler={ this.onRepitHandler }
                />
              : <ActiveQuiz
                answers={ this.state.quiz[this.state.activeQuestion].answers }
                question={ this.state.quiz[this.state.activeQuestion].question }
                onAnswerClick={ this.onAnswerClickHandler }
                quizLength={ this.state.quiz.length }
                answerNumber={ this.state.activeQuestion + 1 }
                state={ this.state.answerstate }
              />
          }

        </div>
      </div>
    )
  }
}
