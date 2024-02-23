import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { ContactForm, ContactList, Filter } from 'components';

export const App = () => {
  const getContactsLS = () => {
    const localData = localStorage.getItem('contacts');
    if (localData) {
      const localContacts = JSON.parse(localData);
      if (Array.isArray(localContacts) && localContacts.length) {
        return localContacts;
      }
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  };
  const [contacts, setContacts] = useState(getContactsLS());

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const { name } = data;

    const isExist = contacts.some(
      contact => contact.name.toUpperCase() === name.toUpperCase()
    );

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(prevState => [...prevState, { id: nanoid(), ...data }]);
  };

  const getContacts = () =>
    contacts?.filter(({ name }) =>
      name?.toUpperCase().includes(filter.toUpperCase())
    );

  const changeFilter = event => setFilter(event.target.value);

  const deleteContact = id =>
    setContacts(prevState => prevState.filter(el => el.id !== id));

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      <ContactList contacts={getContacts()} deleteContact={deleteContact} />
    </div>
  );
};
