const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require('@apollo/server/standalone');
const { gql } = require("graphql-tag");
const { buildSubgraphSchema } = require("@apollo/subgraph");

const PORT = 4002;

const typeDefs = gql`
  type ChildItem @key(fields: "id") {
    id: ID!
    name: String!
    parentItem: ParentItem
  }

  type ParentItem @key(fields: "id") {
    id: ID!
    childItems: [ChildItem!]!
  }
`;

const resolvers = {
  ChildItem: {
      __resolveReference(object) {
        return items.find(item => item.id === object.id);
      }
    },
    ParentItem: {
      childItems(parent, args) {
        let newItems = [];
        let srcItems = items.filter(item => item.parentId == parent.id);
        for(let i = 0; i < srcItems.length; i++) {
          let item = Object.assign(srcItems[i]);
          item.parentItem = {
            id: parent.id
          };
          newItems.push(item);
        }
  
        return newItems;
      }
    }
  };

const server = new ApolloServer({
    schema: buildSubgraphSchema([{ typeDefs, resolvers }])
});

startStandaloneServer(server, {
    listen: {
        port: PORT
    }
}).then(({ url }) => {
    console.log(`Products service ready at ${url}`);
});

const items = [
    {
      id: 1,
      name: "Child Item #1",
      parentId: 1
    },
    {
      id: 2,
      name: "Child Item #2",
      parentId: 2
    },
    {
      id: 3,
      name: "Child Item #3",
      parentId: 3
    },
  ];
  