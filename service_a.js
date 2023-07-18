const { ApolloServer} = require("@apollo/server");
const{ startStandaloneServer } = require('@apollo/server/standalone');
const {gql} = require("graphql-tag");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const PORT = 4001;

const typeDefs = gql`
  type Query {
    parentItems: [ParentItem!]!
  }

  type ParentItem @key(fields: "id") {
    id: ID!
    name: String!
  }
`;

const resolvers = {
    Query: {
      parentItems(parent, args) {
        return items;
      },
    },
    ParentItem: {
      __resolveReference(object) {
        return items.find(s => s.id == object.id);
      },
    },
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

const items = [
  {
    id: 1,
    name: "Parent item #1"
  },
  {
    id: 2,
    name: "Parent item #2"
  },
  {
    id: 3,
    name: "Parent item #3"
  }
];