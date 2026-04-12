// ── CART STORE ──
const Cart = {
  get() { return JSON.parse(localStorage.getItem('pawshop_cart') || '[]'); },
  save(items) { localStorage.setItem('pawshop_cart', JSON.stringify(items)); },
  add(product) {
    const items = this.get();
    const existing = items.find(i => i.id === product.id);
    if (existing) existing.qty += product.qty || 1;
    else items.push({ ...product, qty: product.qty || 1 });
    this.save(items);
    this.updateBadge();
  },
  remove(id) {
    const items = this.get().filter(i => i.id !== id);
    this.save(items);
    this.updateBadge();
  },
  updateQty(id, qty) {
    const items = this.get();
    const item = items.find(i => i.id === id);
    if (item) { item.qty = qty; this.save(items); this.updateBadge(); }
  },
  count() { return this.get().reduce((n, i) => n + i.qty, 0); },
  total() { return this.get().reduce((s, i) => s + i.price * i.qty, 0); },
  clear() { localStorage.removeItem('pawshop_cart'); this.updateBadge(); },
  updateBadge() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const count = this.count();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

// ── TOAST ──
function showToast(message, icon = '✓') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">${icon}</span>${message}`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── FORM VALIDATION ──
function validateField(input) {
  const errorEl = input.parentElement.querySelector('.field-error');
  let valid = true;
  if (input.required && !input.value.trim()) {
    input.classList.add('error');
    if (errorEl) { errorEl.textContent = 'This field is required'; errorEl.classList.add('show'); }
    valid = false;
  } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
    input.classList.add('error');
    if (errorEl) { errorEl.textContent = 'Please enter a valid email'; errorEl.classList.add('show'); }
    valid = false;
  } else {
    input.classList.remove('error');
    if (errorEl) errorEl.classList.remove('show');
  }
  return valid;
}

function validateForm(form) {
  const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
  let allValid = true;
  fields.forEach(f => { if (!validateField(f)) allValid = false; });
  return allValid;
}

// ── USER STORE ──
const Users = {
  get() { return JSON.parse(localStorage.getItem('pawshop_users') || '[]'); },
  save(users) { localStorage.setItem('pawshop_users', JSON.stringify(users)); },
  find(email) { return this.get().find(u => u.email === email); },
  register(user) {
    const users = this.get();
    users.push(user);
    this.save(users);
  },
};

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  // live validation
  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('blur', () => validateField(el));
  });
});
