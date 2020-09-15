import React from "react";

const cc = require("cryptocompare");

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      ...this.savedSettings(),
      setPage: this.setPage,
      confirmFavorites: this.confirmFavorites,
    };
  }

  componentDidMount = () => {
    this.fetchCoins();
  };

  fetchCoins = async () => {
    let coinList =( await cc.coinList()).Data;
    this.setState({coinList})
  };

// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR api_key=407ce028abe941a672ad85f05150bc2b5794946edb2240e32d61e2e64f57d21e
// cc.setApiKey('<your-api-key>')

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard",
    });
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        test: "hello",
      })
    );
  };

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    return {};
  }
  setPage = (page) => this.setState({ page });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
