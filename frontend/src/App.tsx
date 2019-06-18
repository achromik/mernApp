import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createEpicMiddleware } from 'redux-observable';

import { Root } from './Root';
import { rootEpic } from '@src/config/rootEpic';
import { rootReducer } from '@src/config/rootReducer';

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Root />
        </Provider>
    );
};

export default App;
