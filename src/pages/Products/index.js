import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Input, Tag, Pagination } from "antd";
import {
  PlusOutlined,
  ExportOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import OutlinedButton from "../../components/OutlinedButton";
import PrimaryButton from "../../components/PrimaryButton";
import MainInput from "../../components/MainInput";

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
  const [pageSize] = useState(10);
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between w-full">
          <h2 className="text-2xl font-semibold text-white">Productos</h2>
          <div className="flex gap-3 order-2 md:order-1">
            <OutlinedButton icon={<ExportOutlined />}>Exportar</OutlinedButton>
            <PrimaryButton
              icon={<PlusOutlined />}
              onClick={() => navigate("/products/add")}
            >
              Agregar producto
            </PrimaryButton>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex gap-2">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition-colors duration-150 ${
                  tab === t.key
                    ? "bg-[#BAC887] text-[#181A1B] border-[#BAC887]"
                    : "bg-transparent text-white border-[#343434] hover:bg-[#232323]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <MainInput
            className="w-60 self-end"
            placeholder="Buscar producto"
            value={search}
            prefix={<SearchOutlined />}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
        </div>
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
    </div>
  );
}
