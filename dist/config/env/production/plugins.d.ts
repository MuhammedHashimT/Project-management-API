declare const _default: () => {
    graphql: {
        enabled: boolean;
        config: {
            endpoint: string;
            shadowCRUD: boolean;
            playgroundAlways: boolean;
            defaultLimit: number;
            maxLimit: number;
            apolloServer: {
                tracing: boolean;
                introspection: boolean;
            };
        };
    };
};
export default _default;
