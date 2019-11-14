import React from 'react'
import { Spirit } from '../../../styles/spirit-styles'
import { Link } from 'gatsby'
import { Icon, Logo } from '../.'

const listItemClass = `mb2 lh-1-65` // TODO: Probably should go to spirit-styles.js
const linkClass = `link pa2 midgrey hover-blue dib mr5 f8`

const Footer = () => (
    <footer className="pt10 pt-vw3-ns pb-vw3 bt b--whitegrey">



        <section className={`${Spirit.page.xl} m1 mt-vw3-ns`}>

            <div className="bt b--whitegrey flex justify-between items-center pt4">
                <ul className="flex list pa0 ma0 items-center">
                    <li className={listItemClass}><a href="http://kiteandlightning.la" className="dib pt2 mr6">K&L </a></li>
                    <li className={`${listItemClass} dn db-l`}><a href=" http://bebylon.world/" className={linkClass}>Bebylon</a></li>
                    <li className={`${listItemClass} dn db-l`}><a href="http://blog.kiteandlightning.la/" className={linkClass}> Bebylon Blog</a></li>
                    <li className={`${listItemClass} dn db-l`}><a href="https://twitter.com/ikrimae" className={linkClass}>@ikrimae</a></li>
                </ul>

                <ul className="flex list pa0 ma0 items-center">
                    <li className={listItemClass}><a href="https://kiteandlightning.la" className="link pa2 midgrey hover-blue dib mr0">kiteandlightning.la</a></li>
                </ul>
            </div>

        </section>
    </footer>
)

export default Footer
