import { adicionarDespesa, removerDespesa, calcularSaldo, filtrarPorCategoria } from './despesas.js';

// Estado da aplicação
let listaDeDespesas = [];

// Elementos do DOM
const form = document.getElementById('form-despesa');
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const categoriaInput = document.getElementById('categoria');
const listaDespesasElement = document.getElementById('lista-despesas');
const saldoTotalElement = document.getElementById('saldo-total');
const filtroCategoriaElement = document.getElementById('filtro-categoria');

/**
 * Renderiza a lista de despesas na tela com base no estado atual e no filtro selecionado.
 */
function renderizarDespesas() {
    const categoriaFiltrada = filtroCategoriaElement.value;
    const despesasFiltradas = filtrarPorCategoria(listaDeDespesas, categoriaFiltrada);

    listaDespesasElement.innerHTML = ''; // Limpa a lista antes de renderizar

    despesasFiltradas.forEach(despesa => {
        const item = document.createElement('li');
        item.className = 'despesa-item';
        item.innerHTML = `
            <div class="despesa-info">
                <span class="descricao">${despesa.descricao}</span>
                <span class="categoria">${despesa.categoria}</span>
            </div>
            <div>
                <span class="despesa-valor">R$ ${despesa.valor.toFixed(2)}</span>
                <button class="btn-remover" data-id="${despesa.id}">Remover</button>
            </div>
        `;
        listaDespesasElement.appendChild(item);
    });

    // Passa a lista filtrada para o cálculo do saldo
    atualizarSaldo(despesasFiltradas);
    adicionarEventListenersRemover();
}

/**
 * Atualiza o saldo total exibido na tela com base na lista fornecida.
 * @param {Array<Object>} despesasParaCalcular - A lista de despesas a ser somada.
 */
function atualizarSaldo(despesasParaCalcular) {
    const total = calcularSaldo(despesasParaCalcular);
    saldoTotalElement.textContent = `R$ ${total}`;
}

/**
 * Adiciona os listeners de clique aos botões de remoção.
 */
function adicionarEventListenersRemover() {
    const botoesRemover = document.querySelectorAll('.btn-remover');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', (event) => {
            const idParaRemover = parseInt(event.target.getAttribute('data-id'));
            
            // ATENÇÃO: Se usar o valor com vírgula, pode falhar aqui também.
            // O valor do ID tem que ser exatamente igual ao que foi gerado em Date.now().
            
            listaDeDespesas = removerDespesa(listaDeDespesas, idParaRemover);
            renderizarDespesas();
        });
    });
}

// Listener para o envio do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const descricao = descricaoInput.value.trim();
    // Sugestão de melhoria: Tratar vírgula (',') como decimal ('.') para inputs brasileiros
    const valorString = valorInput.value.replace(',', '.');
    const valor = parseFloat(valorString);
    const categoria = categoriaInput.value;

    if (!descricao || isNaN(valor) || valor <= 0 || !categoria) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const novaDespesa = {
        id: Date.now(), // Gera um ID único
        descricao: descricao,
        valor: valor,
        categoria: categoria,
    };

    listaDeDespesas = adicionarDespesa(listaDeDespesas, novaDespesa);
    renderizarDespesas();

    form.reset();
    descricaoInput.focus();
});

// Listener para o filtro de categoria
filtroCategoriaElement.addEventListener('change', renderizarDespesas);

// Renderização inicial
renderizarDespesas();