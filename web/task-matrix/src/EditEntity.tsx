import { Alert, Button, Divider, Modal } from "antd";
import { Link } from "react-router-dom";
import React from "react";

interface IState {
  error?: string;
}

interface IProps {
  entityName: string;
  onSave: () => void;
  onDelete: () => void;
  create?: boolean;
}

export class EditEntity extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      error: undefined
    };
  }

  public render() {
    const { children, create, entityName } = this.props;

    return (
      <div>
        <h2>
          {create ? "Create new" : "Edit"} {entityName}
        </h2>
        {this.renderError()}
        {children}
        <Divider />
        {create ? null : (
          <Button onClick={this.showDeleteConfirm} type="danger">
            Delete
          </Button>
        )}{" "}
        <Link to="/">
          <Button>Cancel</Button>
        </Link>{" "}
        <Button type="primary" onClick={this.handleSave}>
          Save
        </Button>
      </div>
    );
  }

  private handleSave = () => {
    try {
      this.props.onSave();
      this.close();
    } catch (e) {
      this.setState({
        error: e
      });
    }
  };

  private close = () => {
    // todo
  };

  private showDeleteConfirm = () =>
    Modal.confirm({
      cancelText: "No",
      content: "This cannot be undone!",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        this.props.onDelete();
        this.close();
      },
      title: `Are you sure that you want to delete this ${
        this.props.entityName
      }?`
    });

  private renderError = () => {
    if (this.state.error) {
      return (
        <Alert
          message="Error"
          description={this.state.error}
          type="error"
          showIcon
        />
      );
    }
    return null;
  };
}
