const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql
const axios = require('axios')

const url = 'http://localhost:3000'

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(source, args) {
        return axios
          .get(`${url}/companies/${source.id}/users`)
          .then(resp => resp.data)
      },
    },
  }),
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(source, args) {
        return axios
          .get(`${url}/companies/${source.companyId}`)
          .then(resp => resp.data)
      },
    },
  }),
})

module.exports = {
  UserType,
  CompanyType,
}
