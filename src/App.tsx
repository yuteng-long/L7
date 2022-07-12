import React, { Suspense } from 'react'
import { Layout,Tabs } from 'antd'
import ReactFunctionTest from './page/ReactFunctionTest'

const WebpackAttention = React.lazy(() => import('./page/WebpackAttention'))

const { Header, Content } = Layout

const App = () => {
  return <Layout style={{display:'flex',height: '100vh'}}>
  <Header style={{color: '#fff',fontSize: '24px',textAlign: 'center'}}>L7</Header>
  <Content className="" style={{ padding: '10px' }}>
    <Tabs>
      <Tabs.TabPane tab="React" key="1">
        <ReactFunctionTest />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Webpack" key="2">
        <Suspense>
          <WebpackAttention />
        </Suspense>
      </Tabs.TabPane>
    </Tabs>
  </Content>
</Layout>
}

export default App
