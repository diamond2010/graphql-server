import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
const port = 4000;
const books = [
  {
    id: '1',
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: '2',
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];
const authors = [
  {
    id: '1',
    name: 'Kate Chopin',
    rating: '1',
    location: 'New York',
    distributor: 'Red Books'

  },
  {
    id: '2',
    name: 'Paul Auster',
    rating: '1',
    location: 'Ohio',
    distributor: 'Pin Pin Books'
  },
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID!
    title: String
    author: String
  }
  type Author {
    id: ID!
    name: String
    rating: String
    location: String
    distributor: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book!]!
    authors: [Author!]!
  },
`;
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
}

const server = new ApolloServer({
  typeDefs, resolvers
});

const { url } = await startStandaloneServer(server, { listen: { port }});
