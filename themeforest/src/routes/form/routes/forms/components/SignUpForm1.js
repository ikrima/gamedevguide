import React from 'react';
import { Form, Input, Tooltip, Icon, Checkbox, Button } from 'antd';
import { withRouter } from "react-router-dom";
import DEMO from 'constants/demoData';

const FormItem = Form.Item;


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push(DEMO.home2);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('signup1-password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <section className="form-v1-container">
        <h2>Create an Account</h2>
        <p className="lead col-lg-10 mx-lg-auto">Discovering and connecting with creative talent around the globe.</p>
        <Form onSubmit={this.handleSubmit} className="form-v1">
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want other to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            hasFeedback
          >
            {getFieldDecorator('signup1-nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="E-mail"
            hasFeedback
          >
            {getFieldDecorator('signup1-email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
            hasFeedback
          >
            {getFieldDecorator('signup1-password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Confirm Password"
            hasFeedback
          >
            {getFieldDecorator('signup1-confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator('signup1-agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>I have read the <a href={DEMO.link}>agreement</a></Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="btn-cta">Sign Up</Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

const WrappedRegistrationForm = Form.create()(withRouter(RegistrationForm));


export default WrappedRegistrationForm;
