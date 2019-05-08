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
        <h2>Subscribe Now</h2>
        <p className="lead mb-3">Only the best stuff. No spam! We promise!</p>
        <Form onSubmit={this.handleSubmit} className="form-v1">
          <FormItem className="mb-3">
            {getFieldDecorator('subscribe1-email', {
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
              Subscribe
            </Button>
          </FormItem>
        </Form>
      </section>
    );
  }
}

const WrappedNormalForm = Form.create()(withRouter(NormalForm));


export default WrappedNormalForm;
