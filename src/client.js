// import {ApolloClient} from 'apollo-client';
// import {InMemoryCache} from 'apollo-cache-inmemory';
// import {createUploadLink} from 'apollo-upload-client';
// import {ApolloLink} from 'apollo-link';
// import SyncStorage from 'sync-storage';

// const token = SyncStorage.get('token');

// console.log('Client JS token', token);

// const httpLink = new createUploadLink({
//   uri: 'https://ravendel-backend.hbwebsol.com/graphql',
// });

// const authLink = new ApolloLink((operation, forward) => {
//   operation.setContext({
//     headers: {
//       authorization: token,
//     },
//   });
//   return forward(operation);
// });

// const APclient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// export default APclient;

import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
  from,
  ApolloProvider,
  gql,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {getToken, isEmpty} from './utils/helper';
import SyncStorage from 'sync-storage';

const httpLink = createHttpLink({
  // uri:`https://ravendel.herokuapp.com/graphql`,
  uri: `https://demo1.ravendel.io/graphql`,
});
const authMiddleware = new ApolloLink(async (operation, forward) => {
  const token = await SyncStorage.get('token');
  operation.setContext(({headers = {}}) => ({
    headers: {
      ...headers,
      authorization: !isEmpty(token) ? token : '',
    },
  }));
  return forward(operation);
});
const APclient = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});
export default APclient;
