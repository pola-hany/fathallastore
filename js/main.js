let allProducts = [];
let productsData = {};

const categories = ['phones', 'laptops', 'tvs', 'appliances', 'accessories'];
const categoryNames = {
    phones: 'الهواتف',
    laptops: 'اللابتوبات',
    tvs: 'التلفزيونات',
    appliances: 'الأجهزة المنزلية',
    accessories: 'الإكسسوارات'
};

async function loadAllProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '<div class="loading">جاري تحميل المنتجات...</div>';
    
    try {
        for (const category of categories) {
            const response = await fetch(`data/${category}.json`);
            if (response.ok) {
                const products = await response.json();
                productsData[category] = products;
                allProducts = [...allProducts, ...products.map(p => ({ ...p, category }))];
            }
        }
        displayProducts();
        setupFilters();
    } catch (error) {
        console.error('Error loading products:', error);
        container.innerHTML = '<div class="no-results">حدث خطأ في تحميل المنتجات</div>';
    }
}

function displayProducts() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || 'all';
    const priceFilter = document.getElementById('priceFilter')?.value || 'all';
    
    let filtered = allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                              (product.nameEn && product.nameEn.toLowerCase().includes(searchTerm));
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        
        let matchesPrice = true;
        if (priceFilter !== 'all') {
            const price = product.price;
            if (priceFilter === '20000+') {
                matchesPrice = price > 20000;
            } else {
                const [min, max] = priceFilter.split('-').map(Number);
                matchesPrice = price >= min && price <= max;
            }
        }
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    const container = document.getElementById('products-container');
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-results">لا توجد منتجات</div>';
        return;
    }
    
    container.innerHTML = filtered.map(product => `
        <div class="product-card" data-aos="fade-up" onclick="goToProduct('${product.id}')">
            <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${product.price.toLocaleString()}</div>
                <button class="btn-details" onclick="event.stopPropagation(); goToProduct('${product.id}')">
                    ${t('view_details')}
                </button>
            </div>
        </div>
    `).join('');
    
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (searchInput) searchInput.addEventListener('input', displayProducts);
    if (categoryFilter) categoryFilter.addEventListener('change', displayProducts);
    if (priceFilter) priceFilter.addEventListener('change', displayProducts);
}

function goToProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize AOS
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true
    });
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadAllProducts();
});