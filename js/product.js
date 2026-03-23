let currentProduct = null;

async function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    const container = document.getElementById('product-content');
    container.innerHTML = '<div class="loading">جاري تحميل المنتج...</div>';
    
    if (!productId) {
        container.innerHTML = '<div class="no-results">لم يتم تحديد المنتج</div>';
        return;
    }
    
    const categories = ['phones', 'laptops', 'tvs', 'appliances', 'accessories'];
    
    try {
        for (const category of categories) {
            const response = await fetch(`data/${category}.json`);
            if (response.ok) {
                const products = await response.json();
                const product = products.find(p => p.id === productId);
                if (product) {
                    currentProduct = { ...product, category };
                    displayProductDetail();
                    return;
                }
            }
        }
        container.innerHTML = '<div class="no-results">المنتج غير موجود</div>';
    } catch (error) {
        console.error('Error loading product:', error);
        container.innerHTML = '<div class="no-results">حدث خطأ في تحميل المنتج</div>';
    }
}

function displayProductDetail() {
    if (!currentProduct) return;
    
    const container = document.getElementById('product-content');
    const productUrl = `${window.location.origin}${window.location.pathname}?id=${currentProduct.id}`;
    
    const galleryImages = currentProduct.gallery || [currentProduct.image];
    
    container.innerHTML = `
        <div class="product-detail-container" data-aos="fade-up">
            <div class="product-detail-gallery">
                <img id="mainImage" class="main-image" src="${galleryImages[0]}" alt="${currentProduct.name}">
                <div class="thumbnail-gallery">
                    ${galleryImages.map((img, idx) => `
                        <img class="thumbnail ${idx === 0 ? 'active' : ''}" 
                             src="${img}" 
                             onclick="changeMainImage('${img}', this)">
                    `).join('')}
                </div>
            </div>
            <div class="product-detail-info">
                <h1 class="product-detail-name">${currentProduct.name}</h1>
                <div class="product-detail-price">${currentProduct.price.toLocaleString()} EGP</div>
                
                <div class="specs-section">
                    <h3>${t('specs')}</h3>
                    <div class="specs-grid">
                        ${Object.entries(currentProduct.specs).map(([key, value]) => `
                            <div class="spec-item">
                                <span class="spec-label">${translateSpecKey(key)}:</span>
                                <span class="spec-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="product-description">
                    <h3>${t('description')}</h3>
                    <p>${currentProduct.description || currentProduct.descriptionEn || 'لا يوجد وصف'}</p>
                </div>
                
                <div class="url-section">
                    <h3>${t('product_url')}</h3>
                    <div class="url-box">
                        <input type="text" id="productUrl" value="${productUrl}" readonly>
                        <button class="copy-btn" onclick="copyProductUrl()">${t('copy')}</button>
                    </div>
                    <small style="color: #666; display: block; margin-top: 10px;">
                        يمكنك نسخ هذا الرابط واستخدامه لإنشاء QR Code للمنتج
                    </small>
                </div>
            </div>
        </div>
    `;
    
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function translateSpecKey(key) {
    const specTranslations = {
        display: 'الشاشة',
        processor: 'المعالج',
        ram: 'الرام',
        storage: 'التخزين',
        battery: 'البطارية',
        camera: 'الكاميرا',
        screen: 'الشاشة',
        cpu: 'المعالج',
        memory: 'الذاكرة',
        weight: 'الوزن',
        resolution: 'الدقة'
    };
    return specTranslations[key] || key;
}

function changeMainImage(src, thumbnail) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
    }
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

function copyProductUrl() {
    const urlInput = document.getElementById('productUrl');
    if (urlInput) {
        urlInput.select();
        document.execCommand('copy');
        
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = t('copied');
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProductDetail();
});