import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Checkbox,
  Tabs,
  Tag,
  Space,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const TABS = [
  { label: "Información del producto", key: "info" },
  { label: "Opciones y precios", key: "options" },
  { label: "SEO y publicación", key: "seo" },
];

const CATEGORIES = ["T-shirt", "Man", "Clothing", "Fashion"];

export default function AddProduct() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("info");
  const [form] = Form.useForm();
  const [images, setImages] = useState([
    { url: "/img1.jpg" },
    { url: "/img2.jpg" },
    { url: "/img3.jpg" },
    { url: "/img4.jpg" },
    { url: "/img5.jpg" },
    { url: "/img6.jpg" },
  ]);
  const [seoImages, setSeoImages] = useState([
    { url: "/img1.jpg" },
    { url: "/img2.jpg" },
  ]);

  // Stepper info for each tab
  const stepper = {
    info: {
      step: 1,
      title: "¡Empecemos con lo básico!",
      desc: "Paso 1 de 3: información del producto",
    },
    options: {
      step: 2,
      title: "¡Dale forma a tu producto!",
      desc: "Paso 2 de 3: Variantes, precios e inventario",
    },
    seo: {
      step: 3,
      title: "¡Ya casi terminas!",
      desc: "Paso 3 de 3: SEO y publicación",
    },
  };

  // Tabs definition
  const tabItems = [
    {
      key: "info",
      label: "Información del producto",
      children: (
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: "T-Shirt",
            desc: "Elevate your casual wardrobe with our Classic Cotton Crew Neck T-Shirt, a timeless essential designed for both comfort and style. Crafted from 100% premium cotton, this T-shirt offers a soft, breathable fabric that ensures all-day comfort, making it perfect for any season.",
            category: ["Camiseta"],
            tags: CATEGORIES,
            status: "Borrador",
          }}
        >
          <Form.Item
            label="Nombre del producto"
            name="name"
            rules={[{ required: true, message: "Requerido" }]}
          >
            {" "}
            <Input />{" "}
          </Form.Item>
          <Form.Item label="Descripción (Opcional)" name="desc">
            {" "}
            <Input.TextArea autoSize={{ minRows: 3 }} />{" "}
          </Form.Item>
          <Form.Item label="Categoría" name="category">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              tokenSeparators={[","]}
            />
          </Form.Item>
          <Form.Item label="Etiquetas" name="tags">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              tokenSeparators={[","]}
            />
          </Form.Item>
          <Form.Item label="Estado" name="status">
            <Select>
              <Select.Option value="Borrador">Borrador</Select.Option>
              <Select.Option value="Publicado">Publicado</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Imágenes">
            <Upload
              listType="picture-card"
              fileList={images.map((img, i) => ({
                uid: i,
                url: img.url,
                name: `img${i}`,
              }))}
              showUploadList={{ showRemoveIcon: false }}
              beforeUpload={() => false}
            >
              {images.length < 8 && (
                <div>
                  <PlusOutlined /> Subir
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "options",
      label: "Opciones y precios",
      children: (
        <Form layout="vertical">
          <Form.Item label="Variantes">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                placeholder="Agregar tallas (ej: XS, S, M, L)"
                style={{ maxWidth: 300 }}
              />
              <Space>
                {["S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                  <Tag key={size}>{size}</Tag>
                ))}
              </Space>
              <Input placeholder="Agregar colores" style={{ maxWidth: 300 }} />
              <Space>
                <Input
                  type="color"
                  value="#FFFFFF"
                  style={{ width: 32, height: 32, padding: 0 }}
                  readOnly
                />
                <Input
                  type="color"
                  value="#000000"
                  style={{ width: 32, height: 32, padding: 0 }}
                  readOnly
                />
                <Input
                  type="color"
                  value="#FDC12B"
                  style={{ width: 32, height: 32, padding: 0 }}
                  readOnly
                />
                <Button icon={<PlusOutlined />} />
              </Space>
              <Select defaultValue="Cuero" style={{ maxWidth: 200 }}>
                <Select.Option value="Cuero">Cuero</Select.Option>
                <Select.Option value="Algodón">Algodón</Select.Option>
                <Select.Option value="Lino">Lino</Select.Option>
              </Select>
              <Space>
                <Tag>Algodón</Tag>
                <Tag>Lino</Tag>
                <Tag closable>X</Tag>
              </Space>
              <Space>
                <span>1 unidad - $10</span>
                <Button icon={<PlusOutlined />} />
              </Space>
            </Space>
          </Form.Item>
          <Form.Item label="Precio normal y en oferta">
            <Space>
              <Input
                addonBefore="Precio actual"
                defaultValue={32}
                prefix="$"
                style={{ width: 160 }}
              />
              <Input
                addonBefore="Precio original"
                defaultValue={38}
                prefix="$"
                style={{ width: 160 }}
              />
            </Space>
            <Checkbox checked style={{ marginTop: 8 }}>
              Aplicar impuestos a este producto
            </Checkbox>
            <Space style={{ marginTop: 8 }}>
              <Input
                addonBefore="Costo por unidad"
                defaultValue={25}
                prefix="$"
                style={{ width: 160 }}
              />
              <Input
                addonBefore="Ganancia estimada"
                defaultValue={7}
                prefix="$"
                style={{ width: 160 }}
              />
              <Input
                addonBefore="Margen estimado"
                defaultValue={45}
                suffix="%"
                style={{ width: 160 }}
              />
            </Space>
          </Form.Item>
          <Form.Item label="Inventario y envío">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Input
                addonBefore="SKU"
                defaultValue="CAM-001-BL-M"
                style={{ maxWidth: 240 }}
              />
              <Input
                addonBefore="Stock actual"
                defaultValue={12}
                style={{ maxWidth: 240 }}
              />
              <Checkbox checked>Permitir compras aunque no haya stock</Checkbox>
              <Space>
                <Input
                  addonBefore="Alto"
                  defaultValue={10}
                  style={{ width: 120 }}
                  suffix={
                    <Select
                      defaultValue="cm"
                      bordered={false}
                      style={{ width: 50 }}
                      options={[{ value: "cm", label: "cm" }]}
                    />
                  }
                />
                <Input
                  addonBefore="Ancho"
                  defaultValue={20}
                  style={{ width: 120 }}
                  suffix={
                    <Select
                      defaultValue="cm"
                      bordered={false}
                      style={{ width: 50 }}
                      options={[{ value: "cm", label: "cm" }]}
                    />
                  }
                />
                <Input
                  addonBefore="Largo"
                  defaultValue={30}
                  style={{ width: 120 }}
                  suffix={
                    <Select
                      defaultValue="cm"
                      bordered={false}
                      style={{ width: 50 }}
                      options={[{ value: "cm", label: "cm" }]}
                    />
                  }
                />
                <Input
                  addonBefore="Peso"
                  defaultValue={0.5}
                  style={{ width: 120 }}
                  suffix={
                    <Select
                      defaultValue="kg"
                      bordered={false}
                      style={{ width: 50 }}
                      options={[{ value: "kg", label: "kg" }]}
                    />
                  }
                />
              </Space>
              <Checkbox checked>Este producto requiere envío</Checkbox>
            </Space>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "seo",
      label: "SEO y publicación",
      children: (
        <Form layout="vertical">
          <Form.Item label="Título para buscadores">
            <Input defaultValue="Camisa blanca de lino - Colección verano" />
          </Form.Item>
          <Form.Item label="Descripción para buscadores">
            <Input.TextArea
              defaultValue="Camisa de lino suave, ideal para el verano. Ligera, fresca y disponible en varias tallas."
              autoSize={{ minRows: 2 }}
            />
          </Form.Item>
          <Form.Item label="Imagen para compartir en redes sociales">
            <Upload
              listType="picture-card"
              fileList={seoImages.map((img, i) => ({
                uid: i,
                url: img.url,
                name: `seoimg${i}`,
              }))}
              showUploadList={{ showRemoveIcon: false }}
              beforeUpload={() => false}
            >
              {seoImages.length < 4 && (
                <div>
                  <PlusOutlined /> Subir
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item label="Vista previa">
            <Space direction="vertical" style={{ width: "100%" }}>
              <div className="seo-preview-card">
                <img
                  src="/img1.jpg"
                  alt="preview"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
                <div>
                  <span className="seo-preview-logo">Logo</span>
                  <span className="seo-preview-title">
                    Camisa blanca de lino - Colección verano
                  </span>
                  <span className="seo-preview-desc">
                    Camisa de lino suave, ideal para el verano. Ligera, fresca y
                    disponible en varias tallas.
                  </span>
                </div>
              </div>
              <div className="seo-preview-card large">
                <img
                  src="/img2.jpg"
                  alt="preview"
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
                <div>
                  <span className="seo-preview-logo">Logo</span>
                  <span className="seo-preview-title">
                    Camisa blanca de lino - Colección verano
                  </span>
                  <span className="seo-preview-desc">
                    Camisa de lino suave, ideal para el verano. Ligera, fresca y
                    disponible en varias tallas.
                  </span>
                </div>
              </div>
            </Space>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center mb-4 md:mb-0">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/products")}
            className="mr-3"
          />
          <h2 className="text-2xl font-semibold m-0">Agregar producto</h2>
        </div>
        <Space>
          <Button className="border-gray-300 dark:border-neutral-700">
            Guardar como borrador
          </Button>
          <Button type="primary">Publicar producto</Button>
        </Space>
      </div>
      <div className="flex items-center mb-8">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
            tab === "info"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          1
        </div>
        <div className="flex-1 h-0.5 bg-gray-200 dark:bg-neutral-700 mx-2" />
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
            tab === "options"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          2
        </div>
        <div className="flex-1 h-0.5 bg-gray-200 dark:bg-neutral-700 mx-2" />
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
            tab === "seo"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          3
        </div>
        <div className="ml-6 flex flex-col">
          <b className="text-base">{stepper[tab].title}</b>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {stepper[tab].desc}
          </span>
        </div>
      </div>
      <Tabs
        activeKey={tab}
        onChange={setTab}
        items={tabItems}
        className="add-product-tabs"
      />
    </div>
  );
}
