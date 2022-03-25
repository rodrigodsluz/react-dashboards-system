const alteracoesCadastrais = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  phone: data.phone,
  sla_total: 48,
  source: 'Formulário',
  modality_identifier: data.selectedReason,
  email: data.email,
  filled_columns: {
    'Campo alterado': data.wannaChange,
    Descrição: data.description,
  },
});

const cartaoNaoRecebido = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  phone: data.phone,
  sla_total: 48,
  source: 'Formulário',
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  email: data.email,
  filled_columns: {
    'Endereço de postagem do cartão': data.cardAddress,
    'Agilidade na entrega': data.urgentDelivery,
    Cep: data.zipCode,
    Logradouro: data.address,
    Número: data.number,
    Complemento: data.complement,
    Cidade: data.city,
    UF: data.state,
    Descrição: data.description,
  },
});

const faturaNaoRecebida = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  phone: data.phone,
  sla_total: 48,
  source: 'Formulário',
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  email: data.email,
  filled_columns: {
    Descrição: data.description,
  },
});

const SAC = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  sla_total: 48,
  source: 'Formulário',
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  email: data.email,
  filled_columns: {},
});

const senhaNaoRecebida = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  phone: data.phone,
  sla_total: 48,
  source: 'Formulário',
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  email: data.email,
  filled_columns: {
    Descrição: data.description,
  },
});

/** backoffice */

const quitacaoParcial = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  sla_total: 48,
  source: 'Formulário',
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  filled_columns: {
    'Data do Parcelamento': data.dateOfInstallment,
    'Valor da Parcela': data.parcelValue,
    'Nº das parcelas a antecipar': data.parcelsAnticipated,
    'Valor total da antecipação': data.totalAnticipationAmount,
  },
});

const AnaliseJurosExcecao = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  sla_total: 48,
  source: 'Formulário',
  filled_columns: {
    Descrição: data.description,
  },
});

const RegularizacaoMinimo = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  sla_total: 48,
  source: 'Formulário',
  filled_columns: {
    Descrição: data.description,
  },
});

const Rechamada = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  sla_total: 48,
  source: 'Formulário',
  filled_columns: {
    'Motivo da Rechamada': data.recallReason,
    Descrição: data.description,
  },
});

const AntecipacaoComprasParcelamento = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  sla_total: 48,
  source: 'Formulário',
  filled_columns: {
    Descrição: data.transactionDescription,
    'Data da transação': data.transactionDate,
    'Valor da transação': data.transactionValue,
    'Campo para registro da descrição': data.FieldDescriptionRecord,
  },
});

/** backoffice */

/** Contas a Receber */
const pagamentoNaoProcessado = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  sla_total: 48,
  source: 'Formulário',
  registration: data.registration,
  cpf: data.cpf,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  filled_columns: {
    Descrição: data.description,
    'Valor pago': data.amountPaid,
    'Data de pagamento': data.paymentDate,
  },
});

const analiseFilaCreditoConta = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  sla_total: 48,
  source: 'Formulário',
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  registration: data.registration,
  cpf: data.cpf,
  filled_columns: {
    Descrição: data.description,
    'Nome/razão social': data.companyName,
    Telefone: data.phone,
    'Conta de terceiro ou titular': data.AccountOfThirdPartyOrHolder,
    Valor: data.value,
    'Código do banco': data.bankCode,
    Agência: data.agency,
    'Conta com dígito': data.accountWithDigit,
    'Tipo de conta': data.accountType,
    'Comprovante de Pagamento': data.ProofOfPayment,
  },
});
/** end contas a Receber */

/** Analise de risco */
const SuspeitaPropostaFraudulenta = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  sla_total: 120,
  source: 'Formulário',
  filled_columns: {
    Telefone: data.phone,
    Solicitação: data.solicitation,
    'Dados confirmados': data.confirmedData,
  },
});

const ReincidenciaCapitalGiro = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  source: 'Formulário',
  filled_columns: {
    Descrição: data.description,
  },
});

const SuspeitaTerceiros = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  sla_total: 120,
  source: 'Formulário',
  filled_columns: {
    Telefone: data.phone,
    Solicitação: data.solicitation,
    'Dados confirmados': data.confirmedData,
  },
});

