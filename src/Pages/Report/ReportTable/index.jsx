/* eslint-disable no-mixed-operators */
/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import moment from 'moment';

import { useHistory } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import { DateTime } from 'luxon';

import { useSelector, shallowEqual } from 'react-redux';

import { Form } from '@unform/web';
import { TextField } from 'unform-material-ui';

import Pagination from '@material-ui/lab/Pagination';

import Chip from '@material-ui/core/Chip';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Typography, PrimaryButton } from '@d1.cx/components';
import { TextField as TextAutoComplete } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { TrashAlt } from '@d1.cx/icons';
import {
  startOfDay, endOfDay, addDays, subDays,
} from 'date-fns';
import DateRangerPicker from './components/DateRangePicker';

import TableLoading from '../../../components/Skeleton/TableLoading/TableLoading';
import { useModal } from '../../../hooks/useModal';

import Modal from '../../../components/Modal';
import Badge from '../../../components/Badge';

import SnackAlert from '../../../components/SnackAlert';
import SuccessContent from '../../../components/SuccessContent';

import EmptyContainer from '../../../components/EmptyContainer';
import {
  StyledTableCell,
  StyledTableRow,
  ReportTableContainer,
  FilterWrapper,
  FilterItemContainer,
  DeleteBtn,
  LargeFilterContainer,
  FilterContainer,
  FilterInputContainer,
  FilterButtons,
  PaginationContainer,
  ExportButton,
  ExportIcon,
  DateRangePickerContainer,
  FilterItem,
  LargeFilterItem,
  ActiveFiltersContainer,
  ActiveFilterItems,
  ActiveFilterBoxes,
  FilterLabel,
  FilterBox,
  CleanFilterButton,
  TableDataContainer,
  TableWrapper,
  TableHeadContainer,
  TableLoadingContainer,
} from './styles';

import Theme from '../../../theme';

import { dispatch } from '../../../Config/store';
import SelectedInputsExport from '../../../components/SelectedInputsExport/SelectedInputExport';
import MultileModal from '../../../components/MultipleModal/MultipleModal';

/**
 * @function simpleCell
 * @description Organize os dados das linhas da tabela
 */
function simpleCell(content) {
  let cell;
  if (content === null) {
    cell = <StyledTableCell key={uuidv4()} />;
  } else {
    cell = (
      <StyledTableCell key={uuidv4()} align="left">
        {content}
      </StyledTableCell>
    );
  }
  return cell;
}

/**
 * @function cellStatus
 * @description Organize os dados dos status das linhas da tabela
 */
function cellStatus(content) {
  let cell;
  if (content === null) {
    cell = <StyledTableCell key={uuidv4()} />;
  } else {
    cell = (
      <StyledTableCell key={uuidv4()} align="left">
        <Badge
          content={content?.name}
          textColor={content?.styles?.color}
          backgroundColor={content?.styles?.backgroundColor}
        />
      </StyledTableCell>
    );
  }
  return cell;
}

/**
 * @function userCell
 * @description Organiza os dados do usuário na linha da tabela
 */
function userCell(fullDocument) {
  let content;
  if (fullDocument?.user) {
    content = fullDocument.user.name;
  } else {
    content = 'N/A';
  }
  const cell = (
    <StyledTableCell
      key={uuidv4()}
      align={content === 'N/A' ? 'center' : 'left'}
    >
      {content}
    </StyledTableCell>
  );
  return cell;
}

/**
 * @function calcSla
 * @description Realiza o cálculo do Sla
 */
