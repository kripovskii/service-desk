package main

import (
	"log"
	"net/http"
	"sd/handlers"
	"sd/middleware"
	"sd/storage"
)

func main() {
	// Инициализация базы данных
	connString := "admin:admin@tcp(localhost:3306)/ticket_db?parseTime=true"
	if err := storage.InitDB(connString); err != nil {
		log.Fatalf("Ошибка при подключении к базе данных: %v", err)
	}

	// Регистрация маршрутов
	http.HandleFunc("/register", handlers.RegisterHandler)
	http.HandleFunc("/login", handlers.LoginHandler)

	// Защищенные маршруты
	http.Handle("/tickets", middleware.AuthMiddleware(http.HandlerFunc(handlers.TicketsHandler)))
	http.Handle("/tickets/", middleware.AuthMiddleware(http.HandlerFunc(handlers.TicketHandler)))

	// Запуск сервера
	log.Println("Сервер запущен на http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
