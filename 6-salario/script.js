//-------------------Constantes de Valores Padrão e Armazenamento de Dados-------------------//

const faixasInss = [ // Constantes das faixas do INSS (Atualize os valores conforme necessário)
    { limite: 1412.00, aliquota: 0.075 }, // Faixa 1: 7,5%
    { limite: 2666.68, aliquota: 0.090 }, // Faixa 2: 9%
    { limite: 4000.03, aliquota: 0.120 }, // Faixa 3: 12%
    { limite: 7786.02, aliquota: 0.140 }, // Faixa 4: 14%
];

const faixasIrrf = [ // Constantes das faixas do IRPF (Atualize os valores conforme necessário)
    { limite: 2259.20, aliquota: 0, deducao: 0 },
    { limite: 2826.65, aliquota: 0.075, deducao: 169.44 },
    { limite: 3751.05, aliquota: 0.15, deducao: 381.44 },
    { limite: 4664.68, aliquota: 0.225, deducao: 662.77 },
    { limite: Infinity, aliquota: 0.275, deducao: 896.00 }
];

// Valores de Cargo, VR e ABF com base no código de função
const tabelaCargos = {
      610: { funcao: "Escriturário", VR: 0.00, ABF: 0.00, CH: 6 },  
    12392: { funcao: "Assessor III", VR: 6337.58, ABF: 2772.68, CH: 6 },  
    17310: { funcao: "Gerente de Relacionamento", VR: 9925.68, ABF: 4342.49, CH: 8 },
    17317: { funcao: "Gerente de Relacionamento Atendimento", VR: 8707.97, ABF: 3809.74, CH: 8 },
    17404: { funcao: "Gerente de Serviços", VR: 8707.97, ABF: 3809.74, CH: 8 },
    17511: { funcao: "Assistente de Negócios", VR: 5154.77, ABF: 1449.53, CH: 6 },
    17513: { funcao: "Assistente de Atendimento e Negócios", VR: 6337.58, ABF: 1850.13, CH: 6 }
};    

// Entrada de dados das demais informações conforme o input
const selectField1 = document.getElementById('selectField1');
const selectField2 = document.getElementById('selectField2');
const inputField = document.getElementById('inputField');
const addButton = document.getElementById('addButton');
const resetButton = document.getElementById('resetButton');

// Constante de armazenamento de dados
const dataStorage = {
    referencia: null,
    vencimento: null,
    gratificacao: null,
    adicional: null,
    cargahoraria: null,
    bruto: null,
    liquido: null,
    jornada: null,
	complemento: null,
    cassi: null,
	contCassi: null,
    previ: null,
	contPrevi: null,
	aliqEfetiva: null,
	contInss: null,
	aliqProgressiva: null,
	contIrrf: null,
    sindicato: null,
	contSindicato: null,
    subtotalProventos: null,
    subtotalDescontos: null,
    salarioLiquido: null,
	salarioBase: null,
    varBruto: null,
    varLiquido: null,
    varJornada: null,
};

//---------------------Constante de Saída de Dados Conforme o Input---------------------//

const outputs = {
    referencia: document.getElementById('output_referencia'),
    vencimento: document.getElementById('output_vencimento'),
    gratificacao: document.getElementById('output_gratificacao'),
    adicional: document.getElementById('output_adicional'),
    cargahoraria: document.getElementById('cargahoraria'),
    bruto: document.getElementById('output_bruto'),
    liquido: document.getElementById('output_liquido'),
    jornada: document.getElementById('output_jornada'),
    complemento: document.getElementById('output_complemento'),
    cassi: document.getElementById('output_cassi'),
    contCassi: document.getElementById('cont_cassi'),
    previ: document.getElementById('output_previ'),
    contPrevi: document.getElementById('cont_previ'),
	aliqEfetiva: document.getElementById('aliq_efetiva'),
    contInss: document.getElementById('cont_inss'),
    aliqProgressiva: document.getElementById('aliq_progressiva'),
    contIrrf: document.getElementById('cont_irrf'),
    sindicato: document.getElementById('output_sindicato'),
    contSindicato: document.getElementById('cont_sindicato'),
    subtotalProventos: document.getElementById('sub_proventos'),
    subtotalDescontos: document.getElementById('sub_descontos'),
    salarioLiquido: document.getElementById('salario_liquido'),
    varBruto: document.getElementById('var_bruto'),
    varLiquido: document.getElementById('var_liquido'),
    varJornada: document.getElementById('var_jornada'),
};

