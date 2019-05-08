import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { withRouter } from "react-router-dom";
import DEMO from 'constants/demoData';
const FormItem = Form.Item;

class NormalForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push(DEMO.home2);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className="form-v1-container">
        <h2>Forgot Password?</h2>
        <p className="additional-info col-lg-10 mx-lg-auto mb-3">Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
        <Form onSubmit={this.handleSubmit} className="form-v1">
          <FormItem className="mb-3">
            {getFieldDecorator('resetpassword1-email', {
              rules: [
                { type: 'email', message: 'The input is not valid E-mail!' },
                { required: true, message: 'Please input your email!' }
              ],
            })(
              <Input size="large" prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="btn-cta btn-block">
              Send Reset Instructions
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

const WrappedNormalForm = Form.create()(withRouter(NormalForm));


export default WrappedNormalForm;
