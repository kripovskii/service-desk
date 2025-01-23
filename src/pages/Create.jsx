import React, { useState } from 'react';
import { Button, Layout, Menu, theme, Select, Input, message, Upload, Flex } from 'antd';
import { Link } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    DatabaseOutlined,
    FileAddOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const CreateTicket = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [status, setStatus] = useState('Новая'); // Состояние для статуса
    const [priority, setPriority] = useState('Средний'); // Состояние для приоритета
    const [description, setDescription] = useState(''); // Состояние для описания
    const [comments, setComments] = useState(''); // Состояние для комментариев
    const [fileList, setFileList] = useState([]); // Состояние для загруженных файлов
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Обработчик изменения статуса
    const handleStatusChange = (value) => {
        setStatus(value);
    };

    // Обработчик изменения приоритета
    const handlePriorityChange = (value) => {
        setPriority(value);
    };

    // Обработчик изменения описания
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    // Обработчик изменения комментариев
    const handleCommentsChange = (e) => {
        setComments(e.target.value);
    };

    // Обработчик загрузки файлов
    const handleFileUpload = ({ fileList }) => {
        setFileList(fileList);
    };

    // Обработчик создания заявки
    const handleCreateTicket = () => {
        if (!description) {
            message.error('Заполните обязательные поля: Описание.');
            return;
        }

        // Создаем новую заявку
        const newTicket = {
            id: String(Math.floor(Math.random() * 1000)), // Генерация случайного ID
            date: new Date().toISOString().split('T')[0], // Текущая дата
            status,
            description,
            priority,
            comments,
            files: fileList.map((file) => file.name), // Сохраняем имена файлов
        };

        // Здесь можно добавить логику для отправки данных на сервер
        console.log('Новая заявка:', newTicket);
        message.success('Заявка успешно создана!');

        // Очистка полей после создания
        setStatus('Новая');
        setPriority('Средний');
        setDescription('');
        setComments('');
        setFileList([]);
    };

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['3']} // Выделяем пункт "Создать"
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
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <h2>Создание новой заявки</h2>

                    {/* Статус и приоритет на одной линии */}
                    <Flex gap={16} style={{ marginBottom: '10px' }}>
                        <div>
                            <h3>Статус:</h3>
                            <Select
                                defaultValue={status}
                                style={{ width: 200 }}
                                onChange={handleStatusChange}
                            >
                                <Option value="Новая">Новая</Option>
                                <Option value="В работе">В работе</Option>
                                <Option value="Завершённая">Завершённая</Option>
                                <Option value="Отменённая">Отменённая</Option>
                            </Select>
                        </div>
                        <div>
                            <h3>Приоритет:</h3>
                            <Select
                                defaultValue={priority}
                                style={{ width: 200 }}
                                onChange={handlePriorityChange}
                            >
                                <Option value="Высокий">Высокий</Option>
                                <Option value="Средний">Средний</Option>
                                <Option value="Низкий">Низкий</Option>
                            </Select>
                        </div>
                    </Flex>

                    {/* Поле для ввода описания */}
                    <div style={{ marginBottom: '16px' }}>
                        <h3>Тема:</h3>
                        <TextArea
                            value={description}
                            onChange={handleDescriptionChange}
                            rows={1}
                            placeholder="Введите описание заявки"
                        />
                    </div>

                    {/* Поле для ввода комментариев */}
                    <div style={{ marginBottom: '16px' }}>
                        <h3>Описание:</h3>
                        <TextArea
                            value={comments}
                            onChange={handleCommentsChange}
                            rows={2}
                            placeholder="Введите комментарии"
                        />
                    </div>



                    {/* Поле для загрузки файлов (Drag and Drop) */}
                    <div style={{ marginBottom: '16px' }}>
                        <h3>Загрузить файлы:</h3>
                        <Dragger
                            multiple
                            fileList={fileList}
                            onChange={handleFileUpload}
                            beforeUpload={() => false} // Отключаем автоматическую загрузку

                        >
                            <p className="ant-upload-drag-icon">
                                <UploadOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Перетащите файлы сюда или нажмите для выбора
                            </p>
                        </Dragger>
                    </div>

                    {/* Кнопки */}
                    <div style={{ marginTop: '24px' }}>
                        <Link to="/tickets">
                            <Button type="primary">Вернуться к списку заявок</Button>
                        </Link>
                        <Button
                            type="primary"
                            style={{ marginLeft: '10px' }}
                            onClick={handleCreateTicket}
                        >
                            Создать заявку
                        </Button>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default CreateTicket;