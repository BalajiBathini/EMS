package net.javaproject.ems;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnectionCheck {
    public static void main(String[] args) {
        // Database connection parameters
        String url = "jdbc:postgresql://localhost:5432/ems";
        String user = "postgres";
        String password = "rishi18";

        Connection connection = null;

        try {
            // Establishing the connection
            connection = DriverManager.getConnection(url, user, password);
            if (connection != null) {
                System.out.println("Connection to the database was successful!");
            }
        } catch (SQLException e) {
            System.out.println("Connection to the database failed!");
            e.printStackTrace();
        } finally {
            // Close the connection
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
