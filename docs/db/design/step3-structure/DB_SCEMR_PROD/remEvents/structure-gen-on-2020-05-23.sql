use DB_SCEMR_PROD;
-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: DB_SCEMR_PROD
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `remEvents`
--

DROP TABLE IF EXISTS `remEvents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `remEvents` (
  `eventID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `publicUniqueEventId` varchar(36) DEFAULT NULL,
  `managedByRecurringEventParentID` int(11) DEFAULT NULL,
  `eventTypeID` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `uidOfCreatedBy` int(11) unsigned DEFAULT NULL,
  `title` varchar(1000) DEFAULT NULL,
  `startDateTime` datetime DEFAULT NULL,
  `endDateTime` datetime DEFAULT NULL,
  `locationOfThisEvent` varchar(255) NOT NULL DEFAULT '4966 El Camino Real%*Unit 224%*Los Altos, CA 94022%*United States',
  `cacheFieldCronCreatedForEventTimeZone` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `companyID` int(11) unsigned DEFAULT NULL,
  `isItLocked` enum('yes','no') NOT NULL DEFAULT 'no' COMMENT 'This field decides whether the event is locked or not',
  `isNoteContainerMinimized` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '0 : link has not been clicked. 1. Nornal size open 2 : minimized, 3 : user chosen custom size',
  `checkin_status` int(11) DEFAULT NULL,
  `checkingUpdatedAt` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `uidOfUpdatedBy` int(11) unsigned DEFAULT NULL,
  `timeZoneForCreatedAt` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `timeZoneForUpdatedAt` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `isCached` tinyint(1) NOT NULL DEFAULT '0',
  `priority` enum('Green','Yellow','Red') NOT NULL DEFAULT 'Green',
  `googleCalendarEventID` varchar(255) DEFAULT NULL,
  `startDateTimeOfIntake` datetime DEFAULT NULL,
  `startTimeZoneOfIntake` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `isPreferredBunching` tinyint(1) DEFAULT NULL,
  `timeSpent` int(10) DEFAULT NULL,
  `maxAllowedTime` int(3) DEFAULT NULL,
  `minAllowedTime` int(3) DEFAULT NULL,
  `isSurveyLinkSent` enum('yes','no') NOT NULL DEFAULT 'no',
  PRIMARY KEY (`eventID`),
  KEY `eventTypeID` (`eventTypeID`),
  KEY `createdByUserID` (`uidOfCreatedBy`),
  KEY `companyID` (`companyID`),
  KEY `managedByRecurringEventParentID` (`managedByRecurringEventParentID`),
  CONSTRAINT `remEvents_ibfk_1` FOREIGN KEY (`eventTypeID`) REFERENCES `remMasterEventTypes` (`id`),
  CONSTRAINT `remEvents_ibfk_3` FOREIGN KEY (`companyID`) REFERENCES `companyMasters` (`id`),
  CONSTRAINT `remEvents_ibfk_4` FOREIGN KEY (`managedByRecurringEventParentID`) REFERENCES `remRecurringEventParents` (`recurringEventID`)
) ENGINE=InnoDB AUTO_INCREMENT=435073 DEFAULT CHARSET=utf8 COMMENT='ok by VK on 27/7';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `generate_uuid4_for_remEvent` BEFORE INSERT ON `remEvents` FOR EACH ROW begin
    DECLARE P1 VARCHAR(36);
    DECLARE P2 bigint(21);
    SELECT `AUTO_INCREMENT` FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'DB_SCEMR_PROD' AND   TABLE_NAME   = 'remEvents' INTO @P2;
    
    Select uuid_v4_custom(@P2) INTO @P1;
    
    IF (NEW.publicUniqueEventId IS NULL) THEN
    	SET NEW.publicUniqueEventId = @P1;
    ELSEIF (NEW.publicUniqueEventId = '') THEN
    	SET NEW.publicUniqueEventId = @P1;  
	ELSE
    	SET NEW.publicUniqueEventId = NEW.publicUniqueEventId;
    END IF;
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
