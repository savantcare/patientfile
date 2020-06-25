-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 07, 2020 at 09:22 PM
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
-- Database: `sc_user`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `componentsAllowedToAccess` varchar(255) DEFAULT NULL,
  `multiStateDisplayAreaComponentLoadSequence` varchar(255) NOT NULL,
  `currentStateDisplayAreaComponentLoadSequence` varchar(255) NOT NULL,
  `recordChangedByUUID` CHAR(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`uuid`, `name`, `componentsAllowedToAccess`, `multiStateDisplayAreaComponentLoadSequence`, `currentStateDisplayAreaComponentLoadSequence`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('897d25c6-2c84-47fe-9236-2c3cc9c70bdf', 'Doctor', 'Rex,Rem,Shx,Goal,Dx,Fh,s', 'Rex,Rem', 'Rex', '1', '1'),
('ae0ae9e7-545a-4783-ac83-84786839dcc1', 'Patient', NULL, '0', '0',  '1', '1'),
('ae2f20c1-448b-4df0-b221-9b4c3d411f59', 'Doctor admin assistant', 'Shx, Policies,Rem', 'Shx,Rem', 'Rex', '1', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
