import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactsList from './ContactsList';
import ContactsFilter from './ContactsFilter';
import ContactsForm from './ContactsForm';

import css from './app.module.css';

export class App extends Component {
  state = {
    contacts: [],
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
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(result);
  }

  addContact = ({ name, number }) => {
    // console.log(this.state);
    if (this.isAlreadyExists(name)) {
      return alert(`${name} is already in your contacts!`);
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
    const {filter} = this.state;
    const acceptedContacts = this.getFilteredContacts();

    return (
      <>
        <div className={css.block}>
          <div className={css.wrapper}>
            <h2 className={css.h2}>Phonebook</h2>
            <ContactsForm onSubmit={addContact} />
          </div>
          <div className={css.wrapper}>
            <h3 className={css.h3}>Contacts</h3>
            <ContactsFilter onInputChange={handleFilter} filter={filter}/>
            <ContactsList
              deleteContact={deleteContact}
              acceptedContacts={acceptedContacts}
            />
          </div>
        </div>
      </>
    );
  }
}
