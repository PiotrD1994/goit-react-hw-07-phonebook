import React, {useState} from "react";
import { nanoid } from "nanoid";
import css from './contactForm.module.css'

function ContactForm({onSubmit}) {
  const [formData, setFormData] = useState({
    name:'',
    number:'',
})

  const nameInputId= nanoid()
  const numberInputId = nanoid()

  const handleSubmit = (event) => {
    event.preventDefault() 
 onSubmit({id: nanoid(), ...formData})
  reset()
}

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormData((prevData) => ({...prevData, [name]: value}))
  }
  const reset = () => {
    setFormData({name:'', number:''})
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor={nameInputId}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          value={formData.name}
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
          value={formData.number}
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