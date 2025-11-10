// Number sorting tool: parses comma-separated numbers, validates, and sorts

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('sort-form');
  if (!form) return;

  const input = document.getElementById('sort-input');
  const order = document.getElementById('sort-order');
  const output = document.getElementById('sort-output');

  function parseNumbers(str) {
    if (!str) return [];
    return str.split(',').map(s => s.trim()).filter(s => s.length > 0).map(Number);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    output.textContent = '';
    output.setAttribute('role','status');
    const raw = input.value;
    const arr = parseNumbers(raw);
    if (arr.length === 0 || arr.some(n => Number.isNaN(n))) {
      output.textContent = 'Please enter a comma-separated list of numbers (e.g. 4, 2, 9).';
      output.classList.remove('text-success');
      output.classList.add('text-danger');
      return;
    }

    const asc = order.value === 'asc';
    arr.sort((a,b) => asc ? a-b : b-a);
    output.classList.remove('text-danger');
    output.classList.add('text-success');
    output.textContent = arr.join(', ');
  });
});