import React, { Component } from "react";
import { Button, Icon, Header, Modal, Form } from "semantic-ui-react";
import axios from "axios";
import Swal from "sweetalert2";

import "../globals/css/Generic.css";

export class GatewayAdd extends Component {
  state = {
    open: false,
    serialnumber: null,
    name: "",
    ipv4address: "",
    devices: [],
  };

  constructor(props) {
    super(props);
    this.addGateway = this.addGateway.bind(this);
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
      serialnumber: null,
      name: "",
      ipv4address: "",
      devices: [],
    });
  };
  addGateway = () => {
    let { name, ipv4address } = this.state;
    const gateway = {
      serialnumber: "",
      name: name,
      ipv4address: ipv4address,
      devices: [],
    };

    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios
      .post("https://localhost:44392/api/gateways", gateway)
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Gateway is Now Added...",
            showConfirmButton: false,
            timer: 3000,
          });
          this.clearModalStates();
          return true;
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: err,
          showConfirmButton: false,
          timer: 5000,
        });
        return false;
      });
  };
  onSubmit = (evt) => {
    if (this.addGateway()) {
      //enviar a recargar los usuarios
      this.props.gatewaysFromApi();
    }
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
              name="shuffle"
              className="modal-icon-add"
              onClick={(evt) => {
                this.changeModalState(evt);
              }}
            />
            Add
          </Button>
        }
      >
        <Header icon="shuffle" content="Add Gateway" />
        <Modal.Content>
          {/* {this.state.errorform ? <Message error inverted header="Error" content="Error en el formulario" /> : null} */}
          <Form ref="form" OnSubmit={this.changeModalState}>
            <Form.Input
              name="serialnumber"
              icon="user"
              iconPosition="left"
              label="Serial Number:"
              placeholder="AutoGenerate..."
              value=""
              disabled
              // error={this.state.errornombre}
              onChange={this.changeModalInputs}
              onKeyDown={this.onPressEnter}
            />
            <Form.Input
              required
              name="name"
              icon="user"
              iconPosition="left"
              label="Name:"
              placeholder="Miami Gate"
              onChange={this.changeModalInputs}
              onKeyDown={this.onPressEnter}
            />
            <Form.Input
              required
              name="ipv4address"
              icon="mail"
              iconPosition="left"
              label="IPv4:"
              // error={this.state.erroremail}
              placeholder="172.217.1.99"
              onChange={this.changeModalInputs}
              onKeyDown={this.onPressEnter}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.changeModalState} className="modal-button-cancel" type>
            <Icon name="remove" className="modal-icon-cancel" /> Cancel
          </Button>
          <Button
            color="green"
            onClick={this.changeModalState}
            className="modal-button-accept"
            type="submit"
            disabled={!this.state.name || !this.state.ipv4address}
          >
            <Icon name="checkmark" /> Accept
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default GatewayAdd;
