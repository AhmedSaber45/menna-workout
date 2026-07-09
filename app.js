/* ============================================================
   HER FIT JOURNEY — WORKOUT PLANNER JavaScript
   ============================================================ */

'use strict';

/* ============================================================
   STATE
   ============================================================ */
let exercises = [];
let currentFilter = 'Chest + TriCep الجمعة';
let pendingVideoUrl = '';

const sampleExercises = [
  /* === Day 1: Chest + TriCep الجمعة === */
  {
    id: uid(),
    name: 'Flat Bar Chest Press',
    videoUrl: 'https://youtu.be/gRVjAtPip0Y',
    imageUrl: 'images/flat_bar_chest_press.webp',
    sets: '3 sets',
    notes: '',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now()
  },
  {
    id: uid(),
    name: 'Incline Dumbbell Chest Press',
    videoUrl: 'https://www.youtube.com/watch?v=Ji5na0ZR124',
    imageUrl: 'images/incline_dumbbell_chest_press.webp',
    sets: '2 sets',
    notes: '',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now() - 1000
  },
  {
    id: uid(),
    name: 'Machine Chest Fly',
    videoUrl: 'https://youtube.com/shorts/XZg28DIf1oc?time_continue=12',
    imageUrl: 'images/machine_chest_fly.webp',
    sets: '2 sets',
    notes: '',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now() - 2000
  },
  {
    id: uid(),
    name: 'Dumbbell Pull Over',
    videoUrl: 'https://www.youtube.com/watch?v=wveUmKmIBcI&t=43s',
    imageUrl: 'images/dumbbell_pull_over.webp',
    sets: '3 sets',
    notes: '',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now() - 3000
  },
  {
    id: uid(),
    name: 'Seated Dumbbell Overhead',
    videoUrl: 'https://www.youtube.com/watch?v=iHgtJiwcODo',
    imageUrl: 'images/seated_dumbbell_overhead.webp',
    sets: '2 sets',
    notes: 'اسندى ضهرك عادى على اى ترابيزة مش زى الفيديو',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now() - 4000
  },
  {
    id: uid(),
    name: 'Russian Twist',
    videoUrl: 'https://www.youtube.com/watch?v=JyUqwkVpsi8',
    imageUrl: 'images/russian_twist.webp',
    sets: '2 sets',
    notes: '',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now() - 4500
  },

  /* === Day 2: Back + BiCep السبت === */
  {
    id: uid(),
    name: 'T-Bar Row',
    videoUrl: 'https://www.youtube.com/watch?v=Wg7sKEaS070',
    imageUrl: 'images/t_bar_row.webp',
    sets: '3 sets',
    notes: 'امسكى المسكة اللى تريح ايدك',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 5000
  },
  {
    id: uid(),
    name: 'Seated Row Close Grip',
    videoUrl: 'https://www.youtube.com/watch?v=7BuoyPcW_tE&t=24s',
    imageUrl: 'images/seated_row_close_grip.webp',
    sets: '3 sets',
    notes: 'كوعك لازق فى جسمك مش بيتفتح زى الفيديو كدة (زى ماتكونى بتجيبى كعوك على جيبك اللى ورا)',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 6000
  },
  {
    id: uid(),
    name: 'Dead Lift Dumbbell',
    videoUrl: 'https://www.youtube.com/watch?v=A9HvO-2dfG0',
    imageUrl: 'images/dead_lift_dumbbell.webp',
    sets: '2 sets',
    notes: '',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 7000
  },
  {
    id: uid(),
    name: 'Lower Back Extension',
    videoUrl: 'https://www.youtube.com/watch?v=3xc9k8k6ZxY',
    imageUrl: 'images/lower_back_extension.webp',
    sets: '3 sets',
    notes: 'عادى الجهاز ممكن مايبقاش زى اللى فى الفيديو ولا الصورة بس هو نفس الاداء. خلى بالك ضهرك بيتنى مش وسطك (الحركة جاية من ضهك مش وسطك) اكنك بقتربى صدرك لوسطك',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 8000
  },
  {
    id: uid(),
    name: 'Scapula Push Up',
    videoUrl: 'https://www.youtube.com/watch?v=LolK1AbFpMQ&t=57s',
    imageUrl: 'images/scapula_push_up.webp',
    sets: '2 sets',
    notes: 'خلى بالك كوعك مايتنيش كوعك دايما مفرود',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 9000
  },
  {
    id: uid(),
    name: 'Dumbbell Hammer Curl',
    videoUrl: 'https://youtu.be/0IAM2YtviQY',
    imageUrl: 'images/dumbbell_hammer_curl.webp',
    sets: '2 sets',
    notes: '',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 10000
  },

  /* === Day 3: Arm الإثنين === */
  {
    id: uid(),
    name: 'Cable Curl',
    videoUrl: 'https://www.youtube.com/watch?v=ctR8tpErPNA',
    imageUrl: 'images/cable_curl.webp',
    sets: '3 sets',
    notes: '',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 11000
  },
  {
    id: uid(),
    name: 'Tricep Rope Push Down',
    videoUrl: 'https://www.youtube.com/watch?v=fvIVljEvqYY',
    imageUrl: 'images/tricep_rope_push_down.webp',
    sets: '3 sets',
    notes: '',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 12000
  },
  {
    id: uid(),
    name: 'Dumbbell Lateral Raise',
    videoUrl: 'https://www.youtube.com/shorts/xyK8UiC-BUw',
    imageUrl: 'images/dumbbell_lateral_raise.webp',
    sets: '3 sets',
    notes: 'لو لقيتى الوزن تقيل اتنى كوعك سيكا',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 13000
  },
  {
    id: uid(),
    name: 'Seated Elbows-In Dumbbell Overhead Press',
    videoUrl: 'https://www.youtube.com/watch?v=2JwRiXGtGFk',
    imageUrl: 'images/seated_elbows_in_dumbbell_overhead_press.webp',
    sets: '2 sets',
    notes: 'اسندى ضهرك سيبك من الفيديو بس هو نفس الاداء',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 14000
  },
  {
    id: uid(),
    name: 'Machine Rear Delt Fly',
    videoUrl: 'https://www.youtube.com/shorts/H5UxZFl0lgk',
    imageUrl: 'images/machine_rear_delt_fly.webp',
    sets: '2 sets',
    notes: '',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 15000
  },
  {
    id: uid(),
    name: 'Dumbbell Shrugs',
    videoUrl: 'https://youtu.be/JEnhFC1AtHw',
    imageUrl: 'images/dumbbell_shrugs.webp',
    sets: '3 sets',
    notes: '',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 16000
  },

  /* === Day 4: Leg + Abs الاربعاء === */
  {
    id: uid(),
    name: 'Barbell Hip Thrust',
    videoUrl: 'https://www.youtube.com/watch?v=ZHM4n4aDgXg',
    imageUrl: 'images/barbell_hip_thrust.webp',
    sets: '3 sets',
    notes: '',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 17000
  },
  {
    id: uid(),
    name: 'Adductor Machine',
    videoUrl: 'https://www.youtube.com/watch?v=a__54Fv2IsM',
    imageUrl: 'images/adductor_machine.webp',
    sets: '3 sets',
    notes: 'كل فترة زودى الفتحة بتاعهة الجهاز',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 18000
  },
  {
    id: uid(),
    name: 'Leg Extension',
    videoUrl: 'https://www.youtube.com/shorts/iQ92TuvBqRo',
    imageUrl: 'images/leg_extension.webp',
    sets: '3 sets',
    notes: '',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 19000
  },
  {
    id: uid(),
    name: 'Seated Leg Curl',
    videoUrl: 'https://www.youtube.com/shorts/xdbEG3xGLI8',
    imageUrl: 'images/seated_leg_curl.webp',
    sets: '2 sets',
    notes: '',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 20000
  },
  {
    id: uid(),
    name: 'RDL',
    videoUrl: 'https://www.youtube.com/watch?v=SoO6QxS32Jc',
    imageUrl: 'images/rdl.webp',
    sets: '2 sets',
    notes: '',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 21000
  },
  {
    id: uid(),
    name: 'Machine Seated Calf Raise',
    videoUrl: 'https://www.youtube.com/watch?v=_LxQH4o7COk&t=3s',
    imageUrl: 'images/machine_seated_calf_raise.webp',
    sets: '2 sets',
    notes: '',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 22000
  },
  {
    id: uid(),
    name: 'Crunch',
    videoUrl: 'https://www.youtube.com/watch?v=0OxOI3sAIrM&t=63s',
    imageUrl: 'images/crunch.webp',
    sets: '3 sets',
    notes: 'ثبتى رجلك فى اى حاجة مش شرط تكون متعلقة كدة',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 23000
  },
  {
    id: uid(),
    name: 'Leg Raises',
    videoUrl: 'https://www.youtube.com/shorts/fbGDQGHxvHk',
    imageUrl: 'images/leg_raises.webp',
    sets: '3 sets',
    notes: 'نامى على الارض زى الفيديو سيبك من الصورة',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 24000
  }
];