//----------------------------Funções de Conversão de Formatos----------------------------//

// Função para limitar a 2 casas decimais sem converter para string
function limitarDecimais(valor, casas = 2) {
    const fator = Math.pow(10, casas);  // Calcula 10^casas (por exemplo, 100 para 2 casas)
    return Math.round(valor * fator) / fator;
}

// Função para converter os percentuais para formato numérico adequado
function converterPercentual(value) {
    return Number(value) / 100; // Converte 7 para 0.07 e 1.5 para 0.015
}

//-----------------------------------Funções de cálculo-----------------------------------//

function formatPercentage(value) {
  // Se o valor for nulo ou indefinido, atribui 0
  if (value == null || isNaN(value)) {
    value = 0;
  }

  // Retorna o valor formatado com duas casas decimais e vírgula no lugar do ponto
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '%';
}

function formatCurrency(value) {
  // Se o valor for nulo ou indefinido, atribui 0
  if (value == null || isNaN(value)) {
    value = 0;
  }
  
  // Retorna o valor formatado como moeda brasileira
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para atualizar os subtotais na tela
function atualizarSubtotais() {
    console.log("Atualizando subtotais...");
    console.log("DataStorage:", dataStorage);

    try {
        // Verifique se 'outputs' está corretamente inicializado
        if (outputs) {
            if (outputs.vencimento) outputs.vencimento.textContent = formatCurrency(dataStorage.vencimento);
            if (outputs.adicional) outputs.adicional.textContent = formatCurrency(dataStorage.adicional);
            if (outputs.gratificacao) outputs.gratificacao.textContent = formatCurrency(dataStorage.gratificacao);
            if (outputs.referencia) outputs.referencia.textContent = formatCurrency(dataStorage.referencia);
            if (outputs.complemento) outputs.complemento.textContent = formatCurrency(dataStorage.complemento);
            if (outputs.bruto) outputs.bruto.textContent = formatCurrency(dataStorage.bruto);
            if (outputs.liquido) outputs.liquido.textContent = formatCurrency(dataStorage.liquido);
            if (outputs.subtotalProventos) outputs.subtotalProventos.textContent = formatCurrency(dataStorage.subtotalProventos);
            if (outputs.subtotalDescontos) outputs.subtotalDescontos.textContent = formatCurrency(dataStorage.subtotalDescontos);
            if (outputs.salarioLiquido) outputs.salarioLiquido.textContent = formatCurrency(dataStorage.salarioLiquido);
        } else {
            console.warn("Objeto 'outputs' não foi encontrado.");
        }

        // Atualizando para o subtotalProventos em múltiplos campos
        document.getElementById('subtotal_proventos2').textContent = formatCurrency(dataStorage.subtotalProventos);
        document.getElementById('salario_liquido2').textContent = formatCurrency(dataStorage.salarioLiquido);

        // Contribuições e deduções
        if (document.getElementById('cont_inss')) document.getElementById('cont_inss').textContent = formatCurrency(dataStorage.contInss);
        if (document.getElementById('cont_irrf')) document.getElementById('cont_irrf').textContent = formatCurrency(dataStorage.contIrrf);
        if (document.getElementById('cont_sindicato')) document.getElementById('cont_sindicato').textContent = formatCurrency(dataStorage.contSindicato);
        if (document.getElementById('cont_previ')) document.getElementById('cont_previ').textContent = formatCurrency(dataStorage.contPrevi);
        if (document.getElementById('cont_cassi')) document.getElementById('cont_cassi').textContent = formatCurrency(dataStorage.contCassi);

        // Outros valores
        if (document.getElementById('cargahoraria')) document.getElementById('cargahoraria').textContent = dataStorage.cargahoraria; // Para a carga horária
        if (document.getElementById('output_jornada')) document.getElementById('output_jornada').textContent = dataStorage.jornada; // Para a jornada

        // Para as alíquotas e variações percentuais, tratamos como '%'
        if (document.getElementById('aliq_progressiva')) document.getElementById('aliq_progressiva').textContent = formatPercentage(dataStorage.aliqProgressiva); // Alíquota progressiva
        if (document.getElementById('aliq_efetiva')) document.getElementById('aliq_efetiva').textContent = formatPercentage(dataStorage.aliqEfetiva); // Alíquota efetiva
        if (document.getElementById('var_bruto')) document.getElementById('var_bruto').textContent = formatPercentage(dataStorage.varBruto); // Variação bruto
        if (document.getElementById('var_liquido')) document.getElementById('var_liquido').textContent = formatPercentage(dataStorage.varLiquido); // Variação líquido
        if (document.getElementById('var_jornada')) document.getElementById('var_jornada').textContent = formatPercentage(dataStorage.varJornada); // Variação jornada

        console.log("Subtotais atualizados com sucesso.");
    } catch (e) {
        console.error("Erro ao atualizar subtotais:", e);
    }
}

// Função para calcular Salário Base
function calcularSalarioBase() {
    // Verificar se os valores existem e são números
    if (isNaN(dataStorage.vencimento) || isNaN(dataStorage.adicional) || isNaN(dataStorage.gratificacao)) {
        console.error("Erro: Um ou mais valores em dataStorage não são números.");
        return null; // Retorna nulo se houver erro
    }

    // Exibir o estado atual de dataStorage no console
    console.log("Estado de dataStorage antes do cálculo:", dataStorage);

    // Garantindo valores padrão (fallback para 0)
    const vencimento = dataStorage.vencimento || 0;
    const adicional = dataStorage.adicional || 0;
    const gratificacao = dataStorage.gratificacao || 0;

    // Exibir valores individuais
    console.log("Valores usados no cálculo: ", { vencimento, adicional, gratificacao });

    const salarioBase = limitarDecimais(vencimento + adicional + gratificacao);
    dataStorage.salarioBase = salarioBase;  // Armazenando no dataStorage

    // Exibir o resultado final
    console.log("Salário Base calculado:", salarioBase);

    return salarioBase;
}

// Função para calcular Complemento de Função
function calcularComplemento(salarioBase) {
    console.log("Salário Base no Complemento:", salarioBase); 
    console.log("Tipo de dataStorage.salarioBase:", typeof dataStorage.salarioBase);

    const referencia = dataStorage.referencia || 0;; // Pegando o valor do dataStorage
    if (!referencia || isNaN(referencia)) {
        console.log("Referência não informada ou inválida. Atribuindo 0.");
        dataStorage.complemento = 0; // Atualizando o valor de complemento para 0
        return 0;  // Ou algum valor de erro
    }
    
    console.log("Tipo de Referência:", typeof referencia, "Valor:", referencia);

    // Calcula o complemento e limita a duas casas decimais
    const complemento = salarioBase >= referencia ? 0 : limitarDecimais(referencia - salarioBase);
    dataStorage.complemento = complemento;  // Armazenando no dataStorage
    console.log("Complemento calculado:", complemento);
    return complemento;
}

// Função para Somar Proventos
function somarProventos() {
    const salarioBase = dataStorage.salarioBase || 0;
    const complemento = dataStorage.complemento || 0; // Garantindo valor padrão de complemento

    const subtotalProventos = limitarDecimais(salarioBase + complemento);
    dataStorage.subtotalProventos = subtotalProventos;  // Armazenando no dataStorage
    console.log("Subtotal Proventos calculado:", subtotalProventos);
    return subtotalProventos;
}

/**
 * Calcula o INSS com base no salário bruto, considerando as faixas progressivas.
 * @param {number} subtotalProventos - O valor do salário bruto.
 * @param {number} tetoInss - O valor máximo de contribuição permitido pelo INSS.
 * @returns {number} - O valor do desconto do INSS.
 */
function calcularINSS(subtotalProventos, tetoInss = 908.85) {
    let descontoTotal = 0; // Acumulador para o desconto
    let limiteAnterior = 0; // Limite da faixa anterior

    for (const faixa of faixasInss) {
        if (subtotalProventos > limiteAnterior) {
            const baseCalculo = Math.min(subtotalProventos, faixa.limite) - limiteAnterior;
            descontoTotal += baseCalculo * faixa.aliquota;
            limiteAnterior = faixa.limite; // Atualiza o limite para a próxima faixa
        } else {
            break; // Salário está abaixo do limite da faixa atual
        }
    }

    // Aplica o teto ao desconto total
    const contInss = limitarDecimais(Math.min(descontoTotal, tetoInss));

    // Armazenando o valor no dataStorage
    dataStorage.contInss = contInss;

    return contInss;
}

function calcularAliquotaEfetiva() {
    if (dataStorage.contInss !== undefined && dataStorage.contInss !== 0 && dataStorage.subtotalProventos !== undefined && dataStorage.subtotalProventos !== 0) {
        const aliqEfetiva = limitarDecimais((dataStorage.contInss / dataStorage.subtotalProventos) * 100);
        dataStorage.aliqEfetiva = aliqEfetiva;  // Armazenando no dataStorage
        return aliqEfetiva;
    } else {
        dataStorage.aliqEfetiva = 0;  // Armazena 0 no dataStorage se os valores não forem válidos
        return 0;  // Retorna 0 para evitar NaN
    }
}

function calcularCassi(subtotalProventos) {
    const contCassi = converterPercentual(dataStorage.cassi) * subtotalProventos || 0;
    dataStorage.contCassi = limitarDecimais(contCassi); // Armazena o valor da CASSI no dataStorage
    return contCassi;
}

function calcularPrevi(subtotalProventos) {

    console.log("🔍 Verificando valores em calcularPrevi()");
    console.log("dataStorage.previ:", dataStorage.previ);
    console.log("subtotalProventos:", subtotalProventos);


    const contPrevi = converterPercentual(dataStorage.previ) * subtotalProventos || 0;
    console.log("Valor calculado da previdência:", contPrevi);
    dataStorage.contPrevi = limitarDecimais(contPrevi); // Armazena o valor da previdência no dataStorage
    return contPrevi;
}

function calcularSindicato(subtotalProventos) {
    const contSindicato = converterPercentual(dataStorage.sindicato) * subtotalProventos || 0;
    dataStorage.contSindicato = limitarDecimais(contSindicato); // Armazena o valor do sindicato no dataStorage
    return contSindicato;
}

function calcularIRRF() {
    const subtotalProventos = dataStorage.subtotalProventos;
    const contPrevi = dataStorage.contPrevi;
    const contInss = dataStorage.contInss;

    // Considera a dedução de dependentes ao calcular a base do IR
    const deducaoIR = dataStorage.deducaoIR || 0; // Pegamos a dedução de dependentes do dataStorage
    const baseIrrf = limitarDecimais(subtotalProventos - contInss - contPrevi - deducaoIR); // Subtrai a dedução

    if (baseIrrf <= 0) {
        console.log("Base de IRRF não aplicável (menor ou igual a zero).");
        // Armazenando no dataStorage com 0 quando a base for negativa ou zero
        dataStorage.contIrrf = 0;
        dataStorage.aliqProgressiva = 0;
        return { valor: 0, aliqProgressiva: 0 };  // Retorna 0 se a base for negativa ou zero
    }

    let faixaAplicada = faixasIrrf.find(faixa => baseIrrf <= faixa.limite);

    if (!faixaAplicada) {
        console.log("Erro: Nenhuma faixa de IRRF encontrada.");
        // Armazenando no dataStorage com 0 quando nenhuma faixa é encontrada
        dataStorage.contIrrf = 0;
        dataStorage.aliqProgressiva = 0;
        return { valor: 0, aliqProgressiva: 0 };  // Caso não encontre faixa
    }

    const contIrrf = limitarDecimais((baseIrrf * faixaAplicada.aliquota) - faixaAplicada.deducao);  // Cálculo do IRRF
    const aliqProgressiva = limitarDecimais(faixaAplicada.aliquota * 100);  // Alíquota em percentual

    // Atualizando o dataStorage com o valor e a alíquota de IRRF
    dataStorage.contIrrf = Math.max(0, contIrrf);
    dataStorage.aliqProgressiva = aliqProgressiva;

    return {
        valor: Math.max(0, contIrrf),
        aliqProgressiva: aliqProgressiva
    };
}

function somarDescontos() {
    const subtotalDescontos = limitarDecimais(dataStorage.contCassi + dataStorage.contPrevi
         + dataStorage.contInss + dataStorage.contSindicato + dataStorage.contIrrf);
         console.log('Subtotal Descontos:', subtotalDescontos);  // Debug
    dataStorage.subtotalDescontos = subtotalDescontos;  // Armazenando no dataStorage
    return subtotalDescontos;
}

// Função para calcular salário líquido
function calcularSalarioLiquido(subtotalProventos, subtotalDescontos) {
    const salarioLiquido = limitarDecimais(subtotalProventos - subtotalDescontos);
    dataStorage.salarioLiquido = salarioLiquido;  // Armazenando no dataStorage
    return salarioLiquido;
}

function variacoes() {
    const bruto = dataStorage.bruto || 0;
    const liquido = dataStorage.liquido || 0;
    const jornada = dataStorage.jornada || 0;
    const cargahoraria = dataStorage.cargahoraria || 0;
    const salarioLiquido = dataStorage.salarioLiquido || 0;
    const subtotalProventos = dataStorage.subtotalProventos || 0;

    const calcularVariacao = (novo, antigo) => 
        antigo > 0 ? limitarDecimais(((novo - antigo) / antigo) * 100) : 0;

    const varBruto = calcularVariacao(subtotalProventos, bruto);
    dataStorage.varBruto = varBruto;

    const varLiquido = calcularVariacao(salarioLiquido, liquido);
    dataStorage.varLiquido = varLiquido;

    const varJornada = calcularVariacao(cargahoraria, jornada);
    dataStorage.varJornada = varJornada;

    return {
        varBruto,
        varLiquido,
        varJornada
    };
}


// Função principal de cálculo
function calcular() {
    console.log("Chamando a função calcular...");
    // Valores iniciais
    const vencimento = parseFloat(dataStorage.vencimento) || 0;
    const adicional = parseFloat(dataStorage.adicional) || 0;
    const gratificacao = parseFloat(dataStorage.gratificacao) || 0;
    const referencia = parseFloat(dataStorage.referencia) || 0;
    console.log("Vencimento:", vencimento, "Adicional:", adicional, "gratificacao:", gratificacao, "Referência:", referencia);

    // Cálculos principais
    const salarioBase = calcularSalarioBase(vencimento, adicional, gratificacao);
    console.log("Salário Base:", salarioBase);

    const complemento = calcularComplemento(salarioBase);
    console.log("Complemento:", complemento);

    const subtotalProventos = somarProventos(salarioBase, complemento);
    console.log("Subtotal Proventos:", subtotalProventos);

    const contInss = calcularINSS(subtotalProventos);
    console.log("INSS:", contInss);
    
    // Alíquotas do INSS
    const aliqEfetiva = calcularAliquotaEfetiva(dataStorage.contInss, subtotalProventos);
    console.log("Alíquota Efetiva do INSS:", aliqEfetiva);

    const contCassi = calcularCassi(subtotalProventos);
    console.log("CASSI:", contCassi);

    const contPrevi = calcularPrevi(subtotalProventos);
    console.log("PREVI:", contPrevi);

    const contSindicato = calcularSindicato(subtotalProventos);
    console.log("Sindicato:", contSindicato);

    // IRRF e alíquotas
    const { valor: contIrrf, aliqProgressiva } = calcularIRRF(dataStorage.subtotalProventos, dataStorage.contPrevi, dataStorage.contInss);
    console.log("IRRF:", contIrrf);
    console.log("Alíquota Progressiva:", aliqProgressiva);

    // Soma de descontos
    const subtotalDescontos = somarDescontos();
    console.log("Subtotal Descontos:", subtotalDescontos);

    // Cálculo do salário líquido
    const salarioLiquido = calcularSalarioLiquido(subtotalProventos, subtotalDescontos)
    console.log("Salário Líquido:", salarioLiquido);

    // Cálculo das variações
    const { varBruto, varLiquido, varJornada } = variacoes();
    console.log("Variações:", { varBruto, varLiquido, varJornada });

    // Atualizar valores no dataStorage
     Object.assign(dataStorage, {
        salarioBase,
        complemento,
        subtotalProventos,
        contInss,
        aliqEfetiva,
        contCassi,
        contPrevi,
        contSindicato,
        contIrrf,
        aliqProgressiva,
        subtotalDescontos,
        salarioLiquido,
        varBruto,
        varLiquido,
        varJornada
   });

   // Atualizar os subtotais na tela
   atualizarSubtotais();
}

//------------------------------Funções de Captura e Validação de Dados------------------------------//

function isValidDate(date) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(date)) return false;

    const [day, month, year] = date.split('/').map(Number);
    const validDate = new Date(year, month - 1, day);
    return (
        validDate.getFullYear() === year &&
        validDate.getMonth() === month - 1 &&
        validDate.getDate() === day
    );
}

