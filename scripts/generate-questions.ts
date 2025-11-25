// Script to generate and insert up to 20 Christmas questions into Supabase
// Run with: npx tsx scripts/generate-questions.ts
// Make sure to set environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const QUESTION_LIMIT = 20

const christmasQuestions = [
  "What is the most popular Christmas song of all time?",
  "In which country did the tradition of Christmas trees originate?",
  "What do people traditionally put on top of a Christmas tree?",
  "How many reindeer pull Santa's sleigh?",
  "What is the name of the Grinch's dog?",
  "In 'A Christmas Carol', what is Scrooge's first name?",
  "What color are mistletoe berries?",
  "What is the main ingredient in eggnog?",
  "Which country is credited with creating the first Christmas card?",
  "What is the name of the snowman in Frozen?",
  "How many gifts are given in total in 'The Twelve Days of Christmas'?",
  "What is the traditional Christmas dinner in Japan?",
  "Which reindeer has a red nose?",
  "What does 'Noel' mean?",
  "In which month is Christmas celebrated in Australia?",
  "What is the name of the town where Santa Claus lives?",
  "What do people traditionally kiss under?",
  "What is the name of the ballet performed during Christmas?",
  "Which Christmas plant is also known as the Christmas star?",
  "What is the traditional Christmas dessert in England?",
  "How many ghosts visit Scrooge in 'A Christmas Carol'?",
  "What is the name of the main character in 'How the Grinch Stole Christmas'?",
  "Which country started the tradition of sending Christmas cards?",
  "What is the most popular Christmas cookie?",
  "What do people traditionally leave out for Santa?",
  "What is the name of the reindeer that leads Santa's sleigh?",
  "What color is Santa's suit?",
  "What is the traditional Christmas greeting in Spanish?",
  "Which fruit is traditionally put in Christmas stockings?",
  "What is the name of the angel who visits Mary?",
  "How many days are in Advent?",
  "What is the traditional Christmas drink made with wine and spices?",
  "Which country is home to the world's largest Christmas market?",
  "What is the name of the town in 'It's a Wonderful Life'?",
  "What do people traditionally hang on their doors at Christmas?",
  "What is the name of the Christmas ballet with the Sugar Plum Fairy?",
  "Which Christmas carol mentions 'figgy pudding'?",
  "What is the traditional Christmas meal in Italy?",
  "What is the name of the star that guided the Wise Men?",
  "How many wise men visited baby Jesus?",
  "What is the traditional Christmas dessert in France?",
  "Which Christmas movie features a boy who wants a Red Ryder BB gun?",
  "What is the name of the snowman in 'Rudolph the Red-Nosed Reindeer'?",
  "What do people traditionally light on Christmas Eve?",
  "Which country celebrates Christmas in summer?",
  "What is the traditional Christmas greeting in German?",
  "What is the name of the angel on top of the Christmas tree?",
  "How many candles are on an Advent wreath?",
  "What is the traditional Christmas meal in Mexico?",
  "Which Christmas carol was written by a priest in Austria?",
  "What is the name of the town where the Christmas story begins?",
  "What do people traditionally exchange at Christmas?",
  "Which Christmas movie features a boy who doesn't believe in Santa?",
  "What is the traditional Christmas dessert in Germany?",
  "What is the name of the reindeer with the red nose?",
  "How many days before Christmas is Advent?",
  "What is the traditional Christmas greeting in Italian?",
  "Which Christmas plant is poisonous?",
  "What is the name of the Christmas ballet with Clara?",
  "What do people traditionally sing at Christmas?",
  "Which country has the longest Christmas season?",
  "What is the traditional Christmas meal in Sweden?",
  "What is the name of the star that appeared at Jesus' birth?",
  "How many gifts does Santa deliver?",
  "What is the traditional Christmas dessert in America?",
  "Which Christmas movie features a man who learns the true meaning of Christmas?",
  "What is the name of the town in 'A Christmas Story'?",
  "What do people traditionally decorate at Christmas?",
  "Which Christmas carol mentions 'silent night'?",
  "What is the traditional Christmas meal in Poland?",
  "What is the name of the angel who announces Jesus' birth?",
  "How many reindeer are mentioned in 'Twas the Night Before Christmas'?",
  "What is the traditional Christmas greeting in French?",
  "Which Christmas plant is used for decoration?",
  "What is the name of the Christmas ballet with the Mouse King?",
  "What do people traditionally give at Christmas?",
  "Which country invented the Christmas cracker?",
  "What is the traditional Christmas meal in Greece?",
  "What is the name of the star that guided the shepherds?",
  "How many days of Christmas are there?",
  "What is the traditional Christmas dessert in Spain?",
  "Which Christmas movie features a train to the North Pole?",
  "What is the name of the town in 'Home Alone'?",
  "What do people traditionally wear at Christmas?",
  "Which Christmas carol mentions 'jingle bells'?",
  "What is the traditional Christmas meal in Russia?",
  "What is the name of the angel who visits Joseph?",
  "How many reindeer does Santa have?",
  "What is the traditional Christmas greeting in Portuguese?",
  "Which Christmas plant is hung for good luck?",
  "What is the name of the Christmas ballet with the Nutcracker?",
  "What do people traditionally watch at Christmas?",
  "Which country has the most Christmas traditions?",
  "What is the traditional Christmas meal in Brazil?",
  "What is the name of the star that appeared to the Magi?",
  "How many gifts are in the 12 days of Christmas?",
  "What is the traditional Christmas dessert in Canada?",
  "Which Christmas movie features a boy who becomes Santa?",
  "What is the name of the town in 'Elf'?",
  "What do people traditionally eat at Christmas?",
  "Which Christmas carol mentions 'deck the halls'?",
  "What is the traditional Christmas meal in the Philippines?",
  "What is the name of the angel who protects the Holy Family?",
  "How many reindeer pull the sleigh in the song?",
  "What is the traditional Christmas greeting in Dutch?",
]

async function insertQuestions() {
  console.log('Starting to insert questions...')
  
  // Check if questions already exist
  const { data: existingQuestions } = await supabase
    .from('questions')
    .select('id')
    .limit(1)

  if (existingQuestions && existingQuestions.length > 0) {
    console.log('Questions already exist in the database. Skipping insertion.')
    return
  }

  // Insert questions
  const questionsToInsert = christmasQuestions.slice(0, QUESTION_LIMIT).map((q) => ({ question: q }))
  
  const { data, error } = await supabase
    .from('questions')
    .insert(questionsToInsert)
    .select()

  if (error) {
    console.error('Error inserting questions:', error)
    return
  }

  console.log(`Successfully inserted ${data?.length || 0} questions!`)
}

insertQuestions()

