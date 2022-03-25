/* eslint-disable import/no-cycle */
import { init } from '@rematch/core';
import createRematchPersist from '@rematch/persist';

import Auth from './Models/Auth';
import Status from './Models/Status';
import Groups from './Models/Groups';
import Document from './Models/Document';
import ProductColumn from './Models/ProductColumn';
import User from './Models/User';
import Attachment from './Models/Attachment';
import Observation from './Models/Observation';
import Template from './Models/Template';
import Filters from './Models/Filters';
import Modalities from './Models/Modalities';
import Journeys from './Models/Journeys';
import Step from './Models/Step';
import Reasons from './Models/Reasons';
import ZipCode from './Models/ZipCode';
import Products from './Models/Products';
import CSV from './Models/CSV';
import Connection from './Models/Connection';

const persistPlugin = createRematchPersist({
  whitelist: ['Auth', 'User'],
  throttle: 100,
  version: 1,
});

const store = init({
  models: {
    Status,
    Auth,
    ProductColumn,
    Document,
    Reasons,
    Groups,
    User,
    ZipCode,
    Attachment,
    Observation,
    Template,
    Filters,
    Modalities,
    Journeys,
    Step,
    Products,
    CSV,
    Connection,
  },
  plugins: [persistPlugin],
});
export const { dispatch } = store;
export default store;
