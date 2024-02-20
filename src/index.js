const fs = require("fs");
const { performance } = require("perf_hooks");

const FILE_NAME = "data/10m.txt";

// Зчитуємо файл з цілими числами та створюємо масив з чисел numbers
fs.readFile(FILE_NAME, "utf8", (err, data) => {
  if (err) {
    console.error("Помилка зчитування файлу:", err);
    return;
  }
  const numbers = data.trim().split("\n").map(Number);

  // Фіксуємо початок обчислювань
  const startTime = performance.now();

  const max = findMax(numbers);
  const min = findMin(numbers);
  const median = findMedian(numbers);
  const average = findAverage(numbers);
  // Фіксуємо кінець обчислювань та вираховуємо різницю в мілісекундах та перетворюємо значення на секунди
  const endTime = performance.now();
  const executionTime = (endTime - startTime) / 1000; // перетворення в секунди

  console.log("Максимальне число:", max);
  console.log("Мінімальне число:", min);
  console.log("Медіана:", median);
  console.log("Середнє арифметичне:", average.toFixed(1));
  console.log("Час виконання (секунди):", executionTime.toFixed(1));
});

// Знаходимо максимальне число з масиву. Порівнюємо перше значення з наступним і по циклу перебираємо усі значення, поки не знайдемо найбільше
function findMax(numbers) {
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

// Знаходимо мінімальне число з масиву. Порівнюємо перше значення з наступним і по циклу перебираємо усі значення, поки не знайдемо найменше
function findMin(numbers) {
  let min = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) {
      min = numbers[i];
    }
  }
  return min;
}

// Знаходимо медіану масиву. Сортуємо масив за зростанням. Знаходимо індекс середнього значення відсортованого масиву. Визначаємо чи парне значення відсортованого масиву, чи ні.
function findMedian(numbers) {
  const sortedNumbers = numbers.slice().sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedNumbers.length / 2);
  if (sortedNumbers.length % 2 === 0) {
    return (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
  } else {
    return sortedNumbers[middleIndex];
  }
}

// Знаходимо середнеарифметичне із суми усіх чисел поділених на їх кількість
function findAverage(numbers) {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}