function calcSla(fullDocument) {
  let content;
  if (fullDocument.sla_end) {
    const res = DateTime.fromISO(fullDocument.sla_end)
      .diff(DateTime.now(), ['days', 'hours', 'minutes'])
      .toObject();

    if (res.days < 0) {
      content = `${Math.abs(res.days)} dias em atraso`;
    } else if (res.days === 0) {
      if (res.hours > 0) {
        content = `${Math.abs(res.hours)} horas e ${Math.trunc(
          Math.abs(res.minutes),
        )} minutos restantes`;
      } else {
        content = `${Math.abs(res.hours)} horas e ${Math.trunc(
          Math.abs(res.minutes),
        )} minutos atrasados`;
      }
    } else if (res.days > 0) {
      content = `${Math.abs(res.days)} dias e ${Math.abs(res.hours)} horas restantes`;
    }
  } else {
    content = 'N/A';
  }
  const cell = (
    <StyledTableCell
      key={uuidv4()}
      align={content === 'N/A' ? 'center' : 'left'}
    >
      {content}
    </StyledTableCell>
  );
  return cell;
}

/**
 * @function createRow
 * @description Cria as linhas da tabela
 */
function createRow(cells, documentId) {
  const history = useHistory();

  const routeChange = () => {
    const path = `/reports/detail/${documentId}`;
    history.push(path);
  };

  return (
    <StyledTableRow key={uuidv4()} onClick={routeChange} hover>
      {cells.map((cell) => cell)}
    </StyledTableRow>
  );
}

/**
 * @function giveAutocomplete
 * @description Retorna o componente de auto completar os status ou esteiras
 */
function giveAutocomplete(data, id, label, func, test) {
  return (
    <Autocomplete
      size="small"
      fullWidth
      multiple
      id={`autocomplete${id}`}
      options={data.map((option) => option.name || option.status)}
      filterSelectedOptions
      onChange={func}
      renderTags={(value, getTagProps) => value.map((option, index) => (
        <Chip
          style={{
            border: 'none',
            backgroundColor: Theme.palette.info.main,
            color: Theme.palette.text.light,
          }}
          key={option}
          variant="outlined"
          label={option}
          {...getTagProps({ index })}
        />
      ))}
      renderInput={(params) => (
        <TextAutoComplete
          required={test.length === 0}
          {...params}
          size="small"
          style={{ minWidth: 200 }}
          variant="outlined"
          label={label}
        />
      )}
    />
  );
}

/**
 * @function descendingComparator
 * @description Compara em ordem descrescente
 */
function descendingComparator(a, b, orderBy) {
  let valA = a[orderBy];
  let valB = b[orderBy];

  if (typeof valA === 'object' && valA !== null) valA = valA.name;
  if (typeof valB === 'object' && valB !== null) valB = valB.name;

  if (valB < valA) {
    return -1;
  }
  if (valB > valA) {
    return 1;
  }
  return 0;
}

/**
 * @function getComparator
 * @description Chama a função de comparação passando os parametros
 */
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * @function stableSort
 * @description Ordena os valores da tabela
 */
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/**
 * @function ReportTable
 * @description Página contendo o filtro e a tabela com os relatórios
 */
