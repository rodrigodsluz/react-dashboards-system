/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import TextField from '@material-ui/core/TextField';

import { dispatch } from '../../Config/store';

import Cpf from './Components/Cpf';
import SAC from './Components/SAC';
import SenhaNaoRecebida from './Components/SenhaNaoRecebida';
import CartaoNaoRecebido from './Components/CartaoNaoRecebido';
import FaturaNaoRecebida from './Components/FaturaNaoRecebida';
import AlteracoesCadastrais from './Components/AlteracoesCadastrais';

import PagamentoNaoProcessado from './Components/contasReceber/PagamentoNaoProcessado';
import AnaliseFilaCreditoConta from './Components/contasReceber/AnaliseFilaCreditoConta';

import Rechamada from './Components/backoffice/Rechamada';
import QuitacaoParcial from './Components/backoffice/QuitacaoParcial';
import RegularizacaoMinimo from './Components/backoffice/RegularizacaoMinimo';
import AnaliseJurosExcecao from './Components/backoffice/AnaliseJurosExcecao';
import AntecipacaoComprasParcelamento from './Components/backoffice/AntecipacaoComprasParcelamento';

import SuspeitaPropostaFraudulenta from './Components/analiseRisco/SuspeitaPropostaFraudulenta';
import ReincidenciaCapitalGiro from './Components/analiseRisco/ReincidenciaCapitalGiro';
import SuspeitaTerceiros from './Components/analiseRisco/SuspeitaTerceiros';
import IncluirDadosBlackList from './Components/analiseRisco/IncluirDadosBlackList';
import PropostaFraudulenta from './Components/analiseRisco/PropostaFraudulenta';

import CadastroProcuradorCurador from './Components/garantiasManutencoes/CadastroProcuradorCurador';
import CancelamentoCartaoObito from './Components/garantiasManutencoes/CancelamentoCartaoObito';
import NaoRecebeSmsPushCompras from './Components/garantiasManutencoes/NaoRecebeSmsPushCompras';
import ProblemasSaqueATM from './Components/garantiasManutencoes/ProblemasSaqueATM';
import ProblemasUtilizacaoAplicativo from './Components/garantiasManutencoes/ProblemasUtilizacaoAplicativo';
import RechamadaManutencoesGarantias from './Components/garantiasManutencoes/RechamadaManutencoesGarantias';

import ReativacaoBloqueioYeZ from './Components/mesaCredito/ReativacaoBloqueioYeZ';
import ReativacaoBloqueioK from './Components/mesaCredito/ReativacaoBloqueioK';
import ReativacaoContaExpurgada from './Components/mesaCredito/ReativacaoContaExpurgada';
import BloqueioAumentoLimite from './Components/mesaCredito/BloqueioAumentoLimite';
import AumentoLimiteCorretor from './Components/mesaCredito/AumentoLimiteCorretor';
import RetornoLimiteCentralAcima30K from './Components/mesaCredito/RetornoLimiteCentralAcima30K';
import FilasAumentoLimite from './Components/mesaCredito/FilasAumentoLimite';
import UpDownAlteracaoCategoriaCartoes from './Components/mesaCredito/UpDownAlteracaoCategoriaCartoes';

import EnvioHistorico from './Components/GSR/EnvioHistorico';
import EnvioLigacoesSAC from './Components/GSR/EnvioLigacoesSAC';
import EnvioProtocoloAtendimento from './Components/GSR/EnvioProtocoloAtendimento';
import RecalculoFatura from './Components/GSR/RecalculoFatura';
import ContestacaoMovimentacaoFraude from './Components/backoffice/ContestacaoMovimentacaoFraude';
import ContestacaoMovimentacaoDesacordo from './Components/backoffice/ContestacaoMovimentacaoDesacordo';

import SnackAlert from '../../components/SnackAlert';
import LottieNotification from '../../components/LottieNotification/LottieNotification';

import {
  Container,
  InputText,
  LeftColumn,
  RightColumn,
  Wrapper,
} from './styles';
import { onSignIn } from '../../Auth';

