import {AngularUni} from 'meteor/barbatus:ng2-uni';
import {Todos} from './imports/app';

FlowRouter.route('/', {
  action: function(params) {
    AngularUni.render(Todos);
  }
});
