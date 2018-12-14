import React, { Component } from 'react'
import { Link } from 'gatsby';
import sizeMe  from 'react-sizeme';
import { connect } from "react-redux";
import { updateHeaderHeight } from '../../actions/layout';
import Menu from '../Menu';

class Header extends Component {
  componentDidUpdate = () => {
    this.props.updateHeaderHeight(this.props.size.height)
  }

  render() {
    const { siteTitle } = this.props
    return(
      <div
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          background: 'cornflowerblue',
          marginBottom: '1.45rem',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1360,
            padding: '0.8rem 1.0875rem',
          }}
        >
          <div style={{
            float: 'left',
            marginBottom: '0.8em',
          }}>
            <h1 style={{ margin: 0, fontSize: "1.25rem"}}>
              <Link
                to="/"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                {siteTitle}
              </Link>
            </h1>
          </div>
          <Menu />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateHeaderHeight
}

export default connect(()=>({}), mapDispatchToProps) (sizeMe({monitorHeight: true})(Header))
