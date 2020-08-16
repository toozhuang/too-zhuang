/** 16/8/2020
 *   作者: Wang
 *   功能: 关于我，一些我的信息；简单就好
 */
import './about.scss'

import React from "react"
import {graphql} from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"

import MeImg from '../assets/me.jpg';

class AboutPage extends React.PureComponent {

    render() {
        const {data, location} = this.props;
        const siteTitle = data.site.siteMetadata.title
        // console.log('404 page here')
        return (
            <Layout location={location} title={siteTitle}>
                <SEO title="About: 关于我 "/>
                {/*// todo: 这个 seo 后期怎么使用， 感觉很牛逼*/}
                <div className="me-img-container">
                    <img src={MeImg} alt=""/>
                </div>
                <div className="about-me-title"> About me:</div>
                <div className="about-me-content">
                    Hi, 我是喜欢碎碎念的壮师傅，前端开发差一点到 5 年，做过 Angular 2，React，
                    TODO: 后面慢慢想好了
                </div>
            </Layout>
        )
    }

}

export default AboutPage

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`
