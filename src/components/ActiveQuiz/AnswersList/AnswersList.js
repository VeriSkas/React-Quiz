import classes from './AnswersList.module.scss';
import { AnswerItem } from './AnswerItem/AnswerItem';

export const AnswersList = props => {
  return (
    <div>
      <ul className={classes.AnswersList}>
        {props.answers.map((item, i) => {
          return <AnswerItem
            answer={ item }
            key={ i }
            onAnswerClick={ props.onAnswerClick }
            state={ props.state ? props.state[item.id] : null }
          />;
        })}
      </ul>
    </div>
  );
};