const ReportTable = () => {
  const { isShownModal, toggleModal } = useModal();

  const formRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(0);
  const [filters, setFilters] = useState({});
  const [success, setSuccess] = useState(false);
  const [initialPage, setInitialPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [fields, setFields] = useState([]);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [selectedDateOption, setSelectedDateOption] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedModalities, setSelectedModalities] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState();
  const [date, setDate] = useState([
    startOfDay(subDays(new Date(), 6)),
    endOfDay(new Date()),
  ]);

  const categoryFilter = ['valid'];

  const page = 0;
  const rowsPerPage = 10;

  const allSavedFilters = useSelector((state) => state.Filters.filters);

  const currentProductById = useSelector(
    (state) => state.User.currentProductById,
  );

  const Ranges = [
    {
      label: 'Hoje',
      value: [startOfDay(new Date()), endOfDay(new Date())],
    },
    {
      label: 'Ontem',
      value: [
        startOfDay(addDays(new Date(), -1)),
        endOfDay(addDays(new Date(), -1)),
      ],
    },
    {
      label: 'últimos 7 dias',
      value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())],
    },
  ];

  useEffect(async () => {
    await dispatch.Document.resetDocumentAsync();
    await dispatch.Document.resetAllDocumentAsync();
    await dispatch.ProductColumn.resetProductColumnAsync();
    await dispatch.ProductColumn.loadProductColumnAsync(currentProductById);

    setProduct(currentProductById);
  }, [currentProductById, product]);

  useEffect(() => {
    const getStatusAndModalities = async () => {
      await dispatch.Status.resetAllStatusAsync();
      await dispatch.Modalities.resetModalitiesAsync();

      await dispatch.Status.loadStatusByProductAsync(product);
      await dispatch.Modalities.loadModalitiesByproductAsync(product);

      setSelectedStatus([]);
      setSelectedModalities([]);
    };
    if (product) getStatusAndModalities();
  }, [product]);

  useEffect(async () => {
    if (product > 0 && allSavedFilters) {
      setFilters({});
      const productFilterIndex = allSavedFilters.findIndex(
        (f) => f.product === product,
      );

      // check for a valid index
      if (productFilterIndex === -1) {
        const arr = [];
        const data = {
          product,
          page: 1,
          limit: rowsPerPage,
          categories: categoryFilter,
        };
        arr.push(data);
        arr.push(...allSavedFilters);
        await dispatch.Filters.setFilters(arr);
        setFilters(data);
      } else {
        const filtersLength = Object.entries(
          allSavedFilters[productFilterIndex],
        ).length;

        // check is filters exists
        if (filtersLength > 0) {
          // check if stored product is equal to current product.
          if (allSavedFilters[productFilterIndex].product === product) {
            const f = allSavedFilters[productFilterIndex];
            if (initialPage === 0) {
              await dispatch.Document.resetAllDocumentAsync();
              await dispatch.Document.loadDocumentsWithFiltersAsync(
                allSavedFilters[productFilterIndex],
              );
            }

            // manage page changes and set new page into the stored filters
            if (initialPage > 0) {
              f.page = initialPage;
              await dispatch.Document.resetAllDocumentAsync();
              await dispatch.Document.loadDocumentsWithFiltersAsync(f);
              allSavedFilters[productFilterIndex] = f;
              await dispatch.Filters.setFilters(allSavedFilters);
            }
          }
        }
        setFilters(allSavedFilters[productFilterIndex]);
      }
    }
  }, [product, allSavedFilters, initialPage]);

  const tableColumns = useSelector(
    (state) => state.ProductColumn.columns,
    shallowEqual,
  );

  const rows = useSelector(
    (state) => state.Document.allDocuments,
    shallowEqual,
  );

  const statusByProduct = useSelector((state) => state.Status.allState);
  const modalitiesByProduct = useSelector(
    (state) => state.Modalities.modalities,
  );
  const usersByProduct = useSelector((state) => state.User.userList);

  let emptyRows;
  if (rows) {
    emptyRows = rowsPerPage
      - Math.min(rowsPerPage, rows.table.data.length - page * rowsPerPage);
  }

  const handleClick = useCallback(() => {
    const clipboard = window.getSelection().toString();
    if (clipboard.length === 0) {
      setOpen(false);
    } else {
      navigator.clipboard.writeText(clipboard);
      setMessage('Copiado para área de transferência!');
      setSeverity('success');
      setOpen(true);
    }
  });

  const handleClose = (_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setErrorAPI(false);
  };

  const createTable = (doc, fullDocument) => {
    const { header } = rows.table;
    const cells = [];

    header.forEach((identifier) => {
      if (identifier === 'SLA') {
        cells.push(calcSla(fullDocument));
        return;
      }

      if (identifier === 'Analista' || identifier === 'Operador') {
        cells.push(userCell(fullDocument));
        return;
      }

      switch (typeof doc[identifier]) {
        case 'string':
          cells.push(simpleCell(doc[identifier]));
          break;
        case 'number':
          cells.push(simpleCell(doc[identifier]));
          break;
        case 'object':
          cells.push(cellStatus(doc[identifier]));
          break;
        default:
          break;
      }
    });

    return createRow(cells, doc.document_id, handleClick);
  };

  const handleCloseSuccess = useCallback(() => {
    setFilters({});
    setSuccess(false);
    toggleModal();
  }, []);

  const searchByDate = useCallback(async () => {
    await dispatch.Document.resetAllDocumentAsync();

    let isExist;
    let obj = {};
    const productFilterIndex = allSavedFilters.findIndex(
      (f) => f.product === product,
    );

    if (productFilterIndex === -1) {
      return;
    }

    const myFilters = allSavedFilters[productFilterIndex];
    const initialDate = moment(date[0]).format('DD/MM/YYYY');
    const finalDate = moment(date[1]).format('DD/MM/YYYY');

    tableColumns.forEach((t) => {
      if (myFilters[t.belongs[0]]) {
        isExist = true;
      }
    });

    if (isExist) {
      obj = { ...myFilters };
      obj.initialDate = initialDate;
      obj.finalDate = finalDate;
    } else {
      obj.initialDate = initialDate;
      obj.finalDate = finalDate;
      obj.product = product;
      obj.page = 1;
      obj.limit = rowsPerPage;
    }

    setFilters(obj);
    allSavedFilters[productFilterIndex] = obj;
    await dispatch.Filters.setFilters(allSavedFilters);
    await dispatch.Document.loadDocumentsWithFiltersAsync(obj);
  }, [date, product, filters]);

  const handleSelectedStatus = useCallback((_event, value) => {
    setSelectedStatus(value);
  });

  const handleSelectedModalities = useCallback((_event, value) => {
    setSelectedModalities(value);
  });

  const handleSelectedUsers = useCallback((_event, value) => {
    setSelectedUsers(value);
  });

  const handleSubmitFilters = useCallback(
    async (formData) => {
      try {
        const productFilterIndex = allSavedFilters.findIndex(
          (f) => f.product === product,
        );
        const myFilters = allSavedFilters[productFilterIndex];

        const obj = {};
        const formDataLength = Object.entries(formData).length;
        const iDate = moment(date[0]).format('DD/MM/YYYY');
        const fDate = moment(date[1]).format('DD/MM/YYYY');

        if (
          formDataLength === 0
          && selectedModalities.length === 0
          && selectedStatus.length === 0
          && selectedUsers.length === 0
        ) {
          obj.categories = categoryFilter;
        } else if (formDataLength > 0) {
          tableColumns.forEach((el) => {
            if (formData[el.belongs[0]]) {
              const arr = formData[el.belongs[0]].split(',');
              obj[el.belongs[0]] = arr;
            }
          });
        } else {
          tableColumns.forEach((el) => {
            if (
              formData.hasOwnProperty(el.belongs[0])
              && myFilters.hasOwnProperty(el.belongs[0])
              && myFilters[el.belongs[0]][0] !== formData[el.belongs[0]]
            ) {
              const arr = formData[el.belongs[0]].split(',');
              obj[el.belongs[0]] = arr;
            } else if (
              formData.hasOwnProperty(el.belongs[0])
              && !myFilters.hasOwnProperty(el.belongs[0])
            ) {
              const arr = formData[el.belongs[0]].split(',');
              obj[el.belongs[0]] = arr;
            } else if (
              myFilters.hasOwnProperty(el.belongs[0])
              && !formData.hasOwnProperty(el.belongs[0])
              && myFilters[el.belongs[0]]
            ) {
              obj[el.belongs[0]] = myFilters[el.belongs[0]];
            }
          });
        }

        if (
          (myFilters.hasOwnProperty('initialDate')
            && myFilters.hasOwnProperty('finalDate'))
          || selectedDateOption
        ) {
          if (
            myFilters.initialDate !== iDate
            && myFilters.finalDate !== fDate
          ) {
            obj.initialDate = iDate;
            obj.finalDate = fDate;
          } else {
            obj.initialDate = iDate;
            obj.finalDate = fDate;
          }
        }

        if (selectedStatus.length > 0) {
          obj.status = selectedStatus;
        }

        if (selectedModalities.length > 0) {
          obj.modality_identifier = selectedModalities;
        }

        if (selectedUsers.length > 0) {
          obj.users = selectedUsers;
        }

        obj.page = 1;
        obj.product = product;
        obj.limit = rowsPerPage;

        allSavedFilters[productFilterIndex] = obj;
        setFilters(allSavedFilters[productFilterIndex]);
        await dispatch.Document.resetAllDocumentAsync();
        await dispatch.Document.loadDocumentsWithFiltersAsync(obj);
        await dispatch.Filters.setFilters(allSavedFilters);
      } catch (error) {
        setFilters({});
      } finally {
        setShowFilters(!showFilters);
        setSelectedDateOption(false);
        setFields([]);
        setInitialPage(1);
      }
    },
    [
      showFilters,
      tableColumns,
      filters,
      selectedDateOption,
      allSavedFilters,
      selectedStatus,
      selectedModalities,
      selectedUsers,
    ],
  );

  const removeFilter = useCallback(
    async (filter) => {
      let hasMoreProps = 0;
      const data = {
        page: 1,
        product,
        limit: rowsPerPage,
        categories: categoryFilter,
      };

      const productFilterIndex = allSavedFilters.findIndex(
        (f) => f.product === product,
      );
      const myFilters = allSavedFilters[productFilterIndex];

      if (filter === 'period') {
        delete myFilters.initialDate;
        delete myFilters.finalDate;
      } else {
        delete myFilters[filter];
      }

      if (filter === 'status') {
        setSelectedStatus([]);
      }

      if (filter === 'modality_identifier') {
        setSelectedModalities([]);
      }

      tableColumns.forEach((t) => {
        if (myFilters.hasOwnProperty(t.belongs[0])) {
          hasMoreProps++;
        }
      });

      if (hasMoreProps === 0) {
        delete myFilters.page;
        delete myFilters.limit;
        delete myFilters.product;
        setFilters(data);
        allSavedFilters[productFilterIndex] = data;
      } else {
        setFilters(myFilters);
        allSavedFilters[productFilterIndex] = myFilters;
      }

      await dispatch.Filters.setFilters(allSavedFilters);
      await dispatch.Document.resetAllDocumentAsync();
      await dispatch.Document.loadDocumentsWithFiltersAsync(
        hasMoreProps === 0 ? data : myFilters,
      );
    },
    [allSavedFilters, tableColumns, filters, categoryFilter],
  );

  const clearFilters = useCallback(async () => {
    const productFilterIndex = allSavedFilters.findIndex(
      (f) => f.product === product,
    );

    const data = {
      product,
      page: 1,
      limit: rowsPerPage,
      categories: categoryFilter,
    };

    setFilters(data);
    setSelectedStatus([]);
    setSelectedModalities([]);
    allSavedFilters[productFilterIndex] = data;
    await dispatch.Filters.setFilters(allSavedFilters);
    await dispatch.Document.resetAllDocumentAsync();
    await dispatch.Document.loadDocumentsWithFiltersAsync(data);
  }, [allSavedFilters, product]);

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const getAllUsers = useCallback(async () => {
    await dispatch.User.loadAllUsersAsync();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <SnackAlert
        open={open}
        severity={severity}
        message={message}
        handleClose={handleClose}
      />

      <SnackAlert
        open={errorAPI}
        severity="error"
        message="Ops! Alguma coisa deu errado. Por favor, verifique sua conexão e tente novamente."
        handleClose={handleClose}
      />

      {/** export confirmation modal  */}
      <MultileModal
        title="Confirmação de exportação"
        open={isShownModal}
        handleClose={toggleModal}
        data={filters}
        text
        product={currentProductById}
        primaryContent={
          <SelectedInputsExport data={filters} toggle={toggleModal} />
        }
      />
      {/** end export confirmation modal */}

      {/** success confirmation modal */}
      <Modal
        successFlag
        open={success}
        handleClose={handleCloseSuccess}
        content={(
          <SuccessContent
            messageOne="A exportação será enviada dentro de alguns minutos!"
            messageTwo="Muito obrigado!"
          />
        )}
        confirm={handleCloseSuccess}
      />
      {/** end success confirmation modal */}

      {currentProductById ? (
        <ReportTableContainer>
          <>
            <FilterContainer>
              <Form id="formdata" ref={formRef} onSubmit={handleSubmitFilters}>
                <FilterWrapper>
                  {fields && (
                    <FilterInputContainer>
                      <Autocomplete
                        size="small"
                        fullWidth
                        id="tags-filled"
                        value={tableColumns.map((option) => option.name)}
                        options={tableColumns.map((option) => option.name)}
                        onChange={(_evt, value) => {
                          if (value) {
                            let isExist = null;
                            if (fields.length > 0) {
                              isExist = !!fields.find((i) => i.name === value);
                            }

                            if (isExist) {
                              setMessage(
                                'Atenção, você já selecionou este filtro!',
                              );
                              setSeverity('warning');
                              setOpen(true);
                            } else {
                              const found = tableColumns.find(
                                (el) => el.name === value,
                              );
                              if (found.type === 'date') {
                                setSelectedDateOption(true);
                                return;
                              }
                              fields.push({
                                id: found.id,
                                name: found.name,
                                belongs: found.belongs[0],
                                type: found.type,
                              });
                              setFields([...fields]);
                            }
                          }
                        }}
                        renderInput={(params) => (
                          <TextAutoComplete
                            size="small"
                            style={{ minWidth: 200 }}
                            {...params}
                            variant="outlined"
                            label="Filtro"
                            placeholder="Selecione um filtro"
                          />
                        )}
                      />
                    </FilterInputContainer>
                  )}

                  <FilterButtons>
                    <PrimaryButton
                      appearance="primary"
                      type="submit"
                      disabled={fields.length === 0}
                    >
                      Buscar
                    </PrimaryButton>

                    {rows ? (
                      <PaginationContainer>
                        <Pagination
                          size="small"
                          page={+rows.meta.meta.current_page}
                          count={+rows.meta.meta.last_page}
                          showFirstButton
                          showLastButton
                          onChange={async (_event, eventPage) => {
                            setInitialPage(eventPage);
                          }}
                        />
                      </PaginationContainer>
                    ) : (
                      <PaginationContainer searching="true">
                        Carregando...
                      </PaginationContainer>
                    )}
                  </FilterButtons>

                  <ExportButton>
                    <PrimaryButton onClick={toggleModal}>
                      Exportar
                      <ExportIcon icon="export" />
                    </PrimaryButton>
                  </ExportButton>
                </FilterWrapper>

                {selectedDateOption && (
                  <DateRangePickerContainer>
                    <DateRangerPicker
                      date={date}
                      ranges={Ranges}
                      setDate={setDate}
                      placement="bottomEnd"
                      showButton
                      handleSearch={searchByDate}
                    />
                    <DeleteBtn
                      type="button"
                      onClick={() => {
                        setSelectedDateOption(!selectedDateOption);
                      }}
                    >
                      <TrashAlt width="30px" color="red" />
                    </DeleteBtn>
                  </DateRangePickerContainer>
                )}

                <FilterItemContainer>
                  {fields
                    && modalitiesByProduct
                    && statusByProduct
                    && fields.map((f, index) => (
                      <>
                        {f.belongs !== 'status'
                          && f.belongs !== 'modality_identifier'
                          && f.belongs !== 'users' && (
                            <FilterItem key={f.id}>
                              <>
                                <TextField
                                  required
                                  style={{ width: '100%' }}
                                  variant="outlined"
                                  name={f.belongs}
                                  size="small"
                                  id={f.name}
                                  label={f.name}
                                  type={f.type}
                                />
                                <DeleteBtn
                                  type="button"
                                  onClick={() => {
                                    fields.splice(index, 1);
                                    setFields([...fields]);
                                  }}
                                >
                                  <TrashAlt width="30px" color="red" />
                                </DeleteBtn>
                              </>
                            </FilterItem>
                        )}
                      </>
                    ))}
                </FilterItemContainer>

                <LargeFilterContainer>
                  {fields
                    && modalitiesByProduct
                    && statusByProduct
                    && fields.map((f, index) => {
                      let content;

                      switch (f.belongs) {
                        case 'status':
                          content = giveAutocomplete(
                            statusByProduct,
                            f.belongs,
                            f.name,
                            handleSelectedStatus,
                            selectedStatus,
                          );
                          break;
                        case 'modality_identifier':
                          content = giveAutocomplete(
                            modalitiesByProduct,
                            f.belongs,
                            f.name,
                            handleSelectedModalities,
                            selectedModalities,
                          );
                          break;

                        case 'users':
                          content = giveAutocomplete(
                            usersByProduct,
                            f.belongs,
                            f.name,
                            handleSelectedUsers,
                            selectedUsers,
                          );
                          break;
                        default:
                          break;
                      }
                      return (
                        <LargeFilterItem key={f.id}>
                          {content}
                          {content && (
                            <DeleteBtn
                              type="button"
                              onClick={() => {
                                fields.splice(index, 1);
                                setFields([...fields]);
                              }}
                            >
                              <TrashAlt width="30px" color="red" />
                            </DeleteBtn>
                          )}
                        </LargeFilterItem>
                      );
                    })}
                </LargeFilterContainer>
              </Form>
            </FilterContainer>
          </>

          {/* show actives filters */}
          {Object.entries(filters).length > 0
            && !filters.hasOwnProperty('categories') && (
              <ActiveFiltersContainer>
                <FilterLabel>
                  <Typography bold fontSize="14px" color="#fff">
                    Filtros ativos:
                  </Typography>
                </FilterLabel>

                <ActiveFilterItems>
                  <ActiveFilterBoxes>
                    {filters && filters.hasOwnProperty('initialDate') && (
                      <FilterBox
                        key={uuidv4()}
                        label="Período"
                        onDelete={() => {
                          removeFilter('period');
                        }}
                      />
                    )}

                    {tableColumns ? (
                      tableColumns.map((el) => {
                        let item = '';
                        if (filters[el.belongs]) {
                          item = (
                            <FilterBox
                              key={uuidv4()}
                              label={`${el.name}: ${filters[el.belongs]}`}
                              onDelete={() => {
                                removeFilter(el.belongs[0]);
                              }}
                            />
                          );
                        }
                        return item;
                      })
                    ) : (
                      <></>
                    )}
                  </ActiveFilterBoxes>
                </ActiveFilterItems>
                <CleanFilterButton onClick={clearFilters}>
                  Limpar filtros
                </CleanFilterButton>
              </ActiveFiltersContainer>
          )}

          <>
            <TableDataContainer>
              <TableWrapper aria-label="Documents table">
                <TableHeadContainer>
                  {rows && (
                    <TableRow>
                      {rows.table.header.map((column) => (
                        <StyledTableCell key={column}>
                          <TableSortLabel
                            active={orderBy === column}
                            direction={orderBy === column ? order : 'asc'}
                            onClick={() => handleSort(column)}
                          >
                            {column}
                          </TableSortLabel>
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  )}
                </TableHeadContainer>

                {rows ? (
                  <TableBody>
                    {stableSort(
                      rowsPerPage > 0
                        ? rows.table.data.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        : rows.data,
                      getComparator(order, orderBy),
                    ).map((row, index) => createTable(row, rows.meta.data[index]))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={8} />
                      </TableRow>
                    )}
                  </TableBody>
                ) : (
                  <TableLoadingContainer>
                    <TableLoading />
                  </TableLoadingContainer>
                )}
              </TableWrapper>
            </TableDataContainer>
          </>
        </ReportTableContainer>
      ) : (
        <EmptyContainer />
      )}
    </>
  );
};
export default ReportTable;
