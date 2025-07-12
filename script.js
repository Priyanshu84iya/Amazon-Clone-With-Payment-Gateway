// Global Variables
let currentUser = null;
let cart = [];
let products = [];
let currentSlide = 0;
let isSignUp = false;
let currentCategory = 'all';
let currentSort = 'relevance';

// Sample Products Data
const sampleProducts = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://via.placeholder.com/300x200/1a1a1a/ffffff?text=Headphones",
        rating: 4.5,
        reviews: 1205,
        category: "electronics",
        description: "High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality.",
        features: ["Active Noise Cancellation", "30-hour battery", "Wireless charging", "Premium sound"],
        colors: ["Black", "White", "Blue"],
        sizes: ["One Size"]
    },
    {
        id: 2,
        title: "Smart Fitness Watch",
        price: 199.99,
        originalPrice: 249.99,
        image: "https://via.placeholder.com/300x200/FF4500/ffffff?text=Smart+Watch",
        rating: 4.3,
        reviews: 856,
        category: "electronics",
        description: "Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life.",
        features: ["Heart Rate Monitor", "GPS Tracking", "7-day battery", "Waterproof"],
        colors: ["Black", "Silver", "Gold"],
        sizes: ["38mm", "42mm", "46mm"]
    },
    {
        id: 3,
        title: "Organic Cotton T-Shirt",
        price: 24.99,
        originalPrice: 34.99,
        image: "https://via.placeholder.com/300x200/FF69B4/ffffff?text=T-Shirt",
        rating: 4.7,
        reviews: 432,
        category: "clothing",
        description: "Comfortable organic cotton t-shirt with a modern fit. Perfect for everyday wear.",
        features: ["100% Organic Cotton", "Modern Fit", "Machine Washable", "Breathable"],
        colors: ["White", "Black", "Navy", "Gray"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"]
    },
    {
        id: 4,
        title: "The Art of Programming",
        price: 39.99,
        originalPrice: 49.99,
        image: "https://via.placeholder.com/300x200/8B4513/ffffff?text=Programming+Book",
        rating: 4.8,
        reviews: 1876,
        category: "books",
        description: "Comprehensive guide to modern programming techniques and best practices.",
        features: ["600+ pages", "Code examples", "Expert insights", "Updated edition"],
        colors: ["Standard"],
        sizes: ["Paperback", "Hardcover", "E-book"]
    },
    {
        id: 5,
        title: "Yoga Mat Premium",
        price: 34.99,
        originalPrice: 44.99,
        image: "https://via.placeholder.com/300x200/32CD32/ffffff?text=Yoga+Mat",
        rating: 4.6,
        reviews: 623,
        category: "sports",
        description: "Non-slip yoga mat with extra cushioning for comfort during practice.",
        features: ["Non-slip surface", "Extra cushioning", "Eco-friendly", "Carrying strap"],
        colors: ["Purple", "Blue", "Green", "Pink"],
        sizes: ["Standard", "Extra Long"]
    },
    {
        id: 6,
        title: "Coffee Maker Deluxe",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://via.placeholder.com/300x200/654321/ffffff?text=Coffee+Maker",
        rating: 4.4,
        reviews: 789,
        category: "home",
        description: "Programmable coffee maker with thermal carafe and auto-brew feature.",
        features: ["Programmable", "Thermal carafe", "Auto-brew", "12-cup capacity"],
        colors: ["Black", "Stainless Steel"],
        sizes: ["12-cup", "10-cup", "8-cup"]
    },
    {
        id: 7,
        title: "Wireless Gaming Mouse",
        price: 59.99,
        originalPrice: 79.99,
        image: "https://via.placeholder.com/300x200/000000/ffffff?text=Gaming+Mouse",
        rating: 4.7,
        reviews: 1342,
        category: "electronics",
        description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
        features: ["RGB lighting", "Programmable buttons", "High DPI", "Wireless"],
        colors: ["Black", "White"],
        sizes: ["One Size"]
    },
    {
        id: 8,
        title: "Summer Dress Collection",
        price: 49.99,
        originalPrice: 69.99,
        image: "https://via.placeholder.com/300x200/FFB6C1/ffffff?text=Summer+Dress",
        rating: 4.5,
        reviews: 567,
        category: "clothing",
        description: "Elegant summer dress perfect for casual and formal occasions.",
        features: ["Breathable fabric", "Stylish design", "Machine washable", "Versatile"],
        colors: ["Floral", "Solid Blue", "Solid Red", "Black"],
        sizes: ["XS", "S", "M", "L", "XL"]
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    products = [...sampleProducts];
    loadUserData();
    displayProducts();
    startSlider();
    setupEventListeners();
    updateCartCount();
    displayDeals();
});

