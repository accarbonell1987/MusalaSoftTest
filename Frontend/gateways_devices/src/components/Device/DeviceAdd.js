import React, { Component } from "react";
import { Button, Icon, Header, Modal, Form, Segment } from "semantic-ui-react";
import axios from "axios";
import Swal from "sweetalert2";

import "../../globals/css/Generic.css";
import moment from "moment";

export class DeviceAdd extends Component {
  state = {
    open: false,
    uid: null,
    vendor: "",
    datecreated: "",
    status: true,
  };

  constructor(props) {
    super(props);
    this.addDevice = this.addDevice.bind(this);
    this.changeModalInputs = this.changeModalInputs.bind(this);
    this.changeModalState = this.changeModalState.bind(this);
    this.clearModalStates = this.clearModalStates.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onPressEnter = this.onPressEnter.bind(this);
  }

  componentDidMount() {
    this.clearModalStates();
  }
  changeModalState = (evt) => {
    if (evt.target.className.includes("modal-button-add")) {
      this.setState({ open: true });
    } else if (evt.target.className.includes("modal-button-cancel") || evt.target.className.includes("modal-icon-cancel")) {
      this.setState({ open: false });
    } else {
      this.onSubmit(evt);
    }
  };
  changeModalInputs = (evt) => {
    const { name, value } = evt.target;
    this.setState({
      [name]: value,
    });
  };
  clearModalStates = () => {
    this.setState({
      open: false,
      uid: null,
      vendor: "",
      datecreated: "",
      status: true,
    });
  };
  addDevice = () => {
    let { vendor, status } = this.state;
    let date = moment(new Date()).format("YYYY-MM-DD");
    const device = {
      uid: "",
      vendor: vendor,
      datecreated: date,
      status: status,
      gateway: null,
      _idGateway: this.props.gateway._id,
    };
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios
      .post("https://localhost:44392/api/devices", device)
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Device is Now Added...",
            showConfirmButton: false,
            timer: 3000,
          });
          this.props.devicesFromApi();
          this.clearModalStates();
          return true;
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.response.data,
          showConfirmButton: false,
          timer: 5000,
        });
        return false;
      });
  };
  onSubmit = (evt) => {
    this.addDevice();
  };
  onPressEnter = (evt) => {
    const disabled = !this.state.name || !this.state.ipv4address;
    if (evt.keyCode === 13 && !evt.shiftKey && !disabled) {
      evt.preventDefault();
      this.onSubmit(evt);
    }
  };

  render() {
    return (
      <Modal
        open={this.state.open}
        trigger={
          this.props.devices.length <= 10 ? (
            <Button
              icon
              primary
              floated="right"
              labelPosition="right"
              className="modal-button-add"
              onClick={(evt) => {
                this.changeModalState(evt);
              }}
            >
              <Icon
                name="microchip"
                className="modal-icon-add"
                onClick={(evt) => {
                  this.changeModalState(evt);
                }}
              />
              Add
            </Button>
          ) : (
            <Button icon floated="right" labelPosition="right" className="modal-button-add">
              <Icon name="microchip" className="modal-icon-add" />
              Add
            </Button>
          )
        }
      >
        <Header icon="shuffle" content="Add Gateway" />
        <Modal.Content>
          <Form ref="form" onSubmit={this.changeModalState}>
            <Form.Input name="uid" icon="edit" iconPosition="left" label="UID:" placeholder="AutoGenerate..." value="" disabled />
            <Form.Input
              required
              name="vendor"
              icon="edit"
              iconPosition="left"
              label="Vendor:"
              placeholder="Xiaomi Redmi Note 7 Pro..."
              onChange={this.changeModalInputs}
              onKeyDown={this.onPressEnter}
            />
            <Form.Input
              disabled
              name="datecreated"
              icon="edit"
              iconPosition="left"
              label="Date Created:"
              value={moment(new Date()).format("DD-MM-YYYY")}
            />
            <Form.Input disabled name="gateway" icon="edit" iconPosition="left" label="Gateway:" value={this.props.gateway.name} />
            <Segment className="modal-segment-expanded">
              <Header as="h5">Status:</Header>
              <Form.Checkbox
                toggle
                name="status"
                label={this.state.status ? "Activate" : "Desactivate"}
                labelPosition="right"
                value={this.state.status}
                checked={this.state.status}
                onChange={(evt) => {
                  evt.preventDefault();
                  this.setState({
                    status: !this.state.status,
                  });
                }}
              />
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.changeModalState} className="modal-button-cancel" type>
            <Icon name="remove" className="modal-icon-cancel" /> Cancel
          </Button>
          <Button color="green" onClick={this.changeModalState} className="modal-button-accept" type="submit" disabled={!this.state.vendor}>
            <Icon name="checkmark" /> Accept
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeviceAdd;
