import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Tag, Button, Layout, Menu, theme, Select, message, Input } from 'antd';
import { Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DatabaseOutlined,
    FileAddOutlined,
} from '@ant-design/icons';
import axios from 'axios'; // Импортируем axios

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

// Цвета для тегов статусов
const statusColors = {
    Новая: 'blue',
    'В работе': 'orange',
    Завершённая: 'green',
    Отменённая: 'red',
};

const Edit = () => {
    const { ticketId } = useParams(); // Получаем ID заявки из URL
    const [collapsed, setCollapsed] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [comments, setComments] = useState('');
    const [ticket, setTicket] = useState(null); // Состояние для заявки
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Загрузка данных о заявке при монтировании компонента
    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/tickets/${ticketId}`);
                setTicket(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке заявки:', error);
                message.error('Не удалось загрузить заявку');
            }
        };

        fetchTicket();
    }, [ticketId]);

    // Обработчик изменения статуса
    const handleStatusChange = (value) => {
        setSelectedStatus(value);
    };

    // Обработчик изменения описания
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    // Обработчик изменения приоритета
    const handlePriorityChange = (value) => {
        setPriority(value);
    };

    // Обработчик изменения назначенного
    const handleAssignedToChange = (e) => {
        setAssignedTo(e.target.value);
    };

    // Обработчик изменения комментариев
    const handleCommentsChange = (e) => {
        setComments(e.target.value);
    };

    // Обработчик нажатия на кнопку "Редактировать"
    const handleEdit = async () => {
        const updatedTicket = {
            ...ticket,
            status: selectedStatus || ticket.status,
            description: description || ticket.description,
            priority: priority || ticket.priority,
            assignedTo: assignedTo || ticket.assignedTo,
            comments: comments || ticket.comments,
        };

        try {
            const response = await axios.put(`http://localhost:8080/tickets/${ticketId}`, updatedTicket);
            setTicket(response.data); // Обновляем состояние заявки
            message.success('Заявка успешно обновлена!');
        } catch (error) {
            console.error('Ошибка при обновлении заявки:', error);
            message.error('Не удалось обновить заявку');
        }
    };

    if (!ticket) {
        return <div>Загрузка...</div>;
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
                            label: <Link to="/">Главная</Link>,
                        },
                        {
                            key: '2',
                            icon: <DatabaseOutlined />,
                            label: <Link to="/tickets">Заявки</Link>,
                        },
                        {
                            key: '3',
                            icon: <FileAddOutlined />,
                            label: <Link to={'/create'}>Создать</Link>,
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

                    {/* Поле для изменения статуса */}
                    <div style={{ marginBottom: '16px' }}>
                        <h3>Статус:</h3>
                        <Select
                            defaultValue={ticket.status}
                            style={{ width: 200 }}
                            onChange={handleStatusChange}
                        >
                            <Option value="Новая">Новая</Option>
                            <Option value="В работе">В работе</Option>
                            <Option value="Завершённая">Завершённая</Option>
                            <Option value="Отменённая">Отменённая</Option>
                        </Select>
                    </div>

                    {/* Поле для изменения приоритета */}
                    <div style={{ marginBottom: '16px' }}>
                        <h3>Приоритет:</h3>
                        <Select
                            defaultValue={ticket.priority}
                            style={{ width: 200 }}
                            onChange={handlePriorityChange}
                        >
                            <Option value="Высокий">Высокий</Option>
                            <Option value="Средний">Средний</Option>
                            <Option value="Низкий">Низкий</Option>
                        </Select>
                    </div>

                    {/* Поле для изменения описания */}
                    <div style={{ marginBottom: '16px' }}>
                        <h3>Описание:</h3>
                        <TextArea
                            defaultValue={ticket.description}
                            onChange={handleDescriptionChange}
                            rows={4}
                        />
                    </div>

                    {/* Поле для изменения назначенного */}
                    <div style={{ marginBottom: '16px' }}>
                        <h3>Назначена на:</h3>
                        <Input
                            defaultValue={ticket.assignedTo}
                            onChange={handleAssignedToChange}
                        />
                    </div>

                    {/* Поле для изменения комментариев */}
                    <div style={{ marginBottom: '16px' }}>
                        <h3>Комментарии:</h3>
                        <TextArea
                            defaultValue={ticket.comments}
                            onChange={handleCommentsChange}
                            rows={4}
                        />
                    </div>

                    {/* Кнопки */}
                    <div style={{ marginTop: '24px' }}>
                        <Link to="/tickets">
                            <Button type="primary">Вернуться к списку заявок</Button>
                        </Link>
                        <Button type="primary" style={{ marginLeft: '10px' }} onClick={handleEdit}>
                            Сохранить
                        </Button>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Edit;