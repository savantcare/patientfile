use sc_component;


CREATE TABLE `componentMaster` (
  `uuid` char(36) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `recordChangedByUUID` CHAR(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


CREATE TABLE `userRoleComponentMapping` (
  `uuid` char(36) NOT NULL ,
  `roleUUID` char(36) NOT NULL,
  `componentUUID` char(36) NOT NULL,
  `recordChangedByUUID` char(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uuid`)
)  ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;
