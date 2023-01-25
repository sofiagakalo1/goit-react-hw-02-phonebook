import PropTypes from 'prop-types';

const ContactsFilter = ({ onInputChange }) => {
  return (
    <div>
      {' '}
      <h4>Find contacts by name</h4>
      <input
        name="filter"
        onChange={onInputChange}
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
