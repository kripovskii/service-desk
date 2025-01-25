import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Стили для контейнера с видео-фоном
const AuthContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100vh;
    position: relative;
    overflow: hidden;
`;

// Стили для видео-фона
const VideoBackground = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`;

// Стили для карточки авторизации
const AuthCard = styled(Card)`
    width: 100%;
    max-width: 400px;
    height: 500px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 50px;
    background: rgba(255, 255, 255, 1.0);
    border-radius: 10px;

    .ant-card-head-title {
        font-size: 32px;
        color: #1890ff;
    }
`;

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            // Отправляем данные для входа на сервер
            const response = await axios.post('http://localhost:8080/login', {
                username: values.username,
                password: values.password,
            });

            // Сохраняем токен в localStorage
            const token = response.data.token;
            localStorage.setItem('token', token);

            // Уведомляем пользователя об успешном входе
            message.success('Успешный вход!');

            // Перенаправляем пользователя на главную страницу
            navigate('/');
        } catch (error) {
            console.error('Ошибка при входе:', error);
            message.error('Неверный логин или пароль');
        }
    };

    return (
        <AuthContainer>
            {/* Видео-фон */}
            <VideoBackground autoPlay loop muted>
                <source src="/public/login.mp4" type="video/mp4" />
            </VideoBackground>

            {/* Карточка авторизации */}
            <AuthCard title="TaskII" style={{ fontFamily: 'monospace' }}>
                <Form
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш логин!' }]}
                    >
                        <Input placeholder="Логин" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
                    >
                        <Input.Password placeholder="Пароль" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </AuthCard>
        </AuthContainer>
    );
};

export default LoginPage;