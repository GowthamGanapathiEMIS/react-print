import React, { Component } from "react";
import "../Styles/style.css";
import ReactToPrint from "react-to-print";
import DynamicTable from "./DynamicTable";
import "react-data-grid/dist/react-data-grid.css";
import MUIDataTable from "mui-datatables";

export default class PrintComponentWithPreview extends Component {
  state = {
    data: [],
  };
  componentDidMount = () => {
    let data = this.props.data;
    this.setState({ data });
  };
  render() {
    const columns = [
      { name: "id", label: "ID" },
      { name: "first_name", label: "First Name" },
      { name: "last_name", label: "Last Name" },
      { name: "gender", label: "Gender" },
      { name: "drug_name", label: "Drug Name" },
    ];
    const options = {
      pagination: true,
      print: false,
      download: false,
      selectableRows: "none",
      selectableRowsHeader: false,
    };
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <ReactToPrint
            trigger={() => (
              <button>Click here to print the search results</button>
            )}
            content={() => this.printRef}
          />
        </div>
        <br />
        <div>
          <MUIDataTable
            title={"Patient Details"}
            data={this.state.data}
            columns={columns}
            options={options}
          />
        </div>
        <div className="printScreen-none">
          <DynamicTable
            ref={(el) => (this.printRef = el)}
            data={this.state.data}
          />
        </div>
      </div>
    );
  }
}
