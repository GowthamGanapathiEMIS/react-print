import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import APICall from "./APICall";
import PrintComponentWithPreview from "./PrintComponentWithPreview";

export default class App extends Component {
  state = {
    response: null,
  };

  dataFetch = (response) => {
    console.log("from cnfn");
    console.log(response);
    this.setState({ response });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact
            // component={(props) => <APICall {...props} cbFn={this.dataFetch} />}
            render={(props) => <APICall {...props} cbFn={this.dataFetch} />}
          />
          <Route
            path="/display"
            component={() => (
              <PrintComponentWithPreview data={this.state.response} />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
