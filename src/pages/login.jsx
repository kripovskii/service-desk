import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import styled from 'styled-components';

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
    object-fit: cover; /* Обеспечивает покрытие всего фона */
    z-index: -1; /* Отправляем видео на задний план */
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
    margin-right: 50px; /* Отступ справа */
    background: rgba(255, 255, 255, 1.0); /* Полупрозрачный белый фон */
    border-radius: 10px; /* Закругленные углы */
    
    .ant-card-head-title {
        font-size: 32px; /* Увеличиваем размер заголовка */
        
        color: #1890ff; /* Цвет заголовка */
    }
`;

const LoginPage = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        // Здесь можно добавить логику для авторизации
    };

    return (
        <AuthContainer>
            {/* Видео-фон */}
            <VideoBackground autoPlay loop muted>
                <source src="/public/login.mp4" type="video/mp4" />
            </VideoBackground>

            {/* Карточка авторизации */}
            <AuthCard title="TaskII" style={{fontFamily: 'monospace'}}>
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