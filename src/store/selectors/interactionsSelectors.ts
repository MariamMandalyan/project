import { createSagaRequestSelectors } from './utils';

const selectors = createSagaRequestSelectors('interactions');
const selectInteractions = selectors.selectInteractions;
const selectInteractionsData = selectors.selectInteractionsData;
const selectInteractionsCount = selectors.selectInteractionsCount;
const selectInteractionsLoading = selectors.selectInteractionsLoading;
const selectInteractionsError = selectors.selectInteractionsError;
