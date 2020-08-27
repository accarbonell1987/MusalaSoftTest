import React, { Component } from "react";
import axios from "axios";
import { Button, Grid, Icon, Label, Table, Image, Checkbox, Input } from "semantic-ui-react";
import "../globals/css/Generic.css";

export class Gateway extends Component {
  state = {
    error: false,
    searchcriteria: null,
    gateways: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.gatewaysFromApi();
  };

  gatewaysFromApi = () => {
    axios
      .get("https://localhost:44392/api/gateways", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  onClickSearch = (evt) => {};
  onKeyPressed = (evt) => {};

  render() {
    const { error, searchcriteria, gateways } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="top" className="gestionar-allgrid">
        <Grid.Column className="gestionar-allcolumn">
          <Label attached="top left" className="div-label-attached" size="large">
            <Icon name="users" size="large" inverted /> Gateways
          </Label>
          <Input
            name="find"
            value={searchcriteria}
            icon={<Icon name="search" inverted circular link onClick={this.onClickSearch} />}
            placeholder="Search..."
            onChange={this.onClickSearch}
            onKeyDown={this.onKeyPressed}
          />
          <Table compact celled definition attached="top" className="div-table">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell />
                {/* <Table.HeaderCell colSpan="6">{this.CheckAndAllowAddButton(false, accesomenu.permisos.crear)}</Table.HeaderCell> */}
              </Table.Row>
              {gateways.length > 0 ? (
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Serial Number</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>IPv4</Table.HeaderCell>
                  <Table.HeaderCell className="cells-max-witdh-2">Devices</Table.HeaderCell>
                  <Table.HeaderCell className="cells-max-witdh-2">Actions</Table.HeaderCell>
                </Table.Row>
              ) : (
                ""
              )}
            </Table.Header>
            <Table.Body>
              {gateways.map((gateway) => {
                return (
                  <Table.Row key={gateway._id}>
                    <Table.Cell collapsing>
                      <Icon name="user" />
                    </Table.Cell>
                    <Table.Cell>{gateway.serialnumber}</Table.Cell>
                    <Table.Cell>{gateway.name}</Table.Cell>
                    <Table.Cell>{gateway.ipv4address}</Table.Cell>
                    <Table.Cell className="cell-logs" collapsing>
                      <Button icon labelPosition="right" className="button-logs">
                        <Icon name="address card outline" className="button-icon-logs" />
                        {gateway.devices.length} Devices
                      </Button>
                    </Table.Cell>
                    <Table.Cell className="cell-acciones" collapsing>
                      {
                        <Button icon="remove user" className="button-remove" disabled />
                        // //acceso a eliminar
                        // accesomenu.permisos.eliminar && !negative ? (
                        //   <Button icon="remove user" className="button-remove" onClick={() => this.DeleteUser(usuario)} />
                        // ) : (
                        //   <Button icon="remove user" className="button-remove" disabled />
                        // )
                      }
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
export default Gateway;
