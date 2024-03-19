import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  useEffect(() => {
    axios("http://localhost:8080/api/products")
      .then((res) => {
        console.log(res.data.response);
        setProducts(res.data.response.docs);
        setPrev(res.data.response.prevPage);
        setNext(res.data.response.nextPage);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Max Power Parts
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto">
              <a
                id="btnForm"
                className="nav-link ms-4 m-1 d-flex"
                href="/products/form"
              >
                New product
              </a>
              <a
                id="btnReg"
                className="nav-link ms-4 m-1"
                href="/auth/register"
              >
                Register
              </a>
              <a id="btnLog" className="nav-link ms-4 m-1" href="/auth/login">
                login
              </a>
              <a id="btnOrder" className="nav-link ms-4 m-1" href="/orders">
                🛒
              </a>
              <span id="btnOut" className="btn btn-warning m-1">
                Sign out
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <img src="./media/logo2.jpg" alt="logo" className="w-100" />
        <article className="mt-4 mb-4">
          <h1 className="m-auto text-center">
            Bienvenidos a{" "}
            <strong className="text-warning">Max Power Parts.srl</strong>.
          </h1>
          <p className="fs-4 text-center">
            Nos dedicamos a la venta de autopartes y motopartes para cúalquier
            vehiculo, nacional o importado, trabajando con las marcas más
            reconocidas en todo el mundo.
          </p>
        </article>
        <h3 className="mt-4 mb-3 text-center text-warning">Products</h3>
        <span className="justify-content-center align-items-center d-flex m-3">
          <input
            id="text"
            type="text"
            className="p-2 text-center w-25"
            placeholder="Type for search..."
          />
          <button id="search" className="btn btn-success">
            Search🔍
          </button>
        </span>

        <section
          id="products"
          className="d-flex flex-wrap justify-content-evenly m-auto "
        >
          {products.map((each) => (
            <a
              key={each._id}
              href="#"
              className="card bg-secondary m-3 text-decoration-none w-25 "
            >
              <img
                src={each.photo}
                className="card-img-top object-fit-cover m-auto"
                alt="{each.title}"
              />

              <h4 className="p-2 text-center card-title text-white">
                {each.title}{" "}
              </h4>
            </a>
          ))}
        </section>

        <span className="w-100 d-flex justify-content-center">
          {prev && (
            <a
              className="btn btn-warning fs-5 m-4 mt-0"
              href="/?title={{filter}}&page={{prev}}"
            >
              {" "}
              {"<"}{" "}
            </a>
          )}

          {next && (
            <a
              className="btn btn-warning fs-5 m-4 mt-0"
              href="/?title={{filter}}&page={{next}}"
            >
              {" "}
              {">"}{" "}
            </a>
          )}
        </span>
      </main>

      <footer className="bg-dark text-center fs-3 d-block p-3 text-white">
        Copyright - Max Power Parts 2023©. All rights reserved
      </footer>
    </>
  );
}

export default App;
