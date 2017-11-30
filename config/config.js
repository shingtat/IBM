var config = {}

config.cloudant = {};

config.cloudant.dbname = 'account';
config.cloudant.dbname2 = 'attributes';
config.cloudant.account = '7fc144a4-587e-4688-b920-7e5937a1c36c-bluemix';
config.cloudant.password = 'db15223e520abad138cbc58d048ef56afe690c0c9ecc8e32dd160235cd288176';

config.index_field = 'username';
config.port = process.env.PORT || 3000;

module.exports = config;
