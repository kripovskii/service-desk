package storage

import (
	"sd/models"
	"sync"
)

// InMemoryStorage хранит заявки в памяти
type InMemoryStorage struct {
	mu      sync.RWMutex
	tickets map[string]models.Ticket
}

// NewInMemoryStorage создает новый экземпляр InMemoryStorage
func NewInMemoryStorage() *InMemoryStorage {
	return &InMemoryStorage{
		tickets: make(map[string]models.Ticket),
	}
}

// CreateTicket добавляет новую заявку
func (s *InMemoryStorage) CreateTicket(ticket models.Ticket) {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.tickets[ticket.ID] = ticket
}

// GetTicket возвращает заявку по ID
func (s *InMemoryStorage) GetTicket(id string) (models.Ticket, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	ticket, exists := s.tickets[id]
	return ticket, exists
}

// GetAllTickets возвращает все заявки
func (s *InMemoryStorage) GetAllTickets() []models.Ticket {
	s.mu.RLock()
	defer s.mu.RUnlock()
	tickets := make([]models.Ticket, 0, len(s.tickets))
	for _, ticket := range s.tickets {
		tickets = append(tickets, ticket)
	}
	return tickets
}

// UpdateTicket обновляет заявку
func (s *InMemoryStorage) UpdateTicket(id string, updatedTicket models.Ticket) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, exists := s.tickets[id]; exists {
		s.tickets[id] = updatedTicket
		return true
	}
	return false
}

// DeleteTicket удаляет заявку
func (s *InMemoryStorage) DeleteTicket(id string) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, exists := s.tickets[id]; exists {
		delete(s.tickets, id)
		return true
	}
	return false
}
