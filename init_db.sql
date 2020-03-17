-- MySQL Script generated by MySQL Workbench
-- Sat Mar  7 22:31:54 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema university
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema university
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `university` DEFAULT CHARACTER SET utf8 ;
USE `university` ;

-- -----------------------------------------------------
-- Table `university`.`user_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university`.`user_roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `university`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `university`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `role_id` INT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `patronymic` VARCHAR(45) NULL,
  `group_id` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `FK_USER_ROLE_ID_idx` (`role_id` ASC) VISIBLE,
  INDEX `FK_GROUP_ID_idx` (`group_id` ASC) VISIBLE,
  CONSTRAINT `FK_USER_ROLE_ID`
    FOREIGN KEY (`role_id`)
    REFERENCES `university`.`user_roles` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_GROUP_ID`
    FOREIGN KEY (`group_id`)
    REFERENCES `university`.`groups` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `university`.`disciplines`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university`.`disciplines` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `university`.`subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university`.`subjects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `disciplines_id` INT NOT NULL,
  `group_id` INT NOT NULL,
  `teacher_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_GROUP_ID_idx` (`group_id` ASC) VISIBLE,
  INDEX `FK_DISCIPLINE_ID_idx` (`disciplines_id` ASC) VISIBLE,
  INDEX `FK_USER_ID_idx` (`teacher_id` ASC) VISIBLE,
  CONSTRAINT `FK_SUBJECT_GROUP_ID`
    FOREIGN KEY (`group_id`)
    REFERENCES `university`.`groups` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_SUBJECT_DISCIPLINE_ID`
    FOREIGN KEY (`disciplines_id`)
    REFERENCES `university`.`disciplines` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_SUBJECT_USER_ID`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `university`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `university`.`journal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university`.`journal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subject_id` INT NOT NULL,
  `mark` INT NULL,
  `truancy` INT NULL,
  `comment` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_USER_ID_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK_USER_ID`
    FOREIGN KEY (`user_id`)
    REFERENCES `university`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;