function validateInput(type, value) {
    if (typeof value !== 'string' || value.trim() === '') {
        return false; // Retorna falso se o valor for vazio ou não for string
    }

    value = value.trim();

    if (['vencimento', 'adicional', 'bruto', 'liquido'].includes(type)) {
        return /^\d+(,\d{2})?$/.test(value);
        // Aceita números inteiros ou com duas casas decimais, ex: "100", "2500,75"
    }

    if (type === 'jornada') {
        return /^\d+$/.test(value); // Apenas números inteiros permitidos
    }

    return false; // Retorna falso para tipos desconhecidos
}


function updateDisplay(type) {
    if (outputs[type]) {
        if (type === 'vencimento' || type === 'adicional' || type === 'bruto'
             || type === 'liquido' || type === 'jornada') {
            outputs[type].textContent = dataStorage[type];
        } else {
            outputs[type].textContent = dataStorage[type] || '-';
        }
    } else {
        console.error(`Elemento não encontrado para o tipo: ${type}`);
    }
}

addButton.addEventListener('click', () => {
    // Valida os dados
    const selectedType = selectField1.value;
    const inputValue = inputField.value.trim();

    if (!validateInput(selectedType, inputValue)) {
        alert('Por favor, insira um valor no formato correto.');
        return;
    }

    // Lógica de armazenagem dos dados
    if (selectedType === 'nome') {
        if (dataStorage[selectedType] !== null) {
        }
        dataStorage[selectedType] = inputValue;
    } else if (dataStorage[selectedType] === null) {
        dataStorage[selectedType] = Number(inputValue.trim().replace(',', '.')); // Apenas um valor é permitido para vencimento e adicional
    }

    // Chama a função de exibição para atualizar a interface
    updateDisplay(selectedType);

    // Chama o cálculo após a atualização
    calcular();

    // Limpa o campo de input
    inputField.value = '';
});

