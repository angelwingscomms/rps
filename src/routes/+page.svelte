<script>
  import { onMount } from 'svelte';
  import PeerService from '$lib/PeerService.js';

  let choices = ['Rock', 'Paper', 'Scissors'];
  let selectedChoice = '';
  let opponentChoice = '';
  let message = 'Make your move!';
  let resultDetermined = false;

  function selectChoice(choice) {
    if (selectedChoice) return;
    selectedChoice = choice;
    message = 'Waiting for opponent...';
    PeerService.sendChoice(choice);
    checkIfBothChosen();
  }

  PeerService.onOpponentChoice = (choice) => {
    opponentChoice = choice;
    checkIfBothChosen();
  };

  function checkIfBothChosen() {
    if (selectedChoice && opponentChoice && !resultDetermined) {
      resultDetermined = true;
      determineResult();
    }
  }

  function determineResult() {
    const result = getResult(selectedChoice, opponentChoice);
    sessionStorage.setItem('result', result);
    sessionStorage.setItem('userChoice', selectedChoice);
    sessionStorage.setItem('opponentChoice', opponentChoice);
    window.location.href = '/result';
  }

  function getResult(userChoice, opponentChoice) {
    if (userChoice === opponentChoice) return 'draw';
    if (
      (userChoice === 'Rock' && opponentChoice === 'Scissors') ||
      (userChoice === 'Paper' && opponentChoice === 'Rock') ||
      (userChoice === 'Scissors' && opponentChoice === 'Paper')
    ) {
      return 'win';
    }
    return 'lose';
  }
</script>

<div class="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-500 to-teal-500 text-white">
  <h2 class="text-2xl font-semibold mb-6">{message}</h2>

  {#if !selectedChoice}
    <div class="flex space-x-6">
      {#each choices as choice}
        <button
          on:click={() => selectChoice(choice)}
          class="bg-white text-gray-800 px-6 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1"
        >
          {choice}
        </button>
      {/each}
    </div>
  {:else}
    <h3 class="text-xl mt-6">You chose: <span class="font-bold">{selectedChoice}</span></h3>
  {/if}
</div>
