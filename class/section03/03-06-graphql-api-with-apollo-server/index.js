import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
    type Query{
        qqq: String
    }
`;

const resolvers = {
  Query: {
    qqq: () => {
      return "Hello World";
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs, // swagger
  resolvers: resolvers, // api
});

const { url } = await startStandaloneServer(server);
console.log(`Server started at ${url}`);
