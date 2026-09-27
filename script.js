const cb = document.getElementById('cb');

window.addEventListener('message', function(e) {
  const data = e.data;
  if (data && data.type === 'setState') {
    cb.checked = data.checked;
  }
});
