package handlers

import (
	"encoding/json"
	"net/http"
	"sd/models"
	"sd/storage"
	"strings"
	"time"

	"github.com/google/uuid"
)

var storageInstance = storage.NewInMemoryStorage()

// TicketsHandler обрабатывает запросы к /tickets
func TicketsHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		getAllTickets(w, r)
	case http.MethodPost:
		createTicket(w, r)
	default:
		http.Error(w, "Метод не поддерживается", http.StatusMethodNotAllowed)
	}
}

// TicketHandler обрабатывает запросы к /tickets/:id
func TicketHandler(w http.ResponseWriter, r *http.Request) {
	id := strings.TrimPrefix(r.URL.Path, "/tickets/")
	switch r.Method {
	case http.MethodGet:
		getTicketByID(w, r, id)
	case http.MethodPut:
		updateTicket(w, r, id)
	case http.MethodDelete:
		deleteTicket(w, r, id)
	default:
		http.Error(w, "Метод не поддерживается", http.StatusMethodNotAllowed)
	}
}

// getAllTickets возвращает все заявки
func getAllTickets(w http.ResponseWriter, r *http.Request) {
	tickets := storageInstance.GetAllTickets()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tickets)
}

// createTicket создает новую заявку
func createTicket(w http.ResponseWriter, r *http.Request) {
	var ticket models.Ticket
	if err := json.NewDecoder(r.Body).Decode(&ticket); err != nil {
		http.Error(w, "Неверный формат данных", http.StatusBadRequest)
		return
	}

	// Генерация ID и даты
	ticket.ID = uuid.New().String()
	ticket.Date = time.Now()

	// Сохранение заявки
	storageInstance.CreateTicket(ticket)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(ticket)
}

// getTicketByID возвращает заявку по ID
func getTicketByID(w http.ResponseWriter, r *http.Request, id string) {
	ticket, exists := storageInstance.GetTicket(id)
	if !exists {
		http.Error(w, "Заявка не найдена", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ticket)
}

// updateTicket обновляет заявку
func updateTicket(w http.ResponseWriter, r *http.Request, id string) {
	var updatedTicket models.Ticket
	if err := json.NewDecoder(r.Body).Decode(&updatedTicket); err != nil {
		http.Error(w, "Неверный формат данных", http.StatusBadRequest)
		return
	}

	updatedTicket.ID = id
	if success := storageInstance.UpdateTicket(id, updatedTicket); !success {
		http.Error(w, "Заявка не найдена", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedTicket)
}

// deleteTicket удаляет заявку
func deleteTicket(w http.ResponseWriter, r *http.Request, id string) {
	if success := storageInstance.DeleteTicket(id); !success {
		http.Error(w, "Заявка не найдена", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
