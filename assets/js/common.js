/* StormIQ Demo - Common JavaScript */

// ============ Sidebar Toggle ============
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('main-content');
  sidebar.classList.toggle('open');
  sidebar.classList.toggle('-translate-x-full');
  if (mainContent) {
    mainContent.classList.toggle('ml-64');
    mainContent.classList.toggle('ml-0');
  }
}

// ============ Count-Up Animation ============
function animateCountUp(element, target, duration = 1000) {
  const start = 0;
  const startTime = performance.now();
  const isDecimal = String(target).includes('.');
  const hasComma = element.dataset.comma === 'true';
  const prefix = element.dataset.prefix || '';
  const suffix = element.dataset.suffix || '';

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = start + (target - start) * eased;

    let display = isDecimal ? current.toFixed(1) : Math.floor(current);
    if (hasComma) display = Number(display).toLocaleString();
    element.textContent = prefix + display + suffix;

    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCountUps() {
  document.querySelectorAll('.count-up').forEach(el => {
    const target = parseFloat(el.dataset.target);
    if (!isNaN(target)) animateCountUp(el, target);
  });
}

// ============ Scroll Reveal ============
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============ Progress Bars ============
function initProgressBars() {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    const target = bar.dataset.width;
    if (target) {
      setTimeout(() => { bar.style.width = target; }, 300);
    }
  });
}

// ============ Modal ============
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ============ Tabs ============
function switchTab(tabGroup, tabId) {
  // Update tab buttons
  document.querySelectorAll(`[data-tab-group="${tabGroup}"]`).forEach(btn => {
    btn.classList.remove('border-action', 'text-action');
    btn.classList.add('border-transparent', 'text-gray-500');
  });
  const activeBtn = document.querySelector(`[data-tab-group="${tabGroup}"][data-tab="${tabId}"]`);
  if (activeBtn) {
    activeBtn.classList.add('border-action', 'text-action');
    activeBtn.classList.remove('border-transparent', 'text-gray-500');
  }

  // Update tab content
  document.querySelectorAll(`[data-tab-content="${tabGroup}"]`).forEach(content => {
    content.classList.remove('active');
  });
  const activeContent = document.getElementById(tabId);
  if (activeContent) {
    activeContent.classList.add('active');
  }
}

// ============ Notification Badge ============
function updateNotificationBadge(count) {
  const badge = document.getElementById('notification-badge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ============ Detail Panel ============
function openDetailPanel(panelId) {
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('open');
}

function closeDetailPanel(panelId) {
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.remove('open');
}

// ============ Toast Notification ============
function showToast(message, type = 'success') {
  const colors = {
    success: 'bg-success',
    error: 'bg-danger',
    warning: 'bg-warning',
    info: 'bg-action'
  };
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 z-50 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
  toast.innerHTML = `<div class="flex items-center gap-2"><span class="material-icons-outlined text-sm">${type === 'success' ? 'check_circle' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info'}</span>${message}</div>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; });
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============ Loading Button ============
function setButtonLoading(btn, loading = true) {
  if (loading) {
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = '<svg class="animate-spin h-5 w-5 inline mr-2" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>處理中...';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn.dataset.originalText;
    btn.disabled = false;
  }
}

// ============ Drag & Drop Zone ============
function initDropZones() {
  document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('dragover'); });
    zone.addEventListener('dragleave', () => { zone.classList.remove('dragover'); });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      showToast('檔案上傳成功！', 'success');
    });
  });
}

// ============ Init on DOM Ready ============
document.addEventListener('DOMContentLoaded', () => {
  initCountUps();
  initScrollReveal();
  initProgressBars();
  initDropZones();
});
