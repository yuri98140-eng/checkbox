let isChecked = false; // Começa desativado (false)

function toggleCheckbox() {
    isChecked = !isChecked;
    updateCheckboxUI();

    // Envia o estado (true/false) para o script .lua no FiveM
    if (window.GetParentResourceName) {
        fetch(`https://${GetParentResourceName()}/checkboxToggle`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ checked: isChecked })
        });
    }
}

function updateCheckboxUI() {
    const checkMark = document.getElementById('checkMark');
    const bgRect = document.getElementById('bgRect');

    if (isChecked) {
        checkMark.style.display = 'block';
        bgRect.setAttribute('fill', '#222226'); // Destaque suave ao ativar
        bgRect.setAttribute('stroke', '#FFFFFF'); // Borda branca ao ativar
    } else {
        checkMark.style.display = 'none';
        bgRect.setAttribute('fill', '#121214'); // Estilo base do painel
        bgRect.setAttribute('stroke', '#1C1C1F');
    }
}

// Ouvinte para alterar o estado a partir do seu .lua se necessário
window.addEventListener('message', function(event) {
    if (event.data.action === "setState") {
        isChecked = event.data.status;
        updateCheckboxUI();
    }
});
