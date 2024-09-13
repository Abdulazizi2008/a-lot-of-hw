import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import CountriesTable from "./components/CountryTable";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CountriesTable />
      </div>
    </Provider>
  );
}

export default App;
