
import React from "react";
import i18next from "i18next";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { ArkPackage, BaseConfigType } from "@skyslit/ark-react";
import { Route, Switch, Redirect } from "react-router";
import DefaultModule from "./modules/DefaultModule";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./shared/styles/index.scss";

export interface PackageType {
  Default: DefaultModule;
}

export type ConfigType = BaseConfigType;

const _package = ArkPackage.getInstance<PackageType, ConfigType>();

_package.registerModule("Default", new DefaultModule());

_package.routeConfig = [
  {
    path: "/",
    component: _package.modules.Default.views.StarterPage,
  },
];

_package
  .usei18next(i18next, I18nextProvider, initReactI18next)
  .useRouter(BrowserRouter, Switch, Route, Redirect);

_package.initialize(
  "Browser",
  (err, opts) => {
    ReactDOM.render(
      <HelmetProvider>
        <Provider store={opts.setupStore(true)}>
          <opts.Router />
        </Provider>
      </HelmetProvider>,
      document.getElementById("root")
    );
  },
  connect
);

serviceWorker.unregister();