module.exports = {
  apps : [{
    name: 'The Rainbow Connection',
		script: 'index.js',
    watch: 'false',
		log_file: 'log.log',
		error_file: 'err.log',
		out_file: 'out.log',
		time: true,
		exp_backoff_restart_delay: 100
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
