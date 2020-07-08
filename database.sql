-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: bakery
-- ------------------------------------------------------
-- Server version	5.7.30-log

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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `idProduct` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  PRIMARY KEY (`idProduct`,`idUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (10,1,'',3,'2020-05-08 17:09:44'),(10,4,'Rất là ngon',5,'2020-05-08 17:32:01'),(23,1,'Bánh mới',3,'2020-05-09 17:03:53');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_export_product_receipt`
--

DROP TABLE IF EXISTS `detail_export_product_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_export_product_receipt` (
  `idReceipt` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `idProduct` int(11) NOT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
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
INSERT INTO `detail_export_product_receipt` VALUES (1,5,5,75000.00,0),(2,5,5,75000.00,0),(2,5,18,75000.00,0),(2,4,21,200000.00,0),(3,1,9,400000.00,0),(3,5,18,75000.00,0);
/*!40000 ALTER TABLE `detail_export_product_receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_import_ingredient_receipt`
--

DROP TABLE IF EXISTS `detail_import_ingredient_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_import_ingredient_receipt` (
  `idReceipt` int(11) NOT NULL,
  `idIngredient` int(11) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `unitPrice` decimal(10,2) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`idReceipt`),
  KEY `FK_dir_material_idx` (`idIngredient`),
  CONSTRAINT `FK_dir_import_receipt` FOREIGN KEY (`idReceipt`) REFERENCES `import_ingredient_receipt` (`id`),
  CONSTRAINT `FK_dir_material` FOREIGN KEY (`idIngredient`) REFERENCES `ingredient` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_import_ingredient_receipt`
--

LOCK TABLES `detail_import_ingredient_receipt` WRITE;
/*!40000 ALTER TABLE `detail_import_ingredient_receipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `detail_import_ingredient_receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `export_product_receipt`
--

DROP TABLE IF EXISTS `export_product_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_product_receipt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  `status` int(11) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_er_user_idx` (`idUser`),
  KEY `FK_er_ers_idx` (`status`),
  CONSTRAINT `FK_er_ers` FOREIGN KEY (`status`) REFERENCES `export_receipt_status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_er_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_product_receipt`
--

LOCK TABLES `export_product_receipt` WRITE;
/*!40000 ALTER TABLE `export_product_receipt` DISABLE KEYS */;
INSERT INTO `export_product_receipt` VALUES (1,'2020-05-09 10:20:49',75000.00,1,0,1,'Lê Sơn Tùng','Nhà mặt phố bản thân làm to','0829093384',''),(2,'2020-05-09 11:09:25',350000.00,NULL,0,1,'Trần Xuân Đạt','Quảng Ninh','0123456789','Gọi điện trước khi ship'),(3,'2020-05-09 17:04:45',475000.00,NULL,0,2,'Lê Sơn Tùng','Thuỵ khuê, Tây Hồ, hà nội','012345678','Giao trước 5h chiều');
/*!40000 ALTER TABLE `export_product_receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `export_receipt_status`
--

DROP TABLE IF EXISTS `export_receipt_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_receipt_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_receipt_status`
--

LOCK TABLES `export_receipt_status` WRITE;
/*!40000 ALTER TABLE `export_receipt_status` DISABLE KEYS */;
INSERT INTO `export_receipt_status` VALUES (1,'PENDING','Chờ xác nhận',0),(2,'CONFIRMED','Đã xác nhận',0),(3,'IN_PROGRESS','Đang thực hiện',0),(4,'WAITING_FOR_DELIVERY','Chờ vận chuyển',0),(5,'DELIVERING','Đang vận chuyển',0),(6,'FINISHED','Đã hoàn thành',0),(7,'REFUSED','Đã từ chối',0);
/*!40000 ALTER TABLE `export_receipt_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `idProduct` int(11) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_image_product_idx` (`idProduct`),
  CONSTRAINT `FK_image_product` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (13,'efb900bd-4c13-4931-bcee-926538cdefec.jpg',5,0),(14,'b06b333b-23bc-4ed5-8174-6fa29bcf179e.jpg',5,0),(15,'1087a32d-fa4f-4425-9c22-f1c719946a07.jpg',5,0),(23,'00367312-4909-4f5e-ba5a-441c448c864e.jpg',9,0),(24,'82589afb-f8aa-44ee-ae92-42b8dcb6e977.jpg',9,0),(25,'18003f14-c1de-4ff9-b455-4e655c6cfe4b.jpg',9,0),(26,'d2db3d86-685d-4f79-a67d-a581a24eea83.jpg',10,0),(27,'7d9feb29-08b6-4407-8767-ed5e9c6e3a1e.jpg',10,0),(28,'191287d1-b8b3-41f0-8e7f-9ff618a514de.jpg',10,0),(29,'6aa16fa3-6fa7-4029-8813-0f9ad3021fdc.jpg',12,0),(30,'de204f30-7462-428a-bfd2-bfe922b7fa5c.jpg',13,0),(31,'34858ae4-4520-4720-86f1-48a6bd3d32fd.jpg',14,0),(32,'28039c5e-3f95-40b2-9944-15087dda86d2.jpg',15,0),(33,'1547c6b4-c1ca-4c1d-ac7c-83e713e92887.jpg',15,0),(34,'212c2666-da22-4235-bbbc-90f296e6fdf8.jpg',16,0),(35,'fb01c174-be4e-4ab4-9b1d-0991b5b7898b.jpg',17,0),(36,'0d59e532-158d-496f-a84f-b27b3f3c1405.jpg',17,0),(45,'e8f1eb47-e8bb-4102-8823-1876a5a4dcbd.jpg',18,0),(46,'8ec3f2ff-34b0-44bf-8f56-ba5f563864a5.jpg',18,0),(47,'91c20ae3-6800-4800-b5ea-df3a8eebd59e.jpg',20,0),(48,'263dc864-c9b7-4798-8bea-20f4ee110a1a.jpg',20,0),(49,'eb5763bc-585f-4787-ac43-691bc8212453.jpg',21,0),(50,'a370a3b2-23e8-491b-b707-de4cdbf88cc2.jpg',21,0),(51,'908f7a91-ea81-40b2-8b8f-5cdae34cc68e.jpg',22,0),(52,'b32864d6-cf8b-45d6-b9b9-cf23c941deb5.jpg',22,0),(53,'b5d7f183-b7d3-457a-b3a6-28b7088c05e7.jpg',23,0),(54,'70c1c0b7-12e4-41a7-aa2c-80b4cfc59e0d.jpg',23,0),(55,'4dbe4f42-a831-43e3-8a5c-99b851a64e6f.jpg',23,0);
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_ingredient_receipt`
--

DROP TABLE IF EXISTS `import_ingredient_receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_ingredient_receipt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `idProvider` int(11) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_ingredient_receipt`
--

LOCK TABLES `import_ingredient_receipt` WRITE;
/*!40000 ALTER TABLE `import_ingredient_receipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `import_ingredient_receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `idUnit` int(11) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  `quantity` int(11) DEFAULT '0',
  `description` varchar(255) DEFAULT NULL,
  `warningThreshold` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_material_unit` FOREIGN KEY (`id`) REFERENCES `unit` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES (1,'Lá khúc',6,0,0,'Để làm bánh khúc',5000),(2,'ýtest dek',3,1,0,'',0),(3,'Gạo nếp',6,0,0,'',10000),(4,'Khoai tây',6,0,0,'',10000),(5,'Trứng',7,0,0,'',100),(6,'Bột mì',6,0,0,'Làm bánh',10000);
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'ADMIN','admin',0),(2,'USER','user',0),(3,'DELIVERER','Người giao hàng',0);
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `idUnit` int(11) DEFAULT NULL,
  `unitPrice` decimal(10,2) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  `viewNumber` int(11) DEFAULT '0',
  `createdDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_product_unit_idx` (`idUnit`),
  CONSTRAINT `FK_product_unit` FOREIGN KEY (`idUnit`) REFERENCES `unit` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (5,'Bánh khúc','Ai bánh khúc nóng đêy',4,15000.00,0,52,'2020-01-01 00:00:00'),(9,'Bánh sinh nhật','HAPPY BIRTHDAY!!!',4,400000.00,0,15,'2020-01-02 00:00:00'),(10,'Bánh sinh nhật BIG SIZE','HAPPY BIRTHDAY!!!',4,500000.00,0,118,'2020-01-03 00:00:00'),(12,'Bánh từ ngoài hành tinh','AND ITS NAME IS JOHHHNN CEEENAAAAAA',3,15.00,0,8,'2020-01-04 00:00:00'),(13,'Kẹo đi','ádasd',2,15.00,0,4,'2020-01-05 00:00:00'),(14,'a','a',2,5.00,1,0,'2020-01-06 00:00:00'),(15,'hmm','asd',3,5.00,0,0,'2020-01-07 00:00:00'),(16,'wasd','asd',3,51.00,0,0,'2020-01-08 00:00:00'),(17,'oh no','123',3,15.00,1,0,'2020-01-09 00:00:00'),(18,'Chè thái','Không phải của Thái Lan',3,15000.00,0,31,'2020-01-10 00:00:00'),(20,'Bánh chả','Bánh chả???!!!',3,15000.00,0,0,'2020-01-11 00:00:00'),(21,'Chè bưởi','Món ăn thanh mát ngày hè',2,50000.00,0,0,'2020-01-12 00:00:00'),(22,'Bánh sinh nhật','HAPPY Birthday',4,450000.00,0,0,'2020-01-12 00:00:00'),(23,'Bánh','Abc',4,200000.00,0,3,'2020-05-09 17:03:29');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_ingredient`
--

DROP TABLE IF EXISTS `product_ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_ingredient` (
  `idProduct` int(11) NOT NULL,
  `idIngredient` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`idProduct`,`idIngredient`),
  KEY `FK_pm_material_idx` (`idIngredient`),
  CONSTRAINT `FK_pm_material` FOREIGN KEY (`idIngredient`) REFERENCES `ingredient` (`id`),
  CONSTRAINT `FK_pm_product` FOREIGN KEY (`idProduct`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_ingredient`
--

LOCK TABLES `product_ingredient` WRITE;
/*!40000 ALTER TABLE `product_ingredient` DISABLE KEYS */;
INSERT INTO `product_ingredient` VALUES (5,1,100,0),(5,3,200,0),(5,4,100,0),(9,5,5,0),(9,6,800,0),(10,5,5,0),(10,6,500,0),(13,6,1155,0),(14,6,1,0),(15,4,16,0),(15,6,15,0),(16,3,1,0),(17,3,1,0),(17,5,12,0),(18,1,15,0),(18,4,12,0),(20,3,15,0),(20,5,15,0),(21,3,15,0),(22,5,5,0),(22,6,100,0),(23,3,200,0),(23,5,5,0);
/*!40000 ALTER TABLE `product_ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_type`
--

DROP TABLE IF EXISTS `product_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_type` (
  `idProduct` int(11) NOT NULL,
  `idType` int(11) NOT NULL,
  `isDeleted` int(11) DEFAULT '0',
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
INSERT INTO `product_type` VALUES (5,2,0),(5,5,0),(9,1,0),(9,3,0),(10,1,0),(10,3,0),(12,1,0),(13,2,0),(14,3,0),(15,1,0),(15,3,0),(16,2,0),(17,2,0),(17,3,0),(17,5,0),(18,2,0),(20,2,0),(20,5,0),(21,4,0),(21,5,0),(22,1,0),(22,3,0),(23,1,0),(23,3,0);
/*!40000 ALTER TABLE `product_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provider`
--

DROP TABLE IF EXISTS `provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provider` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provider`
--

LOCK TABLES `provider` WRITE;
/*!40000 ALTER TABLE `provider` DISABLE KEYS */;
INSERT INTO `provider` VALUES (1,'Công ty TNHH 1 thành viên','0123456789','cty@domain.com','12312356',0),(2,'a','','','',1),(3,'Bà hàng trứng','012345','email@email.com','123',0);
/*!40000 ALTER TABLE `provider` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Bánh ngọt','Nhiều đường, dễ tăng cân',0),(2,'Bánh mặn','Phù hợp cho ăn các bữa chính',0),(3,'Bánh sinh nhật','HAPPY BIRTHDAY!!!',0),(4,'Chè','Món ăn vặt mùa hè',0),(5,'Ăn vặt','Ăn cho vui, khá là ngon',0);
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unit`
--

DROP TABLE IF EXISTS `unit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unit`
--

LOCK TABLES `unit` WRITE;
/*!40000 ALTER TABLE `unit` DISABLE KEYS */;
INSERT INTO `unit` VALUES (1,'Chiếc','1 chiếc (nhỏ), giống cái',1),(2,'Hộp','5 cái',0),(3,'Túi','Chắc là theo gram',0),(4,'Cái','Đơn vị tính riêng lẻ',0),(5,'Gram','Đơn vị tính khối lượng 1 g = 0.001kg',1),(6,'Gram','Đơn vị tính khối lượng 1 g = 0.001kg',0),(7,'Quả','',0);
/*!40000 ALTER TABLE `unit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `idPermission` int(11) DEFAULT '2',
  `isDeleted` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `FK_user_permission_idx` (`idPermission`),
  CONSTRAINT `FK_user_permission` FOREIGN KEY (`idPermission`) REFERENCES `permission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','e10adc3949ba59abbe56e057f20f883e','stungle154@gmail.com','0829093384','Lê Sơn Tùng','Nhà mặt phố bản thân làm to',1,0),(4,'user','fbab17c86e5e2389e9e68989251660e5','stungle154@gmail.com','0829093384','LST','asdasd',2,0),(5,'user1','fbab17c86e5e2389e9e68989251660e5','zxc','123123','zxc','123asd',2,1),(6,'shipper','fbab17c86e5e2389e9e68989251660e5','ship@p.er','123123123','shipper','asdasd',3,1),(7,'shipperr','fbab17c86e5e2389e9e68989251660e5','asd','123','asd','123',3,0),(9,'zzz','fbab17c86e5e2389e9e68989251660e5','zzz','123123','zzz','123123',2,0);
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

-- Dump completed on 2020-05-22 22:50:49
