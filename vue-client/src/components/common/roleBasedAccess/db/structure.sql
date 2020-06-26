use sc_component;


CREATE TABLE `componentMaster` (
  `uuid` char(36) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `recordChangedByUUID` CHAR(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;


INSERT INTO `componentMaster` (`uuid`, `tag`, `name`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
(1, "health", 'recommendation', '1', '202.005.122.057'),
(2, "other", 'reminder', '2', '202.005.122.057'),
(3, "health", 'other', '3', '202.005.122.057');
