import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://655e2ef59f1e1093c59aabaf.mockapi.io';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkApi) => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const addContacts = createAsyncThunk('contacts/addContacts', async ({ name, number }, thunkAPI) => {
  try {
    const response = await axios.post('/contacts', { name, number });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteContacts = createAsyncThunk('contacts/deleteContacts', async (contactsId, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${contactsId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});