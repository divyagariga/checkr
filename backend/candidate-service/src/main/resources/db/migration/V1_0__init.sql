CREATE SCHEMA IF NOT EXISTS `bc_131_checkr_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `bc_131_checkr_db` ;

CREATE TABLE IF NOT EXISTS `bc_131_checkr_db`.`user` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NULL,
  `created_date` DATETIME NOT NULL,
  `updated_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `bc_131_checkr_db`.`forgot_password_otp` (
  `id` INT NOT NULL,
  `otp` VARCHAR(45) NULL,
  `user_id` INT NOT NULL COMMENT '	',
  `created_date` DATETIME NOT NULL,
  `updated_date` DATETIME NOT NULL,
  `expiry_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_reset_password_1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_reset_password_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `bc_131_checkr_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;