const IncidentForm = () => {
  const [incidents, setIncidents] = useState([]);
  const [formLoaded, setFormLoaded] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [loadingIncidents, setLoadingIncidents] = useState(false);

  const [values, setValues] = useState({ cpf: '' });
  const [productId, setProductId] = useState(0);
  const [filteredReasons, setFilteredReasons] = useState([]);

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const lpIdApi = useSelector((state) => state.User.lpOrigin);

  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated] = useState(true);

  const reasons = useSelector((state) => state.Reasons.reasons, shallowEqual);

  const handleReasons = () => {
    if (reasons?.length) {
      const arr = reasons?.reduce((array, item) => {
        if (!array.some((item2) => item2.name === item.name)) {
          array.push(item);
        }
        return array;
      }, []);
      setFilteredReasons(arr);
    }
  };

  useEffect(async () => {
    await dispatch.Reasons.loadReasonsAsync();
    if (isAuthenticated) setLoading(false);
  }, [isAuthenticated]);

  useEffect(async () => {
    handleReasons();
  }, [isLoading, isAuthenticated, lpIdApi]);

  const createIncident = useSelector(
    (state) => state.Reasons.createIncident,
    shallowEqual,
  );

  const handleLogout = useCallback(async () => {
    await dispatch.User.resetCurrentProductByIdAsync();

    localStorage.removeItem('token');
    localStorage.clear();
  }, []);

  useEffect(async () => {
    if (selectedFile?.name && createIncident?.message?.id) {
      try {
        await onSignIn(
          process.env.REACT_APP_EMAIL_INODORISMO,
          process.env.REACT_APP_PASSWORD_INODORISMO,
        );

        const attachmentForm = {
          name: selectedFile.name, driver: null, description: null, send_attachment: true,
        };

        await dispatch.Attachment.addAttachmentAsync({
          idDocument: createIncident?.message?.id,
          file: selectedFile,
          data: attachmentForm,
        });
      } catch (error) {
        console.log('Error upload attachment', error.message || error);
      } finally {
        handleLogout();
      }
    }
  }, [createIncident]);

  const handleChange = (event) => {
    setValues((v) => ({
      ...v,
      [event.target.name]: event.target.value || event.target.checked,
    }));
  };

  const cpfComponent = (
    <Cpf
      cpf={values.cpf}
      incidents={incidents}
      formLoaded={formLoaded}
      setIncidents={setIncidents}
      handleChange={handleChange}
      setFormLoaded={setFormLoaded}
      loadingIncidents={loadingIncidents}
      setLoadingIncidents={setLoadingIncidents}
    />
  );

  const handleReasonChange = () => {
    switch (selectedReason) {
      case 'Alterações cadastrais':
        return (
          <AlteracoesCadastrais
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            setSelectedFile={setSelectedFile}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Cartão não recebido':
        return (
          <CartaoNaoRecebido
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Fatura não recebida':
        return (
          <FaturaNaoRecebida
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'SAC':
        return (
          <SAC
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Senha não recebida':
        return (
          <SenhaNaoRecebida
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Quitação parcial':
        return (
          <QuitacaoParcial
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Analise juros em exceção':
        return (
          <AnaliseJurosExcecao
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Regularização de Mínimo':
        return (
          <RegularizacaoMinimo
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Rechamada – confirmada':
      case 'Rechamada':
        return (
          <Rechamada
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Antecipação de compras/Parcelamento':
        return (
          <AntecipacaoComprasParcelamento
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Pagamento não processado':
        return (
          <PagamentoNaoProcessado
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Análise Fila Crédito em conta':
        return (
          <AnaliseFilaCreditoConta
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Suspeita Proposta Fraudulenta':
        return (
          <SuspeitaPropostaFraudulenta
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Reincidência Capital de Giro':
        return (
          <ReincidenciaCapitalGiro
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Suspeita de Terceiros':
        return (
          <SuspeitaTerceiros
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Incluir dados black list':
        return (
          <IncluirDadosBlackList
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Proposta fraudulenta – confirmada':
        return (
          <PropostaFraudulenta
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Cancelamento de cartão por óbito':
        return (
          <CancelamentoCartaoObito
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            setSelectedFile={setSelectedFile}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Cadastro de procurador e/ou curador':
        return (
          <CadastroProcuradorCurador
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Problemas na utilização do aplicativo':
        return (
          <ProblemasUtilizacaoAplicativo
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            setSelectedFile={setSelectedFile}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Não recebe sms/push de compras':
        return (
          <NaoRecebeSmsPushCompras
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Problemas no saque ATM':
        return (
          <ProblemasSaqueATM
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Rechamada Manutençoes e Garantias':
        return (
          <RechamadaManutencoesGarantias
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Reativação do Bloqueio Y e Z':
        return (
          <ReativacaoBloqueioYeZ
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Reativação do Bloqueio K':
        return (
          <ReativacaoBloqueioK
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Reativação de conta expurgada':
        return (
          <ReativacaoContaExpurgada
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Bloqueio aumento do limite':
        return (
          <BloqueioAumentoLimite
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Aumento de limite corretor':
        return (
          <AumentoLimiteCorretor
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Retorno de limite central acima de 30 mil':
        return (
          <RetornoLimiteCentralAcima30K
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Filas Aumento de limite':
        return (
          <FilasAumentoLimite
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Upgrade e Downgrade: Alteração na categoria dos cartões':
        return (
          <UpDownAlteracaoCategoriaCartoes
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Envio do histórico':
        return (
          <EnvioHistorico
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Envio de ligações do SAC':
        return (
          <EnvioLigacoesSAC
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Envio do protocolo de atendimento':
        return (
          <EnvioProtocoloAtendimento
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Recálculo de fatura':
        return (
          <RecalculoFatura
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
          />
        );
      case 'Contestação movimentação conta - Fraude':
        return (
          <ContestacaoMovimentacaoFraude
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
            setSelectedFile={setSelectedFile}
          />
        );
      case 'Contestação movimentação conta - desacordo comercial':
        return (
          <ContestacaoMovimentacaoDesacordo
            values={values}
            formLoaded={formLoaded}
            handleChange={handleChange}
            loadingIncidents={loadingIncidents}
            setSelectedFile={setSelectedFile}
          />
        );
      default:
        return <></>;
    }
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      values.selectedReason = selectedReason;
      values.product_id = productId;
      try {
        await dispatch.Reasons.createIncidentAsync(values);
        setSeverity('success');
        setMessage('Criado com sucesso');
      } catch (error) {
        setSeverity('error');
        setMessage('Não foi possível criar o incidente');
      } finally {
        setOpenAlert(!openAlert);
      }
    },
    [selectedReason, values, productId],
  );

  if (isLoading) {
    return <>Loading....</>;
  }
  return (
    <>
      {/** Alert */}
      <SnackAlert
        open={openAlert}
        severity={severity}
        handleClose={() => setOpenAlert(!openAlert)}
        message={message}
      />
      {/** end alert */}
      <Container>
        <Wrapper>
          <LeftColumn>
            <form onSubmit={handleSubmit}>
              <InputText
                id="reasons"
                options={filteredReasons}
                getOptionLabel={(option) => option.name}
                clearOnEscape
                size="small"
                renderInput={(params) => (
                  <TextField {...params} label="Motivo" variant="outlined" />
                )}
                onChange={(_event, value) => {
                  setFormLoaded(false);
                  setSelectedReason(value?.name);
                  setProductId(value?.product_id);
                }}
              />

              {selectedReason && cpfComponent}
              {handleReasonChange(selectedReason)}
            </form>
          </LeftColumn>

          <RightColumn>
            <LottieNotification
              animation="incident"
              color="#A8A8A8"
              description=""
              width="120%"
              height="120%"
            />
          </RightColumn>
        </Wrapper>
      </Container>
    </>
  );
};

export default IncidentForm;
