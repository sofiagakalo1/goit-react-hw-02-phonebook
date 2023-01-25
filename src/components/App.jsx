import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactsList from './ContactsList';
import ContactsFilter from './ContactsFilter';
import ContactsForm from './ContactsForm';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  isAlreadyExists(name, number) {
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
  }

  addContact = ({ name, number }) => {
    // console.log(this.state);
    if (this.isAlreadyExists(name, number)) {
      return alert(
        `${name} with number ${number} is already in your contacts!`
      );
    }
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [newContact, ...contacts], name: '', number: '' };
    });
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

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  render() {
    const { addContact, deleteContact, handleFilter } = this;
    const acceptedContacts = this.getFilteredContacts();

    return (
      <>
        <div>
          <h2>Phonebook</h2>
          <ContactsForm onSubmit={addContact} />
        </div>
        <div>
          <h3>Contacts</h3>
          <ContactsFilter onInputChange={handleFilter} />
          <ContactsList
            deleteContact={deleteContact}
            acceptedContacts={acceptedContacts}
          />
        </div>
      </>
    );
  }
}
