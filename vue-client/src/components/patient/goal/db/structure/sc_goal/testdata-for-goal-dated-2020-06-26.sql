-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 26, 2020 at 10:08 AM
-- Server version: 10.4.13-MariaDB-1:10.4.13+maria~bionic
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `sc_goal`
--

--
-- Dumping data for table `goals`
--

INSERT INTO `goals` (`uuid`, `patientUUID`, `description`, `startDate`, `score`, `priority`, `discontinuedNotes`, `recordChangedByUUID`, `recordChangedFromIPAddress`, `recordChangedFromSection`) VALUES
('796c1229-1459-4889-a317-f57acec03726', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 'know more about meditation', NULL, NULL, 0, NULL, '1', NULL, 'patientFile'),
('de362ff3-4fd1-4e6b-812e-b1923faab39c', 'bfe041fa-073b-4223-8c69-0540ee678ff8', 'second goal for testing', NULL, NULL, 0, NULL, '1', NULL, 'patientFile');
COMMIT;
