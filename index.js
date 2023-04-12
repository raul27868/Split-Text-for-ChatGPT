// Import stylesheets
import './style.css';

// Obtener elementos del DOM
const inputText = document.getElementById('input-text');
const inputLength = document.getElementById('text-length');
const divideBtn = document.getElementById('divide-text');
const tabHeader = document.querySelector('.tab-header');
const tabContent = document.querySelector('.tab-content');

// Función para dividir el texto y actualizar las pestañas
function divideText() {
  // Obtener el texto y la longitud
  const text = inputText.value;
  const length = parseInt(inputLength.value);

  // Dividir el texto en partes de longitud "length"
  const textParts = [];
  for (let i = 0; i < text.length; i += length) {
    textParts.push(text.substr(i, length));
  }

  // Actualizar las pestañas con las partes del texto
  let tabsHtml = '';
  let contentHtml = '';
  textParts.forEach((part, index) => {
    tabsHtml += `<li><button class="tab-btn" data-index="${index}">Part ${index + 1}</button></li>`;
    contentHtml += `<div class="tab-panel" data-index="${index}">${part}</div>`;
  });
  tabHeader.innerHTML = tabsHtml;
  tabContent.innerHTML = contentHtml;

  // Seleccionar la primera pestaña por defecto
  const firstTabBtn = document.querySelector('.tab-btn');
  const firstTabPanel = document.querySelector('.tab-panel');
  firstTabBtn.classList.add('active');
  firstTabPanel.classList.add('active');
}

// Función para copiar el contenido de una pestaña al portapapeles
function copyToClipboard(tabPanel) {
  // Obtener el botón correspondiente a la pestaña
  const tabBtn = tabPanel.closest('.tab-panel').querySelector('.tab-btn');

  // Copiar el contenido de la pestaña al portapapeles
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(tabPanel);
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
  selection.removeAllRanges();

  // Agregar una clase CSS para resaltar el botón que se ha presionado
  tabBtn.classList.add('copied');

  // Eliminar la clase CSS después de unos segundos
  setTimeout(() => {
    tabBtn.classList.remove('copied');
  }, 2000);
}


// Evento al hacer clic en el botón "Dividir Texto"
divideBtn.addEventListener('click', divideText);

// Evento al hacer clic en una pestaña
tabHeader.addEventListener('click', (event) => {
  // Obtener el índice de la pestaña seleccionada
  const index = event.target.dataset.index;

  // Seleccionar la pestaña y el contenido correspondiente
  const selectedTabBtn = document.querySelector(`.tab-btn[data-index="${index}"]`);
  const selectedTabPanel = document.querySelector(`.tab-panel[data-index="${index}"]`);

  // Cambiar la clase "active" para la pestaña y el contenido correspondiente
  const activeTabBtn = document.querySelector('.tab-btn.active');
  const activeTabPanel = document.querySelector('.tab-panel.active');
  activeTabBtn.classList.remove('active');
  activeTabPanel.classList.remove('active');
  selectedTabBtn.classList.add('active');
  selectedTabPanel.classList.add('active');
});

// Evento al hacer clic en un botón de copiar
tabContent.addEventListener('click', (event) => {
  if (event.target.classList.contains('copy-btn')) {
    // Obtener el contenido de la pestaña correspondiente al botón
    const tabPanel = event.target.closest('.tab-panel');

    // Copiar el contenido de la pestaña al portapapeles
    copyToClipboard(tabPanel);
  }
});
 