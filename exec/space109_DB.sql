CREATE DATABASE  IF NOT EXISTS `space109` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `space109`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: space109
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT COMMENT '카테고리 고유 ID',
  `CATEGORY_TITLE` varchar(10) NOT NULL COMMENT '테마',
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'판타지'),(2,'팝아트'),(3,'봄'),(4,'캘리그라피'),(5,'추상'),(6,'여름'),(7,'사물'),(8,'게임'),(9,'가을'),(10,'일상'),(11,'일러스트'),(12,'겨울'),(13,'기타');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gallery` (
  `GALLERY_ID` int NOT NULL AUTO_INCREMENT COMMENT '갤러리 고유 ID',
  `OA` varchar(256) NOT NULL COMMENT '갤러리 주인 지갑 주소',
  `CATEGORY_ID` int NOT NULL,
  `DESCRIPTION` varchar(256) DEFAULT NULL COMMENT '전시회 설명',
  `TITLE` varchar(255) DEFAULT NULL COMMENT '전시회 제목',
  `THUMBNAIL` varchar(256) NOT NULL COMMENT '썸네일 주소',
  `IS_OPEN` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1이면 TRUE, 0이면 FALSE',
  PRIMARY KEY (`GALLERY_ID`),
  UNIQUE KEY `OA` (`OA`),
  KEY `CATEGORY_ID` (`CATEGORY_ID`),
  CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`OA`) REFERENCES `user` (`OA`) ON DELETE CASCADE,
  CONSTRAINT `gallery_ibfk_2` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery`
--

