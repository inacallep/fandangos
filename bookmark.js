const style = document.createElement('style');
style.textContent = `
  .custom-modal {
    position: fixed;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: #000;
    color: #ffcc00;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 20px #ffcc00;
    display: none;
    z-index: 1000;
    width: 280px;
    font-family: sans-serif;
  }
  .custom-modal.active {
    display: block;
  }
  .custom-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: none;
    z-index: 999;
  }
  .custom-overlay.active {
    display: block;
  }
  .custom-toggle, .custom-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
  }
  .custom-modal input[type="checkbox"],
  .custom-modal input[type="number"] {
    accent-color: #ffcc00;
    background: #111;
    border: 1px solid #ffcc00;
    color: #ffcc00;
    padding: 4px;
    border-radius: 4px;
  }
  .custom-modal input[type="number"] {
    width: 80px;
  }
  .custom-modal h2 {
    margin-top: 0;
    text-align: center;
  }
  .hidden {
    display: none;
  }
`;
document.head.appendChild(style);

const overlay = document.createElement('div');
overlay.className = 'custom-overlay';
document.body.appendChild(overlay);

const modal = document.createElement('div');
modal.className = 'custom-modal';
modal.innerHTML = `
  <h2>⚙️ Menu</h2>
  <div class="custom-toggle">
    <label for="autoAnswer">Auto Answer</label>
    <input type="checkbox" id="autoAnswer">
  </div>
  <div class="custom-input hidden" id="taskTimeContainer">
    <label for="taskTime">Tempo (min)</label>
    <input type="number" id="taskTime" min="1" max="999" value="5">
  </div>
`;
document.body.appendChild(modal);

document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    modal.classList.toggle('active');
    overlay.classList.toggle('active');
  }
  if (e.key === 'Escape') {
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }
});

overlay.addEventListener('click', () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
});

const autoAnswerCheckbox = document.getElementById('autoAnswer');
const taskTimeContainer = document.getElementById('taskTimeContainer');

autoAnswerCheckbox.addEventListener('change', () => {
  if (autoAnswerCheckbox.checked) {
    taskTimeContainer.classList.remove('hidden');
  } else {
    taskTimeContainer.classList.add('hidden');
  }
});

function isAutoAnswerEnabled() {
  return autoAnswerCheckbox.checked;
}

function getTaskTimeMinutes() {
  return parseInt(document.getElementById('taskTime').value, 10);
}

function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}




loadScript("")
