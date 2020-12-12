import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createUploadLink} from 'apollo-upload-client';
import {ApolloLink} from 'apollo-link';
import SyncStorage from 'sync-storage';

const token = SyncStorage.get('token');

console.log('Client JS token', token);

const httpLink = new createUploadLink({
  uri: 'https://ravendel-backend.hbwebsol.com/graphql',
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
  return forward(operation);
});

const APclient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default APclient;
