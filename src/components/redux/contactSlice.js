import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContacts, deleteContacts } from './operations.js';

const getActions = (type) => isAnyOf(fetchContacts[type], addContacts[type], deleteContacts[type]);

const initialState = { items: [], isLoading: false, error: null };

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action) {
      state.items.unshift(action.payload);
    },
    deleteContact(state, action) {
      const index = state.items.findIndex((contact) => contact.id === action.payload.id);
      state.items.splice(index, 1);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        const index = state.items.findIndex((contact) => contact.id === action.payload.id);
        state.items.splice(index, 1);
      })
      .addMatcher(getActions('pending'), (state) => {
        state.isLoading = true;
      })
      .addMatcher(getActions('rejected'), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(getActions('fulfilled'), (state) => {
        state.isLoading = false;
        state.error = null;
      }),
});

export const { addContact, deleteContact } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;