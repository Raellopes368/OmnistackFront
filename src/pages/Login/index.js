import React, { Fragment, useState } from "react";
import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    if (email.length) {
      const { data } = await api.post("/sessions", { email });
      const id = data._id;
      localStorage.setItem("user", id);
      history.push("/dashboard");
    }
  }

  return (
    <Fragment>
      <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email *</label>
        <input type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Seu melhor email" />
        <button type="submit" className="btn" >Entrar</button>
      </form >
    </Fragment>
  );
}