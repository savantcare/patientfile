INSERT INTO `ctMaster` (`uuid`, `tag`, `name`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('1', 'health', 'Recommendation', '1', '202.005.122.057'),
('2', 'other', 'Contacts', '2', '202.005.122.057'),
('3', 'health', 'Reminder', '3', '202.005.122.057'),
('4', 'health', 'Diagnosis', '1', '202.005.122.057'),
('5', 'health', 'Goal', '1', '202.005.122.057'),
('6', 'health', 'Social history', '2', '202.005.122.057'),
('7', 'health', 'Service statements', '3', '202.005.122.057'),
('8', 'health', 'Body measurement', '1', '202.005.122.057'),
('9', 'other', 'Documents', '', '');


INSERT INTO `ctAllowedToAccessByEachUserRole` (`uuid`,`roleUUID`, `componentUUID`, `multiStateDisplayAreaImportance`, `currentStateDisplayAreaImportance`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('1', '897d25c6-2c84-47fe-9236-2c3cc9c70bdf', '1', '1', '3', '1', '10.10.10.1'),
('2', '897d25c6-2c84-47fe-9236-2c3cc9c70bdf', '2', '2', '2', '1', '10.10.10.1'),
('3', '897d25c6-2c84-47fe-9236-2c3cc9c70bdf', '3', '3', '1', '1', '10.10.10.1');


INSERT INTO `search` (`uuid`, `componentUUID`, `searchText`, `action`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES
('1', '1', 'recommendation', '', '1', '202.005.122.057'),
('2', '2', 'contacts', '', '2', '202.005.122.057'),
('3', '3', 'reminder', '', '3', '202.005.122.057');


