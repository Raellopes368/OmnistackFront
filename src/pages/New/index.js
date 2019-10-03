import React, { useState, useMemo } from "react";
import camera from "../../assets/camera.svg";
import "./styles.css";
import api from "../../services/api";
export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  },
    [thumbnail]
  );
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("techs", techs);
    formData.append("company", company);
    formData.append("price", price);
    const user_id = localStorage.getItem("user");
    await api.post("/spots", formData, {
      headers: { user_id }
    });
    history.push("/dashboard");

  }
  return (
    <form onSubmit={handleSubmit}>
      <label id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={preview ? "hasThumbnail" : ""}
      >
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>
      <label htmlFor="company">Empresa *</label>
      <input type="text"
        id="company"
        value={company}
        placeholder="Sua empresa incrível"
        onChange={e => setCompany(e.target.value)}
      />
      <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
      <input type="text"
        id="techs"
        placeholder="Quais usam tecnologias usam?"
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />
      <label htmlFor="price">Valor da diária * <span>(em branco pra GRATUITO)</span></label>
      <input type="text"
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  );
}