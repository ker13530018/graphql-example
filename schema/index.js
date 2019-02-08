const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} = graphql
const { UserType, CompanyType } = require('./schema')
const Mutation = require('./mutation')

const axios = require('axios')
const url = 'http://localhost:3000'

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(source, args) {
        return axios.get(`${url}/users/${args.id}`).then(resp => resp.data)
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(source, args) {
        return axios.get(`${url}/companies/${args.id}`).then(resp => resp.data)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
