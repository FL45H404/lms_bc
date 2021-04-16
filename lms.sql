-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lms
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `company_branch`
--

DROP TABLE IF EXISTS `company_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_branch` (
  `branch_id` int NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(45) DEFAULT NULL,
  `branch_code` varchar(45) DEFAULT NULL,
  `branch_address1` varchar(45) DEFAULT NULL,
  `branch_address2` varchar(45) DEFAULT NULL,
  `branch_address3` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `pincode` varchar(45) DEFAULT NULL,
  `contact_no` varchar(45) DEFAULT NULL,
  `alternative_contact_no` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `alternative_email` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`branch_id`),
  KEY `company_id_idx` (`company_id`),
  CONSTRAINT `company_id` FOREIGN KEY (`company_id`) REFERENCES `company_master` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_branch`
--

LOCK TABLES `company_branch` WRITE;
/*!40000 ALTER TABLE `company_branch` DISABLE KEYS */;
INSERT INTO `company_branch` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,'fich2018','comcode123','indraagar','kr_puram','ks layout','bengalore','karnataka','india','580096','890412926','545341215','contactfinchtech@gmail.com','swathirao@gmail.com','active',1,'sanidhya'),(3,'benhaloreFINCH2018','comcode123','indraagar','kr_puram','ks layout','bengalore','karnataka','india','580096','890412926','545341215','contactfinchtech@gmail.com','swathirao@gmail.com','active',3,'ahana');
/*!40000 ALTER TABLE `company_branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_master`
--

DROP TABLE IF EXISTS `company_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_master` (
  `company_name` varchar(45) NOT NULL,
  `company_registration_number` varchar(45) DEFAULT NULL,
  `company_logo` varchar(45) DEFAULT NULL,
  `company_registered_address1` varchar(45) DEFAULT NULL,
  `company_registered_address2` varchar(45) DEFAULT NULL,
  `company_registered_address3` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `pincode` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `gst_no` varchar(45) DEFAULT NULL,
  `website` varchar(45) DEFAULT NULL,
  `contact_no` int DEFAULT NULL,
  `alternative_contact_no` int DEFAULT NULL,
  `contact_person` varchar(45) DEFAULT NULL,
  `tan` varchar(45) DEFAULT NULL,
  `pan` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `alternative_email` varchar(45) DEFAULT NULL,
  `company_type` varchar(45) DEFAULT NULL,
  `industry` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `remarks` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `company_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_master`
--

LOCK TABLES `company_master` WRITE;
/*!40000 ALTER TABLE `company_master` DISABLE KEYS */;
INSERT INTO `company_master` VALUES ('finch',NULL,':)','indraagar','baashankari','hsr layout','bengalore','karnataka','580096','india','finchgst2018','finchtech.in',890412926,545341215,'swathi rao','finchtan2018','finchpan2018','contactfinchtech@gmail.com','swathirao@gmail.com','product and services','IT','active','good','neel',1),('conga',NULL,':)','basvangudi','ks layout','whitefield','bengalore','karnataka','580096','india','congagst2011','conga.in',767665549,668766444,'vivan','congatan2011','congapan2011','contactconga@gmail.com','conga@gmail.com','service','IT','active','goog','sharan',2),('finch',NULL,':)','indraagar updated','banshankari','hsr layout','Bengalore','karnataka','580096','india','finchgst2018','finchtech.in',890412926,545341215,'swathi rao','finchtan2018','finchpan2018','contactfinchtech@gmail.com','swathirao@gmail.com','product and services','IT','active','good','neel',3),('finch','fich2018',':)','indraagar','baashankari','hsr layout','bengalore','karnataka','580096','india','finchgst2018','finchtech.in',890412926,545341215,'swathi rao','finchtan2018','finchpan2018','contactfinchtech@gmail.com','swathirao@gmail.com','product and services','IT','active','good','neel',4),('finch',NULL,':)','indraagar updated','banshankari','belgaum','Bengalore','karnataka','580096','india','finchgst2018','finchtech.in',890412926,545341215,'vipul','finchtan2018','finchpan2018','contactfinchtech@gmail.com','vp@gmail.com','product and services','IT','active','good','neel',5);
/*!40000 ALTER TABLE `company_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `created_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'cs','vipul waghamode','2021-04-11 11:05:50.920'),(2,'ce','vipul','1-1-2000'),(3,NULL,NULL,'2021-04-11 10:33:06.526'),(4,'be','vips','2021-04-11 10:38:42.544'),(5,'cs','vipul','2021-04-11 11:03:32.924');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_master`
--

