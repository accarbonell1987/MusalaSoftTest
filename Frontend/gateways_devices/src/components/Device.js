import React, { Component } from "react";
import axios from "axios";
import { Button, Grid, Icon, Table, Input, Checkbox } from "semantic-ui-react";
import "../globals/css/Generic.css";
// import DeviceAdd from "./GatewayAdd";
import Swal from "sweetalert2";
import moment from "moment";

export class Device extends Component {
  state = {
    searchcriteria: null,
    devices: [],
  };
  swalToast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  constructor(props) {
    super(props);
    this.devicesFromApi = this.devicesFromApi.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);
  }

  componentDidMount = () => {
    this.devicesFromApi();
  };

  devicesFromApi = () => {
    axios.get("https://localhost:44392/api/devices").then((res) => {
      this.setState({ devices: res.data });
    });
  };
  deleteDevice = (device) => {
    const text = "Really do you want to delete " + device.name + " device?";
    Swal.fire({
      title: "Delete?",
      text: text,
      icon: "question",
      showCancelButton: true,
      cancelButtonColor: "#db2828",
      confirmButtonColor: "#21ba45",
      confirmButtonText: "Yes, Delete",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        axios.defaults.headers.post["Content-Type"] = "application/json";
        axios
          .delete("https://localhost:44392/api/devices/" + device._id)
          .then((res) => {
            if (res.status === 200) {
              this.swalToast.fire({
                icon: "success",
                title: "Deleted...",
              });
            }
            this.devicesFromApi();
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: err,
              showConfirmButton: false,
              timer: 5000,
            });
          });
      }
    });
  };

  onClickSearch = (evt) => {};
  onKeyPressed = (evt) => {};

  render() {
    const { searchcriteria } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="top" className="gestionar-allgrid">
        <Grid.Column className="gestionar-allcolumn">
          <Input
            name="find"
            value={searchcriteria}
            icon={<Icon name="search" inverted circular link onClick={this.onClickSearch} />}
            placeholder="Search..."
            onChange={this.onClickSearch}
            onKeyDown={this.onKeyPressed}
          />
          <Table compact celled definition>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan="6">{/* <DeviceAdd devicesFromApi={this.devicesFromApi} /> */}</Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell>UID</Table.HeaderCell>
                <Table.HeaderCell>Vendor</Table.HeaderCell>
                <Table.HeaderCell>Date of Creation</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell className="cells-max-witdh-2">Gateway</Table.HeaderCell>
                <Table.HeaderCell className="cells-max-witdh-2">Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.devices.map((device) => {
                const date = moment(new Date(device.datecreated)).format("DD-MM-YYYY");
                return (
                  <Table.Row key={device._id}>
                    <Table.Cell collapsing>
                      <Icon name="microchip" />
                    </Table.Cell>
                    <Table.Cell>{device.uid}</Table.Cell>
                    <Table.Cell>{device.vendor}</Table.Cell>
                    <Table.Cell>{date}</Table.Cell>
                    <Table.Cell>
                      <Checkbox toggle name="active" labelPosition="left" label={device.status ? "Yes" : "No"} checked={device.status} disabled />
                    </Table.Cell>
                    <Table.Cell className="cell-logs" collapsing>
                      <Button icon labelPosition="right" className="button-logs">
                        <Icon name="microchip" className="button-icon-logs" />
                        Gateway
                      </Button>
                    </Table.Cell>
                    <Table.Cell className="cell-acciones" collapsing>
                      {<Button icon="remove circle" className="button-remove" onClick={() => this.deleteDevice(device)} />}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Device;