// Função que atualiza os valores na tabela conforme o cargo selecionado
selectField2.addEventListener("change", function () {
    const selectedCargo = selectField2.value;

    if (selectedCargo) {
        const cargo = tabelaCargos[selectedCargo];

        if (outputs.referencia) outputs.referencia.textContent = formatCurrency(cargo.VR); // Exibe o VR no formato pt-BR
        if (outputs.gratificacao) outputs.gratificacao.textContent = formatCurrency(cargo.ABF); // Exibe o ABF no formato pt-BR
        if (outputs.cargahoraria) outputs.cargahoraria.textContent = formatCurrency(cargo.CH); // Exibe o ABF no formato pt-BR

        // Atualiza o dataStorage com os valores do cargo
        dataStorage.referencia = cargo.VR;
        dataStorage.gratificacao = cargo.ABF;
        dataStorage.cargahoraria = cargo.CH;

        // Agora, em vez de passar selectedCargo, passe o tipo de dado correto
        updateDisplay('gratificacao'); // Exemplo, passando um tipo válido
        updateDisplay('cargahoraria'); // Exemplo, passando um tipo válido
    } else {
        if (outputs.referencia) outputs.referencia.textContent = "";
        if (outputs.gratificacao) outputs.gratificacao.textContent = "";
        if (outputs.cargahoraria) outputs.cargahoraria.textContent = ""; // Limpa os valores

        // Limpa o dataStorage
        dataStorage.referencia = null;
        dataStorage.gratificacao = null;
        dataStorage.cargahoraria = null;
    }
    // Adiciona o setTimeout para garantir que os valores sejam atualizados antes de chamar calcular
    setTimeout(() => {
        calcular(); // Chama a função calcular após a atualização dos dados
    }, 100); // 100ms de atraso (ajustável)
});


