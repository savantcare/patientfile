-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 24, 2020 at 03:00 PM
-- Server version: 10.4.13-MariaDB-1:10.4.13+maria~bionic
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `sc_documents`
--

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `UUID` varchar(36) NOT NULL,
  `uploadUUID` varchar(36) NOT NULL,
  `fileContent` longblob DEFAULT NULL,
  `fileName` text DEFAULT NULL,
  `fileType` varchar(128) NOT NULL,
  `recordChangedByUUID` varchar(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`UUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;
-- --------------------------------------------------------

--
-- Table structure for table `documentsTemp`
--

CREATE TABLE `documentsTemp` (
  `tempUUID` varchar(128) NOT NULL,
  `fileContent` longblob DEFAULT NULL,
  `fileName` text DEFAULT NULL,
  `fileType` varchar(128) NOT NULL,
  `recordChangedByUUID` varchar(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`tempUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;

-- --------------------------------------------------------

--
-- Table structure for table `documentUploadFolder`
--

CREATE TABLE `documentUploadFolder` (
  `uploadUUID` varchar(36) NOT NULL,
  `patientUUID` varchar(36) NOT NULL,
  `folderName` varchar(255) NOT NULL,
  `label` enum('Other','Cures report','Lab Results','Lab Order','Disability Paperwork','Legal Paperwork (Subpoena etc)','Official Letters','ROI (External & Internal)','Medical Records','Prior Auth (Request & Approval)','Policy') NOT NULL DEFAULT 'Other',
  `docStatus` enum('saved','draft') NOT NULL DEFAULT 'draft',
  `recordChangedByUUID` varchar(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uploadUUID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;