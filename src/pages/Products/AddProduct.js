import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.scss';

const TABS = [
  { label: 'Información del producto', value: 'info' },
  { label: 'Opciones y precios', value: 'options' },
  { label: 'SEO y publicación', value: 'seo' },
];

const CATEGORIES = ['T-shirt', 'Man', 'Clothing', 'Fashion'];

export default function AddProduct() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('info');
  const [name, setName] = useState('T-Shirt');
  const [desc, setDesc] = useState('Elevate your casual wardrobe with our Classic Cotton Crew Neck T-Shirt, a timeless essential designed for both comfort and style. Crafted from 100% premium cotton, this T-shirt offers a soft, breathable fabric that ensures all-day comfort, making it perfect for any season.');
  const [category, setCategory] = useState(['Camiseta']);
  const [tags, setTags] = useState(CATEGORIES);
  const [status, setStatus] = useState('Borrador');
  const [images, setImages] = useState([
    '/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg', '/img5.jpg', '/img6.jpg'
  ]);

  return (
    <div className="add-product-page">
      <div className="add-product-header">
        <button className="back-btn" onClick={() => navigate('/products')}>
          <span className="arrow">←</span>
        </button>
        <h2>Agregar producto</h2>
        <div className="add-product-actions">
          <button className="draft-btn">Guardar como borrador</button>
          <button className="publish-btn">Publicar producto</button>
        </div>
      </div>
      <div className="add-product-stepper">
        <div className="step-circle active">1</div>
        <div className="step-line" />
        <div className="step-circle">2</div>
        <div className="step-line" />
        <div className="step-circle">3</div>
        <div className="step-info">
          <b>¡Empecemos con lo básico!</b>
          <span>Paso 1 de 3: información del producto</span>
        </div>
      </div>
      <div className="add-product-tabs">
        {TABS.map(t => (
          <button
            key={t.value}
            className={tab === t.value ? 'active' : ''}
            onClick={() => setTab(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="add-product-form">
        <div className="form-section">
          <label>Nombre del producto</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-section">
          <label>Descripción (Opcional)</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} />
        </div>
        <div className="form-section">
          <label>Categoría</label>
          <div className="category-tags">
            <span className="category">Camiseta</span>
            {tags.map(tag => (
              <span className="tag" key={tag}>{tag} <span className="tag-x">×</span></span>
            ))}
          </div>
        </div>
        <div className="form-section">
          <label>Estado</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Borrador">Borrador</option>
            <option value="Publicado">Publicado</option>
          </select>
        </div>
        <div className="form-section">
          <label>Imágenes</label>
          <div className="image-upload-area">
            <div className="upload-box">
              <span className="upload-icon">⬆️</span>
              <span>Click to upload or drag and drop</span>
              <span className="upload-hint">SVG, PNG or JPG (max. 800×400px)</span>
            </div>
            <div className="image-previews">
              {images.map((img, i) => (
                <div className="img-thumb" key={i}>
                  <img src={img} alt="preview" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
