import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Input, Tabs, Tag, Pagination } from "antd";
import { PlusOutlined, ExportOutlined } from "@ant-design/icons";
import OutlinedButton from "../../components/OutlinedButton";
import PrimaryButton from "../../components/PrimaryButton";

const TABS = [
  { label: "Todos", key: "all" },
  { label: "Activos", key: "active" },
  { label: "Borradores", key: "draft" },
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const filtered = PRODUCTS.filter(
    (p) =>
      (tab === "all" ||
        (tab === "active" ? p.status === "Activo" : p.status === "Borrador")) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()))
  );

  const columns = [
    { title: "SKU", dataIndex: "sku", key: "sku" },
    { title: "Nombre de producto", dataIndex: "name", key: "name" },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Activo" ? "green" : "default"}>{status}</Tag>
      ),
    },
    {
      title: "Inventario",
      dataIndex: "inventory",
      key: "inventory",
      render: (inv) => (
        <span
          style={{ color: inv === "Sin existencias" ? "#e74c3c" : undefined }}
        >
          {inv}
        </span>
      ),
    },
    { title: "Canal de venta", dataIndex: "channel", key: "channel" },
    { title: "Mercado", dataIndex: "market", key: "market" },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-2xl font-semibold text-white mb-2 md:mb-0">
          Productos
        </h2>
        <div className="flex gap-2">
          <OutlinedButton icon={<ExportOutlined />}>Exportar</OutlinedButton>
          <PrimaryButton
            icon={<PlusOutlined />}
            onClick={() => navigate("/products/add")}
          >
            Agregar producto
          </PrimaryButton>
        </div>
      </div>
      <Tabs
        activeKey={tab}
        onChange={setTab}
        items={TABS.map((t) => ({ label: t.label, key: t.key }))}
        className="mb-4"
      />
      <div className="flex justify-between items-center mb-4">
        <Input.Search
          className="w-60"
          placeholder="Buscar producto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filtered
          .slice((page - 1) * pageSize, page * pageSize)
          .map((p, i) => ({ ...p, key: p.sku + i }))}
        pagination={false}
        className="mb-4 bg-transparent"
      />
      <div className="flex justify-center mb-2">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={filtered.length}
          onChange={setPage}
          showSizeChanger={false}
        />
      </div>
      <div className="text-sm text-gray-500 text-center">
        Mostrando del {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1} al{" "}
        {Math.min(page * pageSize, filtered.length)} de {filtered.length}{" "}
        entradas
      </div>
    </>
  );
}
