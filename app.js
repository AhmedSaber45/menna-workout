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
let currentBlobUrl = null;
const CACHE_NAME = 'menna-workout-videos';

const sampleExercises = [
  /* === Day 1: Chest + TriCep الجمعة === */
  {
    id: uid(),
    name: 'Upper Body Warmup ',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/upperbodywarmup.mp4',
    imageUrl: '',
    category: 'Chest + TriCep الجمعة',
    isWarmup: true,
    createdAt: Date.now() + 10000
  },
  {
    id: uid(),
    name: 'Flat Bar Chest Press',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/flat%20bar%20chest%20press.mp4',
    imageUrl: 'images/flat_bar_chest_press.webp',
    sets: '3 sets',
    notes: '',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now()
  },
  {
    id: uid(),
    name: 'Incline Dumbbell Chest Press',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/incline%20chest%20press.mp4',
    imageUrl: 'images/incline_dumbbell_chest_press.webp',
    sets: '2 sets',
    notes: '',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now() - 1000
  },
  {
    id: uid(),
    name: 'Machine Chest Fly',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/machine%20chest%20fly.mp4',
    imageUrl: 'images/machine_chest_fly.webp',
    sets: '2 sets',
    notes: '',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now() - 2000
  },
  {
    id: uid(),
    name: 'Dumbbell Pull Over',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/pull%20over.mp4',
    imageUrl: 'images/dumbbell_pull_over.webp',
    sets: '3 sets',
    notes: '',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now() - 3000
  },
  {
    id: uid(),
    name: 'Seated Dumbbell Overhead',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/tri%20over%20head.mp4',
    imageUrl: 'images/seated_dumbbell_overhead.webp',
    sets: '2 sets',
    notes: 'اسندى ضهرك عادى على اى ترابيزة مش زى الفيديو',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now() - 4000
  },
  {
    id: uid(),
    name: 'Russian Twist',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/russian%20twist.mp4',
    imageUrl: 'images/russian_twist.webp',
    sets: '2 sets',
    notes: '',
    category: 'Chest + TriCep الجمعة',
    createdAt: Date.now() - 4500
  },

  /* === Day 2: Back + BiCep السبت === */
  {
    id: uid(),
    name: 'Upper Body Warmup ',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/upperbodywarmup.mp4',
    imageUrl: '',
    category: 'Back + BiCep السبت',
    isWarmup: true,
    createdAt: Date.now() + 9000
  },
  {
    id: uid(),
    name: 'T-Bar Row',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/t%20bar%20row.mp4',
    imageUrl: 'images/t_bar_row.webp',
    sets: '3 sets',
    notes: 'امسكى المسكة اللى تريح ايدك',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 5000
  },
  {
    id: uid(),
    name: 'Seated Row Close Grip',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/seated%20row%20close%20grip.mp4',
    imageUrl: 'images/seated_row_close_grip.webp',
    sets: '3 sets',
    notes: 'كوعك لازق فى جسمك مش بيتفتح زى الفيديو كدة (زى ماتكونى بتجيبى كعوك على جيبك اللى ورا)',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 6000
  },
  {
    id: uid(),
    name: 'Dead Lift Dumbbell',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/dead%20lift.mp4',
    imageUrl: 'images/dead_lift_dumbbell.webp',
    sets: '2 sets',
    notes: '',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 7000
  },
  {
    id: uid(),
    name: 'Lower Back Extension',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/lower%20back%20extension.mp4',
    imageUrl: 'images/lower_back_extension.webp',
    sets: '3 sets',
    notes: 'عادى الجهاز ممكن مايبقاش زى اللى فى الفيديو ولا الصورة بس هو نفس الاداء. خلى بالك ضهرك بيتنى مش وسطك (الحركة جاية من ضهك مش وسطك) اكنك بقتربى صدرك لوسطك',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 8000
  },
  {
    id: uid(),
    name: 'Scapula Push Up',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/scapula%20push%20up.mp4',
    imageUrl: 'images/scapula_push_up.webp',
    sets: '2 sets',
    notes: 'خلى بالك كوعك مايتنيش كوعك دايما مفرود',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 9000
  },
  {
    id: uid(),
    name: 'Dumbbell Hammer Curl',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/hammer%20curl.mp4',
    imageUrl: 'images/dumbbell_hammer_curl.webp',
    sets: '2 sets',
    notes: '',
    category: 'Back + BiCep السبت',
    createdAt: Date.now() - 10000
  },

  /* === Day 3: Arm الإثنين === */
  {
    id: uid(),
    name: 'Upper Body Warmup ',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/upperbodywarmup.mp4',
    imageUrl: '',
    category: 'Arm الإثنين',
    isWarmup: true,
    createdAt: Date.now() + 8000
  },
  {
    id: uid(),
    name: 'Cable Curl',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/cable%20bi%20curl.mp4',
    imageUrl: 'images/cable_curl.webp',
    sets: '3 sets',
    notes: '',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 11000
  },
  {
    id: uid(),
    name: 'Tricep Rope Push Down',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/tri%20rope%20push%20down.mp4',
    imageUrl: 'images/tricep_rope_push_down.webp',
    sets: '3 sets',
    notes: '',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 12000
  },
  {
    id: uid(),
    name: 'Dumbbell Lateral Raise',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/dumbell%20lateral%20raise.mp4',
    imageUrl: 'images/dumbbell_lateral_raise.webp',
    sets: '3 sets',
    notes: 'لو لقيتى الوزن تقيل اتنى كوعك سيكا',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 13000
  },
  {
    id: uid(),
    name: 'Seated Elbows-In Dumbbell Overhead Press',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/dumbbell%20shoulder%20press.mp4',
    imageUrl: 'images/seated_elbows_in_dumbbell_overhead_press.webp',
    sets: '2 sets',
    notes: 'اسندى ضهرك سيبك من الفيديو بس هو نفس الاداء',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 14000
  },
  {
    id: uid(),
    name: 'Machine Rear Delt Fly',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/rear%20delt%20fly.mp4',
    imageUrl: 'images/machine_rear_delt_fly.webp',
    sets: '2 sets',
    notes: '',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 15000
  },
  {
    id: uid(),
    name: 'Dumbbell Shrugs',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/shrugs.mp4',
    imageUrl: 'images/dumbbell_shrugs.webp',
    sets: '3 sets',
    notes: '',
    category: 'Arm الإثنين',
    createdAt: Date.now() - 16000
  },

  /* === Day 4: Leg + Abs الاربعاء === */
  {
    id: uid(),
    name: 'Lower Body Warmup ',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/lowerbodywarmup.mp4',
    imageUrl: '',
    category: 'Leg + Abs الاربعاء',
    isWarmup: true,
    createdAt: Date.now() + 7000
  },
  {
    id: uid(),
    name: 'Barbell Hip Thrust',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/hip%20thrust.mp4',
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
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/leg%20extension.mp4',
    imageUrl: 'images/leg_extension.webp',
    sets: '3 sets',
    notes: '',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 19000
  },
  {
    id: uid(),
    name: 'Seated Leg Curl',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/seated%20leg%20curl.mp4',
    imageUrl: 'images/seated_leg_curl.webp',
    sets: '2 sets',
    notes: '',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 20000
  },
  {
    id: uid(),
    name: 'RDL',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/RDL.mp4',
    imageUrl: 'images/rdl.webp',
    sets: '2 sets',
    notes: '',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 21000
  },
  {
    id: uid(),
    name: 'Machine Seated Calf Raise',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/seated%20calfes.mp4',
    imageUrl: 'images/machine_seated_calf_raise.webp',
    sets: '2 sets',
    notes: '',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 22000
  },
  {
    id: uid(),
    name: 'Crunch',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/crunches.mp4',
    imageUrl: 'images/crunch.webp',
    sets: '3 sets',
    notes: 'ثبتى رجلك فى اى حاجة مش شرط تكون متعلقة كدة',
    category: 'Leg + Abs الاربعاء',
    createdAt: Date.now() - 23000
  },
  {
    id: uid(),
    name: 'Leg Raises',
    videoUrl: 'https://ahmedsaber45.github.io/menna-workout/videos/leg%20raises.mp4',
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
  updateCacheStatus(true);

  // Listen for online/offline events to update status automatically
  window.addEventListener('online', updateCacheStatus);
  window.addEventListener('offline', updateCacheStatus);

  // Keyboard close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeImageModal();
      closeVideoModal();
      closeSettingsModal();
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
  card.className = ex.isWarmup ? 'exercise-card warmup-card' : 'exercise-card';
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
       </div>`
    : `<div class="card-image-wrap" style="cursor:default">
         <div class="card-image-placeholder">${getCategoryEmoji(ex.category)}</div>
       </div>`;

  // Notes
  const notesSection = ex.notes
    ? `<p class="card-notes">${escHtml(ex.notes)}</p>`
    : '';

  // Sets
  const setsSection = ex.sets
    ? `<span class="card-sets">🔄 ${escHtml(ex.sets)}</span>`
    : '';

  const warmupBadge = ex.isWarmup ? `<div class="warmup-badge-tag">🔥 Warmup تسخين</div>` : '';

  card.innerHTML = `
    ${imageSection}
    <div class="card-body">
      ${warmupBadge}
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
   OFFLINE VIDEO CACHING & INLINE PLAYBACK
   ============================================================ */

async function updateCacheStatus(isStartup = false) {
  try {
    if (!('caches' in window)) {
      const statusEl = document.getElementById('settingsCacheProgressText');
      if (statusEl) statusEl.textContent = "⚠️ Browser doesn't support offline video caching.";
      const btnEl = document.getElementById('settingsCacheAllBtn');
      if (btnEl) btnEl.style.display = 'none';
      return true;
    }

    const cache = await caches.open(CACHE_NAME);
    const keys = await cache.keys();
    const cachedUrls = new Set(keys.map(request => request.url));

    // Count eligible MP4 videos in our list
    const mp4Exercises = exercises.filter(e => e.videoUrl && e.videoUrl.endsWith('.mp4'));
    const totalCount = mp4Exercises.length;
    let cachedCount = 0;

    mp4Exercises.forEach(e => {
      const absUrl = new URL(e.videoUrl, window.location.href).href;
      if (cachedUrls.has(absUrl)) {
        cachedCount++;
      }
    });

    const statusEl = document.getElementById('settingsCacheProgressText');
    const btnEl = document.getElementById('settingsCacheAllBtn');

    if (statusEl && btnEl) {
      if (cachedCount === totalCount && totalCount > 0) {
        statusEl.textContent = `🎉 All ${totalCount} videos are cached offline!`;
        btnEl.textContent = '🔄 Re-cache All Videos';
      } else if (cachedCount > 0) {
        statusEl.textContent = `📥 ${cachedCount} of ${totalCount} videos cached offline.`;
        btnEl.textContent = '📥 Cache Remaining';
      } else {
        statusEl.textContent = `💡 Videos are online. Cache all ${totalCount} videos for offline use.`;
        btnEl.textContent = '📥 Cache All Videos';
      }
    }

    updateCachedVideosList(cachedUrls);

    const allCached = (cachedCount === totalCount && totalCount > 0);

    if (isStartup && !allCached) {
      // Delay slightly for a smoother launch feel
      setTimeout(openSettingsModal, 600);
    }

    return allCached;
  } catch (err) {
    console.error('Error updating cache status:', err);
    return true;
  }
}

function updateCachedVideosList(cachedUrls) {
  const listEl = document.getElementById('cachedVideosList');
  if (!listEl) return;

  listEl.innerHTML = '';

  const mp4Exercises = exercises.filter(e => e.videoUrl && e.videoUrl.endsWith('.mp4'));

  mp4Exercises.forEach(ex => {
    const absUrl = new URL(ex.videoUrl, window.location.href).href;
    const isCached = cachedUrls.has(absUrl);

    const item = document.createElement('div');
    item.className = 'cached-video-item';
    item.innerHTML = `
      <span class="cached-video-name" title="${escHtml(ex.name)}">${escHtml(ex.name)}</span>
      <span class="cached-video-status-icon">${isCached ? '✅ Cached' : '📥 Online Only'}</span>
    `;
    listEl.appendChild(item);
  });
}

function openSettingsModal() {
  const overlay = document.getElementById('settingsModal');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    history.pushState({ modal: 'settings' }, '');

    if ('caches' in window) {
      caches.open(CACHE_NAME).then(cache => {
        cache.keys().then(keys => {
          const cachedUrls = new Set(keys.map(request => request.url));
          updateCachedVideosList(cachedUrls);
        });
      });
    }
  }
}

function closeSettingsModal() {
  const overlay = document.getElementById('settingsModal');
  if (overlay && overlay.classList.contains('open')) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

async function cacheAllVideos() {
  const btnEl = document.getElementById('settingsCacheAllBtn');
  const progressEl = document.getElementById('settingsCacheProgressBar');
  const fillEl = document.getElementById('settingsCacheProgressFill');
  const statusEl = document.getElementById('settingsCacheProgressText');

  if (!btnEl || !progressEl || !fillEl || !statusEl) return;

  btnEl.disabled = true;
  progressEl.style.display = 'block';
  fillEl.style.width = '0%';

  try {
    const cache = await caches.open(CACHE_NAME);
    const mp4Exercises = exercises.filter(e => e.videoUrl && e.videoUrl.endsWith('.mp4'));
    const total = mp4Exercises.length;
    let completed = 0;

    for (const ex of mp4Exercises) {
      const url = ex.videoUrl;
      const absUrl = new URL(url, window.location.href).href;

      statusEl.textContent = `Downloading (${completed + 1}/${total}): ${ex.name}...`;

      try {
        const response = await fetch(absUrl, { mode: 'cors' });
        if (response.ok) {
          await cache.put(absUrl, response);
        } else {
          throw new Error(`HTTP status ${response.status}`);
        }
      } catch (err) {
        console.error(`Failed to cache video: ${ex.name}`, err);
      }

      completed++;
      const pct = Math.round((completed / total) * 100);
      fillEl.style.width = `${pct}%`;

      // Update individual checklist live
      const keys = await cache.keys();
      const cachedUrls = new Set(keys.map(request => request.url));
      updateCachedVideosList(cachedUrls);
    }

    showToast("🎉 All eligible videos cached successfully!");
  } catch (err) {
    console.error('Caching failed:', err);
    showToast("❌ Error caching some videos. Check internet connection.");
  } finally {
    btnEl.disabled = false;
    setTimeout(() => {
      progressEl.style.display = 'none';
      updateCacheStatus();
    }, 1500);
  }
}

async function cacheSingleVideoInBackground(absUrl) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(absUrl);
    if (!cachedResponse) {
      const response = await fetch(absUrl, { mode: 'cors' });
      if (response.ok) {
        await cache.put(absUrl, response);
        updateCacheStatus();
      }
    }
  } catch (err) {
    console.log('Background cache failed:', err);
  }
}