const IncluirDadosBlackList = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  email: data.email,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  source: 'Formulário',
  filled_columns: {
    Telefone: data.phone,
    Endereço: data.address,
  },
});

const PropostaFraudulenta = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  sla_total: 120,
  source: 'Formulário',
  filled_columns: {
    Telefone: data.phone,
    Descrição: data.description,
  },
});
/** End analise de risco */

/** Garantias e Manutenções */

const cancelamentoCartaoObito = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  sla_total: 48,
  source: 'Formulário',
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  registration: data.registration,
  cpf: data.cpf,
  filled_columns: {
    Certificado: data.certificate,
    Descrição: data.description,
  },
});

const cadastroProcuradorCurador = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  sla_total: 48,
  source: 'Formulário',
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  registration: data.registration,
  cpf: data.cpf,
  filled_columns: {
    Procuração: data.procuration,
    Descrição: data.description,
  },
});

const problemasUtilizacaoAplicativo = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  sla_total: 48,
  source: 'Formulário',
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  cpf: data.cpf,
  filled_columns: {
    Erro: data.error,
    Descrição: data.description,
  },
});

const naoRecebeSmsPushCompras = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  sla_total: 48,
  source: 'Formulário',
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  registration: data.registration,
  cpf: data.cpf,
  filled_columns: {
    Descrição: data.description,
  },
});

const problemasSaqueATM = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  sla_total: 48,
  source: 'Formulário',
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  registration: data.registration,
  cpf: data.cpf,
  filled_columns: {
    Data: data.date,
    Saque: data.withdraw,
  },
});

const rechamadaManutencoesGarantias = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  sla_total: 48,
  source: 'Formulário',
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  registration: data.registration,
  cpf: data.cpf,
  filled_columns: {
    'Reenvio de Cartão': data.resendCard,
    'Fatura não recebida': data.invoiceNotReceived,
    'Senha não recebida': data.passwordNotReceived,
    'Alterações cadastrais': data.registrationChanges,
    'Cancelamento de Cartão por Óbito': data.cardCancellationDeath,
    'Cadastro de Procurador e/ou Curador': data.procuratorRegister,
    'Problemas na utilização do aplicativo': data.appUsageProblems,
    'Não recebe SMS/Push de compras': data.notReceivingPurchaseSms,
    'Problemas no Saque ATM': data.withdrawProblems,
    Descrição: data.description,
  },
});
/** end Garantias e Manutenções */

/** Mesa de crédito */
const reativacaoBloqueioYeZ = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    Celular: data.mobileNumber,
    'E-mail': data.email,
    CEP: data.zipCode,
    Logradouro: data.address,
    Número: data.number,
    Complemento: data.complement,
    Bairro: data.neighborhood,
    Cidade: data.city,
    Estado: data.state,
    'Cliente possui plástico': data.hasPlastic,
    Descrição: data.description,
  },
});
const reativacaoBloqueioK = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    Celular: data.mobileNumber,
    'E-mail': data.email,
    CEP: data.zipCode,
    Logradouro: data.address,
    Número: data.number,
    Complemento: data.complement,
    Bairro: data.neighborhood,
    Cidade: data.city,
    Estado: data.state,
    'Cliente possui plástico': data.hasPlastic,
    Descrição: data.description,
  },
});
const reativacaoContaExpurgada = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    Celular: data.mobileNumber,
    'E-mail': data.email,
    CEP: data.zipCode,
    Logradouro: data.address,
    Número: data.number,
    Complemento: data.complement,
    Bairro: data.neighborhood,
    Cidade: data.city,
    Estado: data.state,
    'Cliente possui plástico': data.hasPlastic,
    Descrição: data.description,
  },
});

const bloqueioAumentoLimite = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    Celular: data.mobileNumber,
    'E-mail': data.email,
    CEP: data.zipCode,
    Logradouro: data.address,
    Número: data.number,
    Complemento: data.complement,
    Bairro: data.neighborhood,
    Cidade: data.city,
    Estado: data.state,
    'Cliente possui plástico': data.hasPlastic,
    Descrição: data.description,
  },
});

const aumentoLimiteCorretor = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    Celular: data.mobileNumber,
    'E-mail': data.email,
    CEP: data.zipCode,
    Logradouro: data.address,
    Número: data.number,
    Complemento: data.complement,
    Bairro: data.neighborhood,
    Cidade: data.city,
    Estado: data.state,
    'Cliente possui plástico': data.hasPlastic,
    Descrição: data.description,
  },
});

const retornoLimiteCentralAcima30K = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    'Limite desejado': data.desiredLimit,
    'Observações adicionais da Central': data.additionalCommentsCentral,
  },
});

const filasAumentoLimite = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    'Limite desejado': data.desiredLimit,
    'Observações adicionais da Central': data.additionalCommentsCentral,
  },
});

const UpDownAlteracaoCategoriaCartoes = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    'Categoria desejada': data.desiredCategory,
    Descrição: data.description,
  },
});
/** End mesa de crédito */

/** GSR */
const envioHistorico = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  sla_total: 72,
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    Datas: data.dates,
    Telefone: data.phone,
    'E-mail': data.email,
    Endereço: data.address,
    Descrição: data.description,
  },
});

const envioLigacoesSAC = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  sla_total: 120,
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    Telefone: data.phone,
    'E-mail': data.email,
    Endereço: data.address,
    Pessoal: data.personal,
    Protocolo: data.protocol,
    Descrição: data.description,
  },
});

const envioProtocoloAtendimento = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  sla_total: 72,
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    Protocolo: data.protocol,
    Data: data.date,
    Celular: data.phone,
    'E-mail': data.email,
    Descrição: data.description,
  },
});

const recalculoFatura = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  source: 'Formulário',
  sla_total: 120,
  registration: data.registration,
  last_four_digits: data.lastFourDigits,
  modality_identifier: data.selectedReason,
  cpf: data.cpf,
  filled_columns: {
    'Parcelamento automático': data.automaticPayment,
    Contestação: data.contestation,
    'Compras em dólar': data.dollarPurchases,
    Descrição: data.description,
  },
});
/** End GSR */
const RechamadaConfirmada = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  sla_total: 48,
  source: 'Formulário',
  filled_columns: {
    'Motivo da Rechamada': data.recallReason,
    Descrição: data.description,
  },
});

const contestacaoMovimentacaoFraude = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  sla_total: 48,
  source: 'Formulário',
  filled_columns: {
    CPF: data.cpf,
    'Número da Conta': data.accountNumber,
    Cliente: data.client,
    Data: data.date,
    Descrição: data.description,
    Transação: data.transaction,
    Contestação: data.contestation,
  },
});

const contestacaoMovimentacaoDesacordo = (data) => ({
  status: 'Em análise',
  product_id: data.product_id,
  registration: data.registration,
  cpf: data.cpf,
  modality_identifier: data.selectedReason,
  last_four_digits: data.lastFourDigits,
  sla_total: 48,
  source: 'Formulário',
  filled_columns: {
    CPF: data.cpf,
    'Número da Conta': data.accountNumber,
    Cliente: data.client,
    Data: data.date,
    Descrição: data.description,
    Transação: data.transaction,
    Contestação: data.contestation,
  },
});

export {
  alteracoesCadastrais,
  cartaoNaoRecebido,
  faturaNaoRecebida,
  SAC,
  senhaNaoRecebida,
  pagamentoNaoProcessado,
  analiseFilaCreditoConta,
  quitacaoParcial,
  AnaliseJurosExcecao,
  RegularizacaoMinimo,
  Rechamada,
  AntecipacaoComprasParcelamento,
  SuspeitaPropostaFraudulenta,
  ReincidenciaCapitalGiro,
  SuspeitaTerceiros,
  IncluirDadosBlackList,
  PropostaFraudulenta,
  cancelamentoCartaoObito,
  cadastroProcuradorCurador,
  problemasUtilizacaoAplicativo,
  naoRecebeSmsPushCompras,
  problemasSaqueATM,
  rechamadaManutencoesGarantias,
  reativacaoBloqueioYeZ,
  reativacaoBloqueioK,
  reativacaoContaExpurgada,
  bloqueioAumentoLimite,
  aumentoLimiteCorretor,
  retornoLimiteCentralAcima30K,
  filasAumentoLimite,
  UpDownAlteracaoCategoriaCartoes,
  envioHistorico,
  envioLigacoesSAC,
  envioProtocoloAtendimento,
  recalculoFatura,
  RechamadaConfirmada,
  contestacaoMovimentacaoFraude,
  contestacaoMovimentacaoDesacordo,
};
