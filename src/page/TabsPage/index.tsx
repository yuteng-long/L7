import React, { Suspense } from 'react'
import { Layout,Tabs } from 'antd'
import ReactFunctionTest from '../../components/ReactFunctionTest'
import styles from './index.css'

const WebpackAttention = React.lazy(() => import('../../components/WebpackAttention'))
const AntdFlowchart = React.lazy(() => import('../../components/AntdFlowchart'))

const { Header, Content } = Layout

const TabsPage = () => {
  return <Layout style={{display:'flex',height: '100vh'}}>
  <Content className="" style={{ padding: '10px' }}>
    <Tabs animated className={styles.tabsstyles} tabPosition="left">
      <Tabs.TabPane tab="X6" key="1">
        <AntdFlowchart />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Webpack" key="2">
        <Suspense>
          <WebpackAttention />
        </Suspense>
      </Tabs.TabPane>
      <Tabs.TabPane tab="React" key="3">
        <Suspense>
          <ReactFunctionTest />
        </Suspense>
      </Tabs.TabPane>
    </Tabs>
  </Content>
</Layout>
}

export default TabsPage
