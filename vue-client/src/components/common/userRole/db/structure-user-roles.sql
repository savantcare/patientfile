use sc_user;

CREATE TABLE `user_roles` (
  `uuid` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `multiStateDisplayAreaComponentLoadSequence` varchar(255) NOT NULL,
  `currentStateDisplayAreaComponentLoadSequence` varchar(255) NOT NULL,
  `recordChangedByUUID` CHAR(36) NOT NULL,
  `recordChangedFromIPAddress` varchar(20) NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 WITH SYSTEM VERSIONING;



INSERT INTO `user_roles` (`uuid`, `name`, `multiStateDisplayAreaComponentLoadSequence`, `currentStateDisplayAreaComponentLoadSequence`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('897d25c6-2c84-47fe-9236-2c3cc9c70bdf', 'Doctor', 'Rex,Rem', 'Rex', '1', '1'),
('ae0ae9e7-545a-4783-ac83-84786839dcc1', 'Patient', '0', '0',  '1', '1'),
('ae2f20c1-448b-4df0-b221-9b4c3d411f59', 'Doctor admin assistant', 'Shx,Rem', 'Rex', '1', '1');

