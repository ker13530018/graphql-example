const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } = graphql
const axios = require('axios')
const { UserType } = require('./schema')

const url = 'http://localhost:3000'

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(source, args) {
        return axios.post(`${url}/users`, { ...args }).then(resp => resp.data)
      },
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString },
      },
      resolve(source, args) {
        return axios
          .patch(`${url}/users/${args.id}`, { ...args })
          .then(resp => resp.data)
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(source, { id }) {
        return axios.delete(`${url}/users/${id}`).then(resp => resp.data)
      },
    },
  },
})

module.exports = Mutation
