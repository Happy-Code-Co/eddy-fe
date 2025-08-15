import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const TABS = [
  { label: "Todos", value: "all" },
  { label: "Activos", value: "active" },
  { label: "Borradores", value: "draft" },
];

const PRODUCTS = [
  {
    sku: "KIT001",
    name: "T-Shirt's",
    status: "Borrador",
    inventory: "Sin existencias",
    channel: 1,
    market: 2,
  },
  {
    sku: "KIT002",
    name: "Jackets",
    status: "Activo",
    inventory: "24 en stock",
    channel: 1,
    market: 2,
  },
  {
    sku: "KIT003",
    name: "Trouser",
    status: "Activo",
    inventory: "Inventario no rastreado",
    channel: 1,
    market: 1,
  },
  {
    sku: "KIT004",
    name: "Jean",
    status: "Activo",
    inventory: "24 en stock",
    channel: 3,
    market: 1,
  },
  {
    sku: "KIT005",
    name: "Blazer",
    status: "Borrador",
    inventory: "Sin existencias",
    channel: 2,
    market: 2,
  },
  {
    sku: "KIT006",
    name: "Boxer",
    status: "Activo",
    inventory: "Inventario no rastreado",
    channel: 2,
    market: 2,
  },
  {
    sku: "KIT007",
    name: "Hat",
    status: "Activo",
    inventory: "Inventario no rastreado",
    channel: 3,
    market: 1,
  },
  {
    sku: "KIT008",
    name: "Belt",
    status: "Activo",
    inventory: "24 en stock",
    channel: 1,
    market: 2,
  },
  {
    sku: "KIT009",
    name: "Hoodie",
    status: "Borrador",
    inventory: "24 en stock",
    channel: 2,
    market: 1,
  },
  {
    sku: "KIT010",
    name: "Sweater",
    status: "Borrador",
    inventory: "Inventario no rastreado",
    channel: 1,
    market: 2,
  },
];

export default function ProductsPage() {
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = PRODUCTS.filter(
    (p) =>
      (tab === "all" ||
        (tab === "active" ? p.status === "Activo" : p.status === "Borrador")) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="products-page">
      <div className="products-header">
        <h2>Productos</h2>
        <div className="products-header-actions">
          <button className="export-btn">Exportar</button>
          <button className="add-btn" onClick={() => navigate('/products/add')}>Agregar producto</button>
        </div>
      </div>
      <div className="products-tabs">
        {TABS.map((t) => (
          <button
            key={t.value}
            className={tab === t.value ? "active" : ""}
            onClick={() => setTab(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="products-table-controls">
        <input
          className="search-bar"
          placeholder="Buscar producto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Nombre de producto</th>
              <th>Estado</th>
              <th>Inventario</th>
              <th>Canal de venta</th>
              <th>Mercado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.sku + i}>
                <td>{p.sku}</td>
                <td>{p.name}</td>
                <td>
                  <span
                    className={
                      p.status === "Activo" ? "status-active" : "status-draft"
                    }
                  >
                    {p.status}
                  </span>
                </td>
                <td
                  className={
                    p.inventory === "Sin existencias" ? "out-of-stock" : ""
                  }
                >
                  {p.inventory}
                </td>
                <td>{p.channel}</td>
                <td>{p.market}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="products-pagination">
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <span>...</span>
        <button className="page-btn">13</button>
      </div>
      <div className="products-footer">
        Mostrando del 1 al 10 de 135 entradas
      </div>
    </div>
  );
}
