import {Type, Provider} from 'angular2/core';
import {bootstrap as origBoot} from 'angular2-meteor-auto-bootstrap';

export class AngularUni {
  static render(component) {}
}

export function bootstrap(appComponentType: any,
                          providers: Array<Type | Provider | any[]> = null) {
  Meteor.startup(function() {
    origBoot(appComponentType, providers);

    Tracker.afterFlush(() => {
      if (preboot) preboot.complete();
    });
  });
}