//--------------------------------- Cálculo de Dependende do IR ---------------------------------//

document.addEventListener("DOMContentLoaded", function () {
    const decrementarDependenteIR = document.getElementById("decrementarDependenteIR");
    const incrementarDependenteIR = document.getElementById("incrementarDependenteIR");
    const quantidadeDependentesIR = document.getElementById("quantidadeDependentesIR");

    // Inicializa a quantidade de dependentes
    let dependentesIR = 0;

    // Função para atualizar o número de dependentes no DOM e no dataStorage
    function atualizarDependentes() {
        quantidadeDependentesIR.textContent = dependentesIR;  // Atualiza a exibição no HTML
        dataStorage.quantidadeDependentesIR = dependentesIR;  // Atualiza no storage
        console.log("Quantidade de dependentes do IR:", dependentesIR);  // Exibe no console
        calcularDeducaoIR(); // Chama a função de cálculo da dedução
    }

    // Evento para decrementar
    decrementarDependenteIR.addEventListener("click", function () {
        if (dependentesIR > 0) {
            dependentesIR--;  // Decrementa o número de dependentes
            atualizarDependentes();  // Atualiza a exibição e chama o cálculo
        }
    });

    // Evento para incrementar
    incrementarDependenteIR.addEventListener("click", function () {
        dependentesIR++;  // Incrementa o número de dependentes
        atualizarDependentes();  // Atualiza a exibição e chama o cálculo
    });

    // Função para calcular a dedução do IR com base na quantidade de dependentes
    function calcularDeducaoIR() {
        const deducaoPorDependente = 189.59; // Valor da dedução por dependente
        const totalDeducao = dataStorage.quantidadeDependentesIR * deducaoPorDependente;

        // Armazena o valor da dedução na dataStorage
        dataStorage.deducaoIR = totalDeducao;

        // Exibe no console (para fins de verificação)
        console.log('Dedução do IR calculada e salva internamente:', totalDeducao);
    
        // Chama o cálculo após a atualização
        calcular();
    }

});

