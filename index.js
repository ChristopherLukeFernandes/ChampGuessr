let champNum, champImage, champName, gender, position, species, resource, rangeType, region, year, guessChampName;
let isUsed = new Array(167);
class Champion { // Champion class that outlines champion traits
    constructor(champNum, champImage, champName, gender, position, species, resource, rangeType, region, year) {
        this.champNum = champNum;
        this.champImage = champImage;
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

function showSuggestions(input) { // Functionality for dropdown menu
    var dropdownList = document.getElementById("dropdownList");
    dropdownList.innerHTML = ""; // Clear previous suggestions

    if (input.trim() === "") {
        dropdownList.style.display = "none"; // Hide options if input is empty
        return;
    }

    var suggestions = ["Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "Aurelion Sol", "Azir",
        "Bard", "Blitzcrank", "Brand", "Braum",
        "Caitlyn", "Camille", "Cassiopeia", "Cho'Gath", "Corki",
        "Darius", "Diana", "Dr. Mundo", "Draven",
        "Ekko", "Elise", "Evelynn", "Ezreal",
        "Fiddlesticks", "Fiora", "Fizz",
        "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves",
        "Hecarim", "Heimerdinger", "Illaoi", "Irelia", "Ivern",
        "Janna", "Jarvan IV", "Jax", "Jayce", "Jhin", "Jinx",
        "K'Sante", "Kai'Sa", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Kha'Zix", "Kindred", "Kled", "Kog'Maw",
        "LeBlanc", "Lee Sin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux",
        "Malphite", "Malzahar", "Maokai", "Master Yi", "Miss Fortune", "Mordekaiser", "Morgana",
        "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee", "Nocturne", "Nunu & Willump",
        "Olaf", "Orianna", "Ornn",
        "Pantheon", "Poppy", "Pyke",
        "Qiyana", "Quinn",
        "Rakan", "Rammus", "Rek'Sai", "Renekton", "Rengar", "Riven", "Rumble", "Ryze",
        "Samira", "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Sylas", "Syndra",
        "Tahm Kench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "Twisted Fate", "Twitch",
        "Udyr", "Urgot",
        "Varus", "Vayne", "Veigar", "Vel'Koz", "Vi", "Viego", "Viktor", "Vladimir", "Volibear",
        "Warwick", "Wukong",
        "Xayah", "Xerath", "Xin Zhao",
        "Yasuo", "Yone", "Yorick", "Yuumi",
        "Zac", "Zed", "Ziggs", "Zilean", "Zoe", "Zyra"];
    var filteredSuggestions = suggestions.filter(function (suggestion) { // Filter suggestions based on input
        return suggestion.toUpperCase().startsWith(input.toUpperCase()); // Check if the suggestion starts with the input (case-insensitive)
    });

    if (filteredSuggestions.length > 0) {// Displays filtered suggestions
        dropdownList.style.display = "block";
        filteredSuggestions.forEach(function (suggestion) {
            var listItem = document.createElement("li");
            listItem.textContent = suggestion;
            listItem.classList.add("dropdown-item");
            listItem.addEventListener("click", function () {
                document.querySelector(".userGuessInput").value = suggestion; // Set input value to the clicked suggestion
                dropdownList.style.display = "none"; // Hide the dropdown list when an item is clicked
            });
            dropdownList.appendChild(listItem);
        });
    } else {
        dropdownList.style.display = "none"; // Hide the dropdown list if there are no suggestions
    }
}

const userGuessForm = document.querySelector(".userGuessForm");
const userGuessInput = document.querySelector(".userGuessInput");
const table = document.querySelector("#champ-table").getElementsByTagName("tbody")[0];
const imageContainer = document.getElementById('#icon-display');

function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
}

const champList = [
    new Champion(1, "Champions/Aatrox.png", "Aatrox", "Male", "Top", "Darkin", "None", "Melee", "Runeterra", 2013),
    new Champion(2, "Champions/Ahri.png", "Ahri", "Female", "Mid", "Vastayan", "Mana", "Ranged", "Ionia", 2011),
    new Champion(3, "Champions/Akali.png", "Akali", "Female", "Mid", "Human", "Energy", "Melee", "Ionia", 2013),
    new Champion(4, "Champions/Akshan.png", "Akshan", "Male", "Mid", "Human", "Mana", "Ranged", "Shurima", 2021),
    new Champion(5, "Champions/Alistar.png", "Alistar", "Male", "Support", "Minotaur", "Mana", "Melee", "Runeterra", 2009),
    new Champion(6, "Champions/Amumu.png", "Amumu", "Male", "Jungle", "Yordle", "Mana", "Melee", "Shurima", 2009),
    new Champion(7, "Champions/Anivia.png", "Anivia", "Female", "Mid", "God", "Mana", "Ranged", "Freljord", 2009),
    new Champion(8, "Champions/Annie.png", "Annie", "Female", "Mid", "Human", "Mana", "Ranged", "Noxus", 2009),
    new Champion(9, "Champions/Aphelios.png", "Aphelios", "Male", "Bot", "Human", "Mana", "Ranged", "Targon", 2019),
    new Champion(10, "Champions/Ashe.png", "Ashe", "Female", "Bot", "Iceborn", "Mana", "Ranged", "Freljord", 2009),
    new Champion(11, "Champions/AurelionSol.png", "Aurelion Sol", "Male", "Mid", "Celestial", "Mana", "Ranged", "Targon", 2016),
    new Champion(12, "Champions/Azir.png", "Azir", "Male", "Mid", "Ascended", "Mana", "Ranged", "Shurima", 2014),
    new Champion(13, "Champions/Bard.png", 'Bard', 'Male', 'Support', 'Celestial', 'Mana', 'Ranged', 'Runeterra', 2015),
    new Champion(14, "Champions/BelVeth.png", "Bel'veth", 'Female', 'Jungle', 'Void-Being', 'Manaless', 'Melee', 'Void', 2022),
    new Champion(15, "Champions/Blitzcrank.png", 'Blitzcrank', 'Other', 'Support', 'Golem', 'Mana', 'Melee', 'Zaun', 2009),
    new Champion(16, "Champions/Brand.png", 'Brand', 'Male', 'Support', 'Human', 'Mana', 'Ranged', 'Runeterra', 2011),
    new Champion(17, "Champions/Braum.png", 'Braum', 'Male', 'Support', 'Iceborn', 'Mana', 'Melee', 'Freljord', 2014),
    new Champion(18, "Champions/Briar.png", 'Briar', 'Female', 'Jungle', 'Golem', 'Health costs', 'Melee', 'Noxus', 2023),
    new Champion(19, "Champions/Caitlyn.png", 'Caitlyn', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Piltover', 2011),
    new Champion(20, "Champions/Camille.png", 'Camille', 'Female', 'Top', 'Cyborg', 'Mana', 'Melee', 'Piltover', 2016),
    new Champion(21, "Champions/Cassiopeia.png", 'Cassiopeia', 'Female', 'Middle', 'Human', 'Mana', 'Ranged', 'Noxus', 2010),
    new Champion(22, "Champions/ChoGath.png", "Cho'gath", 'Male', 'Top', 'Void-Being', 'Mana', 'Melee', 'Void', 2009),
    new Champion(23, "Champions/Corki.png", 'Corki', 'Male', 'Middle', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2009),
    new Champion(24, "Champions/Darius.png", 'Darius', 'Male', 'Top', 'Human', 'Mana', 'Melee', 'Noxus', 2012),
    new Champion(25, "Champions/Diana.png", 'Diana', 'Female', 'Middle', 'Aspect', 'Mana', 'Melee', 'Targon', 2012),
    new Champion(26, "Champions/DrMundo.png", 'Dr.Mundo', 'Male', 'Top', 'Human', 'Health costs', 'Melee', 'Zaun', 2009),
    new Champion(27, "Champions/Draven.png", 'Draven', 'Male', 'Bottom', 'Human', 'Mana', 'Ranged', 'Noxus', 2012),
    new Champion(28, "Champions/Ekko.png", 'Ekko', 'Male', 'Middle', 'Human', 'Mana', 'Melee', 'Zaun', 2015),
    new Champion(29, "Champions/Elise.png", 'Elise', 'Female', 'Jungle', 'Human', 'Mana', 'Both', 'Shadow Isles', 2012),
    new Champion(30, "Champions/Evelynn.png", 'Evelynn', 'Female', 'Jungle', 'Demon', 'Mana', 'Melee', 'Runeterra', 2009),
    new Champion(31, "Champions/Ezreal.png", 'Ezreal', 'Male', 'Bottom', 'Human', 'Mana', 'Ranged', 'Piltover', 2010),
    new Champion(32, "Champions/Fiddlesticks.png", 'Fiddlesticks', 'Other', 'Jungle', 'Demon', 'Mana', 'Ranged', 'Runeterra', 2009),
    new Champion(33, "Champions/Fiora.png", 'Fiora', 'Female', 'Top', 'Human', 'Mana', 'Melee', 'Demacia', 2012),
    new Champion(34, "Champions/Fizz.png", 'Fizz', 'Male', 'Middle', 'Yordle', 'Mana', 'Melee', 'Bilgewater', 2011),
    new Champion(35, "Champions/Galio.png", 'Galio', 'Male', 'Middle', 'Golem', 'Mana', 'Melee', 'Demacia', 2010),
    new Champion(36, "Champions/Gangplank.png", 'Gangplank', 'Male', 'Top', 'Human', 'Mana', 'Melee', 'Bilgewater', 2009),
    new Champion(37, "Champions/Garen.png", 'Garen', 'Male', 'Top', 'Human', 'Manaless', 'Melee', 'Demacia', 2010),
    new Champion(38, "Champions/Gnar.png", 'Gnar', 'Male', 'Top', 'Yordle', 'Rage', 'Both', 'Freljord', 2014),
    new Champion(39, "Champions/Gragas.png", 'Gragas', 'Male', 'Top', 'Human', 'Mana', 'Melee', 'Freljord', 2010),
    new Champion(40, "Champions/Graves.png", 'Graves', 'Male', 'Jungle', 'Human', 'Mana', 'Ranged', 'Bilgewater', 2011),
    new Champion(41, "Champions/Gwen.png", 'Gwen', 'Female', 'Top', 'Human', 'Mana', 'Melee', 'Shadow Isles', 2021),
    new Champion(42, "Champions/Hecarim.png", 'Hecarim', 'Male', 'Jungle', 'Undead', 'Mana', 'Melee', 'Shadow Isles', 2012),
    new Champion(43, "Champions/Heimerdinger.png", 'Heimerdinger', 'Male', 'Middle', 'Yordle', 'Mana', 'Ranged', 'Piltover', 2009),
    new Champion(44, "Champions/Hwei.png", 'Hwei', 'Male', 'Middle', 'Human', 'Mana', 'Ranged', 'Ionia', 2023),
    new Champion(45, "Champions/Illaoi.png", 'Illaoi', 'Female', 'Top', 'Human', 'Mana', 'Melee', 'Bilgewater', 2015),
    new Champion(46, "Champions/Irelia.png", 'Irelia', 'Female', 'Top', 'Human', 'Mana', 'Melee', 'Ionia', 2010),
    new Champion(47, "Champions/Ivern.png", 'Ivern', 'Male', 'Jungle', 'Magically Altered', 'Mana', 'Ranged', 'Ionia', 2016),
    new Champion(48, "Champions/Janna.png", 'Janna', 'Female', 'Support', 'God', 'Mana', 'Ranged', 'Zaun', 2009),
    new Champion(49, "Champions/JarvanIV.png", 'Jarvan IV', 'Male', 'Jungle', 'Human', 'Mana', 'Melee', 'Demacia', 2011),
    new Champion(50, "Champions/Jax.png", 'Jax', 'Male', 'Top', 'Unknown', 'Mana', 'Melee', 'Runeterra', 2009),
    new Champion(51, "Champions/Jayce.png", 'Jayce', 'Male', 'Top', 'Human', 'Mana', 'Both', 'Piltover', 2012),
    new Champion(52, "Champions/Jhin.png", 'Jhin', 'Male', 'Bottom', 'Human', 'Mana', 'Ranged', 'Ionia', 2016),
    new Champion(53, "Champions/Jinx.png", 'Jinx', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Zaun', 2013),
    new Champion(54, "Champions/KSante.png", "K'sante", 'Male', 'Top', 'Human', 'Mana', 'Melee', 'Shurima', 2022),
    new Champion(55, "Champions/Kaisa.png", "Kai'sa", 'Female', 'Bottom', 'Void-Being', 'Mana', 'Ranged', 'Void', 2018),
    new Champion(56, "Champions/Kalista.png", 'Kalista', 'Female', 'Bottom', 'Undead', 'Mana', 'Ranged', 'Shadow Isles', 2014),
    new Champion(57, "Champions/Karma.png", 'Karma', 'Female', 'Support', 'Spiritualist', 'Mana', 'Ranged', 'Ionia', 2011),
    new Champion(58, "Champions/Karthus.png", 'Karthus', 'Male', 'Jungle', 'Undead', 'Mana', 'Ranged', 'Shadow Isles', 2009),
    new Champion(59, "Champions/Kassadin.png", 'Kassadin', 'Male', 'Middle', 'Void-Being', 'Mana', 'Melee', 'Void', 2009),
    new Champion(60, "Champions/Katarina.png", 'Katarina', 'Female', 'Middle', 'Human', 'Manaless', 'Melee', 'Noxus', 2009),
    new Champion(61, "Champions/Kayle.png", 'Kayle', 'Female', 'Top', 'Aspect', 'Mana', 'Both', 'Demacia', 2009),
    new Champion(62, "Champions/Kayn.png", 'Kayn', 'Male', 'Jungle', 'Magically Altered', 'Mana', 'Melee', 'Ionia', 2017),
    new Champion(63, "Champions/Kennen.png", 'Kennen', 'Male', 'Top', 'Yordle', 'Energy', 'Ranged', 'Ionia', 2010),
    new Champion(64, "Champions/Khazix.png", "Kha'zix", 'Male', 'Jungle', 'Void-Being', 'Mana', 'Melee', 'Void', 2012),
    new Champion(65, "Champions/Kindred.png", 'Kindred', 'Other', 'Jungle', 'God', 'Mana', 'Ranged', 'Runeterra', 2015),
    new Champion(66, "Champions/Kled.png", 'Kled', 'Male', 'Top', 'Yordle', 'Courage', 'Melee', 'Noxus', 2016),
    new Champion(67, "Champions/Kogmaw.png", "Kog'maw", 'Male', 'Bottom', 'Void-Being', 'Mana', 'Ranged', 'Void', 2010),
    new Champion(68, "Champions/Leblanc.png", 'Leblanc', 'Female', 'Middle', 'Magically Altered', 'Mana', 'Ranged', 'Noxus', 2010),
    new Champion(69, "Champions/LeeSin.png", 'Lee Sin', 'Male', 'Jungle', 'Spiritualist', 'Energy', 'Melee', 'Ionia', 2011),
    new Champion(70, "Champions/Leona.png", 'Leona', 'Female', 'Support', 'Aspect', 'Mana', 'Melee', 'Targon', 2011),
    new Champion(71, "Champions/Lillia.png", 'Lillia', 'Female', 'Jungle', 'Spirit', 'Mana', 'Melee', 'Ionia', 2020),
    new Champion(72, "Champions/Lissandra.png", 'Lissandra', 'Female', 'Middle', 'Iceborn', 'Mana', 'Ranged', 'Freljord', 2013),
    new Champion(73, "Champions/Lucian.png", 'Lucian', 'Male', 'Bottom', 'Human', 'Mana', 'Ranged', 'Demacia', 2013),
    new Champion(74, "Champions/Lulu.png", 'Lulu', 'Female', 'Support', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2012),
    new Champion(75, "Champions/Lux.png", 'Lux', 'Female', 'Support', 'Human', 'Mana', 'Ranged', 'Demacia', 2010),
    new Champion(76, "Champions/Malphite.png", 'Malphite', 'Male', 'Top', 'Golem', 'Mana', 'Melee', 'Ixtal', 2009),
    new Champion(77, "Champions/Malzahar.png", 'Malzahar', 'Male', 'Middle', 'Void-Being', 'Mana', 'Ranged', 'Void', 2010),
    new Champion(78, "Champions/Maokai.png", 'Maokai', 'Male', 'Support', 'Spirit', 'Mana', 'Melee', 'Shadow Isles', 2011),
    new Champion(79, "Champions/MasterYi.png", 'Master Yi', 'Male', 'Jungle', 'Spiritualist', 'Mana', 'Melee', 'Ionia', 2009),
    new Champion(80, "Champions/Milio.png", 'Milio', 'Male', 'Support', 'Human', 'Mana', 'Ranged', 'Ixtal', 2023),
    new Champion(81, "Champions/MissFortune.png", 'Miss Fortune', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Bilgewater', 2010),
    new Champion(82, "Champions/Mordekaiser.png", 'Mordekaiser', 'Male', 'Top', 'Revenant', 'Shield', 'Melee', 'Noxus', 2010),
    new Champion(83, "Champions/Morgana.png", 'Morgana', 'Female', 'Support', 'Aspect', 'Mana', 'Ranged', 'Demacia', 2009),
    new Champion(84, "Champions/Naafiri.png", 'Naafiri', 'Female', 'Middle', 'Darkin', 'Mana', 'Melee', 'Shurima', 2023),
    new Champion(85, "Champions/Nami.png", 'Nami', 'Female', 'Support', 'Vastayan', 'Mana', 'Ranged', 'Bilgewater', 2012),
    new Champion(86, "Champions/Nasus.png", 'Nasus', 'Male', 'Top', 'Ascended', 'Mana', 'Melee', 'Shurima', 2009),
    new Champion(87, "Champions/Nautilus.png", 'Nautilus', 'Male', 'Support', 'Revenant', 'Mana', 'Melee', 'Bilgewater', 2012),
    new Champion(88, "Champions/Neeko.png", 'Neeko', 'Female', 'Middle', 'Vastayan', 'Mana', 'Ranged', 'Ixtal', 2018),
    new Champion(89, "Champions/Nidalee.png", 'Nidalee', 'Female', 'Jungle', 'Human', 'Mana', 'Both', 'Ixtal', 2009),
    new Champion(90, "Champions/Nilah.png", 'Nilah', 'Female', 'Bottom', 'Human', 'Mana', 'Melee', 'Bilgewater', 2022),
    new Champion(91, "Champions/Nocturne.png", 'Nocturne', 'Male', 'Jungle', 'Demon', 'Mana', 'Melee', 'Runeterra', 2011),
    new Champion(92, "Champions/Nunu&Willump.png", 'Nunu & Willump', 'Male', 'Jungle', 'Human', 'Mana', 'Melee', 'Freljord', 2009),
    new Champion(93, "Champions/Olaf.png", 'Olaf', 'Male', 'Top', 'Iceborn', 'Mana', 'Melee', 'Freljord', 2010),
    new Champion(94, "Champions/Orianna.png", 'Orianna', 'Female', 'Middle', 'Golem', 'Mana', 'Ranged', 'Piltover', 2011),
    new Champion(95, "Champions/Ornn.png", 'Ornn', 'Male', 'Top', 'God', 'Mana', 'Melee', 'Freljord', 2017),
    new Champion(96, "Champions/Pantheon.png", 'Pantheon', 'Male', 'Middle', 'Aspect', 'Mana', 'Melee', 'Targon', 2010),
    new Champion(97, "Champions/Poppy.png", 'Poppy', 'Female', 'Top', 'Yordle', 'Mana', 'Melee', 'Demacia', 2010),
    new Champion(98, "Champions/Pyke.png", 'Pyke', 'Male', 'Support', 'Revenant', 'Mana', 'Melee', 'Bilgewater', 2018),
    new Champion(99, "Champions/Qiyana.png", 'Qiyana', 'Female', 'Middle', 'Human', 'Mana', 'Melee', 'Ixtal', 2019),
    new Champion(100, "Champions/Quinn.png", 'Quinn', 'Female', 'Top', 'Human', 'Mana', 'Ranged', 'Demacia', 2013),
    new Champion(101, "Champions/Rakan.png", 'Rakan', 'Male', 'Support', 'Vastayan', 'Mana', 'Melee', 'Ionia', 2017),
    new Champion(102, "Champions/Rammus.png", 'Rammus', 'Male', 'Jungle', 'Ascended', 'Mana', 'Melee', 'Shurima', 2009),
    new Champion(103, "Champions/RekSai.png", "Rek'sai", 'Female', 'Jungle', 'Void-Being', 'Rage', 'Melee', 'Void', 2014),
    new Champion(104, "Champions/Rell.png", 'Rell', 'Female', 'Support', 'Human', 'Mana', 'Melee', 'Noxus', 2020),
    new Champion(105, "Champions/RenataGlasc.png", 'Renata Glasc', 'Female', 'Support', 'Human', 'Mana', 'Ranged', 'Zaun', 2022),
    new Champion(106, "Champions/Renekton.png", 'Renekton', 'Male', 'Top', 'Ascended', 'Fury', 'Melee', 'Shurima', 2011),
    new Champion(107, "Champions/Rengar.png", 'Rengar', 'Male', 'Jungle', 'Vastayan', 'Ferocity', 'Melee', 'Ixtal', 2012),
    new Champion(108, "Champions/Riven.png", 'Riven', 'Female', 'Top', 'Human', 'Manaless', 'Melee', 'Ionia', 2011),
    new Champion(109, "Champions/Rumble.png", 'Rumble', 'Male', 'Top', 'Yordle', 'Heat', 'Melee', 'Bandle City', 2011),
    new Champion(110, "Champions/Ryze.png", 'Ryze', 'Male', 'Middle', 'Human', 'Mana', 'Ranged', 'Runeterra', 2009),
    new Champion(111, "Champions/Samira.png", 'Samira', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Noxus', 2020),
    new Champion(112, "Champions/Sejuani.png", 'Sejuani', 'Female', 'Jungle', 'Iceborn', 'Mana', 'Melee', 'Freljord', 2012),
    new Champion(113, "Champions/Senna.png", 'Senna', 'Female', 'Support', 'Undead', 'Mana', 'Ranged', 'Shadow Isles', 2019),
    new Champion(114, "Champions/Seraphine.png", 'Seraphine', 'Female', 'Support', 'Human', 'Mana', 'Ranged', 'Zaun', 2020),
    new Champion(115, "Champions/Sett.png", 'Sett', 'Male', 'Top', 'Vastayan', 'Grit', 'Melee', 'Ionia', 2020),
    new Champion(116, "Champions/Shaco.png", 'Shaco', 'Male', 'Jungle', 'Spirit', 'Mana', 'Melee', 'Runeterra', 2009),
    new Champion(117, "Champions/Shen.png", 'Shen', 'Male', 'Top', 'Human', 'Energy', 'Melee', 'Ionia', 2010),
    new Champion(118, "Champions/Shyvana.png", 'Shyvana', 'Female', 'Jungle', 'Dragon', 'Fury', 'Melee', 'Demacia', 2011),
    new Champion(119, "Champions/Singed.png", 'Singed', 'Male', 'Top', 'Human', 'Mana', 'Melee', 'Zaun', 2009),
    new Champion(120, "Champions/Sion.png", 'Sion', 'Male', 'Top', 'Undead', 'Mana', 'Melee', 'Noxus', 2009),
    new Champion(121, "Champions/Sivir.png", 'Sivir', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Shurima', 2009),
    new Champion(122, "Champions/Skarner.png", 'Skarner', 'Male', 'Jungle', 'Crystal', 'Mana', 'Melee', 'Shurima', 2010),
    new Champion(123, "Champions/Sona.png", 'Sona', 'Female', 'Support', 'Vastayan', 'Mana', 'Ranged', 'Demacia', 2010),
    new Champion(124, "Champions/Soraka.png", 'Soraka', 'Female', 'Support', 'Aspect', 'Mana', 'Ranged', 'Mount Targon', 2009),
    new Champion(125, "Champions/Swain.png", 'Swain', 'Male', 'Middle', 'Human', 'Mana', 'Ranged', 'Noxus', 2010),
    new Champion(126, "Champions/Sylas.png", 'Sylas', 'Male', 'Middle', 'Human', 'Mana', 'Melee', 'Demacia', 2019),
    new Champion(127, "Champions/Syndra.png", 'Syndra', 'Female', 'Middle', 'Human', 'Mana', 'Ranged', 'Ionia', 2012),
    new Champion(128, "Champions/TahmKench.png", 'Tahm Kench', 'Male', 'Support', 'River Spirit', 'Mana', 'Melee', 'Runeterra', 2015),
    new Champion(129, "Champions/Taliyah.png", 'Taliyah', 'Female', 'Middle', 'Shuriman', 'Mana', 'Ranged', 'Shurima', 2016),
    new Champion(130, "Champions/Talon.png", 'Talon', 'Male', 'Middle', 'Human', 'Mana', 'Melee', 'Noxus', 2011),
    new Champion(131, "Champions/Taric.png", 'Taric', 'Male', 'Support', 'Aspect', 'Mana', 'Melee', 'Demacia', 2009),
    new Champion(132, "Champions/Teemo.png", 'Teemo', 'Male', 'Top', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2009),
    new Champion(133, "Champions/Thresh.png", 'Thresh', 'Male', 'Support', 'Undead', 'Mana', 'Ranged', 'Shadow Isles', 2013),
    new Champion(134, "Champions/Tristana.png", 'Tristana', 'Female', 'Bottom', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2009),
    new Champion(135, "Champions/Trundle.png", 'Trundle', 'Male', 'Top', 'Troll', 'Mana', 'Melee', 'Freljord', 2010),
    new Champion(136, "Champions/Tryndamere.png", 'Tryndamere', 'Male', 'Top', 'Human', 'Fury', 'Melee', 'Freljord', 2009),
    new Champion(137, "Champions/TwistedFate.png", 'Twisted Fate', 'Male', 'Middle', 'Human', 'Mana', 'Ranged', 'Runeterra', 2009),
    new Champion(138, "Champions/Twitch.png", 'Twitch', 'Male', 'Bottom', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2009),
    new Champion(139, "Champions/Udyr.png", 'Udyr', 'Male', 'Jungle', 'Human', 'Mana', 'Melee', 'Runeterra', 2009),
    new Champion(140, "Champions/Urgot.png", 'Urgot', 'Male', 'Top', 'Human', 'Mana', 'Ranged', 'Noxus', 2010),
    new Champion(141, "Champions/Varus.png", 'Varus', 'Male', 'Bottom', 'Darkin', 'Mana', 'Ranged', 'Ionia', 2012),
    new Champion(142, "Champions/Vayne.png", 'Vayne', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Demacia', 2011),
    new Champion(143, "Champions/Veigar.png", 'Veigar', 'Male', 'Middle', 'Yordle', 'Mana', 'Ranged', 'Bandle City', 2009),
    new Champion(144, "Champions/Velkoz.png", 'Velkoz', 'Male', 'Middle', 'Void-Being', 'Mana', 'Ranged', 'Void', 2013),
    new Champion(145, "Champions/Vex.png", 'Female', 'Middle', 'Yordle', 'Mana', 'Ranged', 'Shadow Isles', 2021),
    new Champion(146, "Champions/Vi.png", 'Vi', 'Female', 'Jungle', 'Human', 'Mana', 'Melee', 'Piltover', 2012),
    new Champion(147, "Champions/Viego.png", 'Viego', 'Male', 'Jungle', 'Undead', 'Mana', 'Melee', 'Shadow Isles', 2021),
    new Champion(148, "Champions/Viktor.png", 'Viktor', 'Male', 'Middle', 'Human', 'Mana', 'Ranged', 'Zaun', 2011),
    new Champion(149, "Champions/Vladimir.png", 'Vladimir', 'Male', 'Middle', 'Human', 'Health costs', 'Ranged', 'Noxus', 2010),
    new Champion(150, "Champions/Volibear.png", 'Volibear', 'Male', 'Top', 'Spirit Bear', 'Mana', 'Melee', 'Freljord', 2011),
    new Champion(151, "Champions/Warwick.png", 'Warwick', 'Male', 'Jungle', 'Human', 'Mana', 'Melee', 'Zaun', 2009),
    new Champion(152, "Champions/Wukong.png", 'Wukong', 'Male', 'Top', 'Vastayan', 'Mana', 'Melee', 'Ionia', 2009),
    new Champion(153, "Champions/Xayah.png", 'Xayah', 'Female', 'Bottom', 'Vastayan', 'Mana', 'Ranged', 'Ionia', 2017),
    new Champion(154, "Champions/Xerath.png", 'Xerath', 'Male', 'Middle', 'Ascended', 'Mana', 'Ranged', 'Shurima', 2011),
    new Champion(155, "Champions/XinZhao.png", 'Xin Zhao', 'Male', 'Jungle', 'Human', 'Mana', 'Melee', 'Demacia', 2009),
    new Champion(156, "Champions/Yasuo.png", 'Yasuo', 'Male', 'Middle', 'Human', 'Flow', 'Melee', 'Ionia', 2013),
    new Champion(157, "Champions/Yone.png", 'Yone', 'Male', 'Middle', 'Human', 'Resolve', 'Melee', 'Ionia', 2020),
    new Champion(158, "Champions/Yorick.png", 'Yorick', 'Male', 'Top', 'Undead', 'Mana', 'Melee', 'Shadow Isles', 2011),
    new Champion(159, "Champions/Yuumi.png", 'Yuumi', 'Other', 'Support', 'Spirit', 'Mana', 'Ranged', 'Bandle City', 2019),
    new Champion(160, "Champions/Zac.png", 'Zac', 'Male', 'Jungle', 'Magically Altered', 'Health costs', 'Melee', 'Zaun', 2013),
    new Champion(161, "Champions/Zed.png", 'Zed', 'Male', 'Middle', 'Human', 'Energy', 'Melee', 'Ionia', 2012),
    new Champion(162, "Champions/Zeri.png", 'Zeri', 'Female', 'Bottom', 'Human', 'Mana', 'Ranged', 'Zaun', 2022),
    new Champion(163, "Champions/Ziggs.png", 'Ziggs', 'Male', 'Middle', 'Yordle', 'Mana', 'Ranged', 'Zaun', 2012),
    new Champion(164, "Champions/Zilean.png", 'Zilean', 'Male', 'Support', 'Human', 'Mana', 'Ranged', 'Zaun', 2009),
    new Champion(165, "Champions/Zoe.png", 'Zoe', 'Female', 'Middle', 'Aspect', 'Mana', 'Ranged', 'Targon', 2017),
    new Champion(166, "Champions/Zyra.png", 'Zyra', 'Female', 'Bottom', 'Spirit', 'Mana', 'Ranged', 'Ionia', 2012),
];
let ansChamp = champList[0];
let champGuess;

userGuessForm.addEventListener("submit", async event => {
    event.preventDefault();
    const selectedChampion = await getSelectedChampion();
    if (selectedChampion) {
        const guessChampName = selectedChampion.toLowerCase();
        const champGuess = getChampNum(guessChampName);
        compareChampInfo(champGuess, ansChamp);
    } else {
        displayError("Please select a Champion!");
    }
});

function getSelectedChampion() {
    return userGuessInput.value;
}

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds));
}

async function compareChampInfo(champGuess, ansChamp) {
    let table = document.getElementById("champ-table");
    let row = table.insertRow(-1);
    if (champGuess) {
        var champImg = document.createElement("img");
        champImg.src = champGuess.champImage;
        row.insertCell(0);
        row.cells[0].appendChild(champImg);

        row.insertCell(1).textContent = champGuess.gender;
        if (champGuess.gender == ansChamp.gender) { row.cells[1].classList.add("rotating-cell-correct"); }
        else { row.cells[1].classList.add("rotating-cell-incorrect"); }
        await sleep(500);

        row.insertCell(2).textContent = champGuess.position;
        if (champGuess.position == ansChamp.position) { row.cells[2].classList.add("rotating-cell-correct"); }
        else { row.cells[2].classList.add("rotating-cell-incorrect"); }
        await sleep(500);

        row.insertCell(3).textContent = champGuess.species;
        if (champGuess.species == ansChamp.species) { row.cells[3].classList.add("rotating-cell-correct"); }
        else { row.cells[3].classList.add("rotating-cell-incorrect"); }
        await sleep(500);

        row.insertCell(4).textContent = champGuess.resource;
        if (champGuess.resource == ansChamp.resource) { row.cells[4].classList.add("rotating-cell-correct"); }
        else { row.cells[4].classList.add("rotating-cell-incorrect"); }
        await sleep(500);


        row.insertCell(5).textContent = champGuess.rangeType;
        if (champGuess.rangeType == ansChamp.rangeType) { row.cells[5].classList.add("rotating-cell-correct"); }
        else { row.cells[5].classList.add("rotating-cell-incorrect"); }
        await sleep(500);


        row.insertCell(6).textContent = champGuess.region;
        if (champGuess.region == ansChamp.region) { row.cells[6].classList.add("rotating-cell-correct"); }
        else { row.cells[6].classList.add("rotating-cell-incorrect"); }
        await sleep(500);

        row.insertCell(7).textContent = champGuess.year;
        if (champGuess.year == ansChamp.year) { row.cells[7].classList.add("rotating-cell-correct"); }
        else { row.cells[7].classList.add("rotating-cell-incorrect"); }
        await sleep(500);

        if (champGuess.champNum === ansChamp.champNum) {
            console.log("You Win");
        }
    }
}

function getChampNum(guessChampName) {
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