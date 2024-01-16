import {
    browserHistory,
    createRouterState,
    HistoryAdapter,
    RouterStore,
} from 'mobx-state-router';

const notFound = createRouterState('notFound');

export const routes = [
    {
        name: 'home',
        pattern: '/',
    },
    {
        name: 'cart',
        pattern: '/cart'
    },
    {
        name: 'customForm',
        pattern: '/custom-form',
    },
    {
        name: 'customProduct',
        pattern: '/custom-product',
    },
    {
        name: 'customCart',
        pattern: '/custom-cart'
    },
    {
        name: 'notFound',
        pattern: '/not-found',
    },
];


export function initRouter() {
    const routerStore = new RouterStore(routes, notFound);

    // Observe history changes
    const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
    historyAdapter.observeRouterStateChanges();

    return routerStore;
}