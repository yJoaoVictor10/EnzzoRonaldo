document.addEventListener("DOMContentLoaded", function () {
    const btnInf = document.getElementById('btn-inf');
    const pixDiv = document.getElementById('pix');
    const creditoDiv = document.getElementById('credito');
    const parcelasSelect = document.getElementById('parcelas');
    const valorTotalElem = document.querySelector('.valor-total');
    const parcelasElem = document.querySelectorAll('.valor');
    const inputNumeroCartao = document.querySelector('.input-numero');
    const valorInput = document.getElementById('valor-input'); 
    const btnPag = document.getElementById('btn-Pagar');

    let valor = 0; 

    pixDiv.style.display = 'none';
    creditoDiv.style.display = 'none'; 

    btnInf.addEventListener('click', function (event) {
        event.preventDefault(); 

        const tipoPagamento = document.querySelector('input[name="opcoes-pag"]:checked');

        if (tipoPagamento) {
            if (tipoPagamento.value === 'pix') {
                pixDiv.style.display = 'block';
                creditoDiv.style.display = 'none';
            } else if (tipoPagamento.value === 'cartão-credito') {
                pixDiv.style.display = 'none';
                creditoDiv.style.display = 'block';
            }
        }
    });
    
    parcelasSelect.addEventListener('change', function () {
        calcularTotalEParcelas();
    });
    
    function calcularTotalEParcelas() {
        let parcelas = parseInt(parcelasSelect.value.charAt(0)); 
        valor = parseFloat(valorInput.value.replace('R$', '').replace(',', '.')) || 0; 
    
        let total = valor;
    
        if (parcelas === 4) {
            total += valor * 0.05; 
        } else if (parcelas === 5) {
            total += valor * 0.10; 
        }
    
        valorTotalElem.textContent = `R$${total.toFixed(2)}`;
        atualizarParcelas(total, parcelas); 
    }
    
    function atualizarParcelas(total, parcelas) {
        for (let i = 0; i < parcelasElem.length; i++) {
            if (i < parcelas) {
                let valorParcela = total / (i + 1);
                parcelasElem[i].textContent = `${i + 1}x R$${valorParcela.toFixed(2)}`;
                parcelasElem[i].style.display = 'inline'; 
            } else {
                parcelasElem[i].style.display = 'none'; 
            }
        }
    }
   
    valorInput.addEventListener('input', function () {
        calcularTotalEParcelas(); 
    });
    
    inputNumeroCartao.addEventListener('input', function checkCardNumber() {
        const cardNumberInput = document.getElementById('cardNumber');
        const cardImage = document.getElementById('cardImage');
        const cardInvalid = document.getElementById('cardInvalid');
        const cardNumber = cardNumberInput.value;   
        
        cardImage.style.display = 'none';
        cardInvalid.style.display = 'none';
        
        if (cardNumber.startsWith('1234')) {
            cardImage.src = 'image/mastercard.png'; 
            cardImage.style.display = 'inline'; 
        } else if (cardNumber.startsWith('4321')) {
            cardImage.src = 'image/elo.jpeg'; 
            cardImage.style.display = 'inline'; 
        } else if (cardNumber.length >= 4) {
            cardInvalid.style.display = 'inline'; 
        }
    });

    function showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        
        successMessage.style.display = 'block';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000); 
    }

    btnPag.addEventListener('click', function(){
        showSuccessMessage();
    });
});