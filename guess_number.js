const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let min = 1
let max = 100
let nbr = Math.floor(Math.random() * (max - min + 1)) + min
let guess_rights
let guessed = false

console.log('Welcome to the Guess the Number game!')
console.log("I'm thinking of a number between " + min + ' and ' + max + '.')

function choose_difficulty () {
  rl.question(
    'Please select the difficulty level:\n1. Easy (10 chances)\n2. Medium (5 chances)\n3. Hard (3 chances)\n',
    input => {
      const choose = Number(input)
      if (choose == 1) guess_rights = 10
      else if (choose == 2) guess_rights = 5
      else guess_rights = 3

      console.log(
        'You have ' + guess_rights + ' chances to guess the number. Here we go!'
      )

      ask_guess()
    }
  )
}

function ask_guess () {
  if (guess_rights <= 0 && !guessed) {
    console.log('\nGame Over! You ran out of chances.')
    console.log('The number was ' + nbr + '.')
    rl.close()
    return
  }

  rl.question(`\nMake your guess (${guess_rights} chances left): `, input => {
    let guess = Number(input)

    if (guess === nbr) {
      console.log(
        "\nCongratulations! You've guessed the number " + nbr + ' correctly!'
      )
      guessed = true
      rl.close()
      return
    } else {
      guess_rights--

      if (guess < nbr) {
        console.log('Too low!')
      } else {
        console.log('Too high!')
      }

      ask_guess()
    }
  })
}

choose_difficulty()
