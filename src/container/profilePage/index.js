import React from 'react';
import './style.css';
import Layout from '../../component/layout';
import {withRouter} from 'react-router-dom';

/**
* @author
* @function Profilepage
**/

const Profilepage = (props) => {
  return(
        <Layout>
            {/* Start Your HtmlFile from Here and all the html element Should Be In Layout Tag.*/}
            <label>This IS Profile Page</label>
        </Layout>
    )

 }

export default withRouter(Profilepage);