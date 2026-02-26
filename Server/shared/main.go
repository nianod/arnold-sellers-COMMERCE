package main
import "fmt"

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	AdminID   string `bson:"adminId"`
	Password  string `bson:"password"`
	Role      string `bson:"role"`
	CreatedAt time.Time `bson:"createdAt"`
}

func main() {
	if err := seedAdmin(); err != nil {
		log.Fatal("Seed failed:", err)
	}
}

func seedAdmin() error {
	 
	mongoURL := os.Getenv("MONGO_URL")
	adminID := os.Getenv("ADMIN_ID")
	adminPassword := os.Getenv("ADMIN_PASSWORD")

	if mongoURL == "" || adminID == "" || adminPassword == "" {
		return fmt.Errorf("missing required env vars")
	}

	 
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(mongoURL))
	if err != nil {
		return fmt.Errorf("mongo connect: %w", err)
	}
	defer client.Disconnect(context.Background())

	db := client.Database("ecommerce-db") 
	usersCollection := db.Collection("users")
 
	var existing User
	err = usersCollection.FindOne(context.Background(), bson.M{"role": "admin"}).Decode(&existing)
	if err == nil {
		log.Println("Admin already exists")
		return nil
	}

	 
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(adminPassword), 10)
	if err != nil {
		return fmt.Errorf("bcrypt hash: %w", err)
	}

	 
	adminUser := User{
		AdminID:   adminID,
		Password:  string(hashedPassword),
		Role:      "admin",
		CreatedAt: time.Now(),
	}

	_, err = usersCollection.InsertOne(context.Background(), adminUser)
	if err != nil {
		return fmt.Errorf("create admin: %w", err)
	}

	log.Println("Admin created successfully")
	return nil
}
