/**
 * Adiciona uma nova despesa a uma lista de despesas.
 * @param {Array<Object>} despesas - A lista atual de despesas.
 * @param {Object} novaDespesa - O objeto da nova despesa a ser adicionada.
 * @returns {Array<Object>} A nova lista de despesas com o item adicionado.
 * @example
 * const despesas = [{ id: 1, valor: 50 }];
 * const nova = { id: 2, valor: 30 };
 * adicionarDespesa(despesas, nova);
 * // returns [{ id: 1, valor: 50 }, { id: 2, valor: 30 }]
 */
export function adicionarDespesa(despesas, novaDespesa) {
    return [...despesas, novaDespesa];
}

/**
 * Remove uma despesa da lista com base no seu ID.
 * Utiliza o método nativo: filter.
 * @param {Array<Object>} despesas - A lista de despesas.
 * @param {number} idParaRemover - O ID da despesa a ser removida.
 * @returns {Array<Object>} A nova lista de despesas sem o item removido.
 * @example
 * const despesas = [{ id: 1, valor: 50 }, { id: 2, valor: 30 }];
 * removerDespesa(despesas, 1);
 * // returns [{ id: 2, valor: 30 }]
 */
export function removerDespesa(despesas, idParaRemover) {
    return despesas.filter(despesa => despesa.id !== idParaRemover);
}

/**
 * Calcula o saldo total somando o valor de todas as despesas.
 * Utiliza o método nativo: reduce e toFixed.
 * @param {Array<Object>} despesas - A lista de despesas.
 * @returns {string} O valor total formatado como string com duas casas decimais.
 * @example
 * const despesas = [{ valor: 50.5 }, { valor: 30 }];
 * calcularSaldo(despesas);
 * // returns "80.50"
 */
export function calcularSaldo(despesas) {
    const total = despesas.reduce((acumulador, despesa) => acumulador + despesa.valor, 0);
    return total.toFixed(2);
}

/**
 * Filtra as despesas por uma categoria específica.
 * Utiliza o método nativo: filter.
 * @param {Array<Object>} despesas - A lista de despesas.
 * @param {string} categoria - A categoria para filtrar. Se for "Todas", retorna a lista completa.
 * @returns {Array<Object>} Uma lista contendo apenas as despesas da categoria especificada.
 * @example
 * const despesas = [{ cat: 'Lazer' }, { cat: 'Comida' }];
 * filtrarPorCategoria(despesas, 'Lazer');
 * // returns [{ cat: 'Lazer' }]
 */
export function filtrarPorCategoria(despesas, categoria) {
    if (categoria === 'Todas') {
        return despesas;
    }
    return despesas.filter(despesa => despesa.categoria === categoria);
}

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

    // CORREÇÃO: Passa a lista filtrada para o cálculo do saldo
    atualizarSaldo(despesasFiltradas);
    adicionarEventListenersRemover();
}

/**
 * Atualiza o saldo total exibido na tela com base na lista fornecida.
 * @param {Array<Object>} despesasParaCalcular - A lista de despesas a ser somada.
 */
function atualizarSaldo(despesasParaCalcular) {
    // A função calcularSaldo agora opera sobre a lista (filtrada ou não) que é passada como argumento
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
            listaDeDespesas = removerDespesa(listaDeDespesas, idParaRemover);
            // Re-renderiza a lista, o que vai atualizar o saldo corretamente
            renderizarDespesas();
        });
    });
}

// Listener para o envio do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const descricao = descricaoInput.value.trim();
    const valor = parseFloat(valorInput.value);
    const categoria = categoriaInput.value;

    if (!descricao || isNaN(valor) || valor <= 0 || !categoria) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const novaDespesa = {
        id: Date.now(),
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