//--------------------------------- Sindicato e Previdência ---------------------------------//

const checkboxSindicato = document.getElementById("checkboxSindicato");
const checkboxPC = document.getElementById("checkboxPC");
const outputSindicato = document.getElementById("output_sindicato");
const outputPrevi = document.getElementById("output_previ");

function atualizarPercentuais() {
    let sindicato = checkboxSindicato.checked ? 1.5 : 0;
    let previ = checkboxPC.checked ? 7 : 0;
    outputSindicato.textContent = `${sindicato.toFixed(2).replace('.', ',')}%`;
    outputPrevi.textContent = `${previ.toFixed(2).replace('.', ',')}%`;

    // Armazenar no dataStorage
    dataStorage.sindicato = sindicato;
    dataStorage.previ = previ;

    // Log para verificar se os valores foram salvos corretamente
    console.log("Valores armazenados no dataStorage:");
    console.log("Sindicato:", dataStorage.sindicato);
    console.log("Previdência:", dataStorage.previ);

    // Chama o cálculo após a atualização
    calcular();

}

checkboxSindicato.addEventListener("change", atualizarPercentuais);
checkboxPC.addEventListener("change", atualizarPercentuais);
atualizarPercentuais();

//------------------------------------- Plano de Saúde -------------------------------------//
    
