import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";

import { QuestionnaireContainer } from "./questionnaire/QuestionnaireContainer";

const httpLink = new HttpLink({
  uri: `http://localhost:3030/graphql`,
  fetchOptions: {
    credentials: "include",
    mode: "cors",
    withCredentials: true
  },
  credentials: "include"
});

const link = ApolloLink.from([httpLink]);
const cache = new InMemoryCache({
  dataIdFromObject: object => {
    return object.id && `${object.__typename}:${object.id}`;
  }
});

const apolloClient = new ApolloClient({
  cache,
  link
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={apolloClient}>
        <QuestionnaireContainer />
      </ApolloProvider>
    </div>
  );
}

export default App;
