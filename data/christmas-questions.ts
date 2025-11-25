export interface QuestionData {
  question: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: 'A' | 'B' | 'C' | 'D'
}

export const CHRISTMAS_QUESTION_LIMIT = 20

export const christmasQuestions: QuestionData[] = [
  // --- History & Traditions (Non-Religious) ---
  {
    question: "Which country is credited with starting the tradition of the Christmas tree?",
    option_a: "USA",
    option_b: "Norway",
    option_c: "Germany",
    option_d: "Canada",
    correct_answer: "C"
  },
  {
    question: "What decoration was originally made from strands of silver?",
    option_a: "Baubles",
    option_b: "Tinsel",
    option_c: "Candy Canes",
    option_d: "Garland",
    correct_answer: "B"
  },
  {
    question: "In what century was the tradition of the Advent calendar created?",
    option_a: "17th century",
    option_b: "19th century",
    option_c: "15th century",
    option_d: "20th century",
    correct_answer: "B"
  },
  {
    question: "The custom of hanging stockings is inspired by the story of St. Nicholas helping three poor sisters with what item?",
    option_a: "Dowry money",
    option_b: "A new home",
    option_c: "A wagon of toys",
    option_d: "Christmas dinner",
    correct_answer: "A"
  },
  {
    question: "In the UK and other Commonwealth countries, what is the day after Christmas called?",
    option_a: "Holiday Tuesday",
    option_b: "Wren Day",
    option_c: "Boxing Day",
    option_d: "Feast Day",
    correct_answer: "C"
  },
  {
    question: "What year did the first Christmas stamp appear in the United States?",
    option_a: "1947",
    option_b: "1962",
    option_c: "1901",
    option_d: "1980",
    correct_answer: "B"
  },
  {
    question: "Which beverage company is widely credited with popularizing the modern image of Santa Claus in red and white?",
    option_a: "Pepsi",
    option_b: "Coca-Cola",
    option_c: "Nestle",
    option_d: "Fanta",
    correct_answer: "B"
  },
  {
    question: "What type of food did people traditionally hang on Christmas trees in the 16th century?",
    option_a: "Sausages",
    option_b: "Apples and Wafers",
    option_c: "Crackers",
    option_d: "Marzipan figures",
    correct_answer: "B"
  },
  {
    question: "What is the common nickname for a Christmas tree, rooted in the ancient winter solstice festival?",
    option_a: "Fir-tree",
    option_b: "Holy-tree",
    option_c: "Yule-tree",
    option_d: "Pine-tree",
    correct_answer: "C"
  },
  {
    question: "The tradition of the Christmas pickle ornament is often, though inaccurately, attributed to the folklore of which country?",
    option_a: "Poland",
    option_b: "Ireland",
    option_c: "Germany",
    option_d: "Austria",
    correct_answer: "C"
  },
  {
    question: "When was the first Christmas card sent, created by Sir Henry Cole and John Horsley?",
    option_a: "1843",
    option_b: "1901",
    option_c: "1789",
    option_d: "1899",
    correct_answer: "A"
  },
  {
    question: "Which country has a tradition where people roller skate to early morning church services between December 16-24?",
    option_a: "Brazil",
    option_b: "Venezuela",
    option_c: "Philippines",
    option_d: "Mexico",
    correct_answer: "B"
  },
  {
    question: "In which year was the first Christmas tree lit up in New York City's Rockefeller Center?",
    option_a: "1933",
    option_b: "1940",
    option_c: "1925",
    option_d: "1951",
    correct_answer: "A"
  },
  {
    question: "What is the name for the spiced, hot cider traditionally served as a Yuletide drink?",
    option_a: "Glogg",
    option_b: "Wassail",
    option_c: "Hot Toddy",
    option_d: "Butterbeer",
    correct_answer: "B"
  },
  {
    question: "What plant requires a person to be kissed if they stand beneath it?",
    option_a: "Holly",
    option_b: "Ivy",
    option_c: "Poinsettia",
    option_d: "Mistletoe",
    correct_answer: "D"
  },
  {
    question: "The first artificial Christmas trees were made in Germany using what material?",
    option_a: "Plastic",
    option_b: "Goose Feathers",
    option_c: "Paper Mache",
    option_d: "Wire and Wool",
    correct_answer: "B"
  },
  {
    question: "Which country's Christmas dinner often features a bucket of KFC fried chicken?",
    option_a: "Japan",
    option_b: "Australia",
    option_c: "South Africa",
    option_d: "New Zealand",
    correct_answer: "A"
  },
  {
    question: "What popular Christmas flower is native to Mexico and Central America?",
    option_a: "Orchid",
    option_b: "Poinsettia",
    option_c: "Rose",
    option_d: "Tulip",
    correct_answer: "B"
  },
  {
    question: "What is the main ingredient of a traditional Yule Log dessert (Bûche de Noël)?",
    option_a: "Pound Cake",
    option_b: "Sponge Cake",
    option_c: "Fruit Cake",
    option_d: "Cheesecake",
    correct_answer: "B"
  },
  {
    question: "In the poem 'A Visit from St. Nicholas' ('Twas the Night Before Christmas), how many reindeer does Santa have?",
    option_a: "Nine (including Rudolph)",
    option_b: "Eight (excluding Rudolph)",
    option_c: "Seven",
    option_d: "Six",
    correct_answer: "B"
  },

  // --- Music Trivia ---
  {
    question: "What Christmas song was the first ever broadcast from space in 1965?",
    option_a: "The Christmas Song",
    option_b: "Jingle Bells",
    option_c: "White Christmas",
    option_d: "Deck the Halls",
    correct_answer: "B"
  },
  {
    question: "The song 'Jingle Bells' was originally written for which American holiday?",
    option_a: "New Year's Eve",
    option_b: "Easter",
    option_c: "Thanksgiving",
    option_d: "Halloween",
    correct_answer: "C"
  },
  {
    question: "In the song 'The Twelve Days of Christmas,' what gift is given on the fifth day?",
    option_a: "Five Silver Bells",
    option_b: "Five Turtle Doves",
    option_c: "Five Golden Rings",
    option_d: "Five Calling Birds",
    correct_answer: "C"
  },
  {
    question: "What is the best-selling Christmas single of all time?",
    option_a: "All I Want for Christmas Is You",
    option_b: "White Christmas",
    option_c: "Do They Know It's Christmas?",
    option_d: "Happy Xmas (War Is Over)",
    correct_answer: "B"
  },
  {
    question: "Who is the singer of the hit song 'All I Want for Christmas Is You'?",
    option_a: "Celine Dion",
    option_b: "Mariah Carey",
    option_c: "Ariana Grande",
    option_d: "Madonna",
    correct_answer: "B"
  },
  {
    question: "In 'Winter Wonderland,' what do we call the snowman we build?",
    option_a: "Frosty the Snowman",
    option_b: "Parson Brown",
    option_c: "Old Man Winter",
    option_d: "Jack Frost",
    correct_answer: "B"
  },
  {
    question: "The German title for the song 'O Christmas Tree' is 'O Tannenbaum.' What does 'Tannenbaum' literally mean in German?",
    option_a: "Holly Bush",
    option_b: "Pine Branch",
    option_c: "Fir Tree",
    option_d: "Winter Flower",
    correct_answer: "C"
  },
  {
    question: "The original title for the popular Christmas song 'The Little Drummer Boy' was what?",
    option_a: "The Gift of the Drum",
    option_b: "Carol of the Drum",
    option_c: "Little Buddy's Beat",
    option_d: "Pah Rum Pum Pum Pum",
    correct_answer: "B"
  },
  {
    question: "What is the opening line to the song 'Winter Wonderland'?",
    option_a: "Oh, the weather outside is frightful",
    option_b: "Sleigh bells ring, are you listening?",
    option_c: "You better watch out",
    option_d: "Dashing through the snow",
    correct_answer: "B"
  },
  {
    question: "Which British pop duo released the 1984 hit song 'Last Christmas'?",
    option_a: "Pet Shop Boys",
    option_b: "Tears for Fears",
    option_c: "Wham!",
    option_d: "Eurythmics",
    correct_answer: "C"
  },
  {
    question: "According to 'The Christmas Song' (Chestnuts Roasting on an Open Fire), who is 'nipping at your nose'?",
    option_a: "Jack Frost",
    option_b: "The Cold Wind",
    option_c: "Winter",
    option_d: "Santa Claus",
    correct_answer: "A"
  },
  {
    question: "In the song 'Jingle Bell Rock,' where were they dancing and prancing?",
    option_a: "Around the Christmas Tree",
    option_b: "In the Old Town Square",
    option_c: "In Jingle Bell Square",
    option_d: "On the Rooftop",
    correct_answer: "C"
  },
  {
    question: "Who recorded the song 'Feliz Navidad' in 1970?",
    option_a: "Ricardo Montalbán",
    option_b: "Julio Iglesias",
    option_c: "Jose Feliciano",
    option_d: "Gipsy Kings",
    correct_answer: "C"
  },
  {
    question: "What type of Christmas is Elvis Presley going to have if it's not white?",
    option_a: "Red Christmas",
    option_b: "Blue Christmas",
    option_c: "Green Christmas",
    option_d: "Gold Christmas",
    correct_answer: "B"
  },
  {
    question: "Who wrote the popular Christmas song 'Frosty The Snowman'?",
    option_a: "Irving Berlin",
    option_b: "Walter Rollins and Steve Nelson",
    option_c: "Johnny Marks",
    option_d: "Mel Tormé",
    correct_answer: "B"
  },
  {
    question: "Which of Santa's reindeer has a name that means 'thunder' in Dutch?",
    option_a: "Comet",
    option_b: "Donner",
    option_c: "Cupid",
    option_d: "Vixen",
    correct_answer: "B"
  },
  {
    question: "What Christmas song was originally titled 'One Horse Open Sleigh'?",
    option_a: "Sleigh Ride",
    option_b: "Up on the Housetop",
    option_c: "Jingle Bells",
    option_d: "Here Comes Santa Claus",
    correct_answer: "C"
  },
  {
    question: "In total, how many gifts were given in 'The Twelve Days of Christmas'?",
    option_a: "12",
    option_b: "78",
    option_c: "364",
    option_d: "144",
    correct_answer: "C"
  },
  {
    question: "What instrument did two astronauts play on the Gemini 6A flight to broadcast 'Jingle Bells' from space?",
    option_a: "Guitar",
    option_b: "Harmonica",
    option_c: "Ukulele",
    option_d: "Flute",
    correct_answer: "B"
  },
  {
    question: "What does 'Feliz Navidad' mean in Spanish?",
    option_a: "Happy New Year",
    option_b: "Merry Christmas",
    option_c: "Christmas Wishes",
    option_d: "Peace on Earth",
    correct_answer: "B"
  },

  // --- Movie & Literature Trivia (Non-Religious) ---
  {
    question: "What is the name of the main character in the Charles Dickens novel 'A Christmas Carol'?",
    option_a: "Jacob Marley",
    option_b: "Ebenezer Scrooge",
    option_c: "Tiny Tim",
    option_d: "Bob Cratchit",
    correct_answer: "B"
  },
  {
    question: "In the film 'Home Alone,' where are the McCallisters going on vacation when they leave Kevin behind?",
    option_a: "London",
    option_b: "Rome",
    option_c: "Paris",
    option_d: "Florida",
    correct_answer: "C"
  },
  {
    question: "Which actor played six different roles in the animated film 'The Polar Express'?",
    option_a: "Robin Williams",
    option_b: "Jim Carrey",
    option_c: "Tom Hanks",
    option_d: "Will Ferrell",
    correct_answer: "C"
  },
  {
    question: "In 'Dr. Seuss' How the Grinch Stole Christmas,' what is the name of the Grinch's dog?",
    option_a: "Max",
    option_b: "Whoville",
    option_c: "Cindy Lou",
    option_d: "Scooby",
    correct_answer: "A"
  },
  {
    question: "What gift did Ralphie want for Christmas in the movie 'A Christmas Story'?",
    option_a: "An official football",
    option_b: "A Red Ryder BB Gun",
    option_c: "A new baseball mitt",
    option_d: "A pony",
    correct_answer: "B"
  },
  {
    question: "What is the name of George Bailey's guardian angel in 'It's a Wonderful Life'?",
    option_a: "Clarence Odbody",
    option_b: "Gabriel",
    option_c: "Zuzu",
    option_d: "Harry",
    correct_answer: "A"
  },
  {
    question: "In the movie 'Elf,' what are the four main food groups for elves?",
    option_a: "Turkey, Mashed Potatoes, Pie, Gravy",
    option_b: "Candy, Candy Corn, Candy Canes, Syrup",
    option_c: "Milk, Cookies, Pancakes, Spaghetti",
    option_d: "Waffles, Maple Syrup, Bacon, Eggs",
    correct_answer: "B"
  },
  {
    question: "What toy is Howard Lang trying to get for his son in the movie 'Jingle All the Way'?",
    option_a: "G.I. Joe",
    option_b: "Turbo Man",
    option_c: "Tickle Me Elmo",
    option_d: "Power Ranger",
    correct_answer: "B"
  },
  {
    question: "How many ghosts visit Ebenezer Scrooge in 'A Christmas Carol'?",
    option_a: "Three",
    option_b: "Five",
    option_c: "Four",
    option_d: "Two",
    correct_answer: "C"
  },
  {
    question: "Which classic Christmas ballet premiered in Saint Petersburg, Russia, in 1892?",
    option_a: "Swan Lake",
    option_b: "The Nutcracker",
    option_c: "Sleeping Beauty",
    option_d: "Giselle",
    correct_answer: "B"
  },
  {
    question: "In 'National Lampoon's Christmas Vacation,' what kind of bonus did Clark Griswold receive instead of a cash one?",
    option_a: "A new car",
    option_b: "A free year's membership to the Jelly of the Month Club",
    option_c: "A savings bond",
    option_d: "A turkey cookbook",
    correct_answer: "B"
  },
  {
    question: "What famous holiday character first appeared in a 1939 booklet published by the department store Montgomery Ward?",
    option_a: "Hermey the Elf",
    option_b: "Frosty the Snowman",
    option_c: "The Grinch",
    option_d: "Rudolph the Red-Nosed Reindeer",
    correct_answer: "D"
  },
  {
    question: "What did Frosty the Snowman use for a nose?",
    option_a: "A pebble",
    option_b: "A button",
    option_c: "A carrot",
    option_d: "A lump of coal",
    correct_answer: "B"
  },
  {
    question: "What department store is the movie 'Miracle on 34th Street' based on?",
    option_a: "Bloomingdale's",
    option_b: "Macy's",
    option_c: "Gimbels",
    option_d: "Sears",
    correct_answer: "B"
  },
  {
    question: "In 'The Nightmare Before Christmas,' what is the name of Jack Skellington's ghost dog?",
    option_a: "Spooky",
    option_b: "Bones",
    option_c: "Zero",
    option_d: "Ghosty",
    correct_answer: "C"
  },
  {
    question: "What is the highest-grossing Christmas movie of all time (worldwide box office, unadjusted)?",
    option_a: "The Grinch (2018)",
    option_b: "Home Alone",
    option_c: "The Polar Express",
    option_d: "How the Grinch Stole Christmas (2000)",
    correct_answer: "B"
  },
  {
    question: "What is the last line of the poem 'Twas the Night Before Christmas'?",
    option_a: "Ho, ho, ho, Merry Christmas!",
    option_b: "Happy Christmas to all, and to all a good night!",
    option_c: "Off we go, into the snow!",
    option_d: "And a very Merry Christmas to all!",
    correct_answer: "B"
  },
  {
    question: "In 'A Charlie Brown Christmas,' who helps Charlie Brown find a Christmas tree?",
    option_a: "Lucy",
    option_b: "Snoopy",
    option_c: "Linus",
    option_d: "Peppermint Patty",
    correct_answer: "C"
  },
  {
    question: "What famous line does the Grinch say about Christmas not coming from a store?",
    option_a: "Maybe Christmas... perhaps... means a little bit more!",
    option_b: "Christmas is a holiday I can do without!",
    option_c: "All I need is a big red coat and a bag!",
    option_d: "I'll take Christmas, but I won't take the noise!",
    correct_answer: "A"
  },
  {
    question: "In 'Rudolph the Red-Nosed Reindeer' (1964), what did Hermey the Elf want to be instead of a toymaker?",
    option_a: "A baker",
    option_b: "A ship captain",
    option_c: "A dentist",
    option_d: "A clockmaker",
    correct_answer: "C"
  },

  // --- Food & Drink Trivia ---
  {
    question: "Which popular Christmas beverage is also known as 'milk punch'?",
    option_a: "Wassail",
    option_b: "Mulled Wine",
    option_c: "Eggnog",
    option_d: "Hot Chocolate",
    correct_answer: "C"
  },
  {
    question: "The earliest mince pies actually contained which main ingredient?",
    option_a: "Pork",
    option_b: "Beef",
    option_c: "Lamb",
    option_d: "Turkey",
    correct_answer: "B"
  },
  {
    question: "Which alcohol is traditionally poured over a Christmas pudding before lighting it on fire?",
    option_a: "Rum",
    option_b: "Vodka",
    option_c: "Brandy",
    option_d: "Whiskey",
    correct_answer: "C"
  },
  {
    question: "What type of nuts are often roasted on an open fire, according to the popular song?",
    option_a: "Pecans",
    option_b: "Almonds",
    option_c: "Walnuts",
    option_d: "Chestnuts",
    correct_answer: "D"
  },
  {
    question: "Gingerbread houses were first inspired by which famous fairy tale?",
    option_a: "Sleeping Beauty",
    option_b: "Rapunzel",
    option_c: "Hansel and Gretel",
    option_d: "Cinderella",
    correct_answer: "C"
  },
  {
    question: "In the classic song 'We Wish You a Merry Christmas,' what kind of pudding is mentioned?",
    option_a: "Yorkshire pudding",
    option_b: "Figgy pudding",
    option_c: "Rice pudding",
    option_d: "Plum pudding",
    correct_answer: "B"
  },
  {
    question: "The shape of a candy cane is meant to resemble what item?",
    option_a: "A Sleigh Runner",
    option_b: "A Shepherd's Staff",
    option_c: "A J-shaped Letter",
    option_d: "A Snow Hook",
    correct_answer: "B"
  },
  {
    question: "What is traditionally hidden inside a British Christmas pudding for good luck?",
    option_a: "A thimble",
    option_b: "A small piece of paper",
    option_c: "A silver coin",
    option_d: "A small doll",
    correct_answer: "C"
  },
  {
    question: "What fruit is traditionally placed inside a Christmas stocking?",
    option_a: "Apple",
    option_b: "Orange",
    option_c: "Pear",
    option_d: "Pomegranate",
    correct_answer: "B"
  },
  {
    question: "Which German Christmas bread, shaped like a loaf, is dusted with powdered sugar?",
    option_a: "Pfeffernüsse",
    option_b: "Lebkuchen",
    option_c: "Stollen",
    option_d: "Springerle",
    correct_answer: "C"
  },
  {
    question: "Which popular Christmas spice comes from the bark of a tree?",
    option_a: "Nutmeg",
    option_b: "Clove",
    option_c: "Ginger",
    option_d: "Cinnamon",
    correct_answer: "D"
  },
  {
    question: "In Italy, the traditional Christmas Eve dinner is known as 'The Feast of the Seven' what?",
    option_a: "Meats",
    option_b: "Fishes",
    option_c: "Pastas",
    option_d: "Puddings",
    correct_answer: "B"
  },
  {
    question: "What food is traditionally left out for Santa's reindeer in North America?",
    option_a: "Hay",
    option_b: "Carrots",
    option_c: "Apples",
    option_d: "Oats",
    correct_answer: "B"
  },
  {
    question: "What type of berry is often made into a sauce to be served with a Christmas turkey?",
    option_a: "Raspberry",
    option_b: "Blackberry",
    option_c: "Cranberry",
    option_d: "Gooseberry",
    correct_answer: "C"
  },
  {
    question: "What is the milky Chilean Christmas drink 'Cola de Mono' primarily made with?",
    option_a: "Coffee, Milk, and Aguardiente",
    option_b: "Rum, Egg, and Cream",
    option_c: "Wine, Fruit, and Spice",
    option_d: "Chocolate, Water, and Cinnamon",
    correct_answer: "A"
  },

  // --- Santa & Reindeer Trivia (Non-Religious) ---
  {
    question: "What is the color of Santa Claus's belt?",
    option_a: "Brown",
    option_b: "Black",
    option_c: "Red",
    option_d: "Green",
    correct_answer: "B"
  },
  {
    question: "What animal is generally considered to be the most common on Christmas cards?",
    option_a: "Penguin",
    option_b: "Reindeer",
    option_c: "Robin",
    option_d: "Polar Bear",
    correct_answer: "C"
  },
  {
    question: "Excluding Rudolph, how many reindeer are named in the classic poem 'A Visit from St. Nicholas'?",
    option_a: "Six",
    option_b: "Seven",
    option_c: "Eight",
    option_d: "Nine",
    correct_answer: "C"
  },
  {
    question: "According to the song, what did the other reindeer not let Rudolph do?",
    option_a: "Pull the sleigh",
    option_b: "Guide the way",
    option_c: "Join in any reindeer games",
    option_d: "Eat the carrots",
    correct_answer: "C"
  },
  {
    question: "What is the name of Santa's wife, a common figure in American Christmas lore?",
    option_a: "Miss Noel",
    option_b: "Mrs. Kringle",
    option_c: "Mrs. Claus",
    option_d: "Holly Claus",
    correct_answer: "C"
  },
  {
    question: "Which of Santa's reindeer has the same name as a famous Roman god of love?",
    option_a: "Vixen",
    option_b: "Cupid",
    option_c: "Dasher",
    option_d: "Comet",
    correct_answer: "B"
  },
  {
    question: "Santa's outfit was once a different color before the iconic red. What was an earlier color associated with him?",
    option_a: "Blue",
    option_b: "Green",
    option_c: "Purple",
    option_d: "Tan",
    correct_answer: "D"
  },
  {
    question: "What is another common name for Santa Claus, often used as a direct alternative to 'St. Nicholas'?",
    option_a: "Old Man Winter",
    option_b: "Kris Kringle",
    option_c: "Jack Frost",
    option_d: "Papa Noel",
    correct_answer: "B"
  },
  {
    question: "In what fictional location does Santa Claus and his elves supposedly live and work?",
    option_a: "The South Pole",
    option_b: "Christmas Valley",
    option_c: "The North Pole",
    option_d: "Mount Crumpit",
    correct_answer: "C"
  },
  {
    question: "What do children in America typically leave out for Santa Claus on Christmas Eve?",
    option_a: "Pie and Tea",
    option_b: "Milk and Cookies",
    option_c: "Coffee and Doughnuts",
    option_d: "Water and Bread",
    correct_answer: "B"
  },

  // --- Miscellaneous & Global Traditions (Non-Religious) ---
  {
    question: "In what country is it a tradition to hide a small glass pickle ornament on the Christmas tree?",
    option_a: "Spain",
    option_b: "Mexico",
    option_c: "USA (common practice)",
    option_d: "Sweden",
    correct_answer: "C"
  },
  {
    question: "In Sweden, what traditional Christmas figure is often made out of straw and is sometimes burned down as an act of protest?",
    option_a: "A Goat (Yule Goat)",
    option_b: "A Reindeer",
    option_c: "A Giant Elf",
    option_d: "A Snowman",
    correct_answer: "A"
  },
  {
    question: "In which country is it a tradition to hang artificial spider webs on Christmas trees for good luck?",
    option_a: "Ukraine",
    option_b: "Greece",
    option_c: "Poland",
    option_d: "Portugal",
    correct_answer: "A"
  },
  {
    question: "What is the name of the winter solstice holiday celebrated in ancient Rome?",
    option_a: "Lupercalia",
    option_b: "Saturnalia",
    option_c: "Kalends",
    option_d: "Sol Invictus",
    correct_answer: "B"
  },
  {
    question: "What is the name of the mythological figure in Austrian and Bavarian folklore who punishes naughty children at Christmastime?",
    option_a: "Babbo Natale",
    option_b: "Perchta",
    option_c: "Krampus",
    option_d: "La Befana",
    correct_answer: "C"
  },
  {
    question: "Which city in the U.S. has a city named North Pole?",
    option_a: "Minnesota",
    option_b: "Alaska",
    option_c: "Maine",
    option_d: "Michigan",
    correct_answer: "B"
  },
  {
    question: "What is the traditional name for the day when the Christmas tree is taken down, which usually happens on January 5th or 6th?",
    option_a: "Twelfth Night",
    option_b: "Epiphany",
    option_c: "Old Christmas Day",
    option_d: "Candlemas",
    correct_answer: "A"
  },
  {
    question: "What is the maximum number of people that can fit inside an average gingerbread house?",
    option_a: "Zero",
    option_b: "One",
    option_c: "Two",
    option_d: "Three",
    correct_answer: "A" // Trick question, but based on typical gingerbread *cookie* houses
  },
  {
    question: "What is the name for the period of 24 days leading up to Christmas Day?",
    option_a: "Yuletide",
    option_b: "The Holiday Season",
    option_c: "Advent",
    option_d: "Christmastide",
    correct_answer: "C"
  },
  {
    question: "In what decade did electric Christmas tree lights first become widely available to the public?",
    option_a: "1880s",
    option_b: "1900s",
    option_c: "1920s",
    option_d: "1940s",
    correct_answer: "B"
  },
  {
    question: "What is the name of the hot, strong brandy and egg drink popular in Italy during Christmas?",
    option_a: "Spritz",
    option_b: "Limoncello",
    option_c: "Bombardino",
    option_d: "Grappa",
    correct_answer: "C"
  },
  {
    question: "Which holiday is sometimes referred to as 'The Second Christmas' in Canada?",
    option_a: "New Year's Day",
    option_b: "Boxing Day",
    option_c: "Remembrance Day",
    option_d: "Thanksgiving",
    correct_answer: "B"
  },
  {
    question: "What item is traditionally placed on the top of a Christmas tree as a symbol of the guiding star?",
    option_a: "A Gold Bell",
    option_b: "A Star",
    option_c: "A Snowman",
    option_d: "A Red Bow",
    correct_answer: "B"
  },
  {
    question: "Approximately how many Christmas cards are sent each year in the United States?",
    option_a: "100 Million",
    option_b: "500 Million",
    option_c: "1.3 Billion",
    option_d: "5 Billion",
    correct_answer: "C"
  },
  {
    question: "Which state grows the most Christmas trees in the U.S.?",
    option_a: "California",
    option_b: "Washington",
    option_c: "Oregon",
    option_d: "North Carolina",
    correct_answer: "C"
  },
  {
    question: "What is the primary color of the berries on a mistletoe plant?",
    option_a: "Red",
    option_b: "White",
    option_c: "Blue",
    option_d: "Yellow",
    correct_answer: "B"
  },
  {
    question: "What is the main color of the suit worn by the character Scott Calvin in 'The Santa Clause' movie?",
    option_a: "Blue",
    option_b: "Green",
    option_c: "Red",
    option_d: "Purple",
    correct_answer: "C"
  },
  {
    question: "In the poem 'A Visit from St. Nicholas,' what dances in children's heads as they sleep?",
    option_a: "Snowflakes",
    option_b: "Sugar Plums",
    option_c: "Reindeer",
    option_d: "Christmas wishes",
    correct_answer: "B"
  },
  {
    question: "In 'Frosty the Snowman,' what brings Frosty to life?",
    option_a: "A magic spell",
    option_b: "A magical hat",
    option_c: "A warm hug",
    option_d: "A snowflake",
    correct_answer: "B"
  },
  {
    question: "Which popular Christmas song features the line 'tidings of comfort and joy'?",
    option_a: "God Rest Ye Merry Gentlemen",
    option_b: "The First Noel",
    option_c: "O Holy Night",
    option_d: "Deck the Halls",
    correct_answer: "A"
  },
  {
    question: "What is the traditional name for the day when the Christmas tree is taken down, which usually happens on January 5th or 6th?",
    option_a: "Twelfth Night",
    option_b: "Epiphany",
    option_c: "Old Christmas Day",
    option_d: "Candlemas",
    correct_answer: "A"
  },
  {
    question: "In what century was the term “Xmas” coined as an abbreviation for Christmas?",
    option_a: "14th century",
    option_b: "16th century",
    option_c: "18th century",
    option_d: "20th century",
    correct_answer: "B"
  },
  {
    question: "The traditional Scandinavian winter celebration that includes the burning of a large decorated log is called what?",
    option_a: "Midwinter",
    option_b: "Yule",
    option_c: "Saturnalia",
    option_d: "Feast of Lights",
    correct_answer: "B"
  },
  {
    question: "What is the name of the traditional German mulled wine served during the holidays?",
    option_a: "Glühwein",
    option_b: "Vin Chaud",
    option_c: "Jólablóð",
    option_d: "Punch",
    correct_answer: "A"
  },
  {
    question: "Which popular holiday plant has spiky leaves and red berries?",
    option_a: "Ivy",
    option_b: "Poinsettia",
    option_c: "Fir",
    option_d: "Holly",
    correct_answer: "D"
  },
  {
    question: "In 'How the Grinch Stole Christmas,' the Grinch was described with three words. What are they?",
    option_a: "Sly, mean, sneaky",
    option_b: "Stink, stank, stunk",
    option_c: "Furious, filthy, foul",
    option_d: "Nasty, rotten, rude",
    correct_answer: "B"
  },
  {
    question: "The term 'Santa Claus' is an anglicized version of the Dutch name 'Sinterklaas.' What does the original name literally mean?",
    option_a: "Holy Claus",
    option_b: "Saint Nick",
    option_c: "Saint Nicholas",
    option_d: "Winter Claus",
    correct_answer: "C"
  },
  {
    question: "What type of animal pulls Santa's sleigh?",
    option_a: "Elk",
    option_b: "Moose",
    option_c: "Caribou",
    option_d: "Reindeer",
    correct_answer: "D"
  },
  {
    question: "The Christmas season is generally thought to end after how many days, based on the classic song?",
    option_a: "Seven",
    option_b: "Nine",
    option_c: "Twelve",
    option_d: "Fifteen",
    correct_answer: "C"
  },
  {
    question: "In 'The Christmas Song,' whose eyes are all aglow?",
    option_a: "Passers-by",
    option_b: "Tiny tots",
    option_c: "Children",
    option_d: "Carollers",
    correct_answer: "B"
  },
  {
    question: "Which classic American author wrote 'A Christmas Carol'?",
    option_a: "Mark Twain",
    option_b: "Charles Dickens",
    option_c: "F. Scott Fitzgerald",
    option_d: "Ernest Hemingway",
    correct_answer: "B"
  },
  {
    question: "In the movie 'Elf,' what is the first rule of the 'Code of Elves'?",
    option_a: "Always smile",
    option_b: "Treat every day like Christmas",
    option_c: "Don't touch the mail",
    option_d: "Share your candy",
    correct_answer: "B"
  },
  {
    question: "What is the main alcoholic ingredient in a Snowball cocktail?",
    option_a: "Sherry",
    option_b: "Advocaat",
    option_c: "Brandy",
    option_d: "Gin",
    correct_answer: "B"
  },
  {
    question: "In 'A Christmas Story,' what animal did the Bumpus dogs eat?",
    option_a: "The Ham",
    option_b: "The Turkey",
    option_c: "The Goose",
    option_d: "The Pudding",
    correct_answer: "B"
  },
  {
    question: "What does the Christmas word 'Noël' mean in French?",
    option_a: "Snowfall",
    option_b: "Festival",
    option_c: "To be born",
    option_d: "Gift",
    correct_answer: "C"
  },
  {
    question: "In 'The Polar Express,' what is the ticket punched to spell out for the main character?",
    option_a: "BELIEVE",
    option_b: "COURAGE",
    option_c: "FRIEND",
    option_d: "NORTH POLE",
    correct_answer: "A"
  },
  {
    question: "What do people traditionally put on top of a Christmas tree?",
    option_a: "A Snowman",
    option_b: "A Star or an Angel",
    option_c: "A Mistletoe sprig",
    option_d: "A Candy Cane",
    correct_answer: "B"
  },
  {
    question: "In the song 'Up on the Housetop,' what does the line 'first comes the stocking of little Nell' refer to?",
    option_a: "A small bell",
    option_b: "A girl named Nell",
    option_c: "A small hill",
    option_d: "A tiny deer",
    correct_answer: "B"
  },
  {
    question: "Which of Santa's reindeer is the only female reindeer mentioned in the classic poem?",
    option_a: "Vixen",
    option_b: "Prancer",
    option_c: "Comet",
    option_d: "Dasher",
    correct_answer: "A"
  },
  {
    question: "The first documented Christmas tree was put up in which city in 1605?",
    option_a: "Berlin",
    option_b: "Strasbourg",
    option_c: "Vienna",
    option_d: "London",
    correct_answer: "B"
  },
  {
    question: "What is the main flavor of the syrup in a traditional gingerbread cookie?",
    option_a: "Vanilla",
    option_b: "Maple",
    option_c: "Molasses",
    option_d: "Corn",
    correct_answer: "C"
  },
  {
    question: "What is the last word in the Christmas carol 'We Wish You a Merry Christmas'?",
    option_a: "You",
    option_b: "Goodness",
    option_c: "Cheer",
    option_d: "Year",
    correct_answer: "D"
  },
  {
    question: "What color suit did Santa Claus originally wear before the iconic red suit became popular?",
    option_a: "Blue",
    option_b: "White",
    option_c: "Green",
    option_d: "Gold",
    correct_answer: "C"
  },
  {
    question: "What is the popular British dessert made of leftover vegetables served on Boxing Day?",
    option_a: "Ploughman's Lunch",
    option_b: "Bubble and Squeak",
    option_c: "Shepherd's Pie",
    option_d: "Colcannon",
    correct_answer: "B"
  },
  {
    question: "The poem 'Twas the Night Before Christmas' was first published anonymously in what year?",
    option_a: "1801",
    option_b: "1823",
    option_c: "1840",
    option_d: "1855",
    correct_answer: "B"
  },
  {
    question: "What type of tree is most commonly used for Christmas trees in North America?",
    option_a: "Scots Pine",
    option_b: "Douglas Fir",
    option_c: "Balsam Fir",
    option_d: "Spruce",
    correct_answer: "B"
  },
  {
    question: "What common Christmas decoration was first invented by a glass blower in Lauscha, Germany?",
    option_a: "Candles",
    option_b: "Garland",
    option_c: "Glass Baubles",
    option_d: "Tinsel",
    correct_answer: "C"
  },
  {
    question: "In what year was the Christmas song 'It's the Most Wonderful Time of the Year' first recorded?",
    option_a: "1942",
    option_b: "1955",
    option_c: "1963",
    option_d: "1971",
    correct_answer: "C"
  },
  {
    question: "What is the capital of Christmas Island, located in the Indian Ocean?",
    option_a: "Christmas City",
    option_b: "Flying Fish Cove",
    option_c: "Port Santa",
    option_d: "The Cove",
    correct_answer: "B"
  },
  {
    question: "In 'A Christmas Story,' what was the name of the furnace in Ralphie's house?",
    option_a: "The Old Man",
    option_b: "The Iron Belly",
    option_c: "The Demon",
    option_d: "The Beast",
    correct_answer: "C"
  },
  {
    question: "What is the common term for the period of 12 days *after* Christmas Day?",
    option_a: "The Long Winter",
    option_b: "Christmastide",
    option_c: "Epiphany Lead-up",
    option_d: "New Year's Week",
    correct_answer: "B"
  },
  {
    question: "Which country has a tradition where children leave out their clogs (shoes) for presents on December 5th?",
    option_a: "The Netherlands",
    option_b: "Belgium",
    option_c: "France",
    option_d: "Switzerland",
    correct_answer: "A"
  },
  {
    question: "What popular Christmas flower is known for being highly poisonous to pets if ingested?",
    option_a: "Cyclamen",
    option_b: "Holly",
    option_c: "Christmas Cactus",
    option_d: "Poinsettia",
    correct_answer: "D"
  },
  {
    question: "What did the main character in 'The Polar Express' receive as his first gift from Santa Claus?",
    option_a: "A new hat",
    option_b: "A bell from the sleigh",
    option_c: "A toy train",
    option_d: "A Christmas cookie",
    correct_answer: "B"
  },
  {
    question: "What color are the berries of a holly plant?",
    option_a: "Red",
    option_b: "White",
    option_c: "Yellow",
    option_d: "Purple",
    correct_answer: "A"
  },
  {
    question: "In 'The Nutcracker' ballet, who is the main girl character?",
    option_a: "Clara",
    option_b: "Sugar Plum Fairy",
    option_c: "Drosselmeyer",
    option_d: "Marie",
    correct_answer: "A"
  },
  {
    question: "Which American military organization runs the 'Toys for Tots' charity program?",
    option_a: "Army",
    option_b: "Navy",
    option_c: "Air Force",
    option_d: "Marines",
    correct_answer: "D"
  },
  {
    question: "Which animated film holds the record for the highest opening weekend box office for a Christmas-themed movie?",
    option_a: "The Grinch (2018)",
    option_b: "A Christmas Carol (2009)",
    option_c: "The Polar Express",
    option_d: "Elf",
    correct_answer: "A"
  },
  {
    question: "What is the common British term for the Christmas cracker, a festive table decoration that 'pops' when pulled?",
    option_a: "Snappers",
    option_b: "Poppers",
    option_c: "Bangers",
    option_d: "Bon-Bons",
    correct_answer: "D"
  },
  {
    question: "What German word is an alternative name for a Christmas tree?",
    option_a: "Ostern",
    option_b: "Adventszeit",
    option_c: "Weihnachtsbaum",
    option_d: "Glocken",
    correct_answer: "C"
  },
  {
    question: "Which of Santa's reindeer is known for being 'dashing'?",
    option_a: "Prancer",
    option_b: "Comet",
    option_c: "Dasher",
    option_d: "Vixen",
    correct_answer: "C"
  },
  {
    question: "What vegetable is a traditional accompaniment to a roast turkey on a British Christmas dinner plate?",
    option_a: "Carrots",
    option_b: "Green Beans",
    option_c: "Brussel Sprouts",
    option_d: "Peas",
    correct_answer: "C"
  },
  {
    question: "In the movie 'Elf,' Buddy attempts to use what item as a Christmas tree decoration in the apartment?",
    option_a: "An orange",
    option_b: "A banana",
    option_c: "A tangerine",
    option_d: "A lime",
    correct_answer: "C"
  },
  {
    question: "The song 'Rockin' Around the Christmas Tree' was a hit for both Brenda Lee and which modern artist?",
    option_a: "Michael Bublé",
    option_b: "Harry Connick Jr.",
    option_c: "Josh Groban",
    option_d: "Tony Bennett",
    correct_answer: "A"
  },
  {
    question: "What item is traditionally burned in a fireplace during the Yule season for good luck?",
    option_a: "A small bird's nest",
    option_b: "A special log",
    option_c: "An old stocking",
    option_d: "A wooden reindeer",
    correct_answer: "B"
  },
  {
    question: "Which German city is home to one of the oldest and most famous Christmas markets, dating back to the 1400s?",
    option_a: "Munich",
    option_b: "Cologne",
    option_c: "Dresden",
    option_d: "Hamburg",
    correct_answer: "C"
  },
  {
    question: "In 'A Christmas Carol,' what is the first name of Scrooge's deceased business partner?",
    option_a: "Bob",
    option_b: "Marley",
    option_c: "Jacob",
    option_d: "Tiny",
    correct_answer: "C"
  },
  {
    question: "What is the name of the giant snow monster in the 1964 TV special 'Rudolph the Red-Nosed Reindeer'?",
    option_a: "The Yeti",
    option_b: "The Bumble",
    option_c: "The Grump",
    option_d: "The Ice King",
    correct_answer: "B"
  },
  {
    question: "What common Christmas decoration was originally hung to scare away witches and evil spirits in ancient European traditions?",
    option_a: "Wreaths",
    option_b: "Garlands",
    option_c: "Bells",
    option_d: "Candles",
    correct_answer: "C"
  },
  {
    question: "What is the name for the period of 12 days *after* Christmas Day, often marked by continued feasting and celebration?",
    option_a: "The Long Winter",
    option_b: "Christmastide",
    option_c: "Epiphany Lead-up",
    option_d: "New Year's Week",
    correct_answer: "B"
  },
  {
    question: "What is the name of the traditional German Christmas cookie that is thin, crispy, and often flavored with anise?",
    option_a: "Pfeffernüsse",
    option_b: "Lebkuchen",
    option_c: "Stollen",
    option_d: "Springerle",
    correct_answer: "D"
  },
  {
    question: "What is the primary color of the suit worn by the character Scott Calvin in 'The Santa Clause' movie?",
    option_a: "Blue",
    option_b: "Green",
    option_c: "Red",
    option_d: "Purple",
    correct_answer: "C"
  },
  {
    question: "In 'Home Alone 2: Lost in New York,' which famous American President makes a cameo in the Plaza Hotel lobby?",
    option_a: "Bill Clinton",
    option_b: "Donald Trump",
    option_c: "George W. Bush",
    option_d: "Ronald Reagan",
    correct_answer: "B"
  },
  {
    question: "The Christmas season is generally thought to end after how many days, based on the classic song?",
    option_a: "Seven",
    option_b: "Nine",
    option_c: "Twelve",
    option_d: "Fifteen",
    correct_answer: "C"
  },
  {
    question: "What is the German name for the traditional holiday cake dusted with powdered sugar and often including marzipan?",
    option_a: "Pfeffernüsse",
    option_b: "Lebkuchen",
    option_c: "Stollen",
    option_d: "Springerle",
    correct_answer: "C"
  },
  {
    question: "What does the Christmas word 'Noël' mean in French?",
    option_a: "Snowfall",
    option_b: "Festival",
    option_c: "To be born",
    option_d: "Gift",
    correct_answer: "C"
  },
  {
    question: "The traditional holiday cake 'Panettone' is a tall, dome-shaped cake that originated in which Italian city?",
    option_a: "Rome",
    option_b: "Naples",
    option_c: "Milan",
    option_d: "Florence",
    correct_answer: "C"
  },
  {
    question: "Which of Santa's reindeer's name means 'cupid' in Latin?",
    option_a: "Vixen",
    option_b: "Comet",
    option_c: "Cupid",
    option_d: "Donner",
    correct_answer: "C"
  },
  {
    question: "What is the traditional name for the day when the Christmas tree is taken down, which usually happens on January 5th or 6th?",
    option_a: "Twelfth Night",
    option_b: "Epiphany",
    option_c: "Old Christmas Day",
    option_d: "Candlemas",
    correct_answer: "A"
  },
  {
    question: "In what century was the term “Xmas” coined as an abbreviation for Christmas?",
    option_a: "14th century",
    option_b: "16th century",
    option_c: "18th century",
    option_d: "20th century",
    correct_answer: "B"
  },
  {
    question: "The traditional Scandinavian winter celebration that includes the burning of a large decorated log is called what?",
    option_a: "Midwinter",
    option_b: "Yule",
    option_c: "Saturnalia",
    option_d: "Feast of Lights",
    correct_answer: "B"
  },
  {
    question: "What is the name of the traditional German mulled wine served during the holidays?",
    option_a: "Glühwein",
    option_b: "Vin Chaud",
    option_c: "Jólablóð",
    option_d: "Punch",
    correct_answer: "A"
  },
  {
    question: "Which popular holiday plant has spiky leaves and red berries?",
    option_a: "Ivy",
    option_b: "Poinsettia",
    option_c: "Fir",
    option_d: "Holly",
    correct_answer: "D"
  },
  {
    question: "What is the traditional name for the day when the Christmas tree is taken down, which usually happens on January 5th or 6th?",
    option_a: "Twelfth Night",
    option_b: "Epiphany",
    option_c: "Old Christmas Day",
    option_d: "Candlemas",
    correct_answer: "A"
  },
];