

INSERT INTO `componentMaster` (`uuid`, `tag`, `name`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
(1, "health", 'recommendation', '1', '202.005.122.057'),
(2, "other", 'reminder', '2', '202.005.122.057'),
(3, "health", 'other', '3', '202.005.122.057');

INSERT INTO `ctAllowedToAccessByEachUserRole` (`uuid`, `roleUUID`, `componentUUID`, `multiStateDisplayImportance`, `currentStateDisplayImportance`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('1', '897d25c6-2c84-47fe-9236-2c3cc9c70bdf', '1', '1', '3', '1', '10.10.10.1'),
('2', '897d25c6-2c84-47fe-9236-2c3cc9c70bdf', '2', '2', '2', '1', '10.10.10.1'),
('3', '897d25c6-2c84-47fe-9236-2c3cc9c70bdf', '3', '3', '1', '1', '10.10.10.1');