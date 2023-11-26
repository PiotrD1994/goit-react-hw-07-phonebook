import React from "react";
import {useSelector, useDispatch } from "react-redux";
import { deleteContacts } from "components/redux/contactSlice";
import css from './ContactList.module.css';
import { selectVisibleContacts } from "components/redux/selectors";

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectVisibleContacts)

  const handleRemoveContact = (contactId) => {
    dispatch(deleteContacts(contactId));
  };

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {contacts.map((contact) => (
          <li className={css.item} key={contact.id}>
            {contact.name}: {contact.number}
            <button className={css.button} onClick={() => handleRemoveContact(contact.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default ContactList;