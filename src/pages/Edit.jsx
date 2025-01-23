import React, { useState } from 'react';
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

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

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

const Edit = () => {
    const { ticketId } = useParams(); // Получаем ID заявки из URL
    const [collapsed, setCollapsed] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(''); // Состояние для выбранного статуса
    const [description, setDescription] = useState(''); // Состояние для описания
    const [priority, setPriority] = useState(''); // Состояние для приоритета
    const [assignedTo, setAssignedTo] = useState(''); // Состояние для назначенного
    const [comments, setComments] = useState(''); // Состояние для комментариев
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
    const handleEdit = () => {
        if (selectedStatus) ticket.status = selectedStatus;
        if (description) ticket.description = description;
        if (priority) ticket.priority = priority;
        if (assignedTo) ticket.assignedTo = assignedTo;
        if (comments) ticket.comments = comments;

        message.success('Заявка успешно обновлена!');
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

                    {/* Поле для изменения статуса */}
                    <div style={{ marginBottom: '16px' }}>
                        <h3>Статус:</h3>
                        <Select
                            defaultValue={ticket.status} // Текущий статус заявки
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
                            defaultValue={ticket.priority} // Текущий приоритет заявки
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
                            defaultValue={ticket.description} // Текущее описание заявки
                            onChange={handleDescriptionChange}
                            rows={4}
                        />
                    </div>

                    {/* Поле для изменения назначенного */}
                    <div style={{ marginBottom: '16px' }}>
                        <h3>Назначена на:</h3>
                        <Input
                            defaultValue={ticket.assignedTo} // Текущий назначенный
                            onChange={handleAssignedToChange}
                        />
                    </div>

                    {/* Поле для изменения комментариев */}
                    <div style={{ marginBottom: '16px' }}>
                        <h3>Описание:</h3>
                        <TextArea
                            defaultValue={ticket.comments} // Текущие комментарии
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