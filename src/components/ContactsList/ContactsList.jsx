import PropTypes from 'prop-types';
import css from './contactsList.module.css';

const ContactsList = ({ deleteContact, acceptedContacts }) => {
  const allContacts = acceptedContacts.map(({ id, name, number }) => (
    <li key={id} className={css.li}>
      {name}: {number}
      <button
        onClick={() => deleteContact(id)}
        type="button"
        className={css.button}
      >
        Delete
      </button>
    </li>
  ));
  return <ul className={css.ul}>{allContacts}</ul>;
};

ContactsList.defaultProps = {
  acceptedContacts: [],
};

ContactsList.propTypes = {
  deleteContact: PropTypes.func.isRequired,
  acceptedContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactsList;
