import React from "react";
import PropTypes from 'prop-types';
import css from './Filter.module.css';
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "components/redux/filterSlice";

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleChange = (event) => {
    dispatch(changeFilter(event.currentTarget.value));
  };

  return (
    <div className={css.container}>
      <h3 className={css.header}> Search Name</h3>
      <label className={css.label}>
        <input
          className={css.input}
          type="text"
          value={filter}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;