LOCK TABLES `gallery` WRITE;
/*!40000 ALTER TABLE `gallery` DISABLE KEYS */;
INSERT INTO `gallery` VALUES (1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3',1,'EMONG 작가의 초현실주의 작품전.\r\n당신의 영감을 일깨워줄 상상력을 감상하세요.','초현실주의 작품전','/image/thumbnail/0x6a0208ee4311374eb3386866958a5ffe18ae5aa3/thumbnail.jpg',1),(2,'0x41f0d0083b401ebd2fb4c531742df38343a08455',1,'숲','숲','/image/thumbnail/0x41f0d0083b401ebd2fb4c531742df38343a08455/thumbnail.jpg',1),(4,'0xa2e4ab36704795a0204cb096619e8248e8765f0a',10,'하루의 마무리는 ...','하루의 끝','/image/thumbnail/0xa2e4ab36704795a0204cb096619e8248e8765f0a/thumbnail.jpg',1),(5,'0xd0ec3aaa96693fb93eb77c79bb487c2bc0a9d5f4',10,'코코님의 갤러리입니다.','코코님의 갤러리','/image/thumbnail/0xd0ec3aaa96693fb93eb77c79bb487c2bc0a9d5f4/thumbnail.jpg',0),(6,'0xf0043204c8b8f1d44dc4c922be84999e0b190239',10,'감자님의 갤러리입니다.','감자님의 갤러리','/image/thumbnail/0xf0043204c8b8f1d44dc4c922be84999e0b190239/thumbnail.jpg',0),(7,'0x065bc2317685a146511faba338708a53fc6d2534',13,'옥수수콧수염차의 갤러리 입니다.','옥수수콧수염차의 갤러리','/image/thumbnail/default/thumbnail.jpg',0),(8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1',2,'이것이 대전 SSAFY 교육장의 점심이다!','대전의 점심 사진전','/image/thumbnail/0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1/thumbnail.jpg',1),(9,'0xb5178d52f82f535d9669231a6b8683085c3dfd01',11,'그림이 얼마 없어요..\r\n그래도 재밌게 봐주세요,,,','노랑 뼝아리의 그림','/image/thumbnail/0xb5178d52f82f535d9669231a6b8683085c3dfd01/thumbnail.jpg',1),(10,'0xc33300ae6b486b2fddb26dffe772f77262c5763a',13,'악성유저님의 갤러리입니다.','악성유저님의 갤러리','/image/thumbnail/default/thumbnail.jpg',0),(12,'0xd758cc08ece08fd21af9c2407edda47dd9f774a2',13,'aaaaeeeeeeeee님의 갤러리입니다.','aaaaeeeeeeeee님의 갤러리','/image/thumbnail/default/thumbnail.jpg',0),(13,'0xf5e5f801c4014c36529b507099fbe51856b7967b',13,'SSAFY 갤러리입니다.','SSAFY 갤러리','/image/thumbnail/0xf5e5f801c4014c36529b507099fbe51856b7967b/thumbnail.jpg',0),(14,'0xc42d1449259b62cb93a079658640ba7db6ad0d13',13,'NCT드림짱님의 갤러리입니다.','NCT드림짱님의 갤러리','/image/thumbnail/default/thumbnail.jpg',0),(15,'0x71423145d78af73abc77d884be26059f6cddfa8c',11,'감자와 사슴이 반겨주는','무기의 갤러리','/image/thumbnail/0x71423145d78af73abc77d884be26059f6cddfa8c/thumbnail.jpg',0),(16,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa',11,'일러스트레이터 Annie의 갤러리','가장 보통의 일상','/image/thumbnail/0xa651045dbeed16d41c37978bcb516ca2b147bbfa/thumbnail.jpg',1),(21,'0x5e8a95271c72d133f8c0464085b55e9de5286a73',1,'백구님의 공간입니다.','백구의 갤러리 입니다.','/image/thumbnail/0x5e8a95271c72d133f8c0464085b55e9de5286a73/thumbnail.jpg',1),(22,'0x2a9beea240db55114ade47a301a16fa89a9e6245',13,'시연자_B109님의 갤러리입니다.','시연자_B109님의 갤러리','/image/thumbnail/default/thumbnail.jpg',0);
/*!40000 ALTER TABLE `gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guest_book`
--

DROP TABLE IF EXISTS `guest_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guest_book` (
  `GUEST_BOOK_ID` int NOT NULL AUTO_INCREMENT COMMENT '방명록 고유 ID',
  `GALLERY_ID` int NOT NULL COMMENT '갤러리 고유 ID',
  `NICKNAME` varchar(20) NOT NULL COMMENT '방명록 서명',
  `DESCRIPTION` varchar(256) NOT NULL COMMENT '방명록 내용',
  `DATE` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`GUEST_BOOK_ID`),
  KEY `GALLERY_ID` (`GALLERY_ID`),
  CONSTRAINT `guest_book_ibfk_1` FOREIGN KEY (`GALLERY_ID`) REFERENCES `gallery` (`GALLERY_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guest_book`
--

LOCK TABLES `guest_book` WRITE;
/*!40000 ALTER TABLE `guest_book` DISABLE KEYS */;
INSERT INTO `guest_book` VALUES (1,1,'EMONG','안녕하세요!','2022-10-05 16:43:25'),(2,2,'둘기','후기','2022-10-05 18:19:05'),(3,1,'둘기','볼게 아무것도 없네요','2022-10-05 18:21:45'),(6,8,'파이썬그자체','첫 댓글!','2022-10-06 02:08:55'),(7,1,'악성유저','안녕하세요','2022-10-06 03:18:16'),(8,13,'SSAFY','첫 댓글!','2022-10-06 05:03:32'),(9,13,'무기','잘 보고 갑니다ㅎㅎ','2022-10-06 05:04:58'),(10,13,'SSAFY','두 번째 댓글!','2022-10-06 05:05:10'),(18,1,'NCT드림짱','NCT 드림이라고 아시나요','2022-10-06 08:12:23'),(19,2,'무기','잘보고 갑니다','2022-10-06 13:18:00'),(20,15,'무기','방명록입니다','2022-10-06 13:22:28'),(22,8,'백구','오무라이스도 맛있어보여요','2022-10-06 17:03:13'),(28,1,'EMONG','초현실주의 작품전이라 신기했어요! 제가 판타지 세계에 있는 것 같았어요. 만약 제가 상상력을 발휘해 그림을 그린다면 이 곳에 꼭 전시하고 팔아보고 싶어요','2022-10-07 01:16:32'),(29,1,'둘기','그림들이 멋지네요','2022-10-07 01:18:22'),(30,1,'무기','초현실주의가 이게 뭔지 보고 깨달았어요','2022-10-07 01:19:46'),(31,1,'무기','에몽이가 데뷔라니','2022-10-07 01:20:05'),(32,1,'옥수수콧수염차','초 현실! 초초 현실!!','2022-10-07 01:22:07'),(34,13,'Annie','good!','2022-10-07 01:22:56'),(35,2,'Annie','good!','2022-10-07 01:25:38'),(36,2,'옥수수콧수염차','이거만드는데 얼마나걸렸어요???','2022-10-07 01:25:41'),(37,13,'옥수수콧수염차','싸피는.. 보안등급때문에... 없는건가?','2022-10-07 01:27:09'),(38,1,'코코','우와~','2022-10-07 01:43:23'),(39,1,'감자','저도 전시해보고 싶네요','2022-10-07 01:44:03'),(40,1,'백구','작가님 데뷔 정말로 축하드립니다!!','2022-10-07 02:22:48');
/*!40000 ALTER TABLE `guest_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `log` (
  `LOG_ID` int NOT NULL AUTO_INCREMENT COMMENT 'NFT 판매 고유 ID',
  `GALLERY_ID` int NOT NULL COMMENT '갤러리 고유 ID',
  `OA` varchar(256) NOT NULL COMMENT '갤러리 주인 지갑 주소',
  `METADATA` varchar(256) NOT NULL COMMENT 'NFT 메타데이터 주소',
  `TOKEN_ID` int NOT NULL COMMENT '토큰 ID',
  PRIMARY KEY (`LOG_ID`),
  UNIQUE KEY `TOKEN_ID` (`TOKEN_ID`),
  KEY `GALLERY_ID` (`GALLERY_ID`),
  CONSTRAINT `log_ibfk_1` FOREIGN KEY (`GALLERY_ID`) REFERENCES `gallery` (`GALLERY_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (13,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmQgNqFAJCucTELNvmq8sqmmh1J3B1dYe7gMFrrA5uUM5z',145),(14,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmYqejDQRK1saKcXHtQbLwriaZYiMqAQPUqUf4hchzmZDZ',123);
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nft`
--

DROP TABLE IF EXISTS `nft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nft` (
  `NFT_ID` int NOT NULL AUTO_INCREMENT COMMENT 'NFT 판매 고유 ID',
  `GALLERY_ID` int NOT NULL COMMENT '갤러리 고유 ID',
  `OA` varchar(256) NOT NULL COMMENT '갤러리 주인 지갑 주소',
  `METADATA` varchar(256) NOT NULL COMMENT 'NFT 메타데이터 주소',
  `ROTATION` varchar(50) NOT NULL COMMENT '회전',
  `TOKEN_ID` int NOT NULL COMMENT '토큰 ID',
  `SCALE` varchar(50) NOT NULL COMMENT '이미지 비율 저장',
  `POSITION` int NOT NULL COMMENT '이미지 전시위치 값',
  `POSITIONXYZ` varchar(50) NOT NULL COMMENT '이미지 전시 위치 xyz값',
  PRIMARY KEY (`NFT_ID`),
  UNIQUE KEY `TOKEN_ID` (`TOKEN_ID`),
  KEY `GALLERY_ID` (`GALLERY_ID`),
  CONSTRAINT `nft_ibfk_1` FOREIGN KEY (`GALLERY_ID`) REFERENCES `gallery` (`GALLERY_ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nft`
--

LOCK TABLES `nft` WRITE;
/*!40000 ALTER TABLE `nft` DISABLE KEYS */;
INSERT INTO `nft` VALUES (2,2,'0x41f0d0083b401ebd2fb4c531742df38343a08455','https://skywalker.infura-ipfs.io/ipfs/QmNUv1k9pAi76aZ5965kjXtU27E1G11u92nQdTGcghkkWB','[0,1.57,0]',64,'[0.2,27,22]',0,'[34,23,-115]'),(19,2,'0x41f0d0083b401ebd2fb4c531742df38343a08455','https://skywalker.infura-ipfs.io/ipfs/Qmasog59PCkwtrqC4DX4nQJ7c71W7byHNsUREAYHQBnPp4','[0,1.57,0]',65,'[0.2,27,22]',3,'[34,23,-118]'),(20,2,'0x41f0d0083b401ebd2fb4c531742df38343a08455','https://skywalker.infura-ipfs.io/ipfs/QmdaWzjGQzn527bX5z35XftCPUmtCkmkFQJjwYcMMFDr8J','[0,1.57,0]',66,'[0.2,27,22]',1,'[34,23,-121]'),(21,2,'0x41f0d0083b401ebd2fb4c531742df38343a08455','https://skywalker.infura-ipfs.io/ipfs/QmShp6GA2Ty5kKpmQc4DRb7FeCK85ByQAaDybkCYwpbo6j','[0,1.57,0]',67,'[0.2,27,22]',4,'[34,23,-124]'),(27,2,'0x41f0d0083b401ebd2fb4c531742df38343a08455','https://skywalker.infura-ipfs.io/ipfs/QmcBCEe6hEXWxF4xsws288mLqiWWVcx1LVwqGfxsswyint','[0,1.57,0]',68,'[0.2,27,22]',2,'[34,23,-123]'),(29,2,'0x41f0d0083b401ebd2fb4c531742df38343a08455','https://skywalker.infura-ipfs.io/ipfs/QmYn2fcfyQqhx67SMrZfaDxiCSkbCzro79FweLn9jD9RK9','[0,1.57,0]',69,'[0.2,27,22]',5,'[34,23,-125]'),(30,2,'0x41f0d0083b401ebd2fb4c531742df38343a08455','https://skywalker.infura-ipfs.io/ipfs/QmXFPoqhFywsnTVj7MzEXQ1tXTniCbpVmM1PcmwQ1cctQo','[0,1.5707963267948966,0]',70,'[0.2,27,22]',7,'[34,23,-127]'),(31,2,'0x41f0d0083b401ebd2fb4c531742df38343a08455','https://skywalker.infura-ipfs.io/ipfs/Qmakb6KEcD3ruJqxN1AMNsmNVmPfDyF9zWDHRGwGtbUdbx','[0,1.57,0]',71,'[0.2,27,22]',10,'[34,23,-129]'),(32,2,'0x41f0d0083b401ebd2fb4c531742df38343a08455','https://skywalker.infura-ipfs.io/ipfs/QmeAcwMMExagCZ2BMWRWjVeD2UiAJhVJ79M8iqJnXMPm7Z','[0,1.57,0]',72,'[0.2,27,22]',11,'[34,23,-131]'),(33,2,'0x41f0d0083b401ebd2fb4c531742df38343a08455','https://skywalker.infura-ipfs.io/ipfs/QmR2LU1TEuGiMGxVwhXwtHMqrwJZaR1M97JCq2nSyxPZNG','[0,1.5707963267948966,0]',73,'[0.2,27,22]',8,'[34,23,-133]'),(38,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmWtLcpZBt3PKbwS8iiuvpmiyudCzVeGTeM3dDguyimtDp','[0,0,0]',84,'[0.2,22,27]',0,'[13,25,-115]'),(39,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmWUyY3LSP4axnpH9NxmBkdJWQ2KhSHhTFpJ3psUMdbxga','[0,0,0]',88,'[0.2,21,27]',2,'[13,25,-183]'),(40,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmRnJHaof7TmNKnoMjJcL3tt2r37hxwYdDtwyCENEKfu7y','[0,1.57,0]',90,'[0.2,32,42]',6,'[35,26,-259]'),(45,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmWeRKAZEijA9PVKBbTiC9iLe4fBmi4jwujFLf21yidrq8','[0,0,0]',87,'[0.2,22,27]',1,'[13,25,-148]'),(48,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmeuNZontunhYiumtbRS1TrYbmRC5kN5P4TN8CKxpLYhUy','[0,0,0]',89,'[0.2,21,27]',5,'[53,25,-182]'),(50,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmYCt6BL8JrhYVSjFnB5VTCUi59kJFmPVVBH8sXr2Qq52d','[0,0,0]',91,'[0.2,18,25]',10,'[127.5,25,-241]'),(51,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmU7RXYbokywZHNoBb222SwzQh4WLmXywJZAwrHYRMKs8e','[0,1.5707963267948966,0]',92,'[0.2,19,20]',7,'[111,25,-216.8]'),(52,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmVAeDXBLH5mrBcoMcnSEyb8a7D3nGjsadfbokuRe5irH1','[0,0,0]',93,'[0.2,20,22]',11,'[162.2,25,-231]'),(53,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmNxBNxNzGBgeeEbJdatqVqf7TEHD1ZNbzcUq7QNiTLmEE','[0,0,0]',94,'[0.2,45,57]',13,'[259,25,-238]'),(55,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmbDa4GVrqHxkkmCaEyjSgTpLt73vvPv7qZAToP6NGDks7','[0,0,0]',95,'[0.2,27,30]',18,'[212,25,-125]'),(56,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmT9cWKzGgU4vy1o4sa5L8aZSJME65Z5bH8qz27HvvAgYv','[0,0,0]',86,'[0.2,21,27]',4,'[53,25,-150]'),(61,8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','https://skywalker.infura-ipfs.io/ipfs/QmNmm7w5zLhPFdAUrxBhQzPB1wfYsbipWXf37y8HXSQrKG','[0,0,0]',85,'[0.2,21,25]',3,'[53,25,-115]'),(63,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmSas52AH69d71suxXWvKwPcfnZ9jmypu5noahWKsXCDTD','[0,3.14,0]',114,'[0.2,27,27]',0,'[13,25,-150]'),(73,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmZ2hbnAXe9mdbjSapAoq4wBS3nUVuPHi2UcsggWFR8K6D','[0,0,0]',113,'[0.2,27,27]',1,'[13,25,-115]'),(74,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmfB8gUYEZmmj1qe4WyswqtPHjNRcsyGLUaw8cFeB2ZVbP','[0,0,0]',135,'[0.2,27,27]',2,'[13,25,-185]'),(84,15,'0x71423145d78af73abc77d884be26059f6cddfa8c','https://skywalker.infura-ipfs.io/ipfs/QmaJwDH6pY4uojYXpjxPgpb8xA1UKnMHsVm8URhTbjdYx3','[0,0.7,0]',6,'[0.2,27,19]',3,'[46,25,-115]'),(85,15,'0x71423145d78af73abc77d884be26059f6cddfa8c','https://skywalker.infura-ipfs.io/ipfs/QmckoEfMLGKqdaMUSDkrtgY1VAdBiF1cyuxDrj2frtX7xx','[0,-0.52,0]',2,'[0.2,27,27]',0,'[26,25,-115]'),(87,4,'0xa2e4ab36704795a0204cb096619e8248e8765f0a','https://skywalker.infura-ipfs.io/ipfs/QmNxcTrUT7ShiRjuhNAyhgatfyHYNF4fH1xr6Txuk6hk9c','[0,1.29,0]',116,'[0.2,23,17]',3,'[39,23,-118]'),(89,4,'0xa2e4ab36704795a0204cb096619e8248e8765f0a','https://skywalker.infura-ipfs.io/ipfs/QmcS8Vyqeuv4gc4MpdZ1exQ6v7DsYvsXbU7bprGLXuSPtF','[0,-1.66,0]',118,'[0.2,23,18]',2,'[23,23,-185]'),(90,4,'0xa2e4ab36704795a0204cb096619e8248e8765f0a','https://skywalker.infura-ipfs.io/ipfs/Qmd7T2MRDEpg2KRYEnWEzbqCJAyroY5Bgn1FiToPG3ijfV','[0,1.5707963267948966,0]',120,'[0.2,41,33]',6,'[33,25,-264]'),(91,4,'0xa2e4ab36704795a0204cb096619e8248e8765f0a','https://skywalker.infura-ipfs.io/ipfs/QmebwgPzzarxHprbjzx6C5y8cWNPrC6ej6fVjVGTwZVH9A','[0,0,0]',121,'[0.2,15,14]',10,'[127.5,25,-241]'),(92,4,'0xa2e4ab36704795a0204cb096619e8248e8765f0a','https://skywalker.infura-ipfs.io/ipfs/QmSeHDeoBCHX9GxVJ2oHJiSfpuC5AcHfm4H8qNNGoLxWQw','[0,0,0]',122,'[0.2,15,14]',11,'[162.2,25,-231]'),(93,4,'0xa2e4ab36704795a0204cb096619e8248e8765f0a','https://skywalker.infura-ipfs.io/ipfs/QmVd2mB4dLssiRzbKhy3cPDGTcG9AGjVYjUcckZkhLfmAk','[0,0,0]',125,'[0.2,42,34]',13,'[259,25,-238]'),(96,16,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa','https://skywalker.infura-ipfs.io/ipfs/QmR2LtEG85T8gPAsmqdtZRVGLanwMW8Lktu5DXKqn47iYC','[0,0,0]',147,'[0.2,27,27]',3,'[53,25,-115]'),(99,16,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa','https://skywalker.infura-ipfs.io/ipfs/QmbPCZvF6Vb9qCzS86EkMxN1BSikDtQsrjubrb9SvAGova','[0,0,0]',127,'[0.2,15,15]',10,'[127.5,25,-241]'),(100,9,'0xb5178d52f82f535d9669231a6b8683085c3dfd01','https://skywalker.infura-ipfs.io/ipfs/QmbRTe3rhHmdK94dVV7UfZc68yVp3BkNhMVf4TL59uxTeZ','[0,0,0]',1,'[0.2,27,27]',3,'[53,25,-115]'),(101,9,'0xb5178d52f82f535d9669231a6b8683085c3dfd01','https://skywalker.infura-ipfs.io/ipfs/QmbuUAdq1CKAeuN5zph4AEtmiYt8MXsLZmzizHUYDhUiQQ','[0,0,0]',156,'[0.2,27,27]',2,'[13,25,-185]'),(102,9,'0xb5178d52f82f535d9669231a6b8683085c3dfd01','https://skywalker.infura-ipfs.io/ipfs/QmRa5h6pwFwVR3J55SK2qhjdLRjLRKMhJzPqFuRVe6fDC7','[0,1.5707963267948966,0]',164,'[0.2,45,45]',6,'[33,25,-264]'),(103,9,'0xb5178d52f82f535d9669231a6b8683085c3dfd01','https://skywalker.infura-ipfs.io/ipfs/QmVnT3ssuw94qvuT3u7CbXYYPgLaeXgBArQdUgshttKXaD','[0,1.5707963267948966,0]',163,'[0.2,30,69]',7,'[111,25,-216.8]'),(105,9,'0xb5178d52f82f535d9669231a6b8683085c3dfd01','https://skywalker.infura-ipfs.io/ipfs/QmZjAWoLdeuvb1U2PBG7hoUzNFPPSNd2cLpei5ooi98kKe','[0,0,0]',161,'[0.2,45,45]',13,'[259,25,-238]'),(107,16,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa','https://skywalker.infura-ipfs.io/ipfs/QmTXqLQhc153T1Xgd8KkrH3psbm1SJ9M7NjLEmvspDZgKX','[0,0,0]',146,'[0.2,45,28]',13,'[259,25,-238]'),(108,9,'0xb5178d52f82f535d9669231a6b8683085c3dfd01','https://skywalker.infura-ipfs.io/ipfs/QmXZnwwB8Yvr9BnM4oUW8hebnSvQNF65HZYxsC8CBF1kKz','[0,0,0]',159,'[0.2,13,13]',14,'[232.7,20,-143]'),(109,9,'0xb5178d52f82f535d9669231a6b8683085c3dfd01','https://skywalker.infura-ipfs.io/ipfs/QmVK7PYskFkHtFhXhM3HxHkWx8XpVK7E3YMtN7Sx7f38Ke','[0,0,0]',158,'[0.2,13,13]',19,'[231.5,20,-103]'),(110,16,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa','https://skywalker.infura-ipfs.io/ipfs/QmeUjCo6KXP1as9xjHDUrYc8URheRTqmMnaKfjBMrr5xUt','[0,0,0]',137,'[0.2,13,13]',14,'[232.7,20,-143]'),(112,16,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa','https://skywalker.infura-ipfs.io/ipfs/QmfKBMZykSGQTAh5QAyL6LW2W8vhuB5sBoYV97hQXNoara','[0,1.5707963267948966,0]',136,'[0.2,45,45]',20,'[231,25,-12]'),(113,16,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa','https://skywalker.infura-ipfs.io/ipfs/Qme9YP8YbuQdotkQ2LcoDv2eF8zMPtL8Nk8E7tcwv2SSKF','[0,1.5707963267948966,0]',134,'[0.2,27,27]',21,'[115,25,-18.5]'),(114,16,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa','https://skywalker.infura-ipfs.io/ipfs/QmRAd8zrX5z5GnsYrhRUuyjRHzH5AS4JNtqyWQPUXad1ed','[0,1.5707963267948966,0]',140,'[0.2,27,27]',24,'[150,25,-58.8]'),(115,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmfYXdEfxuMGRFurzX78f7F4uT27eq8RR5wFu4LFrh8eJw','[0,0,0]',117,'[0.2,27,27]',3,'[53,25,-115]'),(116,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmdNXr2ZLVPSdebaYx4b61td8KYETKBtYsCTsySz2VGYEN','[0,0,0]',126,'[0.2,27,27]',4,'[53,25,-150]'),(117,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmWm5JmdJ5JCMWXnE3yUEYFcRwF9EcKTBJnHANeuZvJnz5','[0,0,0]',143,'[0.2,27,27]',5,'[53,25,-185]'),(118,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/Qmbm5jLFqzZEPAELXEtaQNKWcHuRBiMZ1PwiPCDr1aL5ey','[0,0,0]',133,'[0.2,15,15]',10,'[127.5,25,-241]'),(120,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmbyufGcMMjHn195rfuQEb4DRPceKkoKN61cNSbtFWjCrn','[0,1.5707963267948966,0]',148,'[0.2,15,15]',7,'[111,25,-216.8]'),(121,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/Qmcosh9tQXPzvb9Y2XQudaG6ec9f2bktSCb2JCgLU7FMtX','[0,0,0]',128,'[0.2,15,15]',11,'[162.2,25,-231]'),(122,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmNZ15hNeNbwn9UVhZckAgWffRprgUq2Ukvs8xeKph1fiv','[0,1.5707963267948966,0]',165,'[0.2,15,15]',8,'[146,25,-257]'),(123,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmUB6FV9sx4QKSqMCVJ7vp94jD4kdkR9No9x9EnTAmuAP6','[0,0,0]',162,'[0.2,15,15]',9,'[164,25,-231]'),(124,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmPuNgbavZ9U4z1H19ThPa7T13jPniQyoWE3rVfxNTzFAt','[0,1.5707963267948966,0]',138,'[0.2,15,15]',12,'[181,25,-216.8]'),(125,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmQYK98H8N7Dg6AV88zM4Nt9L7HL14vp2sgCm196cJvBgw','[0,0,0]',115,'[0.2,45,45]',13,'[259,25,-238]'),(127,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmYu2xazorhV7Z6thEFdNR6GWuSGYEJhk8heRYd8oYZDRE','[0,0,0]',139,'[0.2,27,27]',18,'[212,25,-125]'),(128,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmS81miTtFjG6Vup3qk7nMP35RXYVwR32yFouEkBWp5s5n','[0,0,0]',150,'[0.2,13,13]',17,'[231.5,20,-143]'),(129,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmR5MvcmAAd6maugidTRgRVfC7J6N2N7oRWdmc3CFxDmNu','[0,0,0]',152,'[0.2,13,13]',19,'[231.5,20,-103]'),(130,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmUg34PfCp68nWSmmFhKmdi3vWPiR9oNsegz7jja66MHJX','[0,0,0]',157,'[0.2,13,13]',14,'[232.7,20,-143]'),(131,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmRDxzSEtMa4Tt8m7hoifYfXTBiu45ewKrBCMXv7QTjkpL','[0,0,0]',142,'[0.2,13,13]',16,'[232.7,20,-103]'),(132,16,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa','https://skywalker.infura-ipfs.io/ipfs/QmcNh8isVmqatq6Vh3FBHy69jXXfSPHaUzuYFMaKuiin7C','[0,0,0]',149,'[0.2,27,31]',1,'[13,25,-150]'),(134,16,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa','https://skywalker.infura-ipfs.io/ipfs/Qmdi78tnjyRzaSURQoaA4wgfM1FmVotjnK4JTuEsvxqE72','[0,0,0]',129,'[0.2,15,15]',9,'[150,21,-231]'),(136,16,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa','https://skywalker.infura-ipfs.io/ipfs/Qme6hCBjdFZijKvLE1k7JCmfUzGFztjrYcrjSePpKTFpwd','[0,0,0]',130,'[0.2,13,13]',19,'[231.5,20,-103]'),(139,1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','https://skywalker.infura-ipfs.io/ipfs/QmRfEjg9Bu6yiQMtvPziESuJK92Kw9XfyrS23BPLuW5XUH','[0,1.5707963267948966,0]',168,'[0.2,45,45]',20,'[231,25,-12]'),(141,21,'0x5e8a95271c72d133f8c0464085b55e9de5286a73','https://skywalker.infura-ipfs.io/ipfs/QmQgNqFAJCucTELNvmq8sqmmh1J3B1dYe7gMFrrA5uUM5z','[0,-1.52,0]',145,'[0.2,57,42]',1,'[23,25,-150]'),(142,21,'0x5e8a95271c72d133f8c0464085b55e9de5286a73','https://skywalker.infura-ipfs.io/ipfs/QmYqejDQRK1saKcXHtQbLwriaZYiMqAQPUqUf4hchzmZDZ','[0,1.5707963267948966,0]',123,'[0.2,45,45]',6,'[33,25,-264]');
/*!40000 ALTER TABLE `nft` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `USER_ID` int NOT NULL AUTO_INCREMENT COMMENT '유저 고유 ID',
  `OA` varchar(256) NOT NULL COMMENT '유저 지갑 주소',
  `NICKNAME` varchar(20) NOT NULL COMMENT '닉네임(작가명)',
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `OA` (`OA`),
  UNIQUE KEY `NICKNAME` (`NICKNAME`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'0x6a0208ee4311374eb3386866958a5ffe18ae5aa3','EMONG'),(2,'0x41f0d0083b401ebd2fb4c531742df38343a08455','둘기'),(4,'0xa2e4ab36704795a0204cb096619e8248e8765f0a','테라500ml'),(5,'0xd0ec3aaa96693fb93eb77c79bb487c2bc0a9d5f4','코코'),(6,'0xf0043204c8b8f1d44dc4c922be84999e0b190239','감자'),(7,'0x065bc2317685a146511faba338708a53fc6d2534','옥수수콧수염차'),(8,'0xa0df5c8cc5f03a4c8f5a43778c2f83be875788a1','파이썬그자체'),(9,'0xb5178d52f82f535d9669231a6b8683085c3dfd01','노랑뼝아리'),(10,'0xc33300ae6b486b2fddb26dffe772f77262c5763a','악성유저'),(11,'0xd758cc08ece08fd21af9c2407edda47dd9f774a2','aaaaeeeeeeeee'),(12,'0xf5e5f801c4014c36529b507099fbe51856b7967b','SSAFY'),(13,'0xc42d1449259b62cb93a079658640ba7db6ad0d13','NCT드림짱'),(14,'0x71423145d78af73abc77d884be26059f6cddfa8c','무기'),(15,'0xa651045dbeed16d41c37978bcb516ca2b147bbfa','Annie'),(20,'0x5e8a95271c72d133f8c0464085b55e9de5286a73','백구'),(21,'0x2a9beea240db55114ade47a301a16fa89a9e6245','시연자_B109');
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

-- Dump completed on 2022-10-07 12:47:36