/* ============================================================
   INIT
   ============================================================ */
(function init() {
  exercises = [...sampleExercises];
  renderAll();
  initZoomDrag();

  // Keyboard close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeImageModal();
      closeVideoModal();
    }
  });
})();

/* ============================================================
   UTILITIES
   ============================================================ */
function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ============================================================
   RENDER
   ============================================================ */
function renderAll() {
  const grid = document.getElementById('exercisesGrid');
  const empty = document.getElementById('emptyState');
  const filtered = exercises.filter(e => e.category === currentFilter);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    empty.classList.add('show');
    return;
  }

  empty.classList.remove('show');

  filtered.forEach((ex, i) => {
    const card = buildCard(ex, i);
    grid.appendChild(card);
  });
}

function buildCard(ex, index) {
  const card = document.createElement('div');
  card.className = 'exercise-card';
  card.setAttribute('data-id', ex.id);
  card.style.animationDelay = `${index * 0.07}s`;
  card.style.opacity = '0';

  // Image section
  const hasImage = ex.imageUrl && ex.imageUrl.trim() !== '';
  const imageSection = hasImage
    ? `<div class="card-image-wrap" onclick="openImageModal('${escHtml(ex.imageUrl)}', '${escHtml(ex.name)}')">
         <img class="card-image" src="${escHtml(ex.imageUrl)}" alt="${escHtml(ex.name)}" loading="lazy"
              onerror="this.parentNode.innerHTML='<div class=\'card-image-placeholder\'>${getCategoryEmoji(ex.category)}</div>'" />
         <span class="zoom-hint">🔍 Zoom</span>
         <span class="card-category">${escHtml(ex.category)}</span>
       </div>`
    : `<div class="card-image-wrap" style="cursor:default">
         <div class="card-image-placeholder">${getCategoryEmoji(ex.category)}</div>
         <span class="card-category">${escHtml(ex.category)}</span>
       </div>`;

  // Notes
  const notesSection = ex.notes
    ? `<p class="card-notes">${escHtml(ex.notes)}</p>`
    : '';

  // Sets
  const setsSection = ex.sets
    ? `<span class="card-sets">🔄 ${escHtml(ex.sets)}</span>`
    : '';

  card.innerHTML = `
    ${imageSection}
    <div class="card-body">
      <div class="card-name-row">
        <button class="card-name" onclick="promptVideoModal('${escHtml(ex.id)}', '${escHtml(ex.name)}', '${escHtml(ex.videoUrl)}')" title="Watch video for ${escHtml(ex.name)}">
          <span class="video-icon">▶</span>
          ${escHtml(ex.name)}
        </button>
        ${setsSection}
      </div>
      ${notesSection}
    </div>
    ${ex.videoUrl
      ? `<div class="card-footer" style="justify-content: flex-end;">
          <button class="card-watch-link" onclick="promptVideoModal('${escHtml(ex.id)}', '${escHtml(ex.name)}', '${escHtml(ex.videoUrl)}')">
             Watch Tutorial →
           </button>
         </div>`
      : ''}
  `;

  // Animate in
  requestAnimationFrame(() => {
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    card.style.opacity = '1';
  });

  return card;
}

