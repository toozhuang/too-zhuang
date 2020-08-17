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
                <div className="description-me-content">
                    Hi, 我是喜欢碎碎念的壮师傅，前端开发差一点到 5 年, 第一年的时候会给自己加上一个
                    Junior 的头衔， Junior Web Developer， 目前是 高级程序员 :)。
                    2020， 在前端 web 开发的同时，想要接触一下 UI/UX design。
                </div>
                <br></br>
                <div className="about-me-title"> Experience:</div>
                <div className="experience-me-content">
                    16年毕业先后在悉尼，香港，深圳工作。 目前定居香港。
                    TODO: 这里还要更多
                </div>

                <br></br>

                查看我的最新 项目 ， 文章， 记录，
                关注我的社交账户： LinkedIn, Github
                通过 Gmail 联系我
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
