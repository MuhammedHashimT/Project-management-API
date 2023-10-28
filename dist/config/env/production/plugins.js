"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
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
});
//# sourceMappingURL=plugins.js.map