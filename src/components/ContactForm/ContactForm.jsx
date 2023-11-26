import React, {useState} from "react";
import { nanoid } from "nanoid";
import css from './contactForm.module.css'
import { useSelector, useDispatch} from 'react-redux';
import { selectContacts } from "components/redux/selectors";
import { addContacts } from "components/redux/operations";




function ContactForm() {
 const [name, setName] = useState('')
 const [number, setNumber] = useState('')
 const nameInputId= nanoid()
const numberInputId = nanoid()

const contacts = useSelector(selectContacts)
const dispatch = useDispatch()


  const handleSubmit = (event) => {
   event.preventDefault()
   const isInContacts = contacts.some(contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim())
   if(isInContacts) {
    alert(`${name} is already in contacts`)
    return 
   }
   dispatch(addContacts({name, number}))
   console.log(`${name}, ${number}`)
   setName('')
   setNumber('')
  }


  const handleChange = (event) => {
    const {name, value} = event.target
   switch (name) {
    case'name':
    setName(value)
    break
    case'number':
    setNumber(value)
    break
    default:
      return
   }}

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor={nameInputId}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.label} htmlFor={numberInputId}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button className={css.button} type="submit">Add contact </button>
    </form>
   )
}

export default ContactForm