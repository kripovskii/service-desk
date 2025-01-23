package main

import (
	"bufio"
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"log"
	"os"
	"sd/models"
	"sd/storage"
)

func main() {
	// Инициализация базы данных
	connString := "admin:admin@tcp(localhost:3306)/ticket_db?parseTime=true"
	if err := storage.InitDB(connString); err != nil {
		log.Fatalf("Ошибка при подключении к базе данных: %v", err)
	}

	// Ввод данных пользователя
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Введите имя пользователя: ")
	username, _ := reader.ReadString('\n')
	username = username[:len(username)-1] // Убираем символ новой строки

	fmt.Print("Введите пароль: ")
	password, _ := reader.ReadString('\n')
	password = password[:len(password)-1] // Убираем символ новой строки

	// Хеширование пароля
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Ошибка при хешировании пароля: %v", err)
	}

	// Создание пользователя
	user := models.User{
		Username:     username,
		PasswordHash: string(hashedPassword),
	}

	if err := storage.CreateUser(&user); err != nil {
		log.Fatalf("Ошибка при создании пользователя: %v", err)
	}

	fmt.Println("Пользователь успешно создан!")
}
