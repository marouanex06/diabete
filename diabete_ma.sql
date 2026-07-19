-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: diabete_ma
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'test@test.com','Ceci est un message de test.','2026-07-19 12:36:43'),(2,'admin@lms.com','heeeeeeeeeellooo woooooooooooooorld','2026-07-19 12:37:26');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patients` (
  `id` varchar(50) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `type` varchar(50) DEFAULT 'Type 1',
  `tel` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `statut` varchar(50) DEFAULT 'Actif',
  `diagnostic` varchar(100) DEFAULT '15 mars 2019',
  `medecin` varchar(100) DEFAULT 'Dr. Karim B.',
  `traitement` varchar(255) DEFAULT 'Metformine 850 mg',
  `adresse` varchar(255) DEFAULT 'Avenue Hassan II, Casablanca',
  `notes` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES ('P-1024','Fatima Zahra B.',54,'Type 2','0661-23-45-67','fatima@email.ma','Casablanca','fatima','$2y$10$Pq9AgiMJSjY1fO2YLm0ge.QqX3YkPg4vBYcuOBQqL8wO1W6TSP5au','Actif','15 mars 2019','Dr. Karim B.','Metformine 850 mg','Avenue Hassan II, Casablanca','Notes initiales'),('P-1025','Ahmed L.',41,'Type 1','0662-98-76-54','ahmed@email.ma','Rabat','ahmed','$2y$10$J5Lr886hJbaFEHCpnptC4uzJRadzQruJQBlRB.wnKsv6HsSuY55mC','Actif','10 juin 2021','Dr. Karim B.','Insuline NovoRapid','Rue de France, Rabat',''),('P-1026','Sanae M.',33,'Gestationnel','0663-11-22-33','sanae@email.ma','Casablanca','sanae','$2y$10$vs0aIrMkOCf.ZBDlpUo5rOup05o5gtVkP.Ne2t//7BK9Znzwb1Iea','Suivi','02 mai 2026','Dr. Nadia L.','Régime alimentaire + suivi glycémique','Boulevard Ghandi, Casablanca','Enceinte de 6 mois'),('P-1027','Youssef R.',60,'Type 2','0664-44-55-66','youssef@email.ma','Fès','youssef','$2y$10$GcCbUiCMv9Aidt2.gGZUguRvOBT8fVarrihxs9q2phwykYf9Ei4M6','Actif','12 sept. 2015','Dr. Karim B.','Metformine + Glibenclamide','Ville Nouvelle, Fès',''),('P-1028','Marouane Elk',20,'Type 2','0634141617','marouane@gmail.com','Casa','mrwn','$2y$10$a6J91/HecorwzK5b1v76LekRa0Aj/ytaMwSGbSL3Jq4.qmYx7hxAu','Actif','15 mars 2019','Dr. Karim B.','Metformine 850 mg','Avenue Hassan II, Casablanca','');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-19 13:52:21
