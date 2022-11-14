import React, { Component } from "react";
import axios from 'axios';
import classes from './QuizCreator.module.scss';
import { Button } from '../../components/UI/Button/Button';
import { Input } from '../../components/UI/Input/Input';
import { createControl, validate, validateForm } from "../../form/formFramework";
import { Select } from "../../components/UI/Select/Select";

function createOptionControl ( num ) {
  return createControl({
    label: `Option ${ num }`,
    errorMessage: 'Field can`t be empty',
    id: num
  }, { required: true })
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Enter your question',
      errorMessage: 'Field can`t be empty',
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4:createOptionControl(4),
  }
}

export class QuizCreator extends Component {
  state = {
    quiz: [],
    formControls: createFormControls(),
    rightAnswerId: 1,
    isFormValid: false
  }

  onSubmitHandler(event) {
    event.preventDefault();
  }

  addQuastionHandler = () => {
    const quiz = [...this.state.quiz];
    const index = quiz.length + 1;
    const { question, option1, option2, option3, option4 } = this.state.formControls;
    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ]
    };
    quiz.push(questionItem);
    this.setState({
      quiz,
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false
    });
  }

  createQuizHandler = async () => {
    try {
      await axios.post('https://react-quiz-9ad61-default-rtdb.firebaseio.com/quizes.json', this.state.quiz);

      this.setState({
        quiz: [],
        formControls: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false
      });
    } catch (error) {
      console.log(error)
    }

    // axios.post('https://react-quiz-9ad61-default-rtdb.firebaseio.com/quizes.json', this.state.quiz)
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error))


  }

  onChangeHandler(value, controlName) {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);
    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName];

      return (
        <React.Fragment key={ i }>
          <Input
            type={ control.type }
            value={ control.value }
            valid={ control.valid }
            touched={ control.touched }
            label={ control.label }
            errorMessage={ control.errorMessage }
            shouldValidate={ !!control.validation }
            onChange={ event => this.onChangeHandler(event.target.value, controlName) }
          />
          { control.id ? null : <hr/>}
        </React.Fragment>
      )
    })
  }

  render() {
    return (
      <div className={ classes.QuizCreator }>
        <div>
          <h1>Create new quiz</h1>
          <form onSubmit={ this.onSubmitHandler }>

            { this.renderInputs() }

            <Select
              label='Choose right answer'
              value={ this.state.rightAnswerId }
              onChange={ this.selectChangeHandler }
              options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
              ]}
            />
            <Button
              type='primary'
              onClick={ this.addQuastionHandler }
              disabled={ !this.state.isFormValid }
            >
              Add quastion
            </Button>
            <Button
              type='success'
              onClick={ this.createQuizHandler }
              disabled={ this.state.quiz.length === 0 }
            >
              Create test
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
