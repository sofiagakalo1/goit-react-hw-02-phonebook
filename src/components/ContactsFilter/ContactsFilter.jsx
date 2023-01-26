import PropTypes from 'prop-types';
import css from './contactsFilter.module.css';

const ContactsFilter = ({ onInputChange, filter }) => {
  return (
    <div className={css.filterBlock}>
      <h4 className={css.h4}>Find contacts by name</h4>
      <input
        name="filter"
        onChange={onInputChange}
        className={css.input}
        placeholder="Type name..."
        type="text"
        value={filter}
      ></input>
    </div>
  );
};

ContactsFilter.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default ContactsFilter;