const checkboxTitular = document.getElementById("checkboxTitular");
const decrementarDependente = document.getElementById("decrementarDependente");
const incrementarDependente = document.getElementById("incrementarDependente");
const quantidadeDependentes = document.getElementById("quantidadeDependentes");
const valorPlanoSaudeDisplay = document.getElementById("valorPlanoSaudeDisplay");
const dependentesPlanoSaude = document.getElementById("dependentesPlanoSaude");
    
let dependentes = 0;
    
function calcularValorPlanoSaude() {
    let valorPlano = checkboxTitular.checked ? 4 : 0;

    for (let i = 1; i <= dependentes; i++) {
        valorPlano += i === 1 ? 1 : i === 2 ? 0.5 : 0.25;
    }

    valorPlanoSaudeDisplay.textContent = `${valorPlano.toFixed(2).replace('.', ',')}%`;

    // Armazenar o valor do plano de saúde no dataStorage
    dataStorage.cassi = valorPlano;

    // Exibir ou ocultar os botões de dependentes
    dependentesPlanoSaude.style.display = checkboxTitular.checked ? "block" : "none";

    // Resetar dependentes se o checkbox for desmarcado
    if (!checkboxTitular.checked) {
        dependentes = 0;
        quantidadeDependentes.textContent = dependentes; // Atualiza quantidade visível de dependentes
    }

    // Chama o cálculo após a atualização
    calcular();
}
    
