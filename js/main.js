let allProducts = [];

const categories = ['phones', 'laptops', 'tvs', 'appliances', 'accessories'];

async function loadProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">جاري تحميل المنتجات...</div>';
    
    allProducts = [];
    
    try {
        for (const category of categories) {
            const response = await fetch(`data/${category}.json`);
            if (response.ok) {
                const products = await response.json();
                allProducts.push(...products.map(p => ({ ...p, category })));
            } else {
                console.warn(`فشل تحميل ${category}.json`);
            }
        }
        
        if (allProducts.length === 0) {
            container.innerHTML = '<div class="no-results">لا توجد منتجات متاحة حالياً</div>';
        } else {
            displayProducts();
        }
        
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
        const productName = currentLang === 'ar' ? product.name : product.nameEn;
        const matchesSearch = productName.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        
        let matchesPrice = true;
        if (priceFilter !== 'all') {
            const price = product.price;
            if (priceFilter === '50000+') {
                matchesPrice = price > 50000;
            } else {
                const [min, max] = priceFilter.split('-').map(Number);
                matchesPrice = price >= min && price <= max;
            }
        }
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    const container = document.getElementById('products-container');
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="no-results">لا توجد منتجات مطابقة للبحث</div>';
        return;
    }
    
    container.innerHTML = filtered.map(product => `
        <div class="product-card" onclick="goToProduct('${product.id}')">
            <img class="product-image" src="${product.image}" alt="${currentLang === 'ar' ? product.name : product.nameEn}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=Product'">
            <div class="product-info">
                <h3 class="product-name">${currentLang === 'ar' ? product.name : product.nameEn}</h3>
                <div class="product-price">${product.price.toLocaleString()} EGP</div>
                <button class="btn-details" onclick="event.stopPropagation(); goToProduct('${product.id}')">
                    ${t('viewDetails')}
                </button>
            </div>
        </div>
    `).join('');
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

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    loadProducts();
    
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            setLanguage(newLang);
            displayProducts();
        });
    }
});