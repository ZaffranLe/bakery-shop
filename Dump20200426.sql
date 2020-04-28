-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: bakery
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detail_export_product_receipt`
--

DROP TABLE IF EXISTS `detail_export_product_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_export_product_receipt` (
  `idReceipt` int NOT NULL,
  `amount` int DEFAULT NULL,
  `idProduct` int NOT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`idReceipt`,`idProduct`),
  KEY `FK_der_product_idx` (`idProduct`),
  CONSTRAINT `FK_der_export_receipt` FOREIGN KEY (`idReceipt`) REFERENCES `export_product_receipt` (`id`),
  CONSTRAINT `FK_der_product` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_export_product_receipt`
--

LOCK TABLES `detail_export_product_receipt` WRITE;
/*!40000 ALTER TABLE `detail_export_product_receipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_export_product_receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_import_material_receipt`
--

DROP TABLE IF EXISTS `detail_import_material_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_import_material_receipt` (
  `idReceipt` int NOT NULL,
  `idMaterial` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  `unitPrice` decimal(10,2) DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`idReceipt`),
  KEY `FK_dir_material_idx` (`idMaterial`),
  CONSTRAINT `FK_dir_import_receipt` FOREIGN KEY (`idReceipt`) REFERENCES `import_material_receipt` (`id`),
  CONSTRAINT `FK_dir_material` FOREIGN KEY (`idMaterial`) REFERENCES `material` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_import_material_receipt`
--

LOCK TABLES `detail_import_material_receipt` WRITE;
/*!40000 ALTER TABLE `detail_import_material_receipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_import_material_receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `export_product_receipt`
--

DROP TABLE IF EXISTS `export_product_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_product_receipt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `idUser` int DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_er_user_idx` (`idUser`),
  CONSTRAINT `FK_er_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_product_receipt`
--

LOCK TABLES `export_product_receipt` WRITE;
/*!40000 ALTER TABLE `export_product_receipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_product_receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `idProduct` int DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_image_product_idx` (`idProduct`),
  CONSTRAINT `FK_image_product` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_material_receipt`
--

DROP TABLE IF EXISTS `import_material_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_material_receipt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `idProvider` int DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_ir_provider_idx` (`idProvider`),
  CONSTRAINT `FK_ir_provider` FOREIGN KEY (`idProvider`) REFERENCES `provider` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_material_receipt`
--

LOCK TABLES `import_material_receipt` WRITE;
/*!40000 ALTER TABLE `import_material_receipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `import_material_receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `idUnit` int DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_material_unit` FOREIGN KEY (`id`) REFERENCES `unit` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_storage`
--

DROP TABLE IF EXISTS `material_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material_storage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imported` int DEFAULT NULL,
  `used` int DEFAULT NULL,
  `leftover` int DEFAULT NULL,
  `idMaterial` int DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_ms_material_idx` (`idMaterial`),
  CONSTRAINT `FK_ms_material` FOREIGN KEY (`idMaterial`) REFERENCES `material` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_storage`
--

LOCK TABLES `material_storage` WRITE;
/*!40000 ALTER TABLE `material_storage` DISABLE KEYS */;
/*!40000 ALTER TABLE `material_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `idUnit` int DEFAULT NULL,
  `unitPrice` decimal(10,2) DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_product_unit_idx` (`idUnit`),
  CONSTRAINT `FK_product_unit` FOREIGN KEY (`idUnit`) REFERENCES `unit` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_material`
--

DROP TABLE IF EXISTS `product_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_material` (
  `idProduct` int NOT NULL,
  `idMaterial` int NOT NULL,
  `amount` int DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`idProduct`,`idMaterial`),
  KEY `FK_pm_material_idx` (`idMaterial`),
  CONSTRAINT `FK_pm_material` FOREIGN KEY (`idMaterial`) REFERENCES `material` (`id`),
  CONSTRAINT `FK_pm_product` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_material`
--

LOCK TABLES `product_material` WRITE;
/*!40000 ALTER TABLE `product_material` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_type` (
  `idProduct` int NOT NULL,
  `idType` int NOT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`idProduct`,`idType`),
  KEY `FK_pt_type_idx` (`idType`),
  CONSTRAINT `FK_pt_product` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_pt_type` FOREIGN KEY (`idType`) REFERENCES `type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_type`
--

LOCK TABLES `product_type` WRITE;
/*!40000 ALTER TABLE `product_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider`
--

LOCK TABLES `provider` WRITE;
/*!40000 ALTER TABLE `provider` DISABLE KEYS */;
/*!40000 ALTER TABLE `provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `idPermission` int DEFAULT NULL,
  `isDeleted` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_user_permission_idx` (`idPermission`),
  CONSTRAINT `FK_user_permission` FOREIGN KEY (`idPermission`) REFERENCES `permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-26 23:37:35
