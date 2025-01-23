package models

import (
	"github.com/golang-jwt/jwt/v5"
	"time"
)

type Ticket struct {
	ID          string    `json:"id"`
	Date        time.Time `json:"date"`
	Status      string    `json:"status"`
	Description string    `json:"description"`
	Priority    string    `json:"priority"`
	AssignedTo  string    `json:"assignedTo"`
	Comments    string    `json:"comments"`
	Files       []string  `json:"files"`
	UserID      int       `json:"userId"`
}
type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}
