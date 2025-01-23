import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DatabaseOutlined,
    FileAddOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Table, Tag, Space } from 'antd';
import { Link } from 'react-router-dom'; // Импортируем Link

const { Header, Sider, Content } = Layout;
const { Column } = Table;

// Пример данных о заявках
const data = [
    {
        key: '1',
        id: '001',
        date: '2023-10-01',
        status: 'Новая',
        description: 'Заявка на ремонт компьютера',
        priority: 'Высокий',
    },
    {
        key: '2',
        id: '002',
        date: '2023-10-02',
        status: 'В работе',
        description: 'Заявка на установку ПО',
        priority: 'Средний',
    },
    {
        key: '3',
        id: '003',
        date: '2023-10-03',
        status: 'Завершённая',
        description: 'Заявка на настройку сети',
        priority: 'Низкий',
    },
    {
        key: '4',
        id: '004',
        date: '2023-10-04',
        status: 'Отменённая',
        description: 'Заявка на замену оборудования',
        priority: 'Высокий',
    },
];

// Цвета для тегов статусов
const statusColors = {
    Новая: 'blue',
    'В работе': 'orange',
    Завершённая: 'green',
    Отменённая: 'red',
};

const Tickets = () => {
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
                    <h2>Все заявки</h2>
                    <Table dataSource={data} pagination={{ pageSize: 5 }}>
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
                </Content>
            </Layout>
        </Layout>
    );
};

export default Tickets;