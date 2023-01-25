import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './contactsForm.module.css';

class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = ({ target }) => {
    // console.log(target);
    // console.log(target.value);
    // console.log(target.name);
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { onInputChange, handleSubmit } = this;
    const { name, number } = this.state;
    return (
      <form onSubmit={handleSubmit}>
        <div className={css.form}>
          <div className={css.formInput}>
            <label className={css.label}>Name</label>
            <input
              onChange={onInputChange}
              value={name}
              className={css.inputField}
              placeholder="Type name..."
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </div>
          <div className={css.formInput}>
            <label className={css.label}>Number</label>
            <input
              onChange={onInputChange}
              value={number}
              className={css.inputField}
              placeholder="Type number..."
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>
          <div>
            <button type="submit" className={css.button}>Add contact</button>
          </div>
        </div>
      </form>
    );
  }
}

export default ContactsForm;

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
