import classes from './Input.module.scss';

function isInvalid({ valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

export const Input = props => {
  const cls = [ classes.Input ];
  const htmlFor = `${props.label}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={ cls.join(' ') }>
      <label htmlFor={ htmlFor }>{ props.label }</label>
      <input
        type={ props.type || 'text' }
        id={ htmlFor }
        value={ props.value }
        onChange={ props.onChange }
      />
      {
        isInvalid(props)
          ? <span>{ props.errorMessage || 'Enter right value'}</span>
          : null
      }
    </div>
  )
}
