import React from "react"
import { Link } from "gatsby"

// @ts-ignore
import { rhythm, scale } from "../../utils/typography"

import { LocationInterface } from "./location.interface"

type LayoutProps = {
  location: LocationInterface,
  title: string,
  children: any
}

class Layout extends React.PureComponent<LayoutProps> {


  render() {
    const { location, title, children } = this.props

    // @ts-ignore
    const rootPath = `${__PATH_PREFIX__}/`

    let header
    // 决定 header 的大小
    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              color: `inherit`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          {/*© {new Date().getFullYear()}, Built with*/}
          {/*{` `}*/}
          {/*<a href="https://www.gatsbyjs.org">Gatsby</a>*/}
        </footer>
      </div>
    )
  }
}

export default Layout
