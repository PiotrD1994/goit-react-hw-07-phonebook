import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/operations.js";
import { selectContacts } from './redux/selectors.js';
import ContactForm from "./ContactForm/ContactForm.jsx";
import Filter from "./Filter/Filter.jsx";
import ContactList from "./ContactList/ContactList.jsx";
import css from './App.module.css';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  

  return (
    <div>
      <div>
        <h2 className={css.header}>Phonebook</h2>
        <ContactForm />
      </div>
      <div>
        <h2 className={css.header}>Contacts</h2>
        {contacts.length > 0 ? (
          <Filter/>
        ) : (
          <span>Your phonebook is empty. Add your first contact!</span>
        )}
        {contacts.length > 0 && (
          <ContactList/>
        )}
      </div>
    </div>
  );
}

export default App;