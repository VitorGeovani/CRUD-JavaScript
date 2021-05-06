import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditProduct = () => {
    let history = useHistory();
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: ""
    });

    const { name, price, description } = product;
    const onInputChange = e => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadProduct();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:3003/products/${id}`, product);
        history.push("/");
    };

    const loadProduct = async () => {
        const result = await axios.get(`http://localhost:3003/products/${id}`);
        setProduct(result.data);
    }

    return(
        <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edite o produto</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Digite o nome do produto"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Digite o valor do produto"
              name="price"
              value={price}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Descreva o produto a ser adicionado"
              name="description"
              value={description}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button id="att" className="btn btn-primary btn-block"><strong>Atualizar produto</strong></button>
        </form>
      </div>
    </div>
    );
}

export default EditProduct;