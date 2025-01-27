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
import axios from 'axios';

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
    const [loading, setLoading] = useState(false); // Состояние для индикатора загрузки
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
    const handleCreateTicket = async () => {
        if (!description) {
            message.error('Заполните обязательные поля: Описание.');
            return;
        }

        const token = localStorage.getItem('token'); // Получаем токен из localStorage
        if (!token) {
            message.error('Требуется вход в систему');
            return;
        }

        setLoading(true); // Включаем индикатор загрузки

        try {
            const formData = new FormData();

            // Добавляем данные заявки в FormData
            formData.append('status', status);
            formData.append('description', description);
            formData.append('priority', priority);
            formData.append('comments', comments);

            // Добавляем файлы в FormData
            fileList.forEach((file) => {
                formData.append('files', file.originFileObj);
            });

            // Отправляем данные на сервер
            const response = await axios.post('http://localhost:8080/tickets', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            message.success('Заявка успешно создана!');
            console.log('Ответ сервера:', response.data);

            // Очистка полей после успешного создания
            setStatus('Новая');
            setPriority('Средний');
            setDescription('');
            setComments('');
            setFileList([]);
        } catch (error) {
            console.error('Ошибка при создании заявки:', error);
            if (error.response) {
                // Ошибка от сервера
                message.error(`Ошибка: ${error.response.data}`);
            } else {
                // Ошибка сети или другая ошибка
                message.error('Не удалось создать заявку');
            }
        } finally {
            setLoading(false); // Выключаем индикатор загрузки
        }
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
                            loading={loading} // Индикатор загрузки
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