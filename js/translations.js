const translations = {
    ar: {
        store_name: "فتح الله",
        home: "الرئيسية",
        products: "المنتجات",
        hero_title: "فتح الله للأجهزة المنزلية",
        hero_desc: "أفضل العروض على الأجهزة الكهربائية والمنزلية بأعلى جودة وأفضل الأسعار",
        shop_now: "تسوق الآن",
        search_placeholder: "ابحث عن منتج...",
        all_categories: "جميع الفئات",
        appliances: "الأجهزة المنزلية",
        all_prices: "جميع الأسعار",
        view_details: "عرض التفاصيل",
        specs: "المواصفات",
        description: "الوصف",
        product_url: "رابط المنتج",
        copy: "نسخ",
        copied: "تم النسخ!",
        featured_products: "أحدث الأجهزة المنزلية",
        featured_desc: "اكتشف تشكيلتنا المميزة من الأجهزة الكهربائية والمنزلية",
        footer: "© 2024 فتح الله - جميع الحقوق محفوظة"
    },
    en: {
        store_name: "Fathallah",
        home: "Home",
        products: "Products",
        hero_title: "Fathallah Home Appliances",
        hero_desc: "Best deals on electrical and home appliances with highest quality and best prices",
        shop_now: "Shop Now",
        search_placeholder: "Search products...",
        all_categories: "All Categories",
        appliances: "Home Appliances",
        all_prices: "All Prices",
        view_details: "View Details",
        specs: "Specifications",
        description: "Description",
        product_url: "Product URL",
        copy: "Copy",
        copied: "Copied!",
        featured_products: "Latest Home Appliances",
        featured_desc: "Discover our premium collection of electrical and home appliances",
        footer: "© 2024 Fathallah - All Rights Reserved"
    }
};

let currentLang = localStorage.getItem('lang') || 'ar';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    if (lang === 'en') {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = 'en';
    } else {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
    }
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.innerHTML = `<i class="fas fa-globe"></i> ${lang === 'ar' ? 'English' : 'العربية'}`;
    }
}

function t(key) {
    return translations[currentLang][key] || key;
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(currentLang === 'ar' ? 'en' : 'ar');
            if (typeof loadProducts === 'function') loadProducts();
            if (typeof loadProductDetail === 'function') loadProductDetail();
        });
    }
});