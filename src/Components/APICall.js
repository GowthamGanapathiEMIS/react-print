import React, { Component } from "react";
import axios from "axios";
import "../Styles/style.css";
import ReactToPrint from "react-to-print";
import DynamicTable from "./DynamicTable";

export default class APICall extends Component {
  state = {
    idSelection: null,
    inputData: {},
    response: [],
    comp: null,
    dynamicTableLoaded: null,
  };
  onDataSubmit = (details) => {
    this.setState({ dynamicTableLoaded: false });
    let input = {};
    for (let data in this.refs) {
      if (this.refs[data].value !== "") {
        input[data] = this.refs[data].value;
      }
    }
    this.setState({ inputData: input }, () => this.apiRequest(details));
  };
  apiRequest = async (details) => {
    let copyObject = this.state.inputData;
    let keysOfObj = Object.keys(copyObject);
    var str = "";
    for (let i = 0; i < keysOfObj.length; i++) {
      if (i === 0) {
        switch (keysOfObj[0]) {
          case "first_name":
            str = `first_name_like=${copyObject[keysOfObj[0]]}`;
            break;
          case "last_name":
            str = `last_name_like=${copyObject[keysOfObj[0]]}`;
            break;
          case "drug_name":
            str = `drug_name_like=${copyObject[keysOfObj[0]]}`;
            break;
          case "id":
            str = `id=${copyObject[keysOfObj[0]]}`;
            break;
          case "gender":
            str = `gender=${copyObject[keysOfObj[0]]}`;
            break;

          case "from_id":
            str = `id_gte=${copyObject[keysOfObj[0]]}`;
            break;
          case "to_id":
            str = `id_lte=${copyObject[keysOfObj[0]]}`;
            break;
          default:
            break;
        }
      } else {
        switch (keysOfObj[i]) {
          case "first_name":
            str = `${str}&first_name_like=${copyObject[keysOfObj[i]]}`;
            break;
          case "last_name":
            str = `${str}&last_name_like=${copyObject[keysOfObj[i]]}`;
            break;
          case "drug_name":
            str = `${str}&drug_name_like=${copyObject[keysOfObj[i]]}`;
            break;
          case "id":
            str = `${str}&id=${copyObject[keysOfObj[i]]}`;
            break;
          case "gender":
            str = `${str}&gender=${copyObject[keysOfObj[i]]}`;
            break;

          case "from_id":
            str = `${str}&id_gte=${copyObject[keysOfObj[i]]}`;
            break;
          case "to_id":
            str = `${str}&id_lte=${copyObject[keysOfObj[i]]}`;
            break;
          default:
            break;
        }
      }
    }
    const link = "http://localhost:3000";
    console.log(str);
    let m = await axios.get(`${link}/patient_history?${str}`);
    this.setState({ response: m.data }, () => {
      if (details === "search") {
        this.props.cbFn(this.state.response);
        this.props.history.push("/display");
        this.setState({ dynamicTableLoaded: true });
      } else {
        this.setState({
          dynamicTableLoaded: true,
          comp: <DynamicTable data={this.state.response} />,
        });
      }
    });
  };
  idInput = () => {
    if (this.state.idSelection === "Range") {
      return (
        <div>
          <label>Id From : </label>
          <input type="Number" ref="from_id" /> <br /> <br />
          <label>Id To : </label>
          <input type="Number" ref="to_id" /> <br /> <br />
        </div>
      );
    } else if (this.state.idSelection === "particular_patient") {
      return (
        <div>
          <label>Id : </label>
          <input type="Number" ref="id" /> <br />
          <br />
        </div>
      );
    }
  };

  click = () => {
    const { dynamicTableLoaded, comp } = this.state;
    let text = "";
    if (comp === null && dynamicTableLoaded === null) {
      text = "Print";
    }
    if (comp === null && dynamicTableLoaded === false) {
      text = "loding...";
    }
    if (this.state.comp !== null && dynamicTableLoaded === true) {
      text = "Printing...";
    }
    return text;
  };

  render() {
    return (
      <div className="mainWrapper">
        <div>
          <label>Search Category : </label>
          <select
            onChange={(e) => this.setState({ idSelection: e.target.value })}
          >
            <option value="">Select One</option>
            <option value="particular_patient">Particular Patient</option>
            <option value="Range">Range</option>
          </select>
        </div>
        <br />
        <div>{this.idInput()}</div>

        <div>
          <label>First Name : </label>
          <input type="text" ref="first_name" />
        </div>
        <br />
        <div>
          <label>Last Name : </label>
          <input type="text" ref="last_name" />
        </div>
        <br />
        <div>
          <label>Gender : </label>
          <select ref="gender">
            <option value="">Select One</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <br />
        <div>
          <label>Drug Name : </label>
          <input type="text" ref="drug_name" />
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <button onClick={() => this.onDataSubmit("search")}>Search</button>

          <ReactToPrint
            trigger={() => <button>{this.click()}</button>}
            content={() => this.printRef}
            onBeforeGetContent={() => {
              return new Promise((resolve) => {
                this.onDataSubmit("print");
                setTimeout(() => {
                  if (this.state.dynamicTableLoaded === true) {
                    resolve();
                  }
                }, 500);
              });
            }}
            onAfterPrint={() => {
              return new Promise((resolve) => {
                this.setState(
                  {
                    idSelection: null,
                    inputData: {},
                    response: [],
                    comp: null,
                    dynamicTableLoaded: null,
                  },
                  () => resolve()
                );
              });
            }}
          />
        </div>
        <div className="printScreen-none">
          <div
            ref={(el) => {
              this.printRef = el;
            }}
          >
            {this.state.comp}
          </div>
        </div>
      </div>
    );
  }
}
