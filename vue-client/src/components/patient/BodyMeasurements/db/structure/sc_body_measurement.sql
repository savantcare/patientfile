-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 11, 2020 at 01:29 AM
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
-- Database: `sc_body_measurement`
--

-- --------------------------------------------------------

--
-- Table structure for table `bodyMeasurementBloodPressure`
--

CREATE TABLE `bloodPressure` (
  `uuid` varchar(64) NOT NULL,
  `patientUUID` varchar(64) DEFAULT NULL,
  `systolicValue` int(11) NOT NULL COMMENT 'mm Hg',
  `diastolicValue` int(11) NOT NULL COMMENT 'mm Hg',
  `measurementDate` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUUID` varchar(64) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bodyMeasurementBloodSugar`
--

CREATE TABLE `bloodSugar` (
  `uuid` varchar(64) NOT NULL,
  `patientUUID` varchar(64) DEFAULT NULL,
  `bloodSugar` int(11) NOT NULL,
  `relationToMeal` enum('Before breakfast','After breakfast','Before lunch','After lunch','Before dinner','After dinner','Bed time','Other') NOT NULL,
  `measurementDate` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUUID` varchar(64) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bodyMeasurementBMI`
--

CREATE TABLE `BMI` (
  `uuid` varchar(64) NOT NULL,
  `patientUUID` varchar(64) DEFAULT NULL,
  `bmiValue` decimal(10,2) NOT NULL,
  `measurementDate` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUUID` varchar(64) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bodyMeasurementHeight`
--

CREATE TABLE `height` (
  `uuid` varchar(64) NOT NULL,
  `patientUUID` varchar(64) DEFAULT NULL,
  `heightInInch` int(4) NOT NULL,
  `measurementDate` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUUID` varchar(64) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bodyMeasurementOxygenSaturation`
--

CREATE TABLE `oxygenSaturation` (
  `uuid` varchar(64) NOT NULL,
  `patientUUID` varchar(64) DEFAULT NULL,
  `oxygenSaturation` int(11) NOT NULL,
  `measurementDate` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUUID` varchar(64) DEFAULT NULL,
  `recordChangedOnDateTime` datetime DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bodyMeasurementPulse`
--

CREATE TABLE `pulse` (
  `uuid` varchar(64) NOT NULL,
  `patientUUID` varchar(64) DEFAULT NULL,
  `beatsPerMinuteValue` int(4) NOT NULL,
  `measurementDate` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUUID` varchar(64) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bodyMeasurementTemperature`
--

CREATE TABLE `temperature` (
  `uuid` varchar(64) NOT NULL,
  `patientUUID` varchar(64) DEFAULT NULL,
  `temperatureInFarehnite` decimal(10,0) NOT NULL,
  `measurementDate` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUUID` varchar(64) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bodyMeasurementWaistCircumference`
--

CREATE TABLE `waistCircumference` (
  `uuid` varchar(64) NOT NULL,
  `patientUUID` varchar(64) DEFAULT NULL,
  `waistCircumferenceInInches` decimal(10,2) NOT NULL,
  `measurementDate` date NOT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUUID` varchar(64) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `bodyMeasurementWeight`
--

CREATE TABLE `weight` (
  `uuid` varchar(64) NOT NULL,
  `patientUUID` varchar(64) DEFAULT NULL,
  `weightInPounds` decimal(10,2) NOT NULL,
  `measurementDate` date DEFAULT NULL,
  `Notes` text DEFAULT NULL,
  `recordChangedByUUID` varchar(64) DEFAULT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bodyMeasurementBloodPressure`
--
ALTER TABLE `bloodPressure`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `bodyMeasurementBloodSugar`
--
ALTER TABLE `bloodSugar`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `bodyMeasurementBMI`
--
ALTER TABLE `BMI`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `bodyMeasurementHeight`
--
ALTER TABLE `height`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `bodyMeasurementOxygenSaturation`
--
ALTER TABLE `oxygenSaturation`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `bodyMeasurementPulse`
--
ALTER TABLE `pulse`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `bodyMeasurementTemperature`
--
ALTER TABLE `temperature`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `bodyMeasurementWaistCircumference`
--
ALTER TABLE `waistCircumference`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `bodyMeasurementWeight`
--
ALTER TABLE `weight`
  ADD PRIMARY KEY (`uuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
