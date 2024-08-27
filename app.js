const conversion = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

const conversionDesencriptar = Object.fromEntries(
    Object.entries(conversion).map(([key, value]) => [value, key])
);


function validarTexto(texto) {
    const contieneMayusculas = /[A-Z]/.test(texto);
    const contieneCaracteresEspeciales = /[^a-z\s]/.test(texto); 
    if (contieneMayusculas) {
        throw new Error('El texto contiene letras mayúsculas. Solo se permiten letras minúsculas.');
    }
    if (contieneCaracteresEspeciales) {
        throw new Error('El texto contiene caracteres especiales o acentuados. Solo se permiten letras minúsculas sin acentos.');
    }
}

function encriptar(texto) {
    validarTexto(texto);
    return texto.split('').map(char => conversion[char] || char).join('');
}

function desencriptar(texto) {
    validarTexto(texto); 
    let resultado = texto;

    for (const [encriptado, original] of Object.entries(conversionDesencriptar)) {
        resultado = resultado.split(encriptado).join(original);
    }
    return resultado;
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('encriptar').addEventListener('click', function() {
        try {
            const textoEncriptar = document.getElementById('texto_encriptar').value;
            const resultado = encriptar(textoEncriptar);
            document.getElementById('resultado_').value = resultado; 
        } catch (error) {
            alert(error.message); 
        }
    });

    document.getElementById('desencriptar').addEventListener('click', function() {
        try {
            const textoDesencriptar = document.getElementById('texto_encriptar').value;
            const resultado = desencriptar(textoDesencriptar);
            document.getElementById('resultado_').value = resultado; 
        } catch (error) {
            alert(error.message); 
        }
    });

    document.getElementById('copiar').addEventListener('click', function() {
        const textoCopiar = document.getElementById('resultado_').value;
        navigator.clipboard.writeText(textoCopiar)
            .then(() => {
                alert('Texto copiado al portapapeles!');
            })
            .catch(err => {
                console.error('Error al copiar al portapapeles: ', err);
            });
    });
});