// Load user data from localStorage
function loadUserData() {
    const userData = localStorage.getItem('amazonCloneUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        document.getElementById('username').textContent = currentUser.name;
        document.querySelector('.auth-btn').textContent = 'Account';
    }
    
    const cartData = localStorage.getItem('amazonCloneCart');
    if (cartData) {
        cart = JSON.parse(cartData);
    }
}

// Save user data to localStorage
function saveUserData() {
    if (currentUser) {
        localStorage.setItem('amazonCloneUser', JSON.stringify(currentUser));
    }
    localStorage.setItem('amazonCloneCart', JSON.stringify(cart));
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // Cart click handler
    document.querySelector('.cart').addEventListener('click', function() {
        showCart();
    });
    
    // Auth form submission
    document.getElementById('authForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleAuth();
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Hero Slider Functions
function startSlider() {
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    
    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
}

// Search Products
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.querySelector('.search-category').value;
    
    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === category
        );
    }
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    displayProducts(filteredProducts);
    showNotification(`Found ${filteredProducts.length} products`);
}

// Filter Products by Category
function filterProducts(category) {
    currentCategory = category;
    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = products.filter(product => 
            product.category === category
        );
    }
    
    displayProducts(filteredProducts);
    showNotification(`Showing ${category} products`);
}

// Sort Products
function sortProducts() {
    const sortBy = document.getElementById('sortBy').value;
    currentSort = sortBy;
    
    let sortedProducts = [...products];
    
    if (currentCategory !== 'all') {
        sortedProducts = sortedProducts.filter(product => 
            product.category === currentCategory
        );
    }
    
    switch(sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            sortedProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            // Keep original order for relevance
            break;
    }
    
    displayProducts(sortedProducts);
}

