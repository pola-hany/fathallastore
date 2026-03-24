let currentProduct = null;

async function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    const container = document.getElementById('product-content');
    if (!container) return;
    
    container.innerHTML = '<div class="loading">جاري تحميل المنتج...</div>';
    
    if (!productId) {
        container.innerHTML = '<div class="no-results">لم يتم تحديد المنتج</div>';
        return;
    }
    
    const categories = ['phones', 'laptops', 'tvs', 'appliances', 'accessories'];
    
    try {
        let found = false;
        for (const category of categories) {
            const response = await fetch(`data/${category}.json`);
            if (response.ok) {
                const products = await response.json();
                const product = products.find(p => p.id === productId);
                if (product) {
                    currentProduct = product;
                    found = true;
                    break;
                }
            }
        }
        
        if (found && currentProduct) {
            displayProductDetail();
        } else {
            container.innerHTML = `<div class="no-results">المنتج غير موجود - ID: ${productId}</div>`;
        }
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
    const productName = currentLang === 'ar' ? currentProduct.name : currentProduct.nameEn;
    const productDesc = currentLang === 'ar' ? currentProduct.description : currentProduct.descriptionEn;
    
    container.innerHTML = `
        <div class="product-detail-container">
            <div class="product-detail-gallery">
                <img id="mainImage" class="main-image" src="${galleryImages[0]}" alt="${productName}" onerror="this.src='https://via.placeholder.com/400x400?text=Product'">
                <div class="thumbnail-gallery">
                    ${galleryImages.map((img, idx) => `
                        <img class="thumbnail ${idx === 0 ? 'active' : ''}" 
                             src="${img}" 
                             onclick="changeMainImage('${img}', this)"
                             onerror="this.src='https://via.placeholder.com/80x80?text=Img'">
                    `).join('')}
                </div>
            </div>
            <div class="product-detail-info">
                <h1 class="product-detail-name">${productName}</h1>
                <div class="product-detail-price">${currentProduct.price.toLocaleString()} EGP</div>
                
                <div class="specs-section">
                    <h3>${t('specs')}</h3>
                    <div class="specs-grid">
                        ${Object.entries(currentProduct.specs).map(([key, value]) => `
                            <div class="spec-item">
                                <span class="spec-label">${key}:</span>
                                <span class="spec-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="product-description">
                    <h3>${t('description')}</h3>
                    <p>${productDesc || 'لا يوجد وصف'}</p>
                </div>
                
                <div class="url-section">
                    <h3>${t('productUrl')}</h3>
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
    setLanguage(currentLang);
    loadProductDetail();
    
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'ar' ? 'en' : 'ar';
            setLanguage(newLang);
            loadProductDetail();
        });
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
});