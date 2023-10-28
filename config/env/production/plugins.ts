export default () => ({
    graphql: {
      enabled: true,
      config: {
          endpoint: '/graphql',
          shadowCRUD: true,
        playgroundAlways: true,
        defaultLimit: 10,
        maxLimit: 20,
        apolloServer: {
          tracing: true,
            introspection: true
        },
      }
    }
  })

// module.exports = {
//   graphql: {
//     config: {
//       endpoint: '/graphql',
//       shadowCRUD: true,
//       playgroundAlways: true,
//       depthLimit: 7,
//       amountLimit: 100,
//       apolloServer: {
//         tracing: false,
//         introspection: true,
//       },
//     },
//   },
// };