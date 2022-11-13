import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Backdrop } from '../../UI/Button/Backdrop/Backdrop';
import classes from './Drawer.module.scss';

const links = [
  {
    to: '/',
    label: 'List'
  },
  {
    to: '/auth',
    label: 'Auth'
  },
  {
    to: '/quiz-creator',
    label: 'Quiz Creator'
  },

]

export class Drawer extends Component {
  renderLinks() {
    return links.map((link, i) => {
      return (
        <li key={ i }>
          <NavLink
            to={ link.to }
            className={ ({ isActive }) => isActive ? classes.active : '' }
            onClick={ this.props.onClose }
          >
            { link.label }
          </NavLink>
        </li>
      )
    })
  }

  render() {
    return (
      <>
        <nav className={ this.props.isOpen ? classes.Drawer : `${classes.Drawer} ${classes.close}` }>
          <ul>
            { this.renderLinks() }
          </ul>
        </nav>
        { this.props.isOpen ? <Backdrop onClick={ this.props.onClose } /> : null }
      </>
    )
  }
}
