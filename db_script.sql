CREATE DATABASE `bc_131_checkr_db`;
use `bc_131_checkr_db`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `forgot_password_otp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `otp` varchar(45) DEFAULT NULL,
  `user_id` int NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_reset_password_1_idx` (`user_id`),
  CONSTRAINT `fk_reset_password_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `candidate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `date_of_birth` datetime DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `zipcode` int DEFAULT NULL,
  `social_security_number` varchar(45) DEFAULT NULL,
  `driver_license` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `court_search` (
  `id` int NOT NULL AUTO_INCREMENT,
  `violation` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `candidate_id` int NOT NULL,
  `completed_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_court_search_candidate1_idx` (`candidate_id`),
  CONSTRAINT `fk_court_search_candidate1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `adjudication` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `package` varchar(45) DEFAULT NULL,
  `turn_around_time` varchar(45) DEFAULT NULL,
  `candidate_id` int NOT NULL,
  `completed_at` datetime(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `package_type` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_report_candidate1_idx` (`candidate_id`),
  CONSTRAINT `fk_report_candidate1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `adverse_action` (
  `id` int NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `notice_date` datetime DEFAULT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL,
  `candidate_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

