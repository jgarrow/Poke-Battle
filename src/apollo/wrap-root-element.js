import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from  "./client";

// lets everything inside of Root element have access to apollo client
export const wrapRootElement = ({ element }) => (
    <ApolloProvider client={client}>{element}</ApolloProvider>
)