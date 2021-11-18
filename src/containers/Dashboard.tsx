import React from 'react';
import {
  Provider, createClient, subscriptionExchange, defaultExchanges,
} from 'urql';

import { SubscriptionClient } from 'subscriptions-transport-ws';
import { EOG_GRAPHQL_URL, SUB_SCRIPTION_CLIENT_URL } from '../constants/variables';
import Metrics from './Metrics';

const subscriptionClient = new SubscriptionClient(SUB_SCRIPTION_CLIENT_URL, { reconnect: true });

const client = createClient({
  url: EOG_GRAPHQL_URL,
  exchanges: [...defaultExchanges, subscriptionExchange({
    forwardSubscription: operation => subscriptionClient.request(operation),
  })],
});

const Dashboard = () => (
  <Provider value={client}>
    <Metrics />
  </Provider>
);

export default Dashboard;
