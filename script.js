// Global Variables
let currentUser = null;
let cart = [];
let products = [];
let currentSlide = 0;
let isSignUp = false;
let currentCategory = 'all';
let currentSort = 'relevance';

// Sample Products Data with Real Images
const sampleProducts = [
    {
        id: 1,
        title: "Sony WH-1000XM4 Wireless Headphones",
        price: 279.99,
        originalPrice: 349.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 15420,
        category: "electronics",
        description: "Industry-leading noise canceling headphones with 30-hour battery life, quick charge, and premium sound quality. Touch sensor controls and speak-to-chat technology.",
        features: ["Active Noise Cancellation", "30-hour battery", "Quick Charge", "Touch Controls", "Speak-to-Chat"],
        colors: ["Black", "Silver", "Blue", "Rose Gold"],
        sizes: ["One Size"],
        badge: "Best Seller"
    },
    {
        id: 2,
        title: "Apple Watch Series 9 GPS",
        price: 399.99,
        originalPrice: 499.99,
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 8456,
        category: "electronics",
        description: "Advanced health and fitness tracking with ECG, blood oxygen monitoring, and GPS. Features the new S9 chip and double tap gesture.",
        features: ["ECG Monitor", "Blood Oxygen", "GPS Tracking", "Waterproof", "S9 Chip"],
        colors: ["Silver", "Space Gray", "Gold", "Blue", "Red"],
        sizes: ["41mm", "45mm"],
        badge: "New Release"
    },
    {
        id: 3,
        title: "Levi's 501 Original Jeans",
        price: 69.99,
        originalPrice: 89.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
        rating: 4.6,
        reviews: 3242,
        category: "clothing",
        description: "Classic straight-leg jeans with authentic styling and premium denim construction. The original blue jean since 1873.",
        features: ["100% Cotton Denim", "Straight Fit", "Button Fly", "Classic 5-Pocket"],
        colors: ["Dark Blue", "Light Blue", "Black", "Stonewashed"],
        sizes: ["28", "30", "32", "34", "36", "38", "40"],
        badge: "Classic"
    },
    {
        id: 4,
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        price: 34.99,
        originalPrice: 44.99,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
        rating: 4.9,
        reviews: 5876,
        category: "books",
        description: "Essential reading for any developer, software engineer, or project manager. Learn to write clean, maintainable code.",
        features: ["416 pages", "Code examples", "Best practices", "Case studies"],
        colors: ["Standard"],
        sizes: ["Paperback", "Hardcover", "Kindle", "Audiobook"],
        badge: "Amazon's Choice"
    },
    {
        id: 5,
        title: "Manduka PRO Yoga Mat",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 2134,
        category: "sports",
        description: "Premium yoga mat with superior grip and cushioning. Lifetime guarantee and eco-friendly materials.",
        features: ["6mm thickness", "Non-slip surface", "Eco-friendly", "Lifetime guarantee"],
        colors: ["Purple", "Blue", "Green", "Pink", "Black"],
        sizes: ["Standard 71\"", "Long 85\""],
        badge: "Eco-Friendly"
    },
    {
        id: 6,
        title: "Breville Bambino Plus Espresso Machine",
        price: 299.99,
        originalPrice: 399.99,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 1892,
        category: "home",
        description: "Compact espresso machine with automatic milk frother and precision temperature control. Perfect for home baristas.",
        features: ["15 bar pressure", "Automatic milk frother", "Fast heat-up", "Compact design"],
        colors: ["Stainless Steel", "Black", "Red"],
        sizes: ["Compact", "Standard"],
        badge: "Premium"
    },
    {
        id: 7,
        title: "Logitech MX Master 3S Wireless Mouse",
        price: 99.99,
        originalPrice: 129.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 6743,
        category: "electronics",
        description: "Advanced wireless mouse with ultra-precise scrolling, customizable buttons, and multi-device connectivity.",
        features: ["Ultra-precise scroll", "Customizable buttons", "Multi-device", "70-day battery"],
        colors: ["Graphite", "Pale Gray", "Rose"],
        sizes: ["One Size"],
        badge: "Professional"
    },
    {
        id: 8,
        title: "Zara Floral Print Midi Dress",
        price: 59.99,
        originalPrice: 79.99,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
        rating: 4.4,
        reviews: 987,
        category: "clothing",
        description: "Elegant midi dress with floral print and flowing silhouette. Perfect for both casual and formal occasions.",
        features: ["Floral print", "Midi length", "Flowing silhouette", "Versatile styling"],
        colors: ["Floral Blue", "Floral Pink", "Solid Navy", "Solid Black"],
        sizes: ["XS", "S", "M", "L", "XL"],
        badge: "Trending"
    },
    {
        id: 9,
        title: "Nintendo Switch OLED Console",
        price: 349.99,
        originalPrice: 399.99,
        image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
        rating: 4.9,
        reviews: 12456,
        category: "electronics",
        description: "Enhanced Nintendo Switch with vibrant OLED screen, improved audio, and enhanced dock with wired LAN port.",
        features: ["7-inch OLED screen", "Enhanced audio", "64GB storage", "Improved dock"],
        colors: ["Neon Blue/Red", "White", "Splatoon 3 Edition"],
        sizes: ["Standard"],
        badge: "Gaming"
    },
    {
        id: 10,
        title: "Instant Pot Duo 7-in-1 Pressure Cooker",
        price: 79.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1556909114-4e5444c82b72?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 23187,
        category: "home",
        description: "7-in-1 multi-cooker: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.",
        features: ["7-in-1 functionality", "6-quart capacity", "Smart programs", "Safety features"],
        colors: ["Stainless Steel", "Black", "Red"],
        sizes: ["3-quart", "6-quart", "8-quart"],
        badge: "Kitchen Essential"
    },
    {
        id: 11,
        title: "Adidas Ultraboost 22 Running Shoes",
        price: 189.99,
        originalPrice: 229.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        rating: 4.6,
        reviews: 4521,
        category: "sports",
        description: "Premium running shoes with responsive Boost cushioning and adaptive fit. Perfect for daily training and racing.",
        features: ["Boost cushioning", "Adaptive fit", "Continental rubber", "Primeknit upper"],
        colors: ["Core Black", "Cloud White", "Solar Yellow", "Pulse Blue"],
        sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
        badge: "Athletic"
    },
    {
        id: 12,
        title: "The Psychology of Money",
        price: 16.99,
        originalPrice: 24.99,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 8934,
        category: "books",
        description: "Timeless lessons on wealth, greed, and happiness. Learn about the psychology behind financial decisions.",
        features: ["256 pages", "19 lessons", "Real-world examples", "Behavioral finance"],
        colors: ["Standard"],
        sizes: ["Paperback", "Hardcover", "Kindle", "Audiobook"],
        badge: "Bestseller"
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
    
    let badgeClass = '';
    let badgeText = '';
    
    if (product.badge) {
        switch(product.badge.toLowerCase()) {
            case 'best seller':
            case 'bestseller':
                badgeClass = 'bestseller';
                badgeText = 'Best Seller';
                break;
            case 'amazon\'s choice':
            case 'choice':
                badgeClass = 'choice';
                badgeText = 'Amazon\'s Choice';
                break;
            case 'new release':
            case 'new':
                badgeClass = 'new';
                badgeText = 'New';
                break;
            default:
                badgeClass = '';
                badgeText = product.badge;
        }
    }
    
    card.innerHTML = `
        ${product.badge ? `<div class="product-badge ${badgeClass}">${badgeText}</div>` : ''}
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <div class="product-rating">
                <span class="stars">${generateStars(product.rating)}</span>
                <span class="rating-count">(${product.reviews.toLocaleString()})</span>
            </div>
            <div class="product-price">
                $${product.price.toFixed(2)}
                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                <span class="discount-badge">${discount}% off</span>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="event.stopPropagation(); addToWishlist(${product.id})">
                    <i class="fas fa-heart"></i>
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

// Add additional random products with better variety
function addRandomProducts() {
    const additionalProducts = [
        {
            id: 13,
            title: "MacBook Pro 14-inch M3",
            price: 1999.99,
            originalPrice: 2199.99,
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
            rating: 4.9,
            reviews: 2341,
            category: "electronics",
            description: "Apple MacBook Pro with M3 chip, 14-inch Liquid Retina XDR display, 16GB RAM, 512GB SSD.",
            features: ["M3 Chip", "14-inch Display", "16GB RAM", "512GB SSD", "All-day battery"],
            colors: ["Space Gray", "Silver"],
            sizes: ["14-inch"],
            badge: "Professional"
        },
        {
            id: 14,
            title: "Ray-Ban Aviator Classic",
            price: 154.99,
            originalPrice: 199.99,
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
            rating: 4.7,
            reviews: 5432,
            category: "clothing",
            description: "Classic aviator sunglasses with polarized lenses and gold-tone metal frame.",
            features: ["Polarized lenses", "UV protection", "Metal frame", "Classic design"],
            colors: ["Gold", "Silver", "Black"],
            sizes: ["55mm", "58mm", "62mm"],
            badge: "Classic"
        },
        {
            id: 15,
            title: "KitchenAid Stand Mixer",
            price: 329.99,
            originalPrice: 449.99,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            rating: 4.8,
            reviews: 7821,
            category: "home",
            description: "Professional 5-quart stand mixer with 10-speed control and multiple attachments.",
            features: ["5-quart capacity", "10 speeds", "Multiple attachments", "Tilt-head design"],
            colors: ["Red", "White", "Black", "Silver"],
            sizes: ["5-quart"],
            badge: "Kitchen Essential"
        },
        {
            id: 16,
            title: "Atomic Habits by James Clear",
            price: 13.99,
            originalPrice: 18.99,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
            rating: 4.9,
            reviews: 12543,
            category: "books",
            description: "An easy and proven way to build good habits and break bad ones.",
            features: ["320 pages", "Practical strategies", "Real-world examples", "Bestseller"],
            colors: ["Standard"],
            sizes: ["Paperback", "Hardcover", "Kindle", "Audiobook"],
            badge: "Bestseller"
        },
        {
            id: 17,
            title: "Hydro Flask Water Bottle",
            price: 44.99,
            originalPrice: 54.99,
            image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop",
            rating: 4.6,
            reviews: 3214,
            category: "sports",
            description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours, hot for 12.",
            features: ["Double-wall insulation", "24-hour cold", "12-hour hot", "BPA-free"],
            colors: ["Black", "White", "Blue", "Pink", "Green"],
            sizes: ["21oz", "32oz", "40oz"],
            badge: "Eco-Friendly"
        },
        {
            id: 18,
            title: "Dyson V15 Detect Cordless Vacuum",
            price: 649.99,
            originalPrice: 749.99,
            image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
            rating: 4.8,
            reviews: 1987,
            category: "home",
            description: "Powerful cordless vacuum with laser dust detection and advanced filtration.",
            features: ["Laser dust detection", "60-min runtime", "Advanced filtration", "Lightweight"],
            colors: ["Yellow", "Purple"],
            sizes: ["Standard"],
            badge: "Premium"
        }
    ];
    
    products.push(...additionalProducts);
    displayProducts();
    updateFeaturedProducts();
}

// Add featured products section
function updateFeaturedProducts() {
    const featuredProducts = products.filter(p => p.badge && 
        ['Best Seller', 'Amazon\'s Choice', 'New Release'].includes(p.badge));
    
    if (featuredProducts.length > 0) {
        displayProducts(featuredProducts.slice(0, 8));
    }
}

// Add product quick view functionality
function showQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const quickView = document.createElement('div');
    quickView.className = 'quick-view';
    quickView.innerHTML = `
        <div class="quick-view-content">
            <button class="close-quick-view" onclick="closeQuickView()">&times;</button>
            <div class="quick-view-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="quick-view-info">
                <h3>${product.title}</h3>
                <div class="quick-view-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span>(${product.reviews.toLocaleString()} reviews)</span>
                </div>
                <div class="quick-view-price">
                    $${product.price.toFixed(2)}
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                </div>
                <div class="quick-view-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); closeQuickView();">
                        Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="showProductDetails(${product.id}); closeQuickView();">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(quickView);
    setTimeout(() => quickView.classList.add('active'), 10);
}

function closeQuickView() {
    const quickView = document.querySelector('.quick-view');
    if (quickView) {
        quickView.classList.remove('active');
        setTimeout(() => quickView.remove(), 300);
    }
}

// Enhanced product hover effects
function addProductHoverEffects() {
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            const quickViewBtn = card.querySelector('.quick-view-btn');
            if (quickViewBtn) {
                quickViewBtn.style.opacity = '1';
                quickViewBtn.style.transform = 'translateY(0)';
            }
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            const quickViewBtn = card.querySelector('.quick-view-btn');
            if (quickViewBtn) {
                quickViewBtn.style.opacity = '0';
                quickViewBtn.style.transform = 'translateY(10px)';
            }
        }
    });
}

// Add loading states
function showLoadingState() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading products...</p>
        </div>
    `;
}

// Enhanced search with suggestions
function setupSearchSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    searchInput.parentNode.appendChild(suggestionsContainer);
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length < 2) {
            suggestionsContainer.style.display = 'none';
            return;
        }
        
        const suggestions = products
            .filter(p => p.title.toLowerCase().includes(query))
            .slice(0, 5)
            .map(p => p.title);
        
        if (suggestions.length > 0) {
            suggestionsContainer.innerHTML = suggestions
                .map(s => `<div class="suggestion-item" onclick="selectSuggestion('${s}')">${s}</div>`)
                .join('');
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });
}

function selectSuggestion(suggestion) {
    document.getElementById('searchInput').value = suggestion;
    document.querySelector('.search-suggestions').style.display = 'none';
    searchProducts();
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
