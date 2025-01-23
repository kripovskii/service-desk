package storage

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"sd/models"
)

var db *sql.DB

// InitDB инициализирует подключение к MySQL
func InitDB(connString string) error {
	var err error
	db, err = sql.Open("mysql", connString)
	if err != nil {
		return err
	}
	return db.Ping()
}

// CreateUser создает нового пользователя
func CreateUser(user *models.User) error {
	_, err := db.Exec(
		"INSERT INTO users (username, password_hash) VALUES (?, ?)",
		user.Username, user.PasswordHash,
	)
	return err
}

// GetUserByUsername возвращает пользователя по имени
func GetUserByUsername(username string) (*models.User, error) {
	var user models.User
	err := db.QueryRow(
		"SELECT id, username, password_hash FROM users WHERE username = ?",
		username,
	).Scan(&user.ID, &user.Username, &user.PasswordHash)
	return &user, err
}

// CreateTicket создает новую заявку
func CreateTicket(ticket *models.Ticket) error {
	_, err := db.Exec(
		"INSERT INTO tickets (id, date, status, description, priority, assigned_to, comments, files, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
		ticket.ID, ticket.Date, ticket.Status, ticket.Description, ticket.Priority, ticket.AssignedTo, ticket.Comments, ticket.Files, ticket.UserID,
	)
	return err
}
