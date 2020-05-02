const node_env = process.env.NODE_ENV

let config = {}

config.development = {
    mysql: {
        connectionLimit: 500,
        host: "localhost",
        user: "bakeryAdmin",
        password: "admin",
        port: 3306,
        database: "bakery"
    }
}

config.environment = 'development';

if (~['development'].indexOf(node_env)) {
    config.environment = 'development';
}

module.exports = config;