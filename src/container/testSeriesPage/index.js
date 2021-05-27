import React from 'react';
import './style.css';
import Layout from '../../component/layout';
import {withRouter} from 'react-router-dom';

/**
* @author
* @function TestseriesPage
**/

const TestseriesPage = (props) => {
  return(
        <Layout>
            {/* Start Your HtmlFile from Here and all the html element Should Be In Layout Tag.*/}
            <label>This IS TestSerie Page</label>
        </Layout>
    )

 }

export default withRouter(TestseriesPage);