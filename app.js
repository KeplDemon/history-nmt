let eventsData = [];

// Загрузка JSON данных
async function loadEvents() {
  try {
    const res = await fetch('events.json');
    eventsData = await res.json();
    renderTimeline(eventsData);
  } catch (e) {
    console.error('Помилка завантаження подій:', e);
  }
}

// Рендер карточек
function renderTimeline(data) {
  const track = document.getElementById('timeline-track');
  track.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <div class="card-year">${item.year} р.</div>
      <div class="card-title">${item.title}</div>
      <div class="card-desc">${item.shortDescription}</div>
    `;
    card.onclick = () => openDetails(item);
    track.appendChild(card);
  });
}

// Открытие развернутого конспекта
function openDetails(item) {
  const panel = document.getElementById('details-panel');
  document.getElementById('det-year').innerText = `${item.year} рік`;
  document.getElementById('det-title').innerText = item.title;
  document.getElementById('det-category').innerText = `Тема: ${item.category}`;
  document.getElementById('det-text').innerHTML = `<p>${item.details.fullText}</p>`;
  
  panel.classList.remove('hidden');
  panel.scrollIntoView({ behavior: 'smooth' });
}

// Закрытие детализации
document.getElementById('close-details').onclick = () => {
  document.getElementById('details-panel').classList.add('hidden');
};

// Переключатели ориентации
document.getElementById('btn-horizontal').onclick = function() {
  document.getElementById('timeline-wrapper').className = 'timeline-wrapper horizontal';
  this.classList.add('active');
  document.getElementById('btn-vertical').classList.remove('active');
};

document.getElementById('btn-vertical').onclick = function() {
  document.getElementById('timeline-wrapper').className = 'timeline-wrapper vertical';
  this.classList.add('active');
  document.getElementById('btn-horizontal').classList.remove('active');
};

// Старт
loadEvents();
