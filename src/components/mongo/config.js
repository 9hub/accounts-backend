let env = process.env.ENVIRONMENT || 'develop';

let config = {
  develop: {
    db: 'mongodb://127.0.0.1:27017/wargos-members-develop'
  },
  production: {
    db: 'mongodb://mongo:27017/wargos-members'
  }
};

module.exports = config[env];
