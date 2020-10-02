import { ArkModule } from "@skyslit/ark-react";
import { connect } from "react-redux";
import StarterPageView from "./views/StarterPage.view";
import { ComponentMap } from "@skyslit/ark-react/build/types";

export type StateType = {
  StartMessage: {
    msg1: string;
  };
};

export default class DefaultModule extends ArkModule<StateType, "AuthServer"> {
  constructor() {
    super("DefaultModule");

    this.useConnect(connect);

    this.controller = {
      sayHello() {
        console.log("Hello day");
      },
    };

    this.getReducer = () => {
      return (state: StateType = this.initialState, action: any) => {
        switch (action.type) {
          default: {
            return state;
          }
        }
      };
    };

    this.main = () => {};
  }

  views: ComponentMap = {
    StarterPage: StarterPageView,
  };

  initialState: StateType = {
    StartMessage: {
      msg1: "Hola",
    },
  };
}
