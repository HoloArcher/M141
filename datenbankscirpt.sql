CREATE TABLE `priority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `priority` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `surname` varchar(45) NOT NULL,
  `givenname` varchar(45) NOT NULL,
  `fullname` varchar(45) GENERATED ALWAYS AS (concat(`surname`, _utf8mb4 ' ', `givenname`)) VIRTUAL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(45) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `priority_id` int(11) DEFAULT '2',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `owner_id` int(11) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_status_idx` (`status_id`),
  KEY `id_priority_idx` (`priority_id`),
  KEY `owner_id_idx` (`owner_id`),
  CONSTRAINT `id_priority` FOREIGN KEY (`priority_id`) REFERENCES `priority` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `id_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `owner_id` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
);