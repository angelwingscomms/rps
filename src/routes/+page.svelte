<script>
  let playerChoice = '';
  let computerChoice = '';
  let result = '';

  const choices = ['Rock', 'Paper', 'Scissors'];

  function play(choice) {
    playerChoice = choice;
    computerChoice = choices[Math.floor(Math.random() * choices.length)];
    determineWinner();
  }

  function determineWinner() {
    if (playerChoice === computerChoice) {
      result = 'It\'s a tie!';
    } else if (
      (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
      (playerChoice === 'Paper' && computerChoice === 'Rock') ||
      (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
      result = 'You win!';
    } else {
      result = 'You lose!';
    }
  }
</script>

<main>
  <h1>Rock Paper Scissors</h1>
  <div>
    {#each choices as choice}
      <button on:click={() => play(choice)}>{choice}</button>
    {/each}
  </div>
  {#if result}
    <h2>Your choice: {playerChoice}</h2>
    <h2>Computer choice: {computerChoice}</h2>
    <h2>{result}</h2>
  {/if}
</main>

<style>
  button {
    margin: 5px;
  }
</style>
