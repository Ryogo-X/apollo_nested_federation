const { ApolloServer} = require("@apollo/server");
const{ startStandaloneServer } = require('@apollo/server/standalone');
const {gql} = require("graphql-tag");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const PORT = 4003;

const typeDefs = gql`
  type ChildItem @key(fields: "id") {
    id: ID!
    name: String! @external
    parentItem: ParentItem @external
    message: String! @requires(fields: "name parentItem { name }")
  }

  type ParentItem @key(fields: "id", resolvable: false) {
    id: ID! @external
    name: String! @external
  }
`;

const resolvers = {
  ChildItem: {
    message(parent, args) {
      return "ParentName: " + parent.parentItem.name + " | ChildName: " + parent.name;
    }
  }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

startStandaloneServer(server, {
    listen:{
        port: PORT
    }
}).then(({url}) => {
    console.log(`Products service ready at ${url}`);
});