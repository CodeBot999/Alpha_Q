import React, { useState } from 'react';

const PRODUCTS = [
  {
    id: 1,
    name: 'Wet Waste Dustbin (20L)',
    price: 450,
    originalPrice: 560,
    category: 'dustbins',
    image: 'product1.jpg', // You'll replace this
    description: 'Perfect for kitchen waste and organic materials',
    inStock: true,
    rating: 4.5,
    discount: 20
  },
  {
    id: 2,
    name: 'Dry Waste Dustbin (30L)',
    price: 380,
    originalPrice: 450,
    category: 'dustbins',
    image: 'product2.jpg', // You'll replace this
    description: 'Ideal for paper, plastic, and recyclable waste',
    inStock: true,
    rating: 4.3,
    discount: 15
  },
  {
    id: 3,
    name: 'Hazardous Waste Container (10L)',
    price: 650,
    originalPrice: 850,
    category: 'dustbins',
    image: 'product3.jpg', // You'll replace this
    description: 'Safe disposal of batteries, chemicals, and medical waste',
    inStock: true,
    rating: 4.8,
    discount: 25
  },
  {
    id: 4,
    name: 'Biodegradable Waste Bags (100pcs)',
    price: 120,
    originalPrice: 150,
    category: 'covers',
    image: 'product4.jpg', // You'll replace this
    description: 'Eco-friendly bags that decompose naturally',
    inStock: true,
    rating: 4.2,
    discount: 20
  },
  {
    id: 5,
    name: 'Heavy Duty Trash Bags (50pcs)',
    price: 85,
    originalPrice: 100,
    category: 'covers',
    image: 'product5.jpg', // You'll replace this
    description: 'Strong and durable bags for all waste types',
    inStock: true,
    rating: 4.4,
    discount: 15
  },
  {
    id: 6,
    name: 'Compost Bin with Lid (40L)',
    price: 890,
    originalPrice: 1100,
    category: 'dustbins',
    image: 'product6.jpg', // You'll replace this
    description: 'Create your own compost at home',
    inStock: false,
    rating: 4.7,
    discount: 19
  }
];

