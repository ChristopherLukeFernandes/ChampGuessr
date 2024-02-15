let champNum, champName, gender, position, species, resource, rangeType, region, year, guessChampName;
let isUsed = new Array(167);
class Champion {
    constructor(champNum, champName, gender, position, species, resource, rangeType, region, year) {
        this.champNum = champNum;
        this.champName = champName;
        this.gender = gender;
        this.position = position;
        this.species = species;
        this.resource = resource;
        this.rangeType = rangeType;
        this.region = region;
        this.year = year;
    }
}

const userGuessForm = document.querySelector(".userGuessForm");
const userGuessInput = document.querySelector(".userGuessInput");
const table = document.querySelector("#info-table").getElementsByTagName("tbody")[0];

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
}

const champList = [
    new Champion(1, "Aatrox", "Male", "Top", "Darkin", "None", "Melee", "Runeterra", 2013),
    new Champion(2, "Ahri", "Female", "Mid", "Vastayan", "Mana", "Ranged", "Ionia", 2011),
    new Champion(3, "Akali", "Female", "Mid", "Human", "Energy", "Melee", "Ionia", 2013),
    new Champion(4, "Akshan", "Male", "Mid", "Human", "Mana", "Ranged", "Shurima", 2021),
    new Champion(5, "Alistar", "Male", "Support", "Minotaur", "Mana", "Melee", "Runeterra", 2009),
    new Champion(6, "Amumu", "Male", "Jungle", "Yordle", "Mana", "Melee", "Shurima", 2009),
    new Champion(7, "Anivia", "Female", "Mid", "God", "Mana", "Ranged", "Freljord", 2009),
    new Champion(8, "Annie", "Female", "Mid", "Human", "Mana", "Ranged", "Noxus", 2009),
    new Champion(9, "Aphelios", "Male", "Bot", "Human", "Mana", "Ranged", "Targon", 2019),
    new Champion(10, "Ashe", "Female", "Bot", "Iceborn", "Mana", "Ranged", "Freljord", 2009),
    new Champion(11, "Aurelion Sol", "Male", "Mid", "Celestial", "Mana", "Ranged", "Targon", 2016),
    new Champion(12, "Azir", "Male", "Mid", "Ascended", "Mana", "Ranged", "Shurima", 2014),
    new Champion(13, 'Bard', 'Male', 'Support', 'Celestial', 'Mana', 'Ranged', 'Runeterra', 2015),
    new Champion(14, "Bel'veth", 'Female', 'Jungle', 'Void-Being', 'Manaless', 'Melee', 'Void', 2022),
    new Champion(15, 'Blitzcrank', 'Other', 'Support', 'Golem', 'Mana', 'Melee', 'Zaun', 2009),
    new Champion(16, 'Brand', 'Male', 'Support', 'Human', 'Mana', 'Ranged', 'Freljord', 2011),
    new Champion(17, 'Braum', 'Male', 'Support', 'Iceborn', 'Mana', 'Melee', 'Freljord', 2014),
    new Champion(18, 'Briar', 'Female', 'Jungle', 'Golem', 'Health costs', 'Melee', 'Noxus', 2023),
    new Champion(19, 'Caitlyn', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Piltover', 2011),
    new Champion(20, 'Camille', 'Female', 'Top', 'Cyborg', 'Mana', 'Melee', 'Piltover', 2016),
    new Champion(21, 'Cassiopeia', 'Female', 'Middle', 'Human', 'Mana', 'Ranged', 'Noxus', 2010),
    new Champion(22, "Cho'gath", 'Male', 'Top', 'Void-Being', 'Mana', 'Melee', 'Void', 2009),
    new Champion(23, 'Corki', 'Male', 'Middle', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2009),
    new Champion(24, 'Darius', 'Male', 'Top', 'Human', 'Mana', 'Melee', 'Noxus', 2012),
    new Champion(25, 'Diana', 'Female', 'Middle', 'Aspect', 'Mana', 'Melee', 'Targon', 2012),
    new Champion(26, 'Dr.Mundo', 'Male', 'Top', 'Human', 'Health costs', 'Melee', 'Zaun', 2009),
    new Champion(27, 'Draven', 'Male', 'Bottom', 'Human', 'Mana', 'Ranged', 'Noxus', 2012),
    new Champion(28, 'Ekko', 'Male', 'Middle', 'Human', 'Mana', 'Melee', 'Zaun', 2015),
    new Champion(29, 'Elise', 'Female', 'Jungle', 'Human', 'Mana', 'Both', 'Shadow Isles', 2012),
    new Champion(30, 'Evelynn', 'Female', 'Jungle', 'Demon', 'Mana', 'Melee', 'Runeterra', 2009),
    new Champion(31, 'Ezreal', 'Male', 'Bottom', 'Human', 'Mana', 'Ranged', 'Piltover', 2010),
    new Champion(32, 'Fiddlesticks', 'Other', 'Jungle', 'Demon', 'Mana', 'Ranged', 'Runeterra', 2009),
    new Champion(33, 'Fiora', 'Female', 'Top', 'Human', 'Mana', 'Melee', 'Demacia', 2012),
    new Champion(34, 'Fizz', 'Male', 'Middle', 'Yordle', 'Mana', 'Melee', 'Bilgewater', 2011),
    new Champion(35, 'Galio', 'Male', 'Middle', 'Golem', 'Mana', 'Melee', 'Demacia', 2010),
    new Champion(36, 'Gangplank', 'Male', 'Top', 'Human', 'Mana', 'Melee', 'Bilgewater', 2009),
    new Champion(37, 'Garen', 'Male', 'Top', 'Human', 'Manaless', 'Melee', 'Demacia', 2010),
    new Champion(38, 'Gnar', 'Male', 'Top', 'Yordle', 'Rage', 'Both', 'Freljord', 2014),
    new Champion(39, 'Gragas', 'Male', 'Top', 'Human', 'Mana', 'Melee', 'Freljord', 2010),
    new Champion(40, 'Graves', 'Male', 'Jungle', 'Human', 'Mana', 'Ranged', 'Bilgewater', 2011),
    new Champion(41, 'Gwen', 'Female', 'Top', 'Human', 'Mana', 'Melee', 'Shadow Isles', 2021),
    new Champion(42, 'Hecarim', 'Male', 'Jungle', 'Undead', 'Mana', 'Melee', 'Shadow Isles', 2012),
    new Champion(43, 'Heimerdinger', 'Male', 'Middle', 'Yordle', 'Mana', 'Ranged', 'Piltover', 2009),
    new Champion(44, 'Hwei', 'Male', 'Middle', 'Human', 'Mana', 'Ranged', 'Ionia', 2023),
    new Champion(45, 'Illaoi', 'Female', 'Top', 'Human', 'Mana', 'Melee', 'Bilgewater', 2015),
    new Champion(46, 'Irelia', 'Female', 'Top', 'Human', 'Mana', 'Melee', 'Ionia', 2010),
    new Champion(47, 'Ivern', 'Male', 'Jungle', 'Magically Altered', 'Mana', 'Ranged', 'Ionia', 2016),
    new Champion(48, 'Janna', 'Female', 'Support', 'God', 'Mana', 'Ranged', 'Zaun', 2009),
    new Champion(49, 'Jarvan IV', 'Male', 'Jungle', 'Human', 'Mana', 'Melee', 'Demacia', 2011),
    new Champion(50, 'Jax', 'Male', 'Top', 'Unknown', 'Mana', 'Melee', 'Runeterra', 2009),
    new Champion(51, 'Jayce', 'Male', 'Top', 'Human', 'Mana', 'Both', 'Piltover', 2012),
    new Champion(52, 'Jhin', 'Male', 'Bottom', 'Human', 'Mana', 'Ranged', 'Ionia', 2016),
    new Champion(53, 'Jinx', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Zaun', 2013),
    new Champion(54, "K'sante", 'Male', 'Top', 'Human', 'Mana', 'Melee', 'Shurima', 2022),
    new Champion(55, "Kai'sa", 'Female', 'Bottom', 'Void-Being', 'Mana', 'Ranged', 'Void', 2018),
    new Champion(56, 'Kalista', 'Female', 'Bottom', 'Undead', 'Mana', 'Ranged', 'Shadow Isles', 2014),
    new Champion(57, 'Karma', 'Female', 'Support', 'Spiritualist', 'Mana', 'Ranged', 'Ionia', 2011),
    new Champion(58, 'Karthus', 'Male', 'Jungle', 'Undead', 'Mana', 'Ranged', 'Shadow Isles', 2009),
    new Champion(59, 'Kassadin', 'Male', 'Middle', 'Void-Being', 'Mana', 'Melee', 'Void', 2009),
    new Champion(60, 'Katarina', 'Female', 'Middle', 'Human', 'Manaless', 'Melee', 'Noxus', 2009),
    new Champion(61, 'Kayle', 'Female', 'Top', 'Aspect', 'Mana', 'Both', 'Demacia', 2009),
    new Champion(62, 'Kayn', 'Male', 'Jungle', 'Magically Altered', 'Mana', 'Melee', 'Ionia', 2017),
    new Champion(63, 'Kennen', 'Male', 'Top', 'Yordle', 'Energy', 'Ranged', 'Ionia', 2010),
    new Champion(64, "Kha'zix", 'Male', 'Jungle', 'Void-Being', 'Mana', 'Melee', 'Void', 2012),
    new Champion(65, 'Kindred', 'Other', 'Jungle', 'God', 'Mana', 'Ranged', 'Runeterra', 2015),
    new Champion(66, 'Kled', 'Male', 'Top', 'Yordle', 'Courage', 'Melee', 'Noxus', 2016),
    new Champion(67, "Kog'maw", 'Male', 'Bottom', 'Void-Being', 'Mana', 'Ranged', 'Void', 2010),
    new Champion(68, 'Leblanc', 'Female', 'Middle', 'Magically Altered', 'Mana', 'Ranged', 'Noxus', 2010),
    new Champion(69, 'Lee Sin', 'Male', 'Jungle', 'Spiritualist', 'Energy', 'Melee', 'Ionia', 2011),
    new Champion(70, 'Leona', 'Female', 'Support', 'Aspect', 'Mana', 'Melee', 'Targon', 2011),
    new Champion(71, 'Lillia', 'Female', 'Jungle', 'Spirit', 'Mana', 'Melee', 'Ionia', 2020),
    new Champion(72, 'Lissandra', 'Female', 'Middle', 'Iceborn', 'Mana', 'Ranged', 'Freljord', 2013),
    new Champion(73, 'Lucian', 'Male', 'Bottom', 'Human', 'Mana', 'Ranged', 'Demacia', 2013),
    new Champion(74, 'Lulu', 'Female', 'Support', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2012),
    new Champion(75, 'Lux', 'Female', 'Support', 'Human', 'Mana', 'Ranged', 'Demacia', 2010),
    new Champion(76, 'Malphite', 'Male', 'Top', 'Golem', 'Mana', 'Melee', 'Ixtal', 2009),
    new Champion(77, 'Malzahar', 'Male', 'Middle', 'Void-Being', 'Mana', 'Ranged', 'Void', 2010),
    new Champion(78, 'Maokai', 'Male', 'Support', 'Spirit', 'Mana', 'Melee', 'Shadow Isles', 2011),
    new Champion(79, 'Master Yi', 'Male', 'Jungle', 'Spiritualist', 'Mana', 'Melee', 'Ionia', 2009),
    new Champion(80, 'Milio', 'Male', 'Support', 'Human', 'Mana', 'Ranged', 'Ixtal', 2023),
    new Champion(81, 'Miss Fortune', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Bilgewater', 2010),
    new Champion(82, 'Mordekaiser', 'Male', 'Top', 'Revenant', 'Shield', 'Melee', 'Noxus', 2010),
    new Champion(83, 'Morgana', 'Female', 'Support', 'Aspect', 'Mana', 'Ranged', 'Demacia', 2009),
    new Champion(84, 'Naafiri', 'Female', 'Middle', 'Darkin', 'Mana', 'Melee', 'Shurima', 2023),
    new Champion(85, 'Nami', 'Female', 'Support', 'Vastayan', 'Mana', 'Ranged', 'Bilgewater', 2012),
    new Champion(86, 'Nasus', 'Male', 'Top', 'Ascended', 'Mana', 'Melee', 'Shurima', 2009),
    new Champion(87, 'Nautilus', 'Male', 'Support', 'Revenant', 'Mana', 'Melee', 'Bilgewater', 2012),
    new Champion(88, 'Neeko', 'Female', 'Middle', 'Vastayan', 'Mana', 'Ranged', 'Ixtal', 2018),
    new Champion(89, 'Nidalee', 'Female', 'Jungle', 'Human', 'Mana', 'Both', 'Ixtal', 2009),
    new Champion(90, 'Nilah', 'Female', 'Bottom', 'Human', 'Mana', 'Melee', 'Bilgewater', 2022),
    new Champion(91, 'Nocturne', 'Male', 'Jungle', 'Demon', 'Mana', 'Melee', 'Runeterra', 2011),
    new Champion(92, 'Nunu & Willump', 'Male', 'Jungle', 'Human', 'Mana', 'Melee', 'Freljord', 2009),
    new Champion(93, 'Olaf', 'Male', 'Top', 'Iceborn', 'Mana', 'Melee', 'Freljord', 2010),
    new Champion(94, 'Orianna', 'Female', 'Middle', 'Golem', 'Mana', 'Ranged', 'Piltover', 2011),
    new Champion(95, 'Ornn', 'Male', 'Top', 'God', 'Mana', 'Melee', 'Freljord', 2017),
    new Champion(96, 'Pantheon', 'Male', 'Middle', 'Aspect', 'Mana', 'Melee', 'Targon', 2010),
    new Champion(97, 'Poppy', 'Female', 'Top', 'Yordle', 'Mana', 'Melee', 'Demacia', 2010),
    new Champion(98, 'Pyke', 'Male', 'Support', 'Revenant', 'Mana', 'Melee', 'Bilgewater', 2018),
    new Champion(99, 'Qiyana', 'Female', 'Middle', 'Human', 'Mana', 'Melee', 'Ixtal', 2019),
    new Champion(100, 'Quinn', 'Female', 'Top', 'Human', 'Mana', 'Ranged', 'Demacia', 2013),
    new Champion(101, 'Rakan', 'Male', 'Support', 'Vastayan', 'Mana', 'Melee', 'Ionia', 2017),
    new Champion(102, 'Rammus', 'Male', 'Jungle', 'Ascended', 'Mana', 'Melee', 'Shurima', 2009),
    new Champion(103, "Rek'sai", 'Female', 'Jungle', 'Void-Being', 'Rage', 'Melee', 'Void', 2014),
    new Champion(104, 'Rell', 'Female', 'Support', 'Human', 'Mana', 'Melee', 'Noxus', 2020),
    new Champion(105, 'Renata Glasc', 'Female', 'Support', 'Human', 'Mana', 'Ranged', 'Zaun', 2022),
    new Champion(106, 'Renekton', 'Male', 'Top', 'Ascended', 'Fury', 'Melee', 'Shurima', 2011),
    new Champion(107, 'Rengar', 'Male', 'Jungle', 'Vastayan', 'Ferocity', 'Melee', 'Ixtal', 2012),
    new Champion(108, 'Riven', 'Female', 'Top', 'Human', 'Manaless', 'Melee', 'Ionia', 2011),
    new Champion(109, 'Rumble', 'Male', 'Top', 'Yordle', 'Heat', 'Melee', 'Bandle City', 2011),
    new Champion(110, 'Ryze', 'Male', 'Middle', 'Human', 'Mana', 'Ranged', 'Runeterra', 2009),
    new Champion(111, 'Samira', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Noxus', 2020),
    new Champion(112, 'Sejuani', 'Female', 'Jungle', 'Iceborn', 'Mana', 'Melee', 'Freljord', 2012),
    new Champion(113, 'Senna', 'Female', 'Support', 'Undead', 'Mana', 'Ranged', 'Shadow Isles', 2019),
    new Champion(114, 'Seraphine', 'Female', 'Support', 'Human', 'Mana', 'Ranged', 'Zaun', 2020),
    new Champion(115, 'Sett', 'Male', 'Top', 'Vastayan', 'Grit', 'Melee', 'Ionia', 2020),
    new Champion(116, 'Shaco', 'Male', 'Jungle', 'Spirit', 'Mana', 'Melee', 'Runeterra', 2009),
    new Champion(117, 'Shen', 'Male', 'Top', 'Human', 'Energy', 'Melee', 'Ionia', 2010),
    new Champion(118, 'Shyvana', 'Female', 'Jungle', 'Dragon', 'Fury', 'Melee', 'Demacia', 2011),
    new Champion(119, 'Singed', 'Male', 'Top', 'Human', 'Mana', 'Melee', 'Zaun', 2009),
    new Champion(120, 'Sion', 'Male', 'Top', 'Revenant', 'Mana', 'Melee', 'Noxus', 2009),
    new Champion(121, 'Sivir', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Shurima', 2009),
    new Champion(122, 'Skarner', 'Male', 'Jungle', 'Brackern', 'Mana', 'Melee', 'Shurima', 2011),
    new Champion(123, 'Sona', 'Female', 'Support', 'Human', 'Mana', 'Ranged', 'Demacia', 2010),
    new Champion(124, 'Soraka', 'Female', 'Support', 'Celestial', 'Mana', 'Ranged', 'Targon', 2009),
    new Champion(125, 'Swain', 'Male', 'Support', 'Human', 'Mana', 'Ranged', 'Noxus', 2010),
    new Champion(126, 'Sylas', 'Male', 'Middle', 'Human', 'Mana', 'Melee', 'Demacia', 2019),
    new Champion(127, 'Syndra', 'Female', 'Middle', 'Human', 'Mana', 'Ranged', 'Ionia', 2012),
    new Champion(128, 'Tahm Kench', 'Male', 'Top', 'Demon', 'Mana', 'Melee', 'Bilgewater', 2015),
    new Champion(129, 'Taliyah', 'Female', 'Middle', 'Human', 'Mana', 'Ranged', 'Shurima', 2016),
    new Champion(130, 'Talon', 'Male', 'Middle', 'Human', 'Mana', 'Melee', 'Noxus', 2011),
    new Champion(131, 'Taric', 'Male', 'Support', 'Aspect', 'Mana', 'Melee', 'Targon', 2009),
    new Champion(132, 'Teemo', 'Male', 'Top', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2009),
    new Champion(133, 'Thresh', 'Male', 'Support', 'Undead', 'Mana', 'Ranged', 'Shadow Isles', 2013),
    new Champion(134, 'Tristana', 'Female', 'Bottom', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2009),
    new Champion(135, 'Trundle', 'Male', 'Top', 'Iceborn', 'Mana', 'Melee', 'Freljord', 2010),
    new Champion(136, 'Tryndamere', 'Male', 'Top', 'Human', 'Fury', 'Melee', 'Freljord', 2009),
    new Champion(137, 'Twisted Fate', 'Male', 'Middle', 'Human', 'Mana', 'Ranged', 'Bilgewater', 2009),
    new Champion(138, 'Twitch', 'Male', 'Bottom', 'Chemically Altered', 'Mana', 'Ranged', 'Zaun', 2009),
    new Champion(139, 'Udyr', 'Male', 'Jungle', 'Spiritualist', 'Mana', 'Melee', 'Freljord', 2009),
    new Champion(140, 'Urgot', 'Male', 'Top', 'Chemically Altered', 'Mana', 'Ranged', 'Zaun', 2010),
    new Champion(141, 'Varus', 'Male', 'Bottom', 'Darkin', 'Mana', 'Ranged', 'Ionia', 2012),
    new Champion(142, 'Vayne', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Demacia', 2011),
    new Champion(143, 'Veigar', 'Male', 'Middle', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2009),
    new Champion(144, "Vel'koz", 'Male', 'Middle', 'Void-Being', 'Mana', 'Ranged', 'Void', 2014),
    new Champion(145, 'Vex', 'Female', 'Middle', 'Yordle', 'Mana', 'Ranged', 'Shadow Isles', 2021),
    new Champion(146, 'Vi', 'Female', 'Jungle', 'Human', 'Mana', 'Melee', 'Zaun', 2012),
    new Champion(147, 'Viego', 'Male', 'Jungle', 'Undead', 'Manaless', 'Melee', 'Shadow Isles', 2021),
    new Champion(148, 'Viktor', 'Male', 'Middle', 'Human', 'Mana', 'Ranged', 'Zaun', 2011),
    new Champion(149, 'Vladimir', 'Male', 'Middle', 'Human', 'Bloodthirst', 'Ranged', 'Noxus', 2010),
    new Champion(150, 'Volibear', 'Male', 'Top', 'God', 'Mana', 'Melee', 'Freljord', 2011),
    new Champion(151, 'Warwick', 'Male', 'Jungle', 'Chemically Altered', 'Mana', 'Melee', 'Zaun', 2009),
    new Champion(152, 'Wukong', 'Male', 'Top', 'Vastayan', 'Mana', 'Melee', 'Ionia', 2011),
    new Champion(153, 'Xayah', 'Female', 'Bottom', 'Vastayan', 'Mana', 'Ranged', 'Ionia', 2017),
    new Champion(154, 'Xerath', 'Male', 'Middle', 'Ascended', 'Mana', 'Ranged', 'Shurima', 2011),
    new Champion(155, 'Xin Zhao', 'Male', 'Jungle', 'Human', 'Mana', 'Melee', 'Demacia', 2010),
    new Champion(156, 'Yasuo', 'Male', 'Middle', 'Human', 'Flow', 'Melee', 'Ionia', 2013),
    new Champion(157, 'Yone', 'Male', 'Middle', 'Magically Altered', 'Manaless', 'Melee', 'Ionia', 2020),
    new Champion(158, 'Torick', 'Male', 'Top', 'Human', 'Mana', 'Melee', 'Shadow Isles', 2011),
    new Champion(159, 'Yuumi', 'Female', 'Support', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2019),
    new Champion(160, 'Zac', 'Male', 'Jungle', 'Golem', 'Health costs', 'Melee', 'Zaun', 2013),
    new Champion(161, 'Zed', 'Male', 'Middle', 'Human', 'Energy', 'Melee', 'Ionia', 2012),
    new Champion(162, 'Zeri', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Zaun', 2022),
    new Champion(163, 'Ziggs', 'Male', 'Middle', 'Yordle', 'Mana', 'Ranged', 'Zaun', 2012),
    new Champion(164, 'Zilean', 'Male', 'Support', 'Human', 'Mana', 'Ranged', 'Shurima', 2009),
    new Champion(165, 'Zoe', 'Female', 'Middle', 'Aspect', 'Mana', 'Ranged', 'Targon', 2017),
    new Champion(166, 'Zyra', 'Female', 'Support', 'Unknown', 'Mana', 'Ranged', 'Ixtal', 2012)
];
let ansChamp = champList[Math.floor(Math.random() * 12)];
let champGuess;

userGuessForm.addEventListener("submit", async event => {
    event.preventDefault();
    guessChampName = await userGuessInput.value;
    if (guessChampName) {
        guessChampName = guessChampName.toLowerCase();
        champGuess = getChampNum(guessChampName);
        compareChampInfo(champGuess, ansChamp);
    }
    else { displayError("Please enter a Champion!") }
});

function compareChampInfo(champGuess, ansChamp) {
    let row = table.insertRow(-1);
    if (champGuess) {
        if (champGuess.champNum === ansChamp.champNum) {
            console.log("You Win");
        }
        row.insertCell(0).textContent = champGuess.champName;
        row.insertCell(1).textContent = champGuess.gender;
        row.insertCell(2).textContent = champGuess.position;
        row.insertCell(3).textContent = champGuess.species;
        row.insertCell(4).textContent = champGuess.resource;
        row.insertCell(5).textContent = champGuess.rangeType;
        row.insertCell(6).textContent = champGuess.region;
        row.insertCell(7).textContent = champGuess.year;
    }
}

function getChampNum() {
    switch (guessChampName) {
        case `aatrox`:
            if (isUsed[0] == null) {
                champGuess = champList[0];
                isValid = true;
                isUsed[0] = 0;
                console.log(isUsed[0]);
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `ahri`:
            if (isUsed[1] == null) {
                champGuess = champList[1];
                isValid = true;
                isUsed[1] = 1;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `akali`:
            if (isUsed[2] == null) {
                champGuess = champList[2];
                isValid = true;
                isUsed[2] = 2;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `akshan`:
            if (isUsed[3] == null) {
                champGuess = champList[3];
                isValid = true;
                isUsed[3] = 3;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `alistar`:
            if (isUsed[4] == null) {
                champGuess = champList[4];
                isValid = true;
                isUsed[4] = 4;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `amumu`:
            if (isUsed[5] == null) {
                champGuess = champList[5];
                isValid = true;
                isUsed[5] = 5;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `anivia`:
            if (isUsed[6] == null) {
                champGuess = champList[6];
                isValid = true;
                isUsed[6] = 6;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `annie`:
            if (isUsed[7] == null) {
                champGuess = champList[7];
                isValid = true;
                isUsed[7] = 7;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `aphelios`:
            if (isUsed[8] == null) {
                champGuess = champList[8];
                isValid = true;
                isUsed[8] = 8;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `ashe`:
            if (isUsed[9] == null) {
                champGuess = champList[9];
                isValid = true;
                isUsed[9] = 9;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `aurelion sol`:
            if (isUsed[10] == null) {
                champGuess = champList[10];
                isValid = true;
                isUsed[10] = 10;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `azir`:
            if (isUsed[11] == null) {
                champGuess = champList[11];
                isValid = true;
                isUsed[11] = 11;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `bard`:
            if (isUsed[12] == null) {
                champGuess = champList[12];
                isValid = true;
                isUsed[12] = 12;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `bel'veth`:
            if (isUsed[13] == null) {
                champGuess = champList[13];
                isValid = true;
                isUsed[13] = 13;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `blitzcrank`:
            if (isUsed[14] == null) {
                champGuess = champList[14];
                isValid = true;
                isUsed[14] = 14;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `brand`:
            if (isUsed[15] == null) {
                champGuess = champList[15];
                isValid = true;
                isUsed[15] = 15;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `braum`:
            if (isUsed[16] == null) {
                champGuess = champList[16];
                isValid = true;
                isUsed[16] = 16;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `briar`:
            if (isUsed[17] == null) {
                champGuess = champList[17];
                isValid = true;
                isUsed[17] = 17;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `caitlyn`:
            if (isUsed[18] == null) {
                champGuess = champList[18];
                isValid = true;
                isUsed[18] = 18;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `camille`:
            if (isUsed[19] == null) {
                champGuess = champList[19];
                isValid = true;
                isUsed[19] = 19;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `cassiopeia`:
            if (isUsed[20] == null) {
                champGuess = champList[20];
                isValid = true;
                isUsed[20] = 20;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `cho'gath`:
            if (isUsed[21] == null) {
                champGuess = champList[21];
                isValid = true;
                isUsed[21] = 21;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `corki`:
            if (isUsed[22] == null) {
                champGuess = champList[22];
                isValid = true;
                isUsed[22] = 22;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `darius`:
            if (isUsed[23] == null) {
                champGuess = champList[23];
                isValid = true;
                isUsed[23] = 23;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `diana`:
            if (isUsed[24] == null) {
                champGuess = champList[24];
                isValid = true;
                isUsed[24] = 24;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `dr. mundo`:
            if (isUsed[25] == null) {
                champGuess = champList[25];
                isValid = true;
                isUsed[25] = 25;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `draven`:
            if (isUsed[26] == null) {
                champGuess = champList[26];
                isValid = true;
                isUsed[26] = 26;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `ekko`:
            if (isUsed[27] == null) {
                champGuess = champList[27];
                isValid = true;
                isUsed[27] = 27;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `elise`:
            if (isUsed[28] == null) {
                champGuess = champList[28];
                isValid = true;
                isUsed[28] = 28;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `evelynn`:
            if (isUsed[29] == null) {
                champGuess = champList[29];
                isValid = true;
                isUsed[29] = 29;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `ezreal`:
            if (isUsed[30] == null) {
                champGuess = champList[30];
                isValid = true;
                isUsed[30] = 30;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `fiddlesticks`:
            if (isUsed[31] == null) {
                champGuess = champList[31];
                isValid = true;
                isUsed[31] = 31;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `fiora`:
            if (isUsed[32] == null) {
                champGuess = champList[32];
                isValid = true;
                isUsed[32] = 32;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `fizz`:
            if (isUsed[33] == null) {
                champGuess = champList[33];
                isValid = true;
                isUsed[33] = 33;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `galio`:
            if (isUsed[34] == null) {
                champGuess = champList[34];
                isValid = true;
                isUsed[34] = 34;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `gangplank`:
            if (isUsed[35] == null) {
                champGuess = champList[35];
                isValid = true;
                isUsed[35] = 35;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `garen`:
            if (isUsed[36] == null) {
                champGuess = champList[36];
                isValid = true;
                isUsed[36] = 36;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `gnar`:
            if (isUsed[37] == null) {
                champGuess = champList[37];
                isValid = true;
                isUsed[37] = 37;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `gragas`:
            if (isUsed[38] == null) {
                champGuess = champList[38];
                isValid = true;
                isUsed[38] = 38;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `graves`:
            if (isUsed[39] == null) {
                champGuess = champList[39];
                isValid = true;
                isUsed[39] = 39;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `gwen`:
            if (isUsed[40] == null) {
                champGuess = champList[40];
                isValid = true;
                isUsed[40] = 40;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `hecarim`:
            if (isUsed[41] == null) {
                champGuess = champList[41];
                isValid = true;
                isUsed[41] = 41;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `heimerdinger`:
            if (isUsed[42] == null) {
                champGuess = champList[42];
                isValid = true;
                isUsed[42] = 42;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `hwei`:
            if (isUsed[43] == null) {
                champGuess = champList[43];
                isValid = true;
                isUsed[43] = 43;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `illaoi`:
            if (isUsed[44] == null) {
                champGuess = champList[44];
                isValid = true;
                isUsed[44] = 44;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `irelia`:
            if (isUsed[45] == null) {
                champGuess = champList[45];
                isValid = true;
                isUsed[45] = 45;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `ivern`:
            if (isUsed[46] == null) {
                champGuess = champList[46];
                isValid = true;
                isUsed[46] = 46;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `janna`:
            if (isUsed[47] == null) {
                champGuess = champList[47];
                isValid = true;
                isUsed[47] = 47;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `jarvan iv`:
            if (isUsed[48] == null) {
                champGuess = champList[48];
                isValid = true;
                isUsed[48] = 48;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `jax`:
            if (isUsed[49] == null) {
                champGuess = champList[49];
                isValid = true;
                isUsed[49] = 49;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `jayce`:
            if (isUsed[50] == null) {
                champGuess = champList[50];
                isValid = true;
                isUsed[50] = 50;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `jhin`:
            if (isUsed[51] == null) {
                champGuess = champList[51];
                isValid = true;
                isUsed[51] = 51;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `jinx`:
            if (isUsed[52] == null) {
                champGuess = champList[52];
                isValid = true;
                isUsed[52] = 52;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `k'sante`:
            if (isUsed[53] == null) {
                champGuess = champList[53];
                isValid = true;
                isUsed[53] = 53;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `kai'sa`:
            if (isUsed[54] == null) {
                champGuess = champList[54];
                isValid = true;
                isUsed[54] = 54;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `kalista`:
            if (isUsed[55] == null) {
                champGuess = champList[55];
                isValid = true;
                isUsed[55] = 55;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `karma`:
            if (isUsed[56] == null) {
                champGuess = champList[56];
                isValid = true;
                isUsed[56] = 56;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `karthus`:
            if (isUsed[57] == null) {
                champGuess = champList[57];
                isValid = true;
                isUsed[57] = 57;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `kassadin`:
            if (isUsed[58] == null) {
                champGuess = champList[58];
                isValid = true;
                isUsed[58] = 58;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `katarina`:
            if (isUsed[59] == null) {
                champGuess = champList[59];
                isValid = true;
                isUsed[59] = 59;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `kayle`:
            if (isUsed[60] == null) {
                champGuess = champList[60];
                isValid = true;
                isUsed[60] = 60;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `kayn`:
            if (isUsed[61] == null) {
                champGuess = champList[61];
                isValid = true;
                isUsed[61] = 61;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `kennen`:
            if (isUsed[62] == null) {
                champGuess = champList[62];
                isValid = true;
                isUsed[62] = 62;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `kha'zix`:
            if (isUsed[63] == null) {
                champGuess = champList[63];
                isValid = true;
                isUsed[63] = 63;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `kindred`:
            if (isUsed[64] == null) {
                champGuess = champList[64];
                isValid = true;
                isUsed[64] = 64;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `kled`:
            if (isUsed[65] == null) {
                champGuess = champList[65];
                isValid = true;
                isUsed[65] = 65;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `kog'maw`:
            if (isUsed[66] == null) {
                champGuess = champList[66];
                isValid = true;
                isUsed[66] = 66;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `leblanc`:
            if (isUsed[67] == null) {
                champGuess = champList[67];
                isValid = true;
                isUsed[67] = 67;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `lee sin`:
            if (isUsed[68] == null) {
                champGuess = champList[68];
                isValid = true;
                isUsed[68] = 68;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `leona`:
            if (isUsed[69] == null) {
                champGuess = champList[69];
                isValid = true;
                isUsed[69] = 69;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `lillia`:
            if (isUsed[70] == null) {
                champGuess = champList[70];
                isValid = true;
                isUsed[70] = 70;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `lissandra`:
            if (isUsed[71] == null) {
                champGuess = champList[71];
                isValid = true;
                isUsed[71] = 71;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `lucian`:
            if (isUsed[72] == null) {
                champGuess = champList[72];
                isValid = true;
                isUsed[72] = 72;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `lulu`:
            if (isUsed[73] == null) {
                champGuess = champList[73];
                isValid = true;
                isUsed[73] = 73;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `lux`:
            if (isUsed[74] == null) {
                champGuess = champList[74];
                isValid = true;
                isUsed[74] = 74;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `malphite`:
            if (isUsed[75] == null) {
                champGuess = champList[75];
                isValid = true;
                isUsed[75] = 75;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `malzahar`:
            if (isUsed[76] == null) {
                champGuess = champList[76];
                isValid = true;
                isUsed[76] = 76;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `maokai`:
            if (isUsed[77] == null) {
                champGuess = champList[77];
                isValid = true;
                isUsed[77] = 77;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `master yi`:
            if (isUsed[78] == null) {
                champGuess = champList[78];
                isValid = true;
                isUsed[78] = 78;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `milio`:
            if (isUsed[79] == null) {
                champGuess = champList[79];
                isValid = true;
                isUsed[79] = 79;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `miss fortune`:
            if (isUsed[80] == null) {
                champGuess = champList[80];
                isValid = true;
                isUsed[80] = 80;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `mordekaiser`:
            if (isUsed[81] == null) {
                champGuess = champList[81];
                isValid = true;
                isUsed[81] = 81;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `morgana`:
            if (isUsed[82] == null) {
                champGuess = champList[82];
                isValid = true;
                isUsed[82] = 82;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `naafiri`:
            if (isUsed[83] == null) {
                champGuess = champList[83];
                isValid = true;
                isUsed[83] = 83;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `nami`:
            if (isUsed[84] == null) {
                champGuess = champList[84];
                isValid = true;
                isUsed[84] = 84;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `nasus`:
            if (isUsed[85] == null) {
                champGuess = champList[85];
                isValid = true;
                isUsed[85] = 85;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `nautilus`:
            if (isUsed[86] == null) {
                champGuess = champList[86];
                isValid = true;
                isUsed[86] = 86;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `neeko`:
            if (isUsed[87] == null) {
                champGuess = champList[87];
                isValid = true;
                isUsed[87] = 87;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `nidalee`:
            if (isUsed[88] == null) {
                champGuess = champList[88];
                isValid = true;
                isUsed[88] = 88;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `nilah`:
            if (isUsed[89] == null) {
                champGuess = champList[89];
                isValid = true;
                isUsed[89] = 89;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `nocturne`:
            if (isUsed[90] == null) {
                champGuess = champList[90];
                isValid = true;
                isUsed[90] = 90;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `nunu and willump`:
            if (isUsed[91] == null) {
                champGuess = champList[91];
                isValid = true;
                isUsed[91] = 91;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `olaf`:
            if (isUsed[92] == null) {
                champGuess = champList[92];
                isValid = true;
                isUsed[92] = 92;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `orianna`:
            if (isUsed[93] == null) {
                champGuess = champList[93];
                isValid = true;
                isUsed[93] = 93;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `ornn`:
            if (isUsed[94] == null) {
                champGuess = champList[94];
                isValid = true;
                isUsed[94] = 94;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `pantheon`:
            if (isUsed[95] == null) {
                champGuess = champList[95];
                isValid = true;
                isUsed[95] = 95;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `poppy`:
            if (isUsed[96] == null) {
                champGuess = champList[96];
                isValid = true;
                isUsed[96] = 96;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `pyke`:
            if (isUsed[97] == null) {
                champGuess = champList[97];
                isValid = true;
                isUsed[97] = 97;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `qiyana`:
            if (isUsed[98] == null) {
                champGuess = champList[98];
                isValid = true;
                isUsed[98] = 98;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `quinn`:
            if (isUsed[99] == null) {
                champGuess = champList[99];
                isValid = true;
                isUsed[99] = 99;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `rakan`:
            if (isUsed[100] == null) {
                champGuess = champList[100];
                isValid = true;
                isUsed[100] = 100;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `rammus`:
            if (isUsed[101] == null) {
                champGuess = champList[101];
                isValid = true;
                isUsed[101] = 101;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case "rek'sai":
            if (isUsed[102] == null) {
                champGuess = champList[102];
                isValid = true;
                isUsed[102] = 102;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `rell`:
            if (isUsed[103] == null) {
                champGuess = champList[103];
                isValid = true;
                isUsed[103] = 103;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `renata glasc`:
            if (isUsed[104] == null) {
                champGuess = champList[104];
                isValid = true;
                isUsed[104] = 104;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `renekton`:
            if (isUsed[105] == null) {
                champGuess = champList[105];
                isValid = true;
                isUsed[105] = 105;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `rengar`:
            if (isUsed[106] == null) {
                champGuess = champList[106];
                isValid = true;
                isUsed[106] = 106;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `riven`:
            if (isUsed[107] == null) {
                champGuess = champList[107];
                isValid = true;
                isUsed[107] = 107;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `rumble`:
            if (isUsed[108] == null) {
                champGuess = champList[108];
                isValid = true;
                isUsed[108] = 108;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `ryze`:
            if (isUsed[109] == null) {
                champGuess = champList[109];
                isValid = true;
                isUsed[109] = 109;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `samira`:
            if (isUsed[110] == null) {
                champGuess = champList[110];
                isValid = true;
                isUsed[110] = 110;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `sejuani`:
            if (isUsed[111] == null) {
                champGuess = champList[111];
                isValid = true;
                isUsed[111] = 111;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `senna`:
            if (isUsed[112] == null) {
                champGuess = champList[112];
                isValid = true;
                isUsed[112] = 112;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `seraphine`:
            if (isUsed[113] == null) {
                champGuess = champList[113];
                isValid = true;
                isUsed[113] = 113;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `sett`:
            if (isUsed[114] == null) {
                champGuess = champList[114];
                isValid = true;
                isUsed[114] = 114;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `shaco`:
            if (isUsed[115] == null) {
                champGuess = champList[115];
                isValid = true;
                isUsed[115] = 115;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `shen`:
            if (isUsed[116] == null) {
                champGuess = champList[116];
                isValid = true;
                isUsed[116] = 116;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `shyvana`:
            if (isUsed[117] == null) {
                champGuess = champList[117];
                isValid = true;
                isUsed[117] = 117;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `singed`:
            if (isUsed[118] == null) {
                champGuess = champList[118];
                isValid = true;
                isUsed[118] = 118;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `sion`:
            if (isUsed[119] == null) {
                champGuess = champList[119];
                isValid = true;
                isUsed[119] = 119;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `sivir`:
            if (isUsed[120] == null) {
                champGuess = champList[120];
                isValid = true;
                isUsed[120] = 120;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `skarner`:
            if (isUsed[121] == null) {
                champGuess = champList[121];
                isValid = true;
                isUsed[121] = 121;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `sona`:
            if (isUsed[122] == null) {
                champGuess = champList[122];
                isValid = true;
                isUsed[122] = 122;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `soraka`:
            if (isUsed[123] == null) {
                champGuess = champList[123];
                isValid = true;
                isUsed[123] = 123;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `swain`:
            if (isUsed[124] == null) {
                champGuess = champList[124];
                isValid = true;
                isUsed[124] = 124;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `sylas`:
            if (isUsed[125] == null) {
                champGuess = champList[125];
                isValid = true;
                isUsed[125] = 125;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `syndra`:
            if (isUsed[126] == null) {
                champGuess = champList[126];
                isValid = true;
                isUsed[126] = 126;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `tahm kench`:
            if (isUsed[127] == null) {
                champGuess = champList[127];
                isValid = true;
                isUsed[127] = 127;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `taliyah`:
            if (isUsed[128] == null) {
                champGuess = champList[128];
                isValid = true;
                isUsed[128] = 128;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `talon`:
            if (isUsed[129] == null) {
                champGuess = champList[129];
                isValid = true;
                isUsed[129] = 129;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `taric`:
            if (isUsed[130] == null) {
                champGuess = champList[130];
                isValid = true;
                isUsed[130] = 130;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `teemo`:
            if (isUsed[131] == null) {
                champGuess = champList[131];
                isValid = true;
                isUsed[131] = 131;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `thresh`:
            if (isUsed[132] == null) {
                champGuess = champList[132];
                isValid = true;
                isUsed[132] = 132;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `tristana`:
            if (isUsed[133] == null) {
                champGuess = champList[133];
                isValid = true;
                isUsed[133] = 133;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `trundle`:
            if (isUsed[134] == null) {
                champGuess = champList[134];
                isValid = true;
                isUsed[134] = 134;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `tryndamere`:
            if (isUsed[135] == null) {
                champGuess = champList[135];
                isValid = true;
                isUsed[135] = 135;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `twisted fate`:
            if (isUsed[136] == null) {
                champGuess = champList[136];
                isValid = true;
                isUsed[136] = 136;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `twitch`:
            if (isUsed[137] == null) {
                champGuess = champList[137];
                isValid = true;
                isUsed[137] = 137;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `udyr`:
            if (isUsed[138] == null) {
                champGuess = champList[138];
                isValid = true;
                isUsed[138] = 138;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `urgot`:
            if (isUsed[139] == null) {
                champGuess = champList[139];
                isValid = true;
                isUsed[139] = 139;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `varus`:
            if (isUsed[140] == null) {
                champGuess = champList[140];
                isValid = true;
                isUsed[140] = 140;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `vayne`:
            if (isUsed[141] == null) {
                champGuess = champList[141];
                isValid = true;
                isUsed[141] = 141;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `veigar`:
            if (isUsed[142] == null) {
                champGuess = champList[142];
                isValid = true;
                isUsed[142] = 142;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case "vel'koz":
            if (isUsed[143] == null) {
                champGuess = champList[143];
                isValid = true;
                isUsed[143] = 143;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `vex`:
            if (isUsed[144] == null) {
                champGuess = champList[144];
                isValid = true;
                isUsed[144] = 144;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `vi`:
            if (isUsed[145] == null) {
                champGuess = champList[145];
                isValid = true;
                isUsed[145] = 145;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `viego`:
            if (isUsed[146] == null) {
                champGuess = champList[146];
                isValid = true;
                isUsed[146] = 146;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `viktor`:
            if (isUsed[147] == null) {
                champGuess = champList[147];
                isValid = true;
                isUsed[147] = 147;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `vladimir`:
            if (isUsed[148] == null) {
                champGuess = champList[148];
                isValid = true;
                isUsed[148] = 148;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `volibear`:
            if (isUsed[149] == null) {
                champGuess = champList[149];
                isValid = true;
                isUsed[149] = 149;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `warwick`:
            if (isUsed[150] == null) {
                champGuess = champList[150];
                isValid = true;
                isUsed[150] = 150;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `wukong`:
            if (isUsed[151] == null) {
                champGuess = champList[151];
                isValid = true;
                isUsed[151] = 151;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `xayah`:
            if (isUsed[152] == null) {
                champGuess = champList[152];
                isValid = true;
                isUsed[152] = 152;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `xerath`:
            if (isUsed[153] == null) {
                champGuess = champList[153];
                isValid = true;
                isUsed[153] = 153;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `xin zhao`:
            if (isUsed[154] == null) {
                champGuess = champList[154];
                isValid = true;
                isUsed[154] = 154;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `yasuo`:
            if (isUsed[155] == null) {
                champGuess = champList[155];
                isValid = true;
                isUsed[155] = 155;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `yone`:
            if (isUsed[156] == null) {
                champGuess = champList[156];
                isValid = true;
                isUsed[156] = 156;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `yorick`:
            if (isUsed[157] == null) {
                champGuess = champList[157];
                isValid = true;
                isUsed[157] = 157;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `yuumi`:
            if (isUsed[158] == null) {
                champGuess = champList[158];
                isValid = true;
                isUsed[158] = 158;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `zac`:
            if (isUsed[159] == null) {
                champGuess = champList[159];
                isValid = true;
                isUsed[159] = 159;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `zed`:
            if (isUsed[160] == null) {
                champGuess = champList[160];
                isValid = true;
                isUsed[160] = 160;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `zeri`:
            if (isUsed[161] == null) {
                champGuess = champList[161];
                isValid = true;
                isUsed[161] = 161;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `ziggs`:
            if (isUsed[162] == null) {
                champGuess = champList[162];
                isValid = true;
                isUsed[162] = 162;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `zilean`:
            if (isUsed[163] == null) {
                champGuess = champList[163];
                isValid = true;
                isUsed[163] = 163;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `zoe`:
            if (isUsed[164] == null) {
                champGuess = champList[164];
                isValid = true;
                isUsed[164] = 164;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        case `zyra`:
            if (isUsed[165] == null) {
                champGuess = champList[165];
                isValid = true;
                isUsed[165] = 165;
                return champGuess;
            } else { console.log("You've already guessed this champion!") }
            break;
        default:
            console.log(`Invalid Champion Name!`);
            break;
    }
}

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
}

