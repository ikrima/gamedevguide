import React from 'react';
import { Button, Icon } from 'antd';
const ButtonGroup = Button.Group;

const Box = () => {
  return(
    <div className="box box-default">
      <div className="box-header">Button Group</div>
      <div className="box-body">
        <h4 className="article-title-v2">Basic <span className="triangle triangle-down"></span></h4>
        <ButtonGroup>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button disabled>L</Button>
          <Button disabled>M</Button>
          <Button disabled>R</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button type="primary">L</Button>
          <Button>M</Button>
          <Button>M</Button>
          <Button type="dashed">R</Button>
        </ButtonGroup>

        <h4 className="article-title-v2 mt-4">With Icon <span className="triangle triangle-down"></span></h4>
        <ButtonGroup>
          <Button type="primary">
            <Icon type="left" />Go back
          </Button>
          <Button type="primary">
            Go forward<Icon type="right" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button type="primary" icon="cloud" />
          <Button type="primary" icon="cloud-download" />
        </ButtonGroup>
      </div>
    </div>
  )
}

export default Box;