const checkboxBtn = document.getElementById('checkboxBtn');
const bgRect = document.getElementById('bgRect');
let isChecked = false;

checkboxBtn.addEventListener('click', function() {
    isChecked = !isChecked;
    updateCheckboxUI();

    // Envia evento para o .lua do FiveM
    if (window.GetParentResourceName) {
        fetch(`https://${GetParentResourceName()}/checkboxToggle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ checked: isChecked })
        });
    }
});

function updateCheckboxUI() {
    if (isChecked) {
        checkboxBtn.classList.add('checked');
        bgRect.setAttribute('fill', '#222226');
        bgRect.setAttribute('stroke', '#FFFFFF');
    } else {
        checkboxBtn.classList.remove('checked');
        bgRect.setAttribute('fill', '#121214');
        bgRect.setAttribute('stroke', '#1C1C1F');
    }
}

// Ouvinte para alternar estado via Lua
window.addEventListener('message', function(event) {
    if (event.data.action === "setState") {
        isChecked = event.data.status;
        updateCheckboxUI();
    }
});
