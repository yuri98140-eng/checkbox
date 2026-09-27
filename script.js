const cb = document.getElementById('cb');

window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'setState') {
    if (e.data.checked) {
      cb.classList.add('checked');
    } else {
      cb.classList.remove('checked');
    }
  }
});
