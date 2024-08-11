import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../Contexts/AuthContext";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth('actions');

  const [{ data, isError, isLoading }, doFetch] = useFetch(
    "https://sandbox.academiadevelopers.com/api-auth/"
  );

  function handleSubmit(event) {
    event.preventDefault();
    setTriggerFetch(true);
    doFetch({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  }

  useEffect(() => {
    if (data && data.token) {
      login(data.token);
    }
  }, [data, login]);

  return (
    <section className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
                <span className="input-group-text">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <span className="input-group-text">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Submit
              </button>
              {isLoading && triggerFetch && <div className="mt-2">Loading...</div>}
              {isError && <div className="mt-2 text-danger">Error loading data.</div>}
              {data && <div className="mt-2">Token obtained: {data.token}</div>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