function getCategoryEmoji(cat) {
  const map = {
    'Chest + TriCep الجمعة': '💪',
    'Back + BiCep السبت': '✨',
    'Arm الإثنين': '⚡',
    'Leg + Abs الاربعاء': '🦵'
  };
  return map[cat] || '🌸';
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ============================================================
   FILTER
   ============================================================ */
function filterExercises(category, btn) {
  currentFilter = category;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderAll();
}

/* ============================================================
   IMAGE ZOOM MODAL
   ============================================================ */
let zoomScale = 1;
let zoomX = 0;
let zoomY = 0;
let isDraggingZoom = false;
let zoomStartX = 0;
let zoomStartY = 0;

function updateImageTransform() {
  const img = document.getElementById('modalImage');
  if (img) {
    img.style.transform = `translate(${zoomX}px, ${zoomY}px) scale(${zoomScale})`;
  }
}

function zoomImage(factor) {
  const oldScale = zoomScale;
  zoomScale = Math.min(Math.max(zoomScale * factor, 0.8), 5);
  
  if (zoomScale <= 1.01 && zoomScale >= 0.99) {
    zoomScale = 1;
    zoomX = 0;
    zoomY = 0;
  } else {
    // Clamp translation offsets so the image doesn't fly off screen
    const img = document.getElementById('modalImage');
    if (img) {
      const maxTranslateX = (zoomScale - 1) * (img.clientWidth / 2);
      const maxTranslateY = (zoomScale - 1) * (img.clientHeight / 2);
      zoomX = Math.min(Math.max(zoomX, -maxTranslateX), maxTranslateX);
      zoomY = Math.min(Math.max(zoomY, -maxTranslateY), maxTranslateY);
    }
  }
  updateImageTransform();
}

function resetImageZoom() {
  zoomScale = 1;
  zoomX = 0;
  zoomY = 0;
  updateImageTransform();
}

function initZoomDrag() {
  const container = document.getElementById('modalImgContainer');
  const img = document.getElementById('modalImage');
  if (!container || !img) return;

  // Zoom with scroll wheel
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    zoomImage(zoomFactor);
  }, { passive: false });

  // Touch pinch-to-zoom state helper
  let initialTouchDist = 0;

  const startDrag = (clientX, clientY) => {
    if (zoomScale <= 1) return; // Drag only when zoomed in
    isDraggingZoom = true;
    img.classList.add('dragging');
    zoomStartX = clientX - zoomX;
    zoomStartY = clientY - zoomY;
  };

  const moveDrag = (clientX, clientY) => {
    if (!isDraggingZoom) return;
    zoomX = clientX - zoomStartX;
    zoomY = clientY - zoomStartY;

    const maxTranslateX = (zoomScale - 1) * (img.clientWidth / 2);
    const maxTranslateY = (zoomScale - 1) * (img.clientHeight / 2);
    zoomX = Math.min(Math.max(zoomX, -maxTranslateX), maxTranslateX);
    zoomY = Math.min(Math.max(zoomY, -maxTranslateY), maxTranslateY);

    updateImageTransform();
  };

  const endDrag = () => {
    isDraggingZoom = false;
    img.classList.remove('dragging');
  };

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  });

  window.addEventListener('mousemove', (e) => {
    if (isDraggingZoom) {
      moveDrag(e.clientX, e.clientY);
    }
  });

  window.addEventListener('mouseup', endDrag);

  // Touch Events (Pinch and Pan)
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2) {
      isDraggingZoom = false; // Disable panning during pinch
      initialTouchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1 && isDraggingZoom) {
      moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    } else if (e.touches.length === 2) {
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (initialTouchDist > 0) {
        const factor = currentDist / initialTouchDist;
        // Make pinch-to-zoom responsiveness smoother
        const smoothedFactor = 1 + (factor - 1) * 0.3;
        zoomImage(smoothedFactor);
        initialTouchDist = currentDist;
      }
    }
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    if (e.touches.length < 2) {
      initialTouchDist = 0;
    }
    endDrag();
  });
}

