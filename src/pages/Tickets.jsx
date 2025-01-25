import React, { useState, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DatabaseOutlined,
    FileAddOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Table, Tag, Space, Spin } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Header, Sider, Content } = Layout;
const { Column } = Table;

// Цвета для тегов статусов
const statusColors = {
    Новая: 'blue',
    'В работе': 'orange',
    Завершённая: 'green',
    Отменённая: 'red',
};

const Tickets = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Получение данных о заявках
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const token = localStorage.getItem('token'); // Получаем токен из localStorage
                const response = await axios.get('http://localhost:8080/tickets', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTickets(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке заявок:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['2']}
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
                            label: <Link to="/create">Создать</Link>, // Ссылка на страницу создания заявки
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
                    <h2>Все заявки</h2>
                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <Table dataSource={tickets} pagination={{ pageSize: 5 }} rowKey="id">
                            {/* Колонка с номером заявки */}
                            <Column title="Номер заявки" dataIndex="id" key="id" />

                            {/* Колонка с датой */}
                            <Column title="Дата" dataIndex="date" key="date" />

                            {/* Колонка с описанием */}
                            <Column title="Описание" dataIndex="description" key="description" />

                            {/* Колонка со статусом */}
                            <Column
                                title="Статус"
                                dataIndex="status"
                                key="status"
                                render={(status) => (
                                    <Tag color={statusColors[status] || 'gray'}>{status}</Tag>
                                )}
                            />

                            {/* Колонка с приоритетом */}
                            <Column
                                title="Приоритет"
                                dataIndex="priority"
                                key="priority"
                                render={(priority) => (
                                    <Tag
                                        color={
                                            priority === 'Высокий'
                                                ? 'red'
                                                : priority === 'Средний'
                                                    ? 'yellow'
                                                    : 'green'
                                        }
                                    >
                                        {priority}
                                    </Tag>
                                )}
                            />

                            {/* Колонка с действиями */}
                            <Column
                                title="Действия"
                                key="actions"
                                render={(_, record) => (
                                    <Space size="middle">
                                        <Link to={`/ticket/${record.id}`}>
                                            <Button>Подробнее</Button>
                                        </Link>
                                    </Space>
                                )}
                            />
                        </Table>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Tickets;