import React from 'react'
import Layout from '../components/Layout'
import withAuth from '../components/withAuth';

const Orders = () => {
  return (

    <Layout>

      <div>Orders  page</div>
    </Layout>
  )
}

export default  withAuth( Orders);