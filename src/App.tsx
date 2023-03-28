import { FC, ChangeEvent, FormEvent, useState } from "react";
import "semantic-ui-css/semantic.min.css";

import { FormErrors, FormValues } from "./types";
import "./App.css";

const App: FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};
    const usernameRegex = /^[a-zA-Z]{5,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/i;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

    if (!values.username) {
      errors.username = "Username is required";
    } else if (values.username.length < 5) {
      errors.username = "Username must be more than 4 characters";
    } else if (!usernameRegex.test(values.username)) {
      errors.username = "Numbers or symbols are not allowed";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 3 characters";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Passord must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol (@$!%*?&)";
    }
    return errors;
  };

  const signedIn = (): JSX.Element => {
    setTimeout(() => window.location.reload(), 1500);
    return (
      <div className="ui message success">
        <h3>Signed in successfully</h3>
      </div>
    );
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        signedIn()
      ) : (
        // <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
        <form onSubmit={handleSubmit}>
          <h1>Login Form</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="johndoe"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.username}</p>
            <div className="field">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="john@doe.com"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.email}</p>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="P@$$w0rd"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <p>{formErrors.password}</p>
            <button className="fluid ui button blue">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default App;
