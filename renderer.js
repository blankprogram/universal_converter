const { ipcRenderer } = require('electron');
const fileList = document.getElementById('file-list');
const conversionOptionsSelect = document.getElementById('conversion-options'); 
const convertButton = document.getElementById('convert-button'); 

const fileConversionOptions = {
  audio: ['flac', 'aac', 'ogg', 'mp3', 'wav'],
  video: ['webm', 'mkv', 'mp4', 'ogv', 'avi', 'gif'],
  image: ['png', 'jpg', 'ico', 'webp'],
  document: ['pdf']
};


document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());


function identifyFileType(filePath) {
  const extension = filePath.split('.').pop().toLowerCase();
  switch (extension) {
    case 'flac': case 'aac': case 'ogg': case 'mp3': case 'wav':
      return 'audio';
    case 'webm': case 'mkv': case 'mp4': case 'ogv': case 'avi': case 'gif':
      return 'video';
    case 'png': case 'jpg': case 'ico': case 'webp':
      return 'image';
    case 'pdf': case 'docx': case 'pptx': case 'xlsx':
      return 'document';
    default:
      return null;
  }
}


let allFiles = []; 


function updateConversionOptions() {
  conversionOptionsSelect.innerHTML = '';
  if (allFiles.length === 0) {
    convertButton.disabled = true; 
    return;
  }

  const firstFileType = identifyFileType(allFiles[0].path);
  const isSingleFileType = allFiles.every(file => identifyFileType(file.path) === firstFileType);
  
  if (isSingleFileType) {
    const conversionOptions = fileConversionOptions[firstFileType];
    conversionOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      conversionOptionsSelect.appendChild(optionElement);
    });
    convertButton.disabled = false; 
  } else {
    convertButton.disabled = true; 
  }
}


document.addEventListener('drop', (event) => {
  const files = Array.from(event.dataTransfer.files);
  
  allFiles = allFiles.concat(files); 

  files.forEach(file => {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';

    const filePath = document.createElement('span');
    filePath.textContent = file.path;
    fileItem.appendChild(filePath);

    fileList.appendChild(fileItem);
  });

  updateConversionOptions(); 
});

convertButton.addEventListener('click', () => {
  console.log(`Converting ${allFiles.length} files to ${conversionOptionsSelect.value}`);
});