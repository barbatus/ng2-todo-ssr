Package.describe({
  name: 'barbatus:ng2-uni',
  summary: 'Angular2 SSR',
  version: '0.0.1',
  git: 'https://github.com/barbatus/meteor-ng2-ssr.git'
});

var both = ['client', 'server'];
Package.onUse(function(api) {
  api.use(['modules', 'promise']);
  api.use(['barbatus:typescript@0.2.4']);
  api.use(['kadira:flow-router-ssr@3.4.0']);

  api.mainModule('ng2-ssr.ts', 'server');
  api.mainModule('ng2-csr.ts', 'client');
});
