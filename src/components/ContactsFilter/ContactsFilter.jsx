import PropTypes from 'prop-types';
import css from './contactsFilter.module.css';

const ContactsFilter = ({ onInputChange }) => {
  return (
    <div className={css.filterBlock}>
      <h4 className={css.h4}>Find contacts by name</h4>
      <input
        name="filter"
        onChange={onInputChange}
        className={css.input}
        placeholder="Type name..."
        type="text"
      ></input>
    </div>
  );
};

ContactsFilter.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};

export default ContactsFilter;
