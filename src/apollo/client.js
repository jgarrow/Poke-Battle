import ApolloClient from "apollo-boost";
import fetch from "isomorphic-fetch";

export const client = new ApolloClient({
    request: operation => {
        // checks if we're in the browser before making api call
        // const isBrowser = typeof window !== "undefined"
        // const token = isBrowser ? localStorage.getItem("token") : null
        operation.setContext({
            uri: "https://pokemon-battle-app.herokuapp.com/v1/graphql",
            headers: {
                "content-type": "application/json",
            },
            fetch,
        })
    },
})