const Shop = ({ user, onNavigate, cart, setCart, userPoints }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCart, setShowCart] = useState(false);

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const canAffordWithPoints = () => {
    return userPoints >= getTotalPrice();
  };

  const handleCheckout = () => {
    if (paymentMethod === 'points' && !canAffordWithPoints()) {
      alert(`Insufficient points! You need ${getTotalPrice()} points but have only ${userPoints}.`);
      return;
    }
    
    alert('Checkout functionality will be integrated with payment gateway. For demo purposes, order is simulated as successful.');
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <nav className="navbar navbar-dark shadow-sm" style={{ background: 'linear-gradient(135deg, #fd7e14 0%, #e65100 100%)' }}>
        <div className="container">
          <button 
            className="btn btn-outline-light"
            onClick={() => onNavigate('dashboard')}
          >
            <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
          </button>
          <h4 className="navbar-brand mb-0 mx-auto fw-bold">
            <i className="fas fa-shopping-cart me-2"></i>Waste Management Shop
          </h4>
          <button 
            className="btn btn-outline-light position-relative"
            onClick={() => setShowCart(true)}
          >
            <i className="fas fa-shopping-bag"></i>
            {getTotalItems() > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div className="container py-4">
        {/* Search and Filter */}
        <div className="row mb-4">
          <div className="col-md-8">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="fas fa-search text-muted"></i>
              </span>
              <input 
                type="text" 
                className="form-control border-start-0"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: '0 25px 25px 0' }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <select 
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ borderRadius: '25px' }}
            >
              <option value="all">All Categories</option>
              <option value="dustbins">Dustbins</option>
              <option value="covers">Covers & Bags</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4">
              <div 
                className="card h-100 border-0 shadow-sm"
                style={{ 
                  borderRadius: '16px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                }}
              >
                <div className="position-relative">
                  <img 
                    src={`/images/${product.image}`} 
                    alt={product.name}
                    className="card-img-top"
                    style={{ 
                      height: '200px', 
                      objectFit: 'cover',
                      borderRadius: '16px 16px 0 0'
                    }}
                  />
                  {product.discount > 0 && (
                    <div 
                      className="position-absolute top-0 end-0 m-2 badge bg-danger"
                      style={{ fontSize: '12px' }}
                    >
                      -{product.discount}% OFF
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <span className="badge bg-secondary fs-6">Out of Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-2">{product.name}</h6>
                  <p className="text-muted small mb-3">{product.description}</p>
                  
                  <div className="mb-2">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i}
                        className={`fas fa-star ${i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'}`}
                        style={{ fontSize: '12px' }}
                      ></i>
                    ))}
                    <small className="text-muted ms-2">({product.rating})</small>
                  </div>
                  
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div>
                      <span className="fw-bold text-success fs-5">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-muted text-decoration-line-through ms-2 small">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <small className="text-warning fw-semibold">{product.price} Points</small>
                  </div>
                  
                  <button 
                    className="btn btn-primary w-100 fw-semibold"
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    style={{ borderRadius: '25px' }}
                  >
                    {product.inStock ? (
                      <>
                        <i className="fas fa-cart-plus me-2"></i>
                        Add to Cart
                      </>
                    ) : (
                      'Out of Stock'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <i className="fas fa-search fs-1 text-muted mb-3"></i>
            <h5 className="text-muted">No products found</h5>
            <p className="text-muted">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ borderRadius: '16px' }}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">
                  <i className="fas fa-shopping-cart me-2"></i>
                  Shopping Cart ({getTotalItems()} items)
                </h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowCart(false)}
                ></button>
              </div>
              
              <div className="modal-body">
                {cart.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="fas fa-shopping-cart fs-1 text-muted mb-3"></i>
                    <h6 className="text-muted">Your cart is empty</h6>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowCart(false)}
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    {cart.map((item) => (
                      <div key={item.id} className="d-flex align-items-center border-bottom py-3">
                        <img 
                          src={`/images/${item.image}`} 
                          alt={item.name}
                          className="rounded"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">{item.name}</h6>
                          <small className="text-muted">₹{item.price} each</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="mx-3 fw-bold">{item.quantity}</span>
                          <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className="ms-3 text-end">
                          <div className="fw-bold">₹{item.price * item.quantity}</div>
                          <small className="text-warning">{item.price * item.quantity} pts</small>
                        </div>
                      </div>
                    ))}

                    {/* Payment Method */}
                    <div className="mt-4">
                      <h6 className="fw-bold mb-3">Payment Method</h6>
                      <div className="row g-2">
                        <div className="col-6">
                          <div className="form-check card p-3">
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name="payment" 
                              id="cash"
                              value="cash"
                              checked={paymentMethod === 'cash'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label className="form-check-label fw-semibold" htmlFor="cash">
                              <i className="fas fa-money-bill-wave me-2 text-success"></i>
                              Cash Payment
                            </label>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-check card p-3">
                            <input 
                              className="form-check-input" 
                              type="radio" 
                              name="payment" 
                              id="points"
                              value="points"
                              checked={paymentMethod === 'points'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label className="form-check-label fw-semibold" htmlFor="points">
                              <i className="fas fa-coins me-2 text-warning"></i>
                              Points ({userPoints} available)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-top mt-4 pt-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold fs-5">Total:</span>
                        <div className="text-end">
                          <div className="fw-bold fs-5">₹{getTotalPrice()}</div>
                          <small className="text-warning">{getTotalPrice()} points</small>
                        </div>
                      </div>
                      
                      {paymentMethod === 'points' && !canAffordWithPoints() && (
                        <div className="alert alert-warning">
                          <i className="fas fa-exclamation-triangle me-2"></i>
                          Insufficient points! You need {getTotalPrice() - userPoints} more points.
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping
                </button>
                {cart.length > 0 && (
                  <button 
                    type="button" 
                    className="btn btn-success fw-semibold"
                    onClick={handleCheckout}
                    disabled={paymentMethod === 'points' && !canAffordWithPoints()}
                  >
                    <i className="fas fa-check me-2"></i>
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
