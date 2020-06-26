-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2020 at 07:26 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sc_component`
--

-- --------------------------------------------------------

--
-- Table structure for table `components`
--

CREATE TABLE `componentMaster` (
  `uuid` char(36) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `recordChangedByUUID` CHAR(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

--
-- Dumping data for table `components`
--

INSERT INTO `componentMaster` (`uuid`, `tag`, `name`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
(1, "health", 'recommendation', '1', '202.005.122.057'),
(2, "other", 'reminder', '2', '202.005.122.057'),
(3, "health", 'other', '3', '202.005.122.057');

--
-- Indexes for dumped tables
--

