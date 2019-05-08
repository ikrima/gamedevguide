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
    if (value && value !== form.getFieldValue('signup2-password')) {
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
        <a href={DEMO.link} className="btn btn-block icon-btn-v2 bg-facebook mb-2"><Icon type="facebook" theme="filled" /><span className="btn-text">Sign up with Facebook</span></a>
        <a href={DEMO.link} className="btn btn-block icon-btn-v2 bg-twitter"><Icon type="twitter" /><span className="btn-text">Sign up with Twitter</span></a>
        <div className="divider divider-with-content my-4"><span className="divider-inner-content">OR</span></div>
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
            {getFieldDecorator('signup2-nickname', {
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
            {getFieldDecorator('signup2-email', {
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
            {getFieldDecorator('signup2-password', {
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
            {getFieldDecorator('signup2-confirm', {
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
            {getFieldDecorator('signup2-agreement', {
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
