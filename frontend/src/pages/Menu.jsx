import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../api";
import ProductCard from "../components/shared/ProductCard";
import Spinner from "../components/shared/Spinner";
import { Search, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Menu = () => {
  const { role } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔥 Dynamic categories (UPDATED)
  const [categories, setCategories] = useState([
    "All",
    "Pizza",
    "Cold Drinks",
    "Breads",
    "Sandwich",
  ]);

  // Admin Add Product State
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Pizza",
    stock: "",
  });

  const [newCategoryName, setNewCategoryName] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const catParam = params.get("category");
    if (catParam) {
      const match = categories.find((c) =>
        c.toLowerCase().includes(catParam.toLowerCase())
      );
      if (match) setActiveCategory(match);
    }
  }, [location, categories]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await api.getProducts();
        setProducts(result.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    const productToAdd = {
      id: Date.now(),
      ...newProduct,
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
    };

    setProducts((prev) => [...prev, productToAdd]);
    setShowModal(false);

    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "Pizza",
      stock: "",
    });
  };

  const handleAddCategory = () => {
    if (!newCategoryName) return;

    const formatted =
      newCategoryName.charAt(0).toUpperCase() +
      newCategoryName.slice(1).toLowerCase();

    if (!categories.includes(formatted)) {
      setCategories((prev) => [...prev, formatted]);
    }

    setNewProduct({ ...newProduct, category: formatted });
    setNewCategoryName("");
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;

    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description &&
        p.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const inputStyle = {
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "0.9rem",
    outline: "none",
  };

  const cancelBtn = {
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#f5f5f5",
    cursor: "pointer",
  };

  const addBtn = {
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "none",
    background: "var(--primary)",
    color: "white",
    fontWeight: "500",
    cursor: "pointer",
  };

  return (
    <div
      className="container"
      style={{ paddingTop: "100px", paddingBottom: "4rem", minHeight: "80vh" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem" }}>Our Menu</h1>
        <p style={{ color: "var(--text-muted)" }}>
          Order your favorites, built fresh everyday.
        </p>
      </div>

      {/* Admin + Button */}
      {role === "ADMIN" && (
        <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
          <button
            className="btn btn-primary"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>
      )}

      {/* Category + Search */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {/* Categories */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                backgroundColor:
                  activeCategory === cat ? "var(--primary)" : "var(--bg-card)",
                color: activeCategory === cat ? "white" : "var(--text-main)",
                border: "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div
          style={{
            position: "relative",
            marginLeft: "auto",
            flex: "1 1 300px",
            maxWidth: "400px",
          }}
        >
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Search by name or ingredient..."
            style={{ paddingLeft: "2.5rem", borderRadius: "999px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Admin Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              width: "420px",
              borderRadius: "16px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ marginBottom: "1.5rem", color: "var(--primary)" }}>
              Add New Product
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                style={inputStyle}
              />

              <input
                placeholder="Description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                style={inputStyle}
              />

              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                style={inputStyle}
              />

              {/* Category Dropdown */}
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                style={inputStyle}
              >
                {categories
                  .filter((c) => c !== "All")
                  .map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
              </select>

              {/* Add New Category */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  placeholder="Add New Category"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <button onClick={handleAddCategory} style={addBtn}>
                  Add
                </button>
              </div>

              <input
                type="number"
                placeholder="Stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
                style={inputStyle}
              />
            </div>

            <div
              style={{
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button onClick={() => setShowModal(false)} style={cancelBtn}>
                Cancel
              </button>

              <button onClick={handleAddProduct} style={addBtn}>
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;