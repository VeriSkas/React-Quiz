import classes from './FinishedQuiz.module.scss';
import { Button } from '../UI/Button/Button';
import { Link } from 'react-router-dom';

export const FinishedQuiz = props => {
  const goodResult = Object.values(props.results)
    .filter(item => item === 'success').length;

  return (
    <div className={ classes.FinishedQuiz }>
      <ul>
        { props.questions.map((item, i) => {
          return <li key={ i }>
            <strong>{ i + 1 }. &ensp;</strong>
            { item.question }
            {
              (props.results[item.id] === 'success')
                ? <box-icon name='check' color='#11e45a'/>
                : <box-icon name='x' color='red'/>
            }
          </li>
        })}
      </ul>

      <p>Правильно { goodResult } из { props.questions.length }</p>
      <div>
        <Button onClick={ () => props.onRepitHandler() }>Повторить</Button>
        <Link to='/'>
          <Button type='success'>Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  )
}
