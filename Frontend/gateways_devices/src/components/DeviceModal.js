import React, { Component } from "react";
import { Button, Modal, Icon, Header } from "semantic-ui-react";
import "../globals/css/Generic.css";
import Device from "./Device";

class DeviceModal extends Component {
  state = {
    open: false,
    devices: [],
  };

  componentDidMount = () => {
    this.clearModalStates();
  };
  changeModalStates = async (evt) => {
    if (evt.target.className.includes("modal-button-add") || evt.target.className.includes("modal-icon-add")) {
      this.clearModalStates();
      this.setState({ open: true });
    } else if (evt.target.className.includes("modal-button-cancel") || evt.target.className.includes("modal-icon-cancel")) {
      this.setState({ open: false });
    }
  };
  clearModalStates = () => {
    this.setState({ open: false });
  };

  render() {
    const headerlabel = "Devices of " + this.props.gateway.name;
    return (
      <Modal
        className="modal-windows"
        open={this.state.open}
        trigger={
          <Button
            floated="right"
            icon
            labelPosition="left"
            primary
            size="small"
            onClick={(evt) => {
              this.changeModalStates(evt);
            }}
            className="modal-button-add"
          >
            <Icon
              name="microchip"
              className="modal-icon-add"
              onClick={(evt) => {
                this.changeModalStates(evt);
              }}
            />
            Devices
          </Button>
        }
      >
        <Header icon="microchip" content={headerlabel} />
        <Modal.Content>
          <Device gateway={this.props.gateway} />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={this.changeModalStates} className="modal-button-cancel" type>
            <Icon name="remove" className="modal-icon-cancel" />
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeviceModal;
