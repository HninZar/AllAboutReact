import { useState } from "react";
import "./App.css";
import * as React from "react";

const INITIAL_STATE = {
  email: "",
  password: "",
};

type InitState = {
  email: string;
  password: string
}

const VALIDATION = {
  email: [
    {
      isValid: (value:unknown) => !!value,
      message: 'Is required.',
    },
    {
      isValid: (value:string) => /\S+@\S+\.\S+/.test(value),
      message: 'Needs to be an email.',
    },
  ],
  password: [
    {
      isValid: (value:string) => !!value,
      message: 'Is required.',
    },
  ],
};

const getErrorFields = (form:InitState) =>
  Object.keys(form).reduce((acc, key) => {

    if (!VALIDATION[key]) return acc;

    const errorsPerField = VALIDATION[key]

      .map((validation) => ({
        isValid: validation.isValid(form[key]),
        message: validation.message,
      }))
      // only keep the errors
      .filter((errorPerField) => !errorPerField.isValid);

    return { ...acc, [key]: errorsPerField };
  }, {});

const getDirtyFields = (form) => Object.keys(form).reduce((acc,key) => {
  const isDirty = form[key] !== INITIAL_STATE[key];
  return {...acc, [key]: isDirty};
}, {});

function App({ onLogin }) {
  const [form, setForm] = React.useState(INITIAL_STATE);

  const dirtyFields = getDirtyFields(form);
  const errorFields = getErrorFields(form);
  console.log(errorFields);
  const hasChanges = Object.values(dirtyFields).every(
    (isDirty) => !isDirty
  );

  const handleChange = (e:unknown) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e:unknown) => {
    e.preventDefault();

    alert(form.email + " " + form.password);
    
    const hasErrors = Object.values(errorFields).flat().length > 0;
    if (hasErrors) return;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            onChange={handleChange}
            value={form.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            onChange={handleChange}
            value={form.password}
          />
        </div>
        <button disabled={hasChanges} type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
