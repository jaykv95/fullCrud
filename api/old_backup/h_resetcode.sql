-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2019 at 10:12 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heleo`
--

-- --------------------------------------------------------

--
-- Table structure for table `h_resetcode`
--

CREATE TABLE `h_resetcode` (
  `resetcode_id` int(11) NOT NULL,
  `resetcode_user_email` varchar(100) NOT NULL,
  `resetcode_code` varchar(200) NOT NULL,
  `resetcode_createddate` datetime NOT NULL,
  `resetcode_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `h_resetcode`
--

INSERT INTO `h_resetcode` (`resetcode_id`, `resetcode_user_email`, `resetcode_code`, `resetcode_createddate`, `resetcode_status`) VALUES
(3, 'rajesh@gmail.com', '343434', '2019-11-04 19:19:48', 1),
(4, 'rajesh@gmail.com', '343434', '2019-11-04 20:59:35', 1),
(5, 'rajesh@gmail.com', '343434', '2019-11-04 21:08:32', 1),
(6, 'rajesh@gmail.com', 'FYlR9qan', '2019-11-04 21:11:09', 1),
(7, 'rajesh@gmail.com', 'rW2UEohf', '2019-11-05 10:24:55', 1),
(8, 'rajesh@gmail.com', 'vZjWUBEL', '2019-11-05 10:25:57', 1),
(9, 'rajesh@gmail.com', '3lsQoCar', '2019-11-05 10:28:12', 1),
(10, 'rajesh@gmail.com', 'JA300Yji', '2019-11-05 10:37:42', 1),
(11, 'rajesh@gmail.com', 'bof7yT6P', '2019-11-05 10:38:41', 1),
(12, 'rajesh@gmail.com', 'RjLz50QX', '2019-11-05 10:53:38', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `h_resetcode`
--
ALTER TABLE `h_resetcode`
  ADD PRIMARY KEY (`resetcode_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `h_resetcode`
--
ALTER TABLE `h_resetcode`
  MODIFY `resetcode_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
