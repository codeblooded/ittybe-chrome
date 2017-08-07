window.onload = function() {
  const field = document.getElementById('field');
  const copyBtn = document.getElementById('copy-btn');
  field.value = 'Loading...';

  copyBtn.addEventListener('click', function () {
    field.select();
    document.execCommand('copy');
    copyBtn.style.backgroundColor = '#30d140';
    copyBtn.style.color = 'white';
    copyBtn.innerText = 'Copied!';
  });

  chrome.tabs.query({active: true, windowId: chrome.windows.WINDOW_ID_CURRENT},
    function(tabs){
      const longUrl = tabs[0].url;
      const request = new XMLHttpRequest();

      request.open('POST', 'http://itty.be/shorten', true);

      request.onload = function() {
        if (request.status === 200) {
          const shortUrl = JSON.parse(request.responseText).url.short;
          field.value = shortUrl;
          field.select();
        } else {
          field.value = "Oops. We're having some trouble."
        }
      }

      request.onerror = function() {
        field.value = "Error";
      }

      request.send(JSON.stringify({
        url: longUrl
      }));
    }
  );

}
