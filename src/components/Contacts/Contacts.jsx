import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactsList from './ContactsList';

class Contacts extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  addContact = event => {
    event.preventDefault();
    // console.log(this.state);
    const { name, number } = this.state;
    const { isAlreadyExists } = this;
    if (isAlreadyExists(name, number)) {
      return alert(
        `${name} with number ${number} is already in your contacts!`
      );
    }
    this.setState(prevState => {
      const { contacts, name, number } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts], name: '', number: '' };
    });
  };

  onInputChange = ({ target }) => {
    // console.log(event.target);
    // console.log(event.target.value);
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  deleteContact = id => {
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  isAlreadyExists = (name, number) => {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const result = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName &&
        number.toLowerCase() === normalizedNumber
      );
    });
    return Boolean(result);
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }

  render() {
    const { addContact, onInputChange, deleteContact } = this;
    const { name, number } = this.state;
    const acceptedContacts = this.getFilteredContacts();

    const allContacts = acceptedContacts.map(({ id, name, number }) => (
      <li key={id}>
        {name}: {number}
        <button onClick={() => deleteContact(id)} type="button">
          Delete
        </button>
      </li>
    ));
    return (
      <>
        <div>
          <h2>Phonebook</h2>
          <form action="" onSubmit={addContact}>
            <div>
              <h4>Name</h4>
              <input
                onChange={onInputChange}
                value={name}
                placeholder="Type name..."
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </div>
            <div>
              <h4>Number</h4>
              <input
                onChange={onInputChange}
                value={number}
                placeholder="Type number..."
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </div>
            <div>
              <button type="submit">Add contact</button>
            </div>
          </form>
        </div>
        <div>
          <h3>Contacts</h3>
          <h4>Find contacts by name</h4>
          <input
            name="filter"
            onChange={onInputChange}
            placeholder="Type name..."
            type="text"
          ></input>
          {/* <ul>{allContacts}</ul> */}
          <ContactsList/>
        </div>
      </>
    );
  }
}

export default Contacts;
