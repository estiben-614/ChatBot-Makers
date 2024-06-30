import { Layout, Menu, theme } from 'antd';
import Inventory from './Inventory';

const { Header, Content, Footer } = Layout;
const items = [
  {
    key: 1,
    label: 'Inventory',
  },
];
const LayoutPage = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="demo-logo"
          style={{
            color: 'white',
          }}
        >
          ChatBot Makers
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
          marginTop: 30,
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            height: '100%',
            padding: 10,
            borderRadius: borderRadiusLG,
          }}
        >
          <Inventory />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        ChatBot Maker ©{new Date().getFullYear()} Created by Estiben Fernández and  Juan Diego Guzmán 
      </Footer>
    </Layout>
  );
};
export default LayoutPage;