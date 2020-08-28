import React, { Component } from "react";
import axios from "axios";
import { Button, Grid, Icon, Table, Label } from "semantic-ui-react";
import "../../globals/css/Generic.css";
import DeviceModal from "../Device/DeviceModal";
import GatewayAdd from "./GatewayAdd";
import Swal from "sweetalert2";

export class Gateway extends Component {
  state = {
    searchcriteria: null,
    gateways: [],
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
  abortController = new AbortController();

  constructor(props) {
    super(props);
    this.gatewaysFromApi = this.gatewaysFromApi.bind(this);
    this.deleteGateway = this.deleteGateway.bind(this);
  }

  componentDidMount = () => {
    this.gatewaysFromApi();
  };
  componentWillUnmount() {
    this.abortController.abort();
  }

  gatewaysFromApi = () => {
    axios.get("https://localhost:44392/api/gateways").then((res) => {
      this.setState({ gateways: res.data });
    });
  };
  deleteGateway = (gateway) => {
    const text = "Really do you want to delete " + gateway.name + " gateway?";
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
          .delete("https://localhost:44392/api/gateways/" + gateway._id)
          .then((res) => {
            if (res.status === 200) {
              this.swalToast.fire({
                icon: "success",
                title: "Deleted...",
              });
            }
            this.gatewaysFromApi();
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: err.response.data,
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
    const { gateways } = this.state;
    return (
      <div>
        <Label size="massive">Gateways</Label>
        <Grid textAlign="center" verticalAlign="top" className="gestionar-allgrid">
          <Grid.Column className="gestionar-allcolumn">
            <Table compact celled definition>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell colSpan="6">
                    <GatewayAdd gatewaysFromApi={this.gatewaysFromApi()} />
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Serial Number</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>IPv4 Address</Table.HeaderCell>
                  <Table.HeaderCell className="cells-max-witdh-2">Devices</Table.HeaderCell>
                  <Table.HeaderCell className="cells-max-witdh-2">Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {gateways.map((gateway) => {
                  return (
                    <Table.Row key={gateway._id}>
                      <Table.Cell collapsing>
                        <Icon name="shuffle" />
                      </Table.Cell>
                      <Table.Cell>{gateway.serialnumber}</Table.Cell>
                      <Table.Cell>{gateway.name}</Table.Cell>
                      <Table.Cell>{gateway.ipv4address}</Table.Cell>
                      <Table.Cell className="cell-logs" collapsing>
                        <DeviceModal gateway={gateway} />
                      </Table.Cell>
                      <Table.Cell className="cell-acciones" collapsing>
                        {<Button icon="remove circle" className="button-remove" onClick={() => this.deleteGateway(gateway)} />}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
export default Gateway;
