CREATE SCHEMA IF NOT EXISTS `bc_131_checkr_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bc_131_checkr_db` ;

CREATE TABLE IF NOT EXISTS `bc_131_checkr_db`.`candidate` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `location` VARCHAR(45) NULL,
  `created_date` DATETIME NOT NULL,
  `updated_date` DATETIME NOT NULL,
  `date_of_birth` DATETIME NULL,
  `phone` INT NULL,
  `zipcode` INT NULL,
  `social_security_number` VARCHAR(45) NULL,
  `driver_license` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `bc_131_checkr_db`.`court_search` (
  `id` INT NOT NULL,
  `violation` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `created_date` DATETIME NOT NULL,
  `updated_date` DATETIME NOT NULL,
  `candidate_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_court_search_candidate1_idx` (`candidate_id` ASC) VISIBLE,
  CONSTRAINT `fk_court_search_candidate1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `bc_131_checkr_db`.`candidate` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `bc_131_checkr_db`.`report` (
  `id` INT NOT NULL,
  `adjudication` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  `created_date` DATETIME NOT NULL,
  `completed_date` DATETIME NOT NULL,
  `updated_date` DATETIME NOT NULL,
  `package` VARCHAR(45) NULL,
  `turn_around_time` DATETIME NULL,
  `candidate_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_report_candidate1_idx` (`candidate_id` ASC) VISIBLE,
  CONSTRAINT `fk_report_candidate1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `bc_131_checkr_db`.`candidate` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
