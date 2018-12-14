import React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'

const Menu = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMenuItems {
            edges {
              node {
                name
                link
              }
            }
          }
        }
      `}
      render={data => {
        const menuItems = data.allMenuItems.edges.map(edge => edge.node).reverse()
        return (
          <div>
            {menuItems.map(item => {
              return (
                <div 
                  style={{ marginLeft: "2em", float: "right" }}
                  key={menuItems.indexOf(item)}
                >
                  <p style={{ margin:0, fontSize: "1rem" }}>
                    <Link
                      to={item.link}
                      style={{ color: 'white', textDecoration: 'none' }}
                    >
                      {item.name}
                    </Link>
                  </p>
                </div>
              )
            })}
          </div>
        )
      }}
    />
  )
}

export default Menu