import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} style={{ lineHeight: "64px" }}>
                        {this.props.isAuthenticated ? (
                            <Menu.Item key="1">Logout</Menu.Item>
                        ) : (
                            <Menu.Item key="2">Login</Menu.Item>
                        )}
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>{this.props.children}</div>
                </Content>
                <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}

export default CustomLayout;
