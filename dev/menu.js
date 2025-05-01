const menu = document.createElement('div');
menu.id = 'menu';
menu.style.display = 'none';
menu.style.position = 'fixed';
menu.style.top = '50%';
menu.style.left = '50%';
menu.style.transform = 'translate(-50%, -50%)';
menu.style.backgroundColor = '#000';
menu.style.color = '#FFA500';
menu.style.border = '2px solid #FFA500';
menu.style.borderRadius = '10px';
menu.style.padding = '20px';
menu.style.width = '250px';
menu.style.boxShadow = '0 0 20px rgba(255, 165, 0, 0.5)';
menu.style.zIndex = '9999';
menu.style.fontFamily = 'Arial, sans-serif';

const title = document.createElement('h3');
title.innerText = 'Menu Fandangos';
title.style.marginTop = '0';
title.style.color = '#FFA500';
menu.appendChild(title);

const toggleContainer = document.createElement('div');
toggleContainer.style.display = 'flex';
toggleContainer.style.flexDirection = 'column';

const provaLabel = document.createElement('label');
provaLabel.style.display = 'flex';
provaLabel.style.justifyContent = 'space-between';
provaLabel.style.padding = '10px 0';
const provaSpan = document.createElement('span');
provaSpan.innerText = 'Prova Paulista';
const provaToggle = document.createElement('input');
provaToggle.type = 'checkbox';
provaToggle.style.accentColor = '#FFA500';
provaLabel.appendChild(provaSpan);
provaLabel.appendChild(provaToggle);
toggleContainer.appendChild(provaLabel);

const autoLabel = document.createElement('label');
autoLabel.style.display = 'flex';
autoLabel.style.justifyContent = 'space-between';
autoLabel.style.padding = '10px 0';
const autoSpan = document.createElement('span');
autoSpan.innerText = 'Auto Responder';
const autoToggle = document.createElement('input');
autoToggle.type = 'checkbox';
autoToggle.style.accentColor = '#FFA500';
autoLabel.appendChild(autoSpan);
autoLabel.appendChild(autoToggle);
toggleContainer.appendChild(autoLabel);

const tempoLabel = document.createElement('label');
tempoLabel.style.display = 'block';
tempoLabel.style.marginTop = '15px';
tempoLabel.innerText = 'Tempo (minutos):';
tempoLabel.style.color = '#FFA500';
const tempoInput = document.createElement('input');
tempoInput.type = 'number';
tempoInput.min = '0';
tempoInput.style.width = '100%';
tempoInput.style.marginTop = '5px';
tempoInput.style.padding = '8px';
tempoInput.style.border = '1px solid #FFA500';
tempoInput.style.borderRadius = '5px';
tempoInput.style.backgroundColor = '#111';
tempoInput.style.color = '#FFA500';
tempoInput.placeholder = 'Digite os minutos';
tempoLabel.appendChild(tempoInput);
toggleContainer.appendChild(tempoLabel);

menu.appendChild(toggleContainer);
document.body.appendChild(menu);

function toggleMenu(forceState) {
  const isVisible = menu.style.display === 'block';
  menu.style.display = forceState !== undefined 
    ? (forceState ? 'block' : 'none')
    : (isVisible ? 'none' : 'block');
}

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    toggleMenu();
  } else if (e.key === 'Escape') {
    toggleMenu(false);
  }
});

let touchStart = 0;
let touchEnd = 0;

document.addEventListener('touchstart', (e) => {
  if (e.touches.length === 3) {
    touchStart = e.timeStamp;
  }
});

document.addEventListener('touchend', (e) => {
  if (e.touches.length === 0 && touchStart !== 0) {
    touchEnd = e.timeStamp;
    const gestureDuration = touchEnd - touchStart;

    if (gestureDuration < 500) {
      toggleMenu();
    }

    touchStart = 0;
    touchEnd = 0;
  }
});

provaToggle.addEventListener('change', () => {
  const isActive = provaToggle.checked;
  autoLabel.style.display = isActive ? 'none' : 'flex';
  tempoLabel.style.display = isActive ? 'none' : 'block';
  if (isActive) {
    autoToggle.checked = false;
    tempoInput.value = '';
  }
});

function getProvaPaulistaStatus() {
  return provaToggle.checked;
}

function getAutoResponderStatus() {
  return autoToggle.checked;
}

function getTempoValue() {
  const tempo = tempoInput.value;
  return tempo ? parseInt(tempo, 10) : 0;
}

function createMenuButton() {
  const menuList = document.querySelector('.MuiList-root.MuiList-padding.css-11ebnpa');
  if (!menuList) return setTimeout(createMenuButton, 300);

  const wrapper = document.createElement('div');
  wrapper.setAttribute('role', 'menuitem');
  wrapper.style.padding = '10px';

  const menuButton = document.createElement('button');
  menuButton.style.width = '30px';
  menuButton.style.height = '30px';
  menuButton.style.backgroundColor = '#FFA500';
  menuButton.style.border = 'none';
  menuButton.style.borderRadius = '5px';
  menuButton.style.cursor = 'pointer';
  menuButton.style.fontSize = '18px';
  menuButton.style.fontWeight = 'bold';
  menuButton.style.display = 'flex';
  menuButton.style.alignItems = 'center';
  menuButton.style.justifyContent = 'center';
  menuButton.title = 'Abrir Menu';
  menuButton.innerText = '⚙';

  menuButton.addEventListener('click', () => {
    toggleMenu();
  });

  wrapper.appendChild(menuButton);
  menuList.appendChild(wrapper);
}

createMenuButton();