// Função de Atualização de Dependentes
function atualizarDependentes() {
    quantidadeDependentes.textContent = dependentes;
    // Agora chamamos calcularValorPlanoSaude() sem disparar recursões
    calcularValorPlanoSaude();
}

decrementarDependente.addEventListener("click", () => {
    if (dependentes > 0) {
        dependentes--;
        atualizarDependentes();
    }
});

incrementarDependente.addEventListener("click", () => {
    dependentes++;
    atualizarDependentes();
});

checkboxTitular.addEventListener("change", calcularValorPlanoSaude);

// Chamar calcularValorPlanoSaude quando a página for carregada para garantir que o estado inicial esteja correto
calcularValorPlanoSaude();

//------------------------------Funções de Reset e Limpeza de Dados------------------------------//

resetButton.addEventListener('click', () => {    
    // Reseta todos os valores do dataStorage para seus estados iniciais
    Object.assign(dataStorage, {
        referencia: null,
        vencimento: null,
        gratificacao: null,
        adicional: null,
        cargahoraria: null,
        bruto: null,
        liquido: null,
        jornada: null,
        complemento: null,
        cassi: null,
        contCassi: null,
        previ: null,
        contPrevi: null,
        aliqEfetiva: null,
        contInss: null,
        aliqProgressiva: null,
        contIrrf: null,
        sindicato: null,
        contSindicato: null,
        subtotalProventos: null,
        subtotalDescontos: null,
        salarioLiquido: null,
        salarioBase: null,
    });

    // Limpa os campos de exibição
    for (const key in outputs) {
        if (outputs[key]) {
            if (key.includes('aliq')) {
                outputs[key].textContent = '0,00%'; // Alíquotas como porcentagem
            } else {
                outputs[key].textContent = ''; // Valores numéricos
            }
        }
    }

    // Resetar os valores específicos para Sindicato, Previdência e Plano de Saúde
    outputSindicato.textContent = '0,00%';
    outputPrevi.textContent = '0,00%';
    valorPlanoSaudeDisplay.textContent = '0,00%'; // Valor plano de saúde

    // Resetar os campos de dupla saída
    document.getElementById('subtotal_proventos2').textContent = ''; // Subtotal Proventos
    document.getElementById('salario_liquido2').textContent = ''; // Salário Líquido

    // Reseta os valores nos elementos de entrada
    inputField.value = '';
    selectField1.value = '';
    selectField2.value = '';
    outputs.referencia.textContent = "Valor de referência:";

    // Exibe uma mensagem de alerta para confirmar a limpeza
    alert('Todos os campos foram redefinidos.');
});