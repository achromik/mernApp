import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createEpicMiddleware } from 'redux-observable';
import throttle from 'lodash/throttle';

import { Root } from './Root';
import { rootEpic } from '@src/config/rootEpic';
import { rootReducer } from '@src/config/rootReducer';
import { loadState, saveState } from 'Common/helpers/localStorage';
import { appInit } from 'Common/actions/init';

const epicMiddleware = createEpicMiddleware();

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(epicMiddleware)),
);

store.dispatch(appInit());

store.subscribe(
    throttle(() => {
        saveState({
            authentication: store.getState().authentication,
        });
    }, 500),
);

epicMiddleware.run(rootEpic);

const App: React.FC = () => (
    <Provider store={store}>
        <Root />
    </Provider>
);
export default App;
