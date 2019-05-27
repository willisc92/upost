import React from "react";
import { Layout, Menu, Breadcrumb, SubMenu } from "antd";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../actions/auth";

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    handleLogout = () => {
        this.props.logout();
        this.props.history.push("/");
    };

    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    {this.props.isAuthenticated ? (
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ lineHeight: "64px" }}>
                            <Menu.Item key="1">
                                <button className="button button--link" onClick={this.handleLogout}>
                                    Logout
                                </button>
                            </Menu.Item>
                        </Menu>
                    ) : (
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} style={{ lineHeight: "64px" }}>
                            <Menu.Item key="1">
                                <Link to="/login">Login</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/signup">Signup</Link>
                            </Menu.Item>
                        </Menu>
                    )}
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

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(CustomLayout)
);
