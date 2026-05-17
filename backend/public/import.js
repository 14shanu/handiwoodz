(function() {
  var dropZone = document.getElementById('dropZone');
  var dropText = document.getElementById('dropText');
  var fileNameEl = document.getElementById('fileName');
  var importBtn = document.getElementById('importBtn');
  var resultDiv = document.getElementById('result');
  var secretInput = document.getElementById('secret');
  var selectedFile = null;

  // Create hidden file input
  var fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.xlsx';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  // Click to browse
  dropZone.addEventListener('click', function() {
    fileInput.click();
  });

  // File selected via picker
  fileInput.addEventListener('change', function() {
    if (fileInput.files && fileInput.files[0]) {
      selectFile(fileInput.files[0]);
    }
  });

  // Drag and drop
  dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove('dragover');
    var file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.xlsx')) {
      selectFile(file);
    } else {
      showResult('Only .xlsx files are supported', 'error');
    }
  });

  function selectFile(file) {
    selectedFile = file;
    dropText.style.display = 'none';
    fileNameEl.style.display = 'block';
    fileNameEl.textContent = '\uD83D\uDCC4 ' + file.name;
    dropZone.classList.add('selected');
    importBtn.disabled = false;
  }

  // Import button
  importBtn.addEventListener('click', async function() {
    if (!selectedFile) return;
    if (!secretInput.value) {
      showResult('Please enter the sync secret', 'error');
      return;
    }

    importBtn.disabled = true;
    importBtn.textContent = 'Importing...';
    showResult('Processing file...', 'loading');

    var formData = new FormData();
    formData.append('file', selectedFile);

    try {
      var response = await fetch('/api/bulk-import', {
        method: 'POST',
        headers: { 'x-sync-secret': secretInput.value },
        body: formData,
      });

      var data = await response.json();

      if (!response.ok) {
        showResult(data.error?.message || 'Import failed', 'error');
        return;
      }

      var r = data.data;
      var summary;

      if (typeof r.categories === 'number') {
        summary = [
          '\u2705 Import started in background!\n',
          'Processing: ' + r.categories + ' categories, ' + r.subcategories + ' subcategories, ' + r.products + ' products',
          '\nCheck server logs for completion.',
        ];
        showResult(summary.join('\n'), 'success');
      } else {
        summary = [
          '\u2705 Import completed!\n',
          'Categories:    ' + r.categories.created + ' created, ' + r.categories.skipped + ' skipped',
          'Subcategories: ' + r.subcategories.created + ' created, ' + r.subcategories.skipped + ' skipped',
          'Products:      ' + r.products.created + ' created, ' + r.products.skipped + ' skipped',
        ];

        var allErrors = [].concat(r.categories.errors || [], r.subcategories.errors || [], r.products.errors || []);

        if (allErrors.length > 0) {
          summary.push('\n\u26A0\uFE0F Errors (' + allErrors.length + '):');
          allErrors.forEach(function(e) { summary.push('  \u2022 ' + e); });
        }

        showResult(summary.join('\n'), allErrors.length > 0 ? 'error' : 'success');
      }
    } catch (error) {
      showResult('Network error: ' + error.message, 'error');
    } finally {
      importBtn.disabled = false;
      importBtn.textContent = 'Import Catalog';
    }
  });

  function showResult(message, type) {
    resultDiv.style.display = 'block';
    resultDiv.className = 'result ' + type;
    resultDiv.textContent = message;
  }
})();
