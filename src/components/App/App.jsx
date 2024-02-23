import { nanoid } from 'nanoid';
import { Component } from 'react';
import styles from './App.module.css';
import { ContactForm, ContactList, Filter } from 'components';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      const localContacts = JSON.parse(localData);
      if (Array.isArray(localContacts) && localContacts.length) {
        this.setState({ contacts: [...localContacts] });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = data => {
    const { name } = data;

    const isExist = this.state.contacts.some(
      contact => contact.name.toUpperCase() === name.toUpperCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { id: nanoid(), ...data }],
      };
    });
  };

  getContacts = () =>
    this.state.contacts.filter(({ name }) =>
      name.toUpperCase().includes(this.state.filter.toUpperCase())
    );

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  deleteContact = id =>
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));

  render() {
    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} changeFilter={this.changeFilter} />
        <ContactList
          contacts={this.getContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
