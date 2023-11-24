import React from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { deleteContact } from "components/redux/contactSlice";
import css from './ContactList.module.css';

function ContactList({ contacts }) {
  const dispatch = useDispatch();

  const handleRemoveContact = (contactId) => {
    dispatch(deleteContact(contactId));
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

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
};

export default ContactList;