function openImageModal(imgUrl, name) {
  const overlay = document.getElementById('imageModal');
  document.getElementById('modalImage').src = imgUrl;
  document.getElementById('modalImage').alt = name;
  document.getElementById('modalCaption').textContent = name;
  
  resetImageZoom();
  
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  history.pushState({ modal: 'image' }, '');
}

function closeImageModal() {
  const overlay = document.getElementById('imageModal');
  if (overlay.classList.contains('open')) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    resetImageZoom();
  }
}

/* ============================================================
   VIDEO MODAL
   ============================================================ */
function promptVideoModal(id, name, url) {
  if (!url) {
    showToast('⚠️ No video URL provided for this exercise.');
    return;
  }
  pendingVideoUrl = url;

  document.getElementById('videoModalTitle').textContent = name;
  document.getElementById('videoModalSubtitle').textContent =
    `You're about to watch the tutorial for "${name}". Stay focused! 💪`;

  const overlay = document.getElementById('videoModal');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  history.pushState({ modal: 'video' }, '');
}

function openVideoLink() {
  if (pendingVideoUrl) {
    window.open(pendingVideoUrl, '_blank', 'noopener,noreferrer');
  }
  closeVideoModal();
}

function closeVideoModal() {
  const overlay = document.getElementById('videoModal');
  if (overlay.classList.contains('open')) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    pendingVideoUrl = '';
  }
}

/* ============================================================
   ANDROID BACK BUTTON HANDLING
   ============================================================ */
let lastBackPressTime = 0;

// DeviceReady listener for Cordova/Capacitor native wrappers
document.addEventListener("deviceready", () => {
  document.addEventListener("backbutton", onBackKeyDown, false);
}, false);

// History state popstate listener for WebViews
window.addEventListener('popstate', (event) => {
  closeAllModals();
});

function closeAllModals() {
  const imageModal = document.getElementById('imageModal');
  const videoModal = document.getElementById('videoModal');
  let closed = false;

  if (imageModal && imageModal.classList.contains('open')) {
    imageModal.classList.remove('open');
    document.body.style.overflow = '';
    closed = true;
  }
  if (videoModal && videoModal.classList.contains('open')) {
    videoModal.classList.remove('open');
    document.body.style.overflow = '';
    pendingVideoUrl = '';
    closed = true;
  }
  return closed;
}

function onBackKeyDown(e) {
  // If a modal was open, close it and prevent back navigation
  if (closeAllModals()) {
    e.preventDefault();
    return;
  }

  // Double click back to exit
  const currentTime = new Date().getTime();
  if (currentTime - lastBackPressTime < 2000) {
    if (navigator.app && navigator.app.exitApp) {
      navigator.app.exitApp();
    }
  } else {
    showToast("اضغط مرة أخرى للخروج 🌸");
    lastBackPressTime = currentTime;
    e.preventDefault();
  }
}