async function promptVideoModal(id, name, url) {
  if (!url) {
    showToast('⚠️ No video URL provided for this exercise.');
    return;
  }
  pendingVideoUrl = url;

  document.getElementById('videoModalTitle').textContent = name;

  const videoEl = document.getElementById('modalVideoPlayer');
  const iframeEl = document.getElementById('modalYoutubePlayer');
  const loaderEl = document.getElementById('videoLoadingState');
  const errorEl = document.getElementById('videoOfflineError');

  // Reset display
  videoEl.style.display = 'none';
  iframeEl.style.display = 'none';
  loaderEl.style.display = 'flex';
  errorEl.style.display = 'none';

  // Revoke previous blob url if any
  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl);
    currentBlobUrl = null;
  }

  videoEl.pause();
  videoEl.src = '';
  iframeEl.src = '';

  const overlay = document.getElementById('videoModal');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  history.pushState({ modal: 'video' }, '');

  const isYoutube = url.includes('youtube.com') || url.includes('youtu.be');

  if (isYoutube) {
    if (!navigator.onLine) {
      loaderEl.style.display = 'none';
      errorEl.style.display = 'flex';
      return;
    }
    let embedUrl = url;
    if (url.includes('v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    iframeEl.src = embedUrl;
    iframeEl.style.display = 'block';
    loaderEl.style.display = 'none';
  } else {
    try {
      let videoSrc = url;
      const absUrl = new URL(url, window.location.href).href;

      if ('caches' in window) {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(absUrl);

        if (cachedResponse) {
          const blob = await cachedResponse.blob();
          currentBlobUrl = URL.createObjectURL(blob);
          videoSrc = currentBlobUrl;
        } else if (!navigator.onLine) {
          loaderEl.style.display = 'none';
          errorEl.style.display = 'flex';
          return;
        } else {
          // Play remote URL, and cache it in the background!
          cacheSingleVideoInBackground(absUrl);
        }
      } else if (!navigator.onLine) {
        loaderEl.style.display = 'none';
        errorEl.style.display = 'flex';
        return;
      }

      videoEl.src = videoSrc;
      videoEl.style.display = 'block';

      videoEl.oncanplay = () => {
        loaderEl.style.display = 'none';
      };

      videoEl.onerror = () => {
        loaderEl.style.display = 'none';
        errorEl.style.display = 'flex';
      };

      videoEl.load();
      videoEl.play().catch(e => console.log('Autoplay blocked, waiting for user interaction'));

    } catch (err) {
      console.error('Error resolving video:', err);
      loaderEl.style.display = 'none';
      errorEl.style.display = 'flex';
    }
  }
}

function closeVideoModal() {
  const overlay = document.getElementById('videoModal');
  if (overlay.classList.contains('open')) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    pendingVideoUrl = '';

    const videoEl = document.getElementById('modalVideoPlayer');
    const iframeEl = document.getElementById('modalYoutubePlayer');
    if (videoEl) {
      videoEl.pause();
      videoEl.src = '';
    }
    if (iframeEl) {
      iframeEl.src = '';
    }
    if (currentBlobUrl) {
      URL.revokeObjectURL(currentBlobUrl);
      currentBlobUrl = null;
    }
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
  const settingsModal = document.getElementById('settingsModal');
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
  if (settingsModal && settingsModal.classList.contains('open')) {
    settingsModal.classList.remove('open');
    document.body.style.overflow = '';
    closed = true;
  }
  return closed;
}

function onBackKeyDown(e) {
  if (closeAllModals()) {
    e.preventDefault();
    return;
  }

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

