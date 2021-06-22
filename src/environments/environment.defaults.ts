export const environment = {
  usersUrl: '/api/users',
  groupsUrl: '/api/groups',
  membersUrl: '/api/members',
  usersVersionUrl: '/api/version',
  loginUrl: '/api/tokens',
  requestPassUrl: '/api/password/reset-request',
  resetPassUrl: '/api/password/reset',
  changePassUrl: '/api/password',
  thingsUrl: '/api/things',
  twinsUrl: '/api/twins',
  statesUrl: '/api/states',
  channelsUrl: '/api/channels',
  bootstrapConfigsUrl: '/api/bootstrap/things/configs',
  bootstrapUrl: '/api/bootstrap/things/bootstrap',
  connectUrl: '/api/connect',
  browseUrl: '/api/browse',

  httpAdapterUrl: '/api/http',
  readerUrl: '/api/reader',
  readerPrefix: 'channels',
  readerSuffix: 'messages',

  mqttWsUrl: window['env']['mqttWsUrl'] || 'ws://localhost/mqtt',
  exportConfigFile: '/api/configs/export/config.toml',
};
