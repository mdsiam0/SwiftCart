// Selectors
const productGrid = document.getElementById('product-grid');
const trendingGrid = document.getElementById('trending-grid');
const categoryContainer = document.getElementById('category-container');
const modalContent = document.getElementById('modal-content');

// 1. Navigation Controller
const showPage = (pageId) => {
    document.getElementById('home-page').classList.toggle('hidden', pageId === 'products');
    document.getElementById('products-page').classList.toggle('hidden', pageId === 'home');
    window.scrollTo(0, 0);
};

// 2. Load Categories
const loadCategories = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await res.json();
        renderCategoryBtn("All Products", 'https://fakestoreapi.com/products', true);
        categories.forEach(cat => renderCategoryBtn(cat, `https://fakestoreapi.com/products/category/${cat}`, false));
    } catch (err) { console.error(err); }
};

const renderCategoryBtn = (name, url, active) => {
    const btn = document.createElement('button');
    btn.className = `btn btn-sm md:btn-md btn-outline btn-primary rounded-full category-btn ${active ? 'btn-active' : ''}`;
    btn.innerText = name.toUpperCase();
    btn.onclick = () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('btn-active'));
        btn.classList.add('btn-active');
        fetchProducts(url, productGrid);
    };
    categoryContainer.appendChild(btn);
};

// 3. Fetch Products
const fetchProducts = async (url, container) => {
    container.innerHTML = `<div class="col-span-full text-center py-20"><span class="loading loading-spinner loading-lg"></span></div>`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCards(data, container);
    } catch (err) { container.innerHTML = "Error loading products."; }
};

// 4. Card Template
const displayCards = (products, container) => {
    container.innerHTML = "";
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = "card bg-white shadow-md hover:shadow-xl transition-all border border-slate-100";
        card.innerHTML = `
            <figure class="p-6 bg-white h-64">
                <img src="${p.image}" alt="product" class="h-full object-contain hover:scale-105 transition-transform" />
            </figure>
            <div class="card-body p-5">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${p.category}</span>
                    <div class="flex items-center gap-1 text-orange-500 font-bold text-xs">
                        <i class="fa-solid fa-star"></i> ${p.rating.rate}
                    </div>
                </div>
                <h2 class="card-title text-base font-bold line-clamp-2 h-12 mb-2">${p.title}</h2>
                <p class="text-2xl font-black text-primary mb-4">$${p.price}</p>
                <div class="card-actions grid grid-cols-2 gap-2">
                    <label for="details-modal" onclick="loadDetails(${p.id})" class="btn btn-outline btn-primary btn-sm">Details</label>
                    <button class="btn btn-primary btn-sm"><i class="fa-solid fa-cart-plus mr-1"></i> Add</button>
                </div>
            </div>`;
        container.appendChild(card);
    });
};

// 5. Modal Loader
const loadDetails = async (id) => {
    modalContent.innerHTML = `<div class="flex justify-center items-center w-full h-64"><span class="loading loading-dots loading-lg"></span></div>`;
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const p = await res.json();
        modalContent.innerHTML = `
            <div class="md:w-1/2 bg-white p-10 flex items-center justify-center">
                <img src="${p.image}" class="max-h-80 object-contain" />
            </div>
            <div class="md:w-1/2 p-8 bg-slate-50 flex flex-col justify-center">
                <span class="text-primary font-bold uppercase tracking-tighter mb-2">${p.category}</span>
                <h2 class="text-2xl font-black mb-4 leading-tight">${p.title}</h2>
                <div class="flex items-center gap-3 mb-6">
                    <span class="text-3xl font-bold">$${p.price}</span>
                    <div class="badge badge-warning gap-1 py-3">
                        <i class="fa-solid fa-star"></i> ${p.rating.rate} (${p.rating.count} reviews)
                    </div>
                </div>
                <p class="text-slate-600 text-sm mb-8 leading-relaxed">${p.description}</p>
                <div class="flex gap-2">
                    <button class="btn btn-primary flex-1">Add to Cart</button>
                    <button class="btn btn-neutral flex-1">Buy Now</button>
                </div>
            </div>`;
    } catch (err) { modalContent.innerHTML = "Failed to load product details."; }
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    fetchProducts('https://fakestoreapi.com/products', productGrid);
    // Load top 3 for trending
    fetch('https://fakestoreapi.com/products').then(r => r.json()).then(data => {
        const top = data.sort((a,b) => b.rating.rate - a.rating.rate).slice(0,3);
        displayCards(top, trendingGrid);
    });
});