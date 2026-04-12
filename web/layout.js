function getNav(activePage) {
  return `
  <div class="announcement-bar" data-testid="announcement-bar">🐾 Free shipping on orders over $50 — Use code PAWFREE</div>
  <nav data-testid="navbar">
    <a href="index.html" class="nav-logo" data-testid="nav-logo">Paw<span>Shop</span></a>
    <ul class="nav-links">
      <li><a href="index.html" data-testid="nav-home" ${activePage==='home'?'class="active"':''}>Home</a></li>
      <li><a href="shop.html" data-testid="nav-shop" ${activePage==='shop'?'class="active"':''}>Shop</a></li>
      <li><a href="contact.html" data-testid="nav-contact" ${activePage==='contact'?'class="active"':''}>Contact</a></li>
    </ul>
    <div class="nav-actions" id="nav-actions">
      <a href="login.html" class="btn-nav" data-testid="nav-login-btn">Login</a>
      <a href="cart.html" class="cart-icon" aria-label="Shopping cart" data-testid="nav-cart-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span class="cart-badge" style="display:none">0</span>
      </a>
    </div>
  </nav>`;
}

function getFooter() {
  return `
  <footer data-testid="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">Paw<span>Shop</span></div>
        <p>Premium pet supplies for your beloved companions. Quality products, happy pets.</p>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <ul>
          <li><a href="shop.html?category=food" data-testid="footer-link-food">Food & Treats</a></li>
          <li><a href="shop.html?category=toys" data-testid="footer-link-toys">Toys</a></li>
          <li><a href="shop.html?category=accessories" data-testid="footer-link-accessories">Accessories</a></li>
          <li><a href="shop.html?category=beds" data-testid="footer-link-beds">Beds & Comfort</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Help</h4>
        <ul>
          <li><a href="contact.html" data-testid="footer-link-contact">Contact Us</a></li>
          <li><a href="#" data-testid="footer-link-shipping">Shipping Info</a></li>
          <li><a href="#" data-testid="footer-link-returns">Returns</a></li>
          <li><a href="login.html" data-testid="footer-link-account">My Account</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">© 2025 PawShop. Made with 🐾 for pet lovers.</div>
  </footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  const page = document.body.dataset.page || 'home';
  if (navEl) navEl.innerHTML = getNav(page);
  if (footerEl) footerEl.innerHTML = getFooter();

  // Show logged-in state in nav
  const user = JSON.parse(localStorage.getItem('pawshop_user') || 'null');
  const actionsEl = document.getElementById('nav-actions');
  if (actionsEl && user) {
    actionsEl.innerHTML = `
      <span style="font-size:13px;color:var(--text-mid);letter-spacing:.02em" data-testid="nav-username">Hi, ${user.name.split(' ')[0]}</span>
      <a href="#" class="btn-nav" data-testid="nav-logout-btn" id="logout-btn">Logout</a>
      <a href="cart.html" class="cart-icon" aria-label="Shopping cart" data-testid="nav-cart-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span class="cart-badge" style="display:none">0</span>
      </a>`;
    document.getElementById('logout-btn').addEventListener('click', e => {
      e.preventDefault();
      localStorage.removeItem('pawshop_user');
      window.location.href = 'index.html';
    });
  }

  Cart.updateBadge();
});
