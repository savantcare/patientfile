use sc_goal;
-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 26, 2020 at 09:20 AM
-- Server version: 10.4.13-MariaDB-1:10.4.13+maria~bionic
-- PHP Version: 7.4.5
--
-- Database: `sc_goal`
--

-- --------------------------------------------------------

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;

CREATE TABLE `goals` (
  `uuid` char(36) NOT NULL,
  `patientUUID` char(36) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `priority` int(11) DEFAULT 0,
  `discontinuedNotes` varchar(255) DEFAULT NULL,
  `recordChangedByUUID` char(36) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL,
  `recordChangedFromSection` varchar(255) DEFAULT 'patientFile',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

