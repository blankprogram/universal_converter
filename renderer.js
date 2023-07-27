const { ipcRenderer } = require('electron');
const dropZone = document.getElementById('drop-zone');
const filePathDiv = document.getElementById('file-path');

// Open file dialog when the drop zone is clicked
dropZone.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog');
});

// Change border color when file is dragged over drop zone
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.classList.add('hover');
});

// Reset border color when file is dragged out of drop zone
dropZone.addEventListener('dragleave', (event) => {
  dropZone.classList.remove('hover');
});

// Handle dropped file
dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('hover');
  
  const file = event.dataTransfer.files[0];
  
  if (file) {
    filePathDiv.textContent = `Selected file: ${file.path}`;
  }
});

// Display file path when a file is selected from the dialog
ipcRenderer.on('selected-file', (event, path) => {
  filePathDiv.textContent = `Selected file: ${path}`;
});
