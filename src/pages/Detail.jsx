import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Tag, Button, Layout, Menu, theme, Select, message, Spin } from 'antd';
import { Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DatabaseOutlined,
    FileAddOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

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
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('');
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Загрузка данных о заявке
    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const token = localStorage.getItem('token'); // Получаем токен из localStorage
                const response = await axios.get(`http://localhost:8080/tickets/${ticketId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTicket(response.data);
                setSelectedStatus(response.data.status); // Устанавливаем текущий статус
            } catch (error) {
                console.error('Ошибка при загрузке заявки:', error);
                message.error('Не удалось загрузить данные о заявке');
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [ticketId]);

    // Обработчик изменения статуса
    const handleStatusChange = async (value) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:8080/tickets/${ticketId}`,
                { status: value },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSelectedStatus(value);
            message.success('Статус заявки успешно обновлен');
        } catch (error) {
            console.error('Ошибка при обновлении статуса:', error);
            message.error('Не удалось обновить статус заявки');
        }
    };

    if (loading) {
        return <Spin size="large" />;
    }

    if (!ticket) {
        return <div>Заявка не найдена</div>;
    }

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
                    <h2>Информация о заявке #{ticket.id}</h2>

                    {/* Выбор статуса */}
                    <Select
                        value={selectedStatus}
                        style={{ width: 200, margin: 10 }}
                        onChange={handleStatusChange}
                    >
                        <Option value="Новая">Новая</Option>
                        <Option value="В работе">В работе</Option>
                        <Option value="Завершённая">Завершённая</Option>
                        <Option value="Отменённая">Отменённая</Option>
                    </Select>

                    {/* Детали заявки */}
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
                        <Descriptions.Item label="Комментарии">{ticket.comments}</Descriptions.Item>
                    </Descriptions>

                    {/* Кнопки */}
                    <div style={{ marginTop: '24px' }}>
                        <Link to="/tickets">
                            <Button type="primary">Вернуться к списку заявок</Button>
                        </Link>
                        <Link to={`/ticket/${ticket.id}/edit`}>
                            <Button type="primary" style={{ marginLeft: '10px' }}>
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