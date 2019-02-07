const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql
const axios = require('axios')

const users = [
  {
    id: '23',
    firstName: 'A',
    age: 20,
  },
  {
    id: '24',
    firstName: 'B',
    age: 21,
  },
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
  },
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
