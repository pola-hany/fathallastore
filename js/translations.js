const translations = {
    ar: {
        storeName: "فتح الله",
        home: "الرئيسية",
        products: "المنتجات",
        sinceBadge: "منذ 1948",
        heroTitle: "فتح الله للأجهزة المنزلية والإلكترونيات",
        heroDesc: "أفضل العروض على الهواتف واللابتوبات والشاشات والأجهزة المنزلية بأعلى جودة",
        feature1: "جودة عالية",
        feature2: "شحن سريع",
        feature3: "دعم فني",
        shopBtn: "تسوق الآن",
        searchPlaceholder: "ابحث عن منتج...",
        allCategories: "جميع الفئات",
        phonesCat: "الهواتف",
        laptopsCat: "اللابتوبات",
        tvsCat: "الشاشات",
        appliancesCat: "الأجهزة المنزلية",
        accessoriesCat: "الإكسسوارات",
        allPrices: "جميع الأسعار",
        featuredTitle: "أحدث المنتجات",
        featuredDesc: "اكتشف تشكيلتنا المميزة من الأجهزة والإلكترونيات",
        viewDetails: "عرض التفاصيل",
        qualityTitle: "جودة مضمونة",
        qualityDesc: "من أفضل الماركات العالمية",
        priceTitle: "أفضل الأسعار",
        priceDesc: "أسعار الجملة للمستهلك",
        warrantyTitle: "ضمان شامل",
        warrantyDesc: "ضمان على جميع المنتجات",
        deliveryTitle: "توصيل سريع",
        deliveryDesc: "لكافة أنحاء الجمهورية",
        footerDesc: "منذ 1948، نقدم لعملائنا أفضل المنتجات بأعلى جودة وأقل الأسعار",
        quickLinks: "روابط سريعة",
        contactUs: "تواصل معنا",
        copyright: "© 2024 فتح الله - جميع الحقوق محفوظة",
        specs: "المواصفات",
        description: "الوصف",
        productUrl: "رابط المنتج",
        copy: "نسخ",
        copied: "تم النسخ!"
    },
    en: {
        storeName: "Fathallah",
        home: "Home",
        products: "Products",
        sinceBadge: "Since 1948",
        heroTitle: "Fathallah Home Appliances & Electronics",
        heroDesc: "Best deals on phones, laptops, TVs, and home appliances with highest quality",
        feature1: "High Quality",
        feature2: "Fast Shipping",
        feature3: "Support",
        shopBtn: "Shop Now",
        searchPlaceholder: "Search products...",
        allCategories: "All Categories",
        phonesCat: "Phones",
        laptopsCat: "Laptops",
        tvsCat: "TVs",
        appliancesCat: "Appliances",
        accessoriesCat: "Accessories",
        allPrices: "All Prices",
        featuredTitle: "Latest Products",
        featuredDesc: "Discover our premium collection of electronics and appliances",
        viewDetails: "View Details",
        qualityTitle: "Guaranteed Quality",
        qualityDesc: "From top international brands",
        priceTitle: "Best Prices",
        priceDesc: "Wholesale prices for consumers",
        warrantyTitle: "Full Warranty",
        warrantyDesc: "Warranty on all products",
        deliveryTitle: "Fast Delivery",
        deliveryDesc: "To all over the country",
        footerDesc: "Since 1948, we provide our customers with the best products at the highest quality",
        quickLinks: "Quick Links",
        contactUs: "Contact Us",
        copyright: "© 2024 Fathallah - All Rights Reserved",
        specs: "Specifications",
        description: "Description",
        productUrl: "Product URL",
        copy: "Copy",
        copied: "Copied!"
    }
};

let currentLang = localStorage.getItem('lang') || 'ar';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    const t = translations[lang];
    
    const elements = {
        storeName: t.storeName,
        homeLink: t.home,
        productsLink: t.products,
        sinceBadge: t.sinceBadge,
        heroTitle: t.heroTitle,
        heroDesc: t.heroDesc,
        feature1: t.feature1,
        feature2: t.feature2,
        feature3: t.feature3,
        shopBtn: t.shopBtn,
        allCategories: t.allCategories,
        phonesCat: t.phonesCat,
        laptopsCat: t.laptopsCat,
        tvsCat: t.tvsCat,
        appliancesCat: t.appliancesCat,
        accessoriesCat: t.accessoriesCat,
        allPrices: t.allPrices,
        featuredTitle: t.featuredTitle,
        featuredDesc: t.featuredDesc,
        qualityTitle: t.qualityTitle,
        qualityDesc: t.qualityDesc,
        priceTitle: t.priceTitle,
        priceDesc: t.priceDesc,
        warrantyTitle: t.warrantyTitle,
        warrantyDesc: t.warrantyDesc,
        deliveryTitle: t.deliveryTitle,
        deliveryDesc: t.deliveryDesc,
        footerDesc: t.footerDesc,
        quickLinks: t.quickLinks,
        contactUs: t.contactUs,
        copyright: t.copyright,
        footerHome: t.home,
        footerProducts: t.products
    };
    
    for (const [id, text] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;
    
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.innerHTML = `<i class="fas fa-globe"></i> ${lang === 'ar' ? 'English' : 'العربية'}`;
    }
    
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
}

function t(key) {
    return translations[currentLang][key] || key;
}