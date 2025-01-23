import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DatabaseOutlined,
    FileAddOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {Link} from "react-router-dom";

const { Header, Sider, Content } = Layout;

const data = [
    { name: 'Новые', value: 400 },
    { name: 'В работе', value: 300 },
    { name: 'Завершённые', value: 200 },
];

const barData = [
    { name: 'Янв', Заявки: 2400 },
    { name: 'Фев', Заявки: 1398 },
    { name: 'Мар', Заявки: 9800 },
    { name: 'Апр', Заявки: 3908 },
    { name: 'Май', Заявки: 4800 },
    { name: 'Июн', Заявки: 3800 },
    { name: 'Июл', Заявки: 4300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Main = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: <Link to="/">Главная</Link>, // Ссылка на главную
                        },
                        {
                            key: '2',
                            icon: <DatabaseOutlined />,
                            label: <Link to="/tickets">Заявки</Link>, // Ссылка на страницу заявок
                        },
                        {
                            key: '3',
                            icon: <FileAddOutlined />,
                            label: <Link to={'/create'}>Создать</Link>
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <h2>Статистика заявок</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                cx={200}
                                cy={200}
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>

                        <BarChart
                            width={500}
                            height={300}
                            data={barData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Заявки" fill="#8884d8" />
                        </BarChart>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Main;