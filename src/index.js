const fs = require("fs");
const { performance } = require("perf_hooks");

// Файл, який має послідність цілих чисел. 
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
  const increasingSequence = findIncreasingSequence(numbers);
  const decreasingSequence = findDecreasingSequence(numbers);
  // Фіксуємо кінець обчислювань та вираховуємо різницю в мілісекундах та перетворюємо значення на секунди
  const endTime = performance.now();
  const executionTime = (endTime - startTime) / 1000; 

  console.log("Максимальне число:", max);
  console.log("Мінімальне число:", min);
  console.log("Медіана:", median);
  console.log("Середнє арифметичне:", average.toFixed(1));
  console.log("Найбільша зростаюча послідновність", increasingSequence);
  console.log("Найбільша спадаюча послідновність", decreasingSequence);
  console.log("Час виконання (секунди):", executionTime.toFixed(1));
});

// Знаходимо максимальне число з масиву.
function findMax(numbers) {
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    // Порівнюємо перше значення з наступним, перебираємо усі значення, поки не знайдемо найбільше
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}

// Знаходимо мінімальне число з масиву. 
function findMin(numbers) {
  let min = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    // Порівнюємо перше значення з наступним, перебираємо усі значення, поки не знайдемо найменше
    if (numbers[i] < min) {
      min = numbers[i];
    }
  }
  return min;
}

// Знаходимо медіану масиву.   
function findMedian(numbers) {
  // Сортуємо масив за зростанням.
  const sortedNumbers = numbers.slice().sort((a, b) => a - b);
  // Знаходимо індекс середнього значення відсортованого масиву: довжину масива ділемо пополам і округляємо значення (для непарного числа).
  const middleIndex = Math.floor(sortedNumbers.length / 2);

  // Визначаємо чи парне значення відсортованого масиву, чи ні.
  // Підставляємо індекс для середнього значення у відсортований масив і знаходимо медіану
  if (sortedNumbers.length % 2 === 0) {
    // Якщо довжина масива парна, то медіана - це напівсума двух сусідних значень
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

// Знаходимо зростаючу посідовність. 
function findIncreasingSequence(numbers) {
  let tempIncreasingSequence = [numbers[0]];
  let increasingSequence = [];

  // Перебираємо масив чисел, порівнюємо наступне з попереднім
  for (let i = 1; i < numbers.length; i++) {
    // Якщо наступне число більше за попередне, то записуємого його в тимчасовий масив
    if (
      numbers[i] > tempIncreasingSequence[tempIncreasingSequence.length - 1]
    ) {
      tempIncreasingSequence.push(numbers[i]);
    }
    // Якщо наступне число менше, то зупиняємось і порівнюємо довжину існуючої вже знайденої послідновністі з найбільшою послідновністю.
    else {
      if (tempIncreasingSequence.length > increasingSequence.length) {
        increasingSequence = tempIncreasingSequence;
      }
      // Оновлюємо поточну послідовність, яка починається з числа, на якому зупинилась умова і порівнюємо знову числа.
      tempIncreasingSequence = [numbers[i]];
    }
  }
  // Запускаємо перевірку на послідновність ще раз та порівнюємо масиви. В increasingSequence послвдовністі вже записані попередні числа
  // Якщо виявиться, що не знайшлась нова найбільща послідовність, то в increasingSequence записуємо останню тимчасову послідність
  if (tempIncreasingSequence.length > increasingSequence.length) {
    increasingSequence = tempIncreasingSequence;
  }
  return increasingSequence;
}

// Знаходимо спадаючу послідовність. Алгорітм аналогічний попередньому
function findDecreasingSequence(numbers) {
  let decreasingTempSequence = [numbers[0]];
  let decreasingSequence = [];
  for (let i = 1; i < numbers.length; i++) {
    if (
      numbers[i] < decreasingTempSequence[decreasingTempSequence.length - 1]
    ) {
      decreasingTempSequence.push(numbers[i]);
    } else {
      if (decreasingTempSequence.length > decreasingSequence.length) {
        decreasingSequence = decreasingTempSequence;
      }
      decreasingTempSequence = [numbers[i]];
    }
  }

  if (decreasingTempSequence.length > decreasingSequence.length) {
    decreasingSequence = decreasingTempSequence;
  }
  return decreasingSequence;
}
