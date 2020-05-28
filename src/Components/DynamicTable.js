import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

export default class DynamicTable extends Component {
  dynamicData = () => {
    const columns = [
      { name: "id", label: "ID" },
      { name: "first_name", label: "First Name" },
      { name: "last_name", label: "Last Name" },
      { name: "gender", label: "Gender" },
      { name: "drug_name", label: "Drug Name" },
    ];
    const rowsperpage = 15;
    const { data } = this.props;
    let noOfPages = Math.ceil(data.length / rowsperpage);
    let start = [];
    for (let i = 0; i < noOfPages; i++) {
      let initial = i * rowsperpage;
      let end =
        (i + 1) * rowsperpage < data.length
          ? (i + 1) * rowsperpage
          : data.length;
      let k = (
        <div className={`page${i + 1}`}>
          <div className="divHeader">
            <HeaderComponent />
          </div>
          <div className="divContent">
            <table className="table">
              <thead>
                <tr className="table-header">
                  {columns.map((colVal) => {
                    let key = Object.keys(colVal)[0];
                    let val = Object.values(colVal)[1];
                    return (
                      <th key={key} style={{ width: "7%" }}>
                        {val}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>{this.addTable(initial, end)}</tbody>
            </table>
          </div>
          <div className="divFooter">
            <FooterComponent />
          </div>
          <div class="page-break"></div>
        </div>
      );
      start.push(k);
    }
    return <div>{start}</div>;
  };

  addTable = (i, e) => {
    const { data } = this.props;
    let tempData = [];
    for (let k = i; k < e; k++) {
      tempData.push(data[k]);
    }
    return tempData.map((rowData) => {
      return (
        <tr>
          <td key={rowData.id}>{rowData.id}</td>
          <td key={rowData.first_name}>{rowData.first_name}</td>
          <td key={rowData.last_name}>{rowData.last_name}</td>
          <td key={rowData.gender}>{rowData.gender}</td>
          <td key={rowData.drug_name}>{rowData.drug_name}</td>
        </tr>
      );
    });
  };
  render() {
    return <div>{this.dynamicData()}</div>;
  }
}
