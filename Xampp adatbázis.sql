-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Máj 31. 19:27
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `beadando`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `active`
--

CREATE TABLE `active` (
  `Komp` varchar(255) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `adatok`
--

CREATE TABLE `adatok` (
  `Komponens` varchar(255) NOT NULL,
  `Adat` int(11) NOT NULL,
  `Felvet` datetime NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `adatok`
--

INSERT INTO `adatok` (`Komponens`, `Adat`, `Felvet`, `id`) VALUES
('Bakos1', 3, '2023-05-30 13:38:46', 1),
('Bakos', 3, '2023-05-30 13:41:50', 2),
('Bakos', 3, '2023-05-30 13:42:01', 3),
('Bakos', 3, '2023-05-30 13:42:01', 4),
('Bakos', 3, '2023-05-30 13:42:01', 5),
('Bakos', 3, '2023-05-30 13:42:01', 6),
('Bakos', 3, '2023-05-30 13:42:01', 7),
('Bakos', 3, '2023-05-30 13:42:01', 8),
('Bakos', 3, '2023-05-30 13:42:01', 9);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bejelentkezes`
--

CREATE TABLE `bejelentkezes` (
  `email` varchar(255) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `hasznal` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hiba`
--

CREATE TABLE `hiba` (
  `Adat` int(11) NOT NULL,
  `Idopillanat` datetime NOT NULL DEFAULT current_timestamp(),
  `Komponens` varchar(255) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `active`
--
ALTER TABLE `active`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `adatok`
--
ALTER TABLE `adatok`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `hiba`
--
ALTER TABLE `hiba`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `adatok`
--
ALTER TABLE `adatok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