// Display Products
function displayProducts(productsToShow = products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => showProductDetails(product);
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-rating">
                <span class="stars">${generateStars(product.rating)}</span>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <div class="product-price">
                $${product.price.toFixed(2)}
                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="event.stopPropagation(); addToWishlist(${product.id})">
                    ❤️
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Generate Stars Rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (halfStar) {
        stars += '☆';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    
    return stars;
}

// Show Product Details
function showProductDetails(product) {
    const modal = document.getElementById('productModal');
    const details = document.getElementById('productDetails');
    
    details.innerHTML = `
        <div class="product-details">
            <div class="product-details-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-details-info">
                <h2 class="product-details-title">${product.title}</h2>
                <div class="product-details-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviews} reviews)</span>
                </div>
                <div class="product-details-price">
                    $${product.price.toFixed(2)}
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                </div>
                <p class="product-details-description">${product.description}</p>
                <div class="product-options">
                    <h4>Features:</h4>
                    <ul>
                        ${product.features.map(feature => `<li>• ${feature}</li>`).join('')}
                    </ul>
                    <h4>Colors:</h4>
                    <div class="color-options">
                        ${product.colors.map(color => `
                            <button class="option-btn" onclick="selectOption(this)">${color}</button>
                        `).join('')}
                    </div>
                    <h4>Sizes:</h4>
                    <div class="size-options">
                        ${product.sizes.map(size => `
                            <button class="option-btn" onclick="selectOption(this)">${size}</button>
                        `).join('')}
                    </div>
                </div>
                <div class="product-details-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn btn-secondary" onclick="addToWishlist(${product.id})">Add to Wishlist</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Select Product Option
function selectOption(button) {
    const options = button.parentElement.querySelectorAll('.option-btn');
    options.forEach(opt => opt.classList.remove('selected'));
    button.classList.add('selected');
}

// Close Product Modal
function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveUserData();
    showNotification('Product added to cart!');
}

// Add to Wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    showNotification(`${product.title} added to wishlist!`);
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show Cart
function showCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0.00';
    } else {
        let total = 0;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="btn btn-secondary" onclick="removeFromCart(${item.id})" style="margin-left: 10px;">Remove</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });
        
        cartTotal.textContent = total.toFixed(2);
    }
    
    modal.style.display = 'block';
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            saveUserData();
            showCart(); // Refresh cart display
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    saveUserData();
    showCart(); // Refresh cart display
}

// Clear Cart
function clearCart() {
    cart = [];
    updateCartCount();
    saveUserData();
    showCart(); // Refresh cart display
    showNotification('Cart cleared!');
}

// Close Cart
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    if (!currentUser) {
        showNotification('Please sign in to checkout', 'error');
        toggleAuth();
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Simulate checkout process
    setTimeout(() => {
        cart = [];
        updateCartCount();
        saveUserData();
        closeCart();
        showNotification(`Order placed successfully! Total: $${total.toFixed(2)}`);
    }, 1000);
}

// Display Deals
function displayDeals() {
    const dealsGrid = document.getElementById('dealsGrid');
    const dealProducts = products.filter(product => product.originalPrice > product.price);
    
    dealProducts.forEach(product => {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        const dealCard = document.createElement('div');
        dealCard.className = 'deal-card';
        dealCard.onclick = () => showProductDetails(product);
        
        dealCard.innerHTML = `
            <div class="deal-badge">${discount}% OFF</div>
            <img src="${product.image}" alt="${product.title}">
            <div class="deal-info">
                <div class="deal-title">${product.title}</div>
                <div class="deal-price">$${product.price.toFixed(2)}</div>
            </div>
        `;
        
        dealsGrid.appendChild(dealCard);
    });
}

// Show Deals
function showDeals() {
    const dealProducts = products.filter(product => product.originalPrice > product.price);
    displayProducts(dealProducts);
    showNotification('Showing today\'s deals');
}

// Show Best Sellers
function showBestSellers() {
    const bestSellers = products.sort((a, b) => b.reviews - a.reviews).slice(0, 6);
    displayProducts(bestSellers);
    showNotification('Showing best sellers');
}

// Authentication Functions
function toggleAuth() {
    document.getElementById('authModal').style.display = 'block';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function toggleAuthMode() {
    isSignUp = !isSignUp;
    const authTitle = document.getElementById('authTitle');
    const nameGroup = document.getElementById('nameGroup');
    const submitBtn = document.querySelector('#authForm button[type="submit"]');
    const authToggle = document.querySelector('.auth-toggle');
    
    if (isSignUp) {
        authTitle.textContent = 'Sign Up';
        nameGroup.style.display = 'block';
        submitBtn.textContent = 'Sign Up';
        authToggle.innerHTML = 'Already have an account? <a href="#" onclick="toggleAuthMode()">Sign In</a>';
    } else {
        authTitle.textContent = 'Sign In';
        nameGroup.style.display = 'none';
        submitBtn.textContent = 'Sign In';
        authToggle.innerHTML = 'Don\'t have an account? <a href="#" onclick="toggleAuthMode()">Sign Up</a>';
    }
}

function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    
    if (isSignUp) {
        // Sign up logic
        if (!name || !email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        currentUser = {
            name: name,
            email: email,
            password: password
        };
        
        showNotification('Account created successfully!');
    } else {
        // Sign in logic
        if (!email || !password) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate user authentication
        currentUser = {
            name: email.split('@')[0],
            email: email,
            password: password
        };
        
        showNotification('Signed in successfully!');
    }
    
    document.getElementById('username').textContent = currentUser.name;
    document.querySelector('.auth-btn').textContent = 'Account';
    
    saveUserData();
    closeAuthModal();
    
    // Reset form
    document.getElementById('authForm').reset();
}

function logout() {
    currentUser = null;
    cart = [];
    document.getElementById('username').textContent = 'Guest';
    document.querySelector('.auth-btn').textContent = 'Sign In';
    updateCartCount();
    localStorage.removeItem('amazonCloneUser');
    localStorage.removeItem('amazonCloneCart');
    showNotification('Logged out successfully!');
}

// Profile and Account Functions
function showProfile() {
    if (!currentUser) {
        toggleAuth();
        return;
    }
    
    alert(`Profile:\nName: ${currentUser.name}\nEmail: ${currentUser.email}`);
}

function showOrders() {
    if (!currentUser) {
        toggleAuth();
        return;
    }
    
    alert('Your Orders:\nNo orders found. Start shopping to see your orders here!');
}

function showWishlist() {
    if (!currentUser) {
        toggleAuth();
        return;
    }
    
    alert('Your Wishlist:\nNo items in wishlist. Add products to your wishlist!');
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Additional Features
function addRandomProducts() {
    const additionalProducts = [
        {
            id: 9,
            title: "Laptop Stand Adjustable",
            price: 29.99,
            originalPrice: 39.99,
            image: "https://via.placeholder.com/300x200/708090/ffffff?text=Laptop+Stand",
            rating: 4.4,
            reviews: 432,
            category: "electronics",
            description: "Ergonomic laptop stand with adjustable height and angle for comfortable working.",
            features: ["Adjustable height", "Ergonomic design", "Portable", "Heat dissipation"],
            colors: ["Silver", "Black"],
            sizes: ["Universal"]
        },
        {
            id: 10,
            title: "Cooking Utensil Set",
            price: 49.99,
            originalPrice: 69.99,
            image: "https://via.placeholder.com/300x200/CD853F/ffffff?text=Utensil+Set",
            rating: 4.6,
            reviews: 789,
            category: "home",
            description: "Complete cooking utensil set with wooden handles and stainless steel construction.",
            features: ["Stainless steel", "Wooden handles", "Dishwasher safe", "Complete set"],
            colors: ["Natural Wood", "Black"],
            sizes: ["12-piece", "8-piece"]
        }
    ];
    
    products.push(...additionalProducts);
    displayProducts();
}

// Initialize additional features
setTimeout(() => {
    addRandomProducts();
}, 2000);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    if (e.key === 'Escape') {
        // Close all modals
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Auto-save cart data
setInterval(() => {
    saveUserData();
}, 30000); // Save every 30 seconds

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced search
const debouncedSearch = debounce(searchProducts, 300);

// Update search input to use debounced search
document.getElementById('searchInput').addEventListener('input', debouncedSearch);

// Smooth scrolling for navigation
function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth' });
}

// Add scroll-to-top functionality
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
        if (!document.querySelector('.scroll-top')) {
            const scrollTopBtn = document.createElement('button');
            scrollTopBtn.className = 'scroll-top';
            scrollTopBtn.innerHTML = '↑';
            scrollTopBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #FF9900;
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 20px;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s;
            `;
            
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            document.body.appendChild(scrollTopBtn);
        }
    } else {
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            scrollTopBtn.remove();
        }
    }
});

// Initialize tooltips
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// Initialize tooltips on page load
setTimeout(initTooltips, 1000);

console.log('Amazon Clone initialized successfully!');
