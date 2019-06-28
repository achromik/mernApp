import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createEpicMiddleware } from 'redux-observable';
import throttle from 'lodash/throttle';
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import { Root } from './Root';
import { rootEpic } from '@src/config/rootEpic';
import { rootReducer } from '@src/config/rootReducer';
import { loadState, saveState } from 'Common/helpers/localStorage';
import { appInit } from 'Common/actions/init';

const theme = responsiveFontSizes(
    createMuiTheme({
        typography: {
            fontFamily: 'Lato',
            fontSize: 16,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
        },
    }),
);

const epicMiddleware = createEpicMiddleware();

const persistedState = loadState();

const composeEnhancer = composeWithDevTools({ trace: true });

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancer(applyMiddleware(epicMiddleware)),
);

store.dispatch(appInit());

store.subscribe(
    throttle(() => {
        saveState({
            ...store.getState(),
        });
    }, 500),
);

epicMiddleware.run(rootEpic);

const App: React.FC = () => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Root />
        </Provider>
    </MuiThemeProvider>
);
export default App;
