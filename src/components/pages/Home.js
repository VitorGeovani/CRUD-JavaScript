import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []); 

    const loadProducts = async () => {
        const result = await axios.get("http://localhost:3003/products");
        setProducts(result.data.reverse());
    }

    const deleteProduct = async id => {
        await axios.delete(`http://localhost:3003/products/${id}`);
        loadProducts();
    }

    return(
        <div className="container">
            <div className="py-4">
                <h1>Veja aqui os produtos adicionados!</h1>
            <table class="table border shadow">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome do produto</th>
                    <th scope="col">Valor do produto</th>
                    <th scope="col">Descrição do produto</th>
                    <th>Ações</th>
                    </tr>
                </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr>
                    <th scope="row">{index + 1}</th>
                    <td><strong>{product.name}</strong></td>
                    <td><strong>{product.price}</strong></td>
                    <td><strong>{product.description}</strong></td>
                    <td>
                    <Link id="visu" class="btn btn-primary mr-2" to={`/products/${product.id}`}>
                        <strong>Visualizar</strong>
                    </Link>
                    <Link id="edit" class="btn btn-warning" to={`/products/edit/${product.id}`}>
                        <strong>Editar</strong>
                    </Link>
                    <Link class="btn btn-danger" onClick={() => deleteProduct(product.id)}>
                        <strong>Deletar</strong>
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
        </div>
    );
}


export default Home;