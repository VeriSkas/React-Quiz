import classes from './MenuToggle.module.scss';
import 'boxicons';

export const MenuToggle = props => {
  return (
    <span
      onClick={ props.onToggle }
      className={ props.isOpen ? `${classes.MenuToggle} ${classes.open}` : classes.MenuToggle }
    >
      <box-icon name={ props.isOpen ? 'chevron-left-circle' : 'menu'} color='#fff' size='40px'/>
    </span>
  )
}
