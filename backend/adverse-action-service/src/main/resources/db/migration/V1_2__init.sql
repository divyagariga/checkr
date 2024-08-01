CREATE SCHEMA IF NOT EXISTS `bc_131_checkr_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bc_131_checkr_db` ;

CREATE TABLE IF NOT EXISTS `bc_131_checkr_db`.`adverse_action` (
  `id` INT NOT NULL,
  `status` VARCHAR(45) NULL,
  `notice_date` DATETIME NULL,
  `created_date` DATETIME NOT NULL,
  `updated_date` DATETIME NOT NULL,
  `candidate_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;