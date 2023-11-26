import React from "react";
import css from './Filter.module.css';
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "components/redux/filterSlice";
import { selectFilterValue } from "components/redux/selectors"; 

function Filter() {
  const dispatch = useDispatch();
  const value = useSelector(selectFilterValue)

  const handleChange = (event) => {
   const normalizedValue = event.target.value.toLowerCase()
   dispatch(changeFilter(normalizedValue))
  };

  return (
    <div className={css.container}>
      <h3 className={css.header}> Search Name</h3>
      <label className={css.label}>
        <input
          className={css.input}
          type="text"
          value={value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}


export default Filter;