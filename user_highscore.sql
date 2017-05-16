-- phpMyAdmin SQL Dump
-- version 4.0.10.19
-- https://www.phpmyadmin.net
--
-- Host: studentdb-maria.gl.umbc.edu
-- Generation Time: May 16, 2017 at 01:30 AM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 5.4.44

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `abodnya1`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_highscore`
--

CREATE TABLE IF NOT EXISTS `user_highscore` (
  `nameOfPlayer` text NOT NULL,
  `points` int(40) NOT NULL,
  `user_id` int(50) NOT NULL AUTO_INCREMENT,
  `timeOfOcc` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
