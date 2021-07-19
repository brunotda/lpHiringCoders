const form = document.getElementById('bfHiring'),
    msg = document.getElementById('bfHiringReturn');

const formValidate = {
    msgSuccess: function (e) {
        msg.textContent = 'Sucesso! E-mail cadastrado.';
        msg.className = 'alert msgSuccess';
    },
    msgUpdate: function (e) {
        msg.textContent = 'Seu E-mail já foi cadastrado.';
        msg.className = 'alert msgWarning';
    },
    msgError: function (e) {
        msg.textContent = 'Digite um Email válido!';
        msg.className = 'alert msgDanger';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = (document.getElementById('email').value).toUpperCase();
    if (validateEmail(email) !== true){formValidate.msgError(); return false;}
    saveLocalData(email);
})

function saveLocalData(email) {
    let data = JSON.parse(localStorage.getItem('hiringMailBtda'));
    let dataValidate;

    if (data !== null) {
        let used = data.filter((savedEmails) => { return savedEmails === email });
        dataValidate = (used != null && used.length > 0) ?  'msgUpdate' : (data.push(email));
    } else {
        data=[email];
    }

    localStorage.setItem('hiringMailBtda', JSON.stringify(data));
    (dataValidate === 'msgUpdate') ? formValidate.msgUpdate() : formValidate.msgSuccess();
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

