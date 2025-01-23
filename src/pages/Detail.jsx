import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Tag, Button, Layout, Menu, theme, Select, message } from 'antd';
import { Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DatabaseOutlined,
    FileAddOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

// Пример данных о заявках (обычно данные загружаются с сервера)
const tickets = [
    {
        id: '001', // ID заявки — строка
        date: '2023-10-01',
        status: 'Новая',
        description: 'Заявка на ремонт компьютера',
        priority: 'Высокий',
        assignedTo: 'Иван Иванов',
        comments: 'Не включается компьютер после грозы.',
    },
    {
        id: '002', // ID заявки — строка
        date: '2023-10-02',
        status: 'В работе',
        description: 'Заявка на установку ПО',
        priority: 'Средний',
        assignedTo: 'Петр Петров',
        comments: 'Необходимо установить Microsoft Office.',
    },
    {
        id: '003', // ID заявки — строка
        date: '2023-10-03',
        status: 'Завершённая',
        description: 'Заявка на настройку сети',
        priority: 'Низкий',
        assignedTo: 'Сергей Сергеев',
        comments: 'Настроить Wi-Fi в офисе.',
    },
];

// Цвета для тегов статусов
const statusColors = {
    Новая: 'blue',
    'В работе': 'orange',
    Завершённая: 'green',
    Отменённая: 'red',
};

const Details = () => {
    const { ticketId } = useParams(); // Получаем ID заявки из URL
    const [collapsed, setCollapsed] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(''); // Состояние для выбранного статуса
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const ticket = tickets.find((ticket) => ticket.id === ticketId); // Находим заявку по ID
    console.log('Найденная заявка:', ticket); // Отладочная информация

    if (!ticket) {
        return <div>Заявка не найдена</div>;
    }

    // Обработчик изменения статуса
    const handleStatusChange = (value) => {
        setSelectedStatus(value);
        message.success(`Статус изменен на: ${value}`);
        // Здесь можно добавить логику для обновления статуса на сервере
    };

    // Обработчик нажатия на кнопку "Редактировать"
    const handleEdit = () => {


    };

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
                    <h2>Информация о заявке #{ticket.id}</h2>

                    <Select
                        defaultValue={ticket.status} // Текущий статус заявки
                        style={{ width: 200, margin: 10 }}
                        onChange={handleStatusChange}
                    >
                        <Option value="Новая">Новая</Option>
                        <Option value="В работе">В работе</Option>
                        <Option value="Завершённая">Завершённая</Option>
                        <Option value="Отменённая">Отменённая</Option>
                    </Select>

                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Дата">{ticket.date}</Descriptions.Item>
                        <Descriptions.Item label="Статус">
                            <Tag color={statusColors[ticket.status]}>{ticket.status}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Приоритет">
                            <Tag
                                color={
                                    ticket.priority === 'Высокий'
                                        ? 'red'
                                        : ticket.priority === 'Средний'
                                            ? 'yellow'
                                            : 'green'
                                }
                            >
                                {ticket.priority}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Описание">{ticket.description}</Descriptions.Item>
                        <Descriptions.Item label="Назначена на">{ticket.assignedTo}</Descriptions.Item>
                        <Descriptions.Item label="Описание">{ticket.comments}</Descriptions.Item>
                    </Descriptions>


                    <div style={{ marginTop: '24px' }}>
                        <Link to="/tickets">
                            <Button type="primary">Вернуться к списку заявок</Button>
                        </Link>
                        <Link to={'/ticket/' + ticket.id +'/edit'}>
                        <Button type="primary" style={{marginLeft:'10px' }} onClick={handleEdit}>
                            Редактировать
                        </Button>
                            </Link>

                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Details;