/* eslint-disable import/named */
import {
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
  contestacaoMovimentacaoFraude,
  contestacaoMovimentacaoDesacordo,
} from './templates';

const chooseTemplate = (data) => {
  if (data.selectedReason === 'Alterações cadastrais') return alteracoesCadastrais(data);
  if (data.selectedReason === 'Cartão não recebido') return cartaoNaoRecebido(data);
  if (data.selectedReason === 'Fatura não recebida') return faturaNaoRecebida(data);
  if (data.selectedReason === 'SAC') return SAC(data);
  if (data.selectedReason === 'Senha não recebida') return senhaNaoRecebida(data);
  if (data.selectedReason === 'Pagamento não processado') return pagamentoNaoProcessado(data);
  if (data.selectedReason === 'Análise Fila Crédito em conta') return analiseFilaCreditoConta(data);
  if (data.selectedReason === 'Quitação parcial') return quitacaoParcial(data);
  if (data.selectedReason === 'Analise juros em exceção') return AnaliseJurosExcecao(data);
  if (data.selectedReason === 'Regularização de Mínimo') return RegularizacaoMinimo(data);
  if (data.selectedReason === 'Rechamada' || data.selectedReason === 'Rechamada – confirmada') return Rechamada(data);
  if (data.selectedReason === 'Antecipação de compras/Parcelamento') return AntecipacaoComprasParcelamento(data);
  if (data.selectedReason === 'Suspeita Proposta Fraudulenta') return SuspeitaPropostaFraudulenta(data);
  if (data.selectedReason === 'Reincidência Capital de Giro') return ReincidenciaCapitalGiro(data);
  if (data.selectedReason === 'Suspeita de Terceiros') return SuspeitaTerceiros(data);
  if (data.selectedReason === 'Incluir dados black list') return IncluirDadosBlackList(data);
  if (data.selectedReason === 'Proposta fraudulenta – confirmada') return PropostaFraudulenta(data);
  if (data.selectedReason === 'Cancelamento de cartão por óbito') { return cancelamentoCartaoObito(data); }
  if (data.selectedReason === 'Cadastro de procurador e/ou curador') { return cadastroProcuradorCurador(data); }
  if (data.selectedReason === 'Problemas na utilização do aplicativo') { return problemasUtilizacaoAplicativo(data); }
  if (data.selectedReason === 'Não recebe sms/push de compras') { return naoRecebeSmsPushCompras(data); }
  if (data.selectedReason === 'Problemas no saque ATM') { return problemasSaqueATM(data); }
  if (data.selectedReason === 'Rechamada Manutençoes e Garantias') { return rechamadaManutencoesGarantias(data); }
  if (data.selectedReason === 'Contestação movimentação conta - Fraude') return contestacaoMovimentacaoFraude(data);
  if (data.selectedReason === 'Contestação movimentação conta - desacordo comercial') return contestacaoMovimentacaoDesacordo(data);

  if (data.selectedReason === 'Reativação do Bloqueio Y e Z') return reativacaoBloqueioYeZ(data);
  if (data.selectedReason === 'Reativação do Bloqueio K') return reativacaoBloqueioK(data);
  if (data.selectedReason === 'Reativação de conta expurgada') { return reativacaoContaExpurgada(data); }
  if (data.selectedReason === 'Bloqueio aumento do limite') { return bloqueioAumentoLimite(data); }
  if (data.selectedReason === 'Aumento de limite corretor') { return aumentoLimiteCorretor(data); }
  if (data.selectedReason === 'Retorno de limite central acima de 30 mil') { return retornoLimiteCentralAcima30K(data); }
  if (data.selectedReason === 'Filas Aumento de limite') { return filasAumentoLimite(data); }
  if (data.selectedReason === 'Upgrade e Downgrade: Alteração na categoria dos cartões') { return UpDownAlteracaoCategoriaCartoes(data); }

  if (data.selectedReason === 'Envio do histórico') { return envioHistorico(data); }
  if (data.selectedReason === 'Envio de ligações do SAC') { return envioLigacoesSAC(data); }
  if (data.selectedReason === 'Envio do protocolo de atendimento') { return envioProtocoloAtendimento(data); }
  if (data.selectedReason === 'Recálculo de fatura') { return recalculoFatura(data); }
  if (data.selectedReason === 'Upgrade e Downgrade: Alteração na categoria dos cartões') {
    return UpDownAlteracaoCategoriaCartoes(data);
  }
  return null;
};

export default chooseTemplate;
