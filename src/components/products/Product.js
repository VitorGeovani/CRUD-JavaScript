import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
    const [product, setProduct] = useState({
        name: "",
        price: "",
        description: ""
    });
    const { id } = useParams();
    useEffect(() => {
        loadProduct();
    }, []);
    const loadProduct = async () => {
        const res = await axios.get(`http://localhost:3003/products/${id}`);
        setProduct(res.data);
    }

    return (
        <div className="container py-4">
          <Link className="btn btn-primary" to="/">
            <strong>Voltar para a Home</strong>
          </Link>
          <h1 className="display-4"><strong>Você está vendo o produto de número: {id}</strong></h1>
          <hr />
          <ul className="list-group w-50">
            <li className="list-group-item"><strong>Nome do produto: {product.name}</strong></li>
            <li className="list-group-item"><strong>Valor do produto: {product.price}</strong></li>
            <li className="list-group-item"><strong>Descrição do produto: {product.description}</strong></li>
          </ul>
        </div>
      );
}

export default Product;