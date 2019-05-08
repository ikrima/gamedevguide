import React from 'react';
import { Form, Input, Button, Radio } from 'antd';
const FormItem = Form.Item;

class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }
  handleFormLayoutChange = (e) => {
    this.setState({ formLayout: e.target.value });
  }
  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;
    return (
      <div>
        <Form layout={formLayout}>
          <div className="callout callout-info mt-0 mb-5">
            <FormItem
              label="Form Layout"
              className="m-0"
              {...formItemLayout}
            >
              <Radio.Group defaultValue="horizontal" onChange={this.handleFormLayoutChange}>
                <Radio.Button value="horizontal">Horizontal</Radio.Button>
                <Radio.Button value="vertical">Vertical</Radio.Button>
                <Radio.Button value="inline">Inline</Radio.Button>
              </Radio.Group>
            </FormItem>
          </div>
          <FormItem
            label="Field A"
            {...formItemLayout}
          >
            <Input placeholder="input placeholder" />
          </FormItem>
          <FormItem
            label="Field B"
            {...formItemLayout}
          >
            <Input placeholder="input placeholder" />
          </FormItem>
          <FormItem {...buttonItemLayout}>
            <Button type="primary" className="btn-cta">Submit</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const Article = () => {
  return(
    <article className="article">
      <h2 className="article-title">Form Layout</h2>
      <div className="box box-default">
        <div className="box-body py-5">
          <FormLayoutDemo />
        </div>
      </div>
    </article>
  )
}

export default Article;