DROP TABLE IF EXISTS `department_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_master` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(50) DEFAULT NULL,
  `department_code` varchar(50) DEFAULT NULL,
  `department_head` varchar(50) DEFAULT NULL,
  `department_type` varchar(50) DEFAULT NULL,
  `department_location` varchar(50) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_master`
--

LOCK TABLES `department_master` WRITE;
/*!40000 ALTER TABLE `department_master` DISABLE KEYS */;
INSERT INTO `department_master` VALUES (1,'mech','103','Khushi','dsce','bgm',NULL,'2021-04-15 19:05:18.260'),(2,'mca','101','vp','bca','bgm','vips','1-11-1111'),(3,'mca','101','vp','bca','bgm','vips','1-11-1111'),(4,'mca','103','vpd','xyz','bangalore','neel','2021-04-09 15:09:47.317'),(5,'mca','102','vpd','xyz','bangalore','vipul','1-12-2020'),(6,'mca','102','vpd','xyz','bangalore','balu','2021-04-09 15:04:15.511'),(7,'mca','103','vpd','xyz','bangalore','neel','2021-04-09 15:49:49.318'),(8,'mca','103','vpd','xyz','bangalore','vipul','2021-04-09 15:50:03.968'),(9,'vipul',NULL,'Khushi','Admin',NULL,NULL,'2021-04-15 03:02:08.215'),(10,'dsce','1003','Ramesh','mca','bangalore',NULL,'2021-04-15 03:21:44.428'),(11,'mbbb','103','Khushi','mca','bgm',NULL,'2021-04-15 03:23:07.219');
/*!40000 ALTER TABLE `department_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designation` (
  `designation_id` int NOT NULL AUTO_INCREMENT,
  `designation_name` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  PRIMARY KEY (`designation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES (1,'manager','xyz',NULL),(2,'manager','xyz',NULL),(3,'xxgfhth','pqr',NULL),(4,'manager','balu','2021-04-11'),(5,'hod','vipul','2021-04-11');
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_address`
--

DROP TABLE IF EXISTS `employee_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_address` (
  `employee_address_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `address_type` varchar(45) DEFAULT NULL,
  `address_status` varchar(45) DEFAULT NULL,
  `address_line1` varchar(45) DEFAULT NULL,
  `address_line2` varchar(45) DEFAULT NULL,
  `address_line3` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `pincode` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`employee_address_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee_profile` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_address`
--

LOCK TABLES `employee_address` WRITE;
/*!40000 ALTER TABLE `employee_address` DISABLE KEYS */;
INSERT INTO `employee_address` VALUES (1,102,'home','active','bgm','banglore',NULL,'bbb','karnataka','india','591313`'),(2,103,'home','active','cs','rb road','near keb','sankeshwar','karnataka','india','560078'),(3,104,'office','non-active','cs','keb road','near keb','belgaum','karnataka','india','560079');
/*!40000 ALTER TABLE `employee_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_bank_details`
--

DROP TABLE IF EXISTS `employee_bank_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_bank_details` (
  `bank_details_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `bank_account_number` varchar(45) DEFAULT NULL,
  `bank_ifsc` varchar(45) DEFAULT NULL,
  `bank_upi` varchar(45) DEFAULT NULL,
  `bank_name` varchar(45) DEFAULT NULL,
  `bank_address` varchar(45) DEFAULT NULL,
  `bank_account_status` varchar(45) DEFAULT NULL,
  `bank_micr_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`bank_details_id`),
  KEY `employee_id_idx` (`employee_id`),
  KEY `employee_id` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_bank_details`
--

LOCK TABLES `employee_bank_details` WRITE;
/*!40000 ALTER TABLE `employee_bank_details` DISABLE KEYS */;
INSERT INTO `employee_bank_details` VALUES (1,102,'3089328939239','synb0007','synd@ybl','syndicate-updated','sankeshwar','active','340092'),(2,103,'128890870576','can0002','can@ybl','canara','belgaum','active','354895'),(3,103,'3089328939239','synb0007','synd@ybl','syndicate-created','sankeshwar','active','340092');
/*!40000 ALTER TABLE `employee_bank_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_category`
--

DROP TABLE IF EXISTS `employee_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_category` (
  `employee_category_id` int NOT NULL AUTO_INCREMENT,
  `employee_category_name` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `created_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`employee_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_category`
--

LOCK TABLES `employee_category` WRITE;
/*!40000 ALTER TABLE `employee_category` DISABLE KEYS */;
INSERT INTO `employee_category` VALUES (1,'xyz-updated','vipul','2021-04-14 14:42:36.625'),(2,'pqr','vipul','1-11-2021'),(3,'xyz-inserted','vipul','2021-04-14 14:41:07.939');
/*!40000 ALTER TABLE `employee_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_contacts`
--

DROP TABLE IF EXISTS `employee_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_contacts` (
  `employee_contact_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `mobile_phone` varchar(45) DEFAULT NULL,
  `home_phone` varchar(45) DEFAULT NULL,
  `alternative_contact_number` varchar(45) DEFAULT NULL,
  `personal_email` varchar(45) DEFAULT NULL,
  `official_email` varchar(45) DEFAULT NULL,
  `contact_type` varchar(45) DEFAULT NULL,
  `contact_relationship` varchar(45) DEFAULT NULL,
  `contact_relation_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`employee_contact_id`),
  KEY `_idx` (`employee_id`),
  CONSTRAINT `fk_employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employee_profile` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_contacts`
--

LOCK TABLES `employee_contacts` WRITE;
/*!40000 ALTER TABLE `employee_contacts` DISABLE KEYS */;
INSERT INTO `employee_contacts` VALUES (1,102,'8197100673',NULL,'97318899999','vp@wagh.com','xyz@gmail.com',NULL,NULL,NULL),(2,102,'8197100673',NULL,'97318899999','vp@wagh.com','xyz@gmail.com',NULL,'updated using query',NULL),(3,103,'8197100673',NULL,'97318899999','vp@wagh.com','xyz@gmail.com',NULL,'created using insert query',NULL);
/*!40000 ALTER TABLE `employee_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_education`
--

DROP TABLE IF EXISTS `employee_education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_education` (
  `employee_education_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `qualification_id` int DEFAULT NULL,
  `year_of_pass` varchar(45) DEFAULT NULL,
  `specialization` varchar(45) DEFAULT NULL,
  `institute_name` varchar(45) DEFAULT NULL,
  `university` varchar(45) DEFAULT NULL,
  `grade` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`employee_education_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_education`
--

LOCK TABLES `employee_education` WRITE;
/*!40000 ALTER TABLE `employee_education` DISABLE KEYS */;
INSERT INTO `employee_education` VALUES (1,1,1,'2020','MCA','DSCE','VTU','A'),(2,3,2,'2020','MTech','abcd','xyz','88'),(3,4,2,'2020','MTech','abcd','xyz','88'),(4,5,3,'2020','MTech','abcd','vtu','88'),(5,2,3,'2020','MTech -up','abcd','vtu','88'),(6,NULL,3,'2020','MTech -up','abcd','vtu','88'),(7,NULL,3,'2020','MTech -up','abcd','vtu','88'),(8,8,3,'2020','MTech -up','abcd','vtu','88');
/*!40000 ALTER TABLE `employee_education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_master`
--

DROP TABLE IF EXISTS `employee_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_master` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `employee_fname` varchar(45) DEFAULT NULL,
  `employee_mname` varchar(45) DEFAULT NULL,
  `employee_lname` varchar(45) DEFAULT NULL,
  `employee_code` varchar(45) DEFAULT NULL,
  `role_id` varchar(45) DEFAULT NULL,
  `department_id` varchar(45) DEFAULT NULL,
  `designation_id` varchar(45) DEFAULT NULL,
  `reporting_manager_id` varchar(45) DEFAULT NULL,
  `date_of_birth` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `joining_date` varchar(45) DEFAULT NULL,
  `nationality` varchar(45) DEFAULT NULL,
  `emp_photo` varchar(45) DEFAULT NULL,
  `marital_status` varchar(45) DEFAULT NULL,
  `blood_group` varchar(45) DEFAULT NULL,
  `employee_status` varchar(45) DEFAULT NULL,
  `payroll_status` varchar(45) DEFAULT NULL,
  `base_location` varchar(45) DEFAULT NULL,
  `background_verification_check` varchar(45) DEFAULT NULL,
  `id_proof` varchar(45) DEFAULT NULL,
  `address_proof` varchar(45) DEFAULT NULL,
  `employee_category_id` varchar(45) DEFAULT NULL,
  `aadhar_card_number` varchar(45) DEFAULT NULL,
  `pan_card_number` varchar(45) DEFAULT NULL,
  `passport_number` varchar(45) DEFAULT NULL,
  `created_date` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `background_verification_date` varchar(45) DEFAULT NULL,
  `background_verification_done_by` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_master`
--

LOCK TABLES `employee_master` WRITE;
/*!40000 ALTER TABLE `employee_master` DISABLE KEYS */;
INSERT INTO `employee_master` VALUES (1,'vipul',NULL,'waghamode','1','101','1','1','10001','1-11-1997','male','1-1-2020','indian',NULL,'single','B+','ACTIVE','confirmed','MUMBAI','yes','Pan card','aadhar card','1','30382718','pan202012','3789987378',NULL,'vipul','1-11-2020','vipul'),(2,'balu','','k','1000001','2','2','2','010','1998-12-08T00:00:00.000','male','2020-10-02T00:00:00.000Z','Indian','','Single','AB+','Active','Confirmed','Mumbai','Yes','PAN Card','Aadhar Card','3','12345678888','v109889','345623456234','2021-04-15 22:29:32.900','vipul','2020-12-27T00:00:00.000Z','vipul'),(3,'balu','','kosuri','1000001','2','2','2','0101','1998-12-08T00:00:00.000','male','2020-10-02T00:00:00.000Z','Indian','','Single','AB+','Active','Confirmed','Mumbai','Yes','PAN Card','Aadhar Card','3','12345678888','v109889','345623456234','2021-04-15 22:48:15.942','vipul','2020-12-27T00:00:00.000Z','vipul'),(4,'vips','','j','1000001','1','1','1','000010','1998-12-08T00:00:00.000','male','2020-10-02T00:00:00.000Z','Indian','','Single','B+','Active','Confirmed','Gurgaon','Yes','PAN Card','Aadhar Card','2','12345678888','vhhu456756','345623456234','2021-04-15 21:21:01.975','Garima','2020-12-27T00:00:00.000Z','vipul'),(5,'balu','','k','1000002','2','2','2','000010','1998-12-08T00:00:00.000','male','2020-10-02T00:00:00.000Z','Indian','','Single','AB+','Active','Confirmed','Mumbai','Yes','PAN Card','Aadhar Card','3','12345678888','v109889','345623456234','2021-04-15 21:40:13.062','vipul','2020-12-27T00:00:00.000Z','vipul');
/*!40000 ALTER TABLE `employee_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_profile`
--

DROP TABLE IF EXISTS `employee_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_profile` (
  `employee_id` int NOT NULL,
  `employee_name` varchar(45) DEFAULT NULL,
  `role_id` varchar(45) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `designation_id` int DEFAULT NULL,
  `reporting_manager_id` varchar(45) DEFAULT NULL,
  `company_id` varchar(45) DEFAULT NULL,
  `date_of_birth` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `joining_date` varchar(45) DEFAULT NULL,
  `nationality` varchar(45) DEFAULT NULL,
  `emp_photo` varchar(45) DEFAULT NULL,
  `marital_status` varchar(45) DEFAULT NULL,
  `blood_group` varchar(45) DEFAULT NULL,
  `employee_status` varchar(45) DEFAULT NULL,
  `base_location` varchar(45) DEFAULT NULL,
  `hr_point_of_contact_id` varchar(45) DEFAULT NULL,
  `employee_category_id` varchar(45) DEFAULT NULL,
  `aadhar_card_number` varchar(12) NOT NULL,
  `pan_card_number` varchar(45) NOT NULL,
  `passport_number` varchar(45) NOT NULL,
  `passport_issued_date` varchar(20) DEFAULT NULL,
  `passport_expiry_date` varchar(20) DEFAULT NULL,
  `created_date` varchar(50) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `department_id_idx` (`department_id`),
  KEY `designation_id_idx` (`designation_id`),
  CONSTRAINT `department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `designation_id` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`designation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_profile`
--

LOCK TABLES `employee_profile` WRITE;
/*!40000 ALTER TABLE `employee_profile` DISABLE KEYS */;
INSERT INTO `employee_profile` VALUES (102,'vips-updated','12',3,2,'10','112','1-11-1997','male',NULL,'indian',NULL,NULL,'ab+','Non-Active','bgm',NULL,NULL,'303827182628','hb889','9887','01-11-1997','1-12-1998','2021-04-12 23:19:21.425','vipul'),(103,'vipul','12',1,1,NULL,'112','01-1-2000','male',NULL,'indian',NULL,'single','b-','Non-Active','banglore',NULL,NULL,'335467575764','dtdfygf46y','786544',NULL,NULL,NULL,'vipul'),(104,'ashwin','12',3,2,'10','112','1-11-1997','male',NULL,'indian',NULL,'single','ab+','active','bgm',NULL,NULL,'303827182628','hb889','9887','01-11-1997','1-12-1998','2021-04-11 15:40:21.804','vipul'),(105,'vips','12',3,2,'10','112','1-11-1997','male',NULL,'indian',NULL,NULL,'ab+','Non-Active','bgm',NULL,NULL,'303827182628','hb889','9887','01-11-1997','1-12-1998','2021-04-12 23:10:32.816','vipul');
/*!40000 ALTER TABLE `employee_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_master`
--

DROP TABLE IF EXISTS `role_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_master` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_description` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `created_date` varchar(45) DEFAULT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_master`
--

LOCK TABLES `role_master` WRITE;
/*!40000 ALTER TABLE `role_master` DISABLE KEYS */;
INSERT INTO `role_master` VALUES (1,'manager','vipul','2021-04-13 00:22:49.968','adffds'),(2,'pqr','vipul','1-11-2021','ggfty'),(3,'manager-','vipul','2021-04-13 00:28:55.412','adffds'),(4,'manager-',NULL,'2021-04-14 11:17:19.810',NULL),(5,'manager-',NULL,'2021-04-14 11:17:21.520',NULL),(6,'manager-','vipul','2021-04-14 11:22:16.166',NULL),(7,'manager-','vipul','2021-04-14 11:22:37.598',NULL);
/*!40000 ALTER TABLE `role_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testing`
--

DROP TABLE IF EXISTS `testing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testing` (
  `testid` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`testid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testing`
--

LOCK TABLES `testing` WRITE;
/*!40000 ALTER TABLE `testing` DISABLE KEYS */;
INSERT INTO `testing` VALUES (1,'vp'),(2,'vp');
/*!40000 ALTER TABLE `testing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'lms'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-16 14:10:19
