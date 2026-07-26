let eventsData = [];

// Загружаем данные
async function loadEvents() {
  try {
    const res = await fetch('events.json');
    eventsData = await res.json();
    renderTimelineTicks(eventsData);
  } catch (e) {
    console.error('Ошибка загрузки данных:', e);
  }
}

// Отображение засечек на оси
function renderTimelineTicks(data) {
  const container = document.getElementById('timeline-ticks');
  container.innerHTML = '';

  data.forEach((item, index) => {
    const tick = document.createElement('div');
    tick.className = 'tick-item';
    tick.innerHTML = `
      <div class="tick-year">${item.year}</div>
      <div class="tick-mark"></div>
      <div class="tick-short-title">${item.title}</div>
    `;
    
    tick.onclick = () => {
      document.querySelectorAll('.tick-item').forEach(el => el.classList.remove('active'));
      tick.classList.add('active');
      openBubble(item);
    };

    container.appendChild(tick);
  });
}

// Открытие пузырька с конспектом
function openBubble(item) {
  const bubble = document.getElementById('details-bubble');
  document.getElementById('det-year').innerText = item.year;
  document.getElementById('det-title').innerText = item.title;
  
  let contentHtml = `<p>${item.details.fullText}</p>`;
  if (item.details.terms && item.details.terms.length > 0) {
    contentHtml += `<div style="margin-top:10px;"><b>Терміни:</b> ${item.details.terms.join(', ')}</div>`;
  }
  
  document.getElementById('det-body').innerHTML = contentHtml;
  bubble.classList.remove('hidden');
}

// Закрытие пузырька
document.getElementById('close-bubble').onclick = () => {
  document.getElementById('details-bubble').classList.add('hidden');
  document.querySelectorAll('.tick-item').forEach(el => el.classList.remove('active'));
};

// Управление модальным окном настроек
const modal = document.getElementById('settings-modal');
document.getElementById('open-settings-btn').onclick = () => modal.classList.remove('hidden');
document.getElementById('close-settings-btn').onclick = () => modal.classList.add('hidden');
document.getElementById('modal-overlay').onclick = () => modal.classList.remove('hidden') && modal.classList.add('hidden');

// Переключение тем
document.getElementById('btn-theme-light').onclick = function() {
  document.body.classList.add('light-theme');
  this.classList.add('active');
  document.getElementById('btn-theme-dark').classList.remove('active');
};
document.getElementById('btn-theme-dark').onclick = function() {
  document.body.classList.remove('light-theme');
  this.classList.add('active');
  document.getElementById('btn-theme-light').classList.remove('active');
};

loadEvents();
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
