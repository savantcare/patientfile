-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 22, 2020 at 10:46 PM
-- Server version: 10.4.13-MariaDB-1:10.4.13+maria~bionic
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sc_appointments`
--

-- --------------------------------------------------------

--
-- Table structure for table `patientAppointments`
--

CREATE TABLE `patientAppointments` (
  `uuid` varchar(64) NOT NULL,
  `patientUUID` varchar(64) DEFAULT NULL,
  `providerUUID` varchar(64) DEFAULT NULL,
  `dateTimeOfAppt` datetime DEFAULT NULL,
  `stateOfAppt` enum('apptScheduled','apptCancelled','apptNoteNotLocked','apptNoteLocked') DEFAULT NULL,
  `recordChangedByUUID` varchar(64) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(20) DEFAULT '',
   PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

