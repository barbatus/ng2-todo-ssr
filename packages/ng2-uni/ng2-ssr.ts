import {Promise} from 'meteor/promise';
import 'angular2-universal-polyfills/dist/zone-node';
import 'reflect-metadata';

import {
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  NODE_PLATFORM_PIPES,
  REQUEST_URL,
  BASE_URL,
  queryParamsToBoolean,
  Bootloader
} from 'angular2-universal';

import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS, APP_BASE_HREF} from 'angular2/router';
import {METEOR_PROVIDERS} from 'angular2-meteor';

export class AngularUni {
  static render(component) {
    let url = this.getCurrentUrl();
    let options = this.getUniOptions(component, '/', url);

    let bootloader = Bootloader.create(options);
    let serialize = bootloader.serializeApplication();
    let html = null;
    new Promise(function(resolve, reject) {
      serialize.then(result => {
        html = result;
        resolve();
      }, reject);
    }).await();

    let router = this.getRouter();
    if (router) {
      var ssrContext = router.ssrContext.get();
      ssrContext.setHtml(html);
    }

    return html;
  }

  private static getRouter() {
    const flowSSR = Package['kadira:flow-router-ssr'];
    return flowSSR && flowSSR.FlowRouter;
  }

  private static getCurrentUrl() {
    return '/';
  }

  private static getUniOptions(component, baseUrl?: string, url?: string) {
    let options = {
      buildClientScripts: true,
      componentProviders: [
        provide(APP_BASE_HREF, { useValue: baseUrl }),
        provide(REQUEST_URL, { useValue: url }),
        ROUTER_PROVIDERS,
        NODE_ROUTER_PROVIDERS,
        METEOR_PROVIDERS
      ],
      template: '<app />',
      preboot: {
        debug: true, uglify: false
      },
      directives: [component]
    };

    return options;
  }
}
