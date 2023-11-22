import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveContact, removeContact, refreshFilter } from "./redux/contactSlice.js";
import ContactForm from "./ContactForm/ContactForm.jsx";
import Filter from "./Filter/Filter.jsx";
import ContactList from "./ContactList/ContactList.jsx";
import {nanoid} from 'nanoid'
import css from './App.module.css'

const App = () => {
  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.contacts.contacts)
  const filter = useSelector((state) => state.contacts.filter)
  localStorage.clear()

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts')
    if (storedContacts) {
      dispatch(saveContact(JSON.parse(storedContacts)))
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  const handleSubmit = (data) => {
    const chosenName = contacts.find(
      (element) =>
        element.name && element.name.toLowerCase() === data.name.toLowerCase()
    );
  
    if (chosenName) {
      alert(chosenName.name + ' is already in contacts');
    } else {
      data.id = nanoid();
      dispatch(saveContact(data));
    }
  };
  const changeFilter = (event) => {
    dispatch(refreshFilter(event.currentTarget.value))
  }
  const getVisibleContacts = () => {
    const normalizedFilter = filter ? filter.toLowerCase() : '';
    return contacts
      ? contacts.filter(
          (contact) =>
            contact.name &&
            contact.name.toLowerCase().includes(normalizedFilter)
        )
      : [];
  };
  const handleRemoveContact = (contactID) => {
    dispatch(removeContact(contactID))
  }

  return(
    <div>
       <div>
        <h2 className={css.header}>Phonebook</h2>
        <ContactForm onSubmit={handleSubmit} />
      </div>
      <div>
        <h2 className={css.header}>Contacts</h2>
        {contacts.length > 0 ? (
          <Filter value={filter} onChange={changeFilter} />
        ) : (
          <span>Your phonebook is empty. Add your first contact!</span>
        )}
        {contacts.length > 0 && (
          <ContactList contacts={getVisibleContacts()} onRemove={handleRemoveContact} />
        )}
      </div>
    </div>
  )
}

export default App;