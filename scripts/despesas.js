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
    // Note: O seu código original usava 'despesa.categoria'. Mantenha o nome da propriedade consistente com seus objetos.
    return despesas.filter(despesa => despesa.categoria === categoria); 
}