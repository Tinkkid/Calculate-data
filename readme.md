# Алгорітм для обчислення

Даний код розрахований на роботу з великим набором цілих чисел з файлу.
Алгорітм виконує наступні задачі (пошук):

1. Найбільшого числа у файлі
2. Найменшого числа у файлі
3. Медіани набору чисел
4. Середнє арифметичне значення 
5. Найбільшої послідовністі чисел, яка збільшується
6. Найбільшої послідовністі чисел, яка зменьшується

Для використання алогіртму для запуску обчислень необхідно:

## Для роботи з репозиторієм та використання алгорітму обчислень необхідно

1. Склонувати репозиторій:

```bash
git clone https://github.com/Tinkkid/Calculate-data.git
```

2. Перевірити версію встановленої Node.js:

```bash
node -v
```

Якщо node не встановлено або застаріла (версія менша за v.16), то необхідно встановити/оновити за посиланням [Nodejs website](https://nodejs.org/en/)

3. В папку **data** зберегті файл для обчислень. Для виконання даного завдання використовувався файл - `10m.txt`, який треба завантажити за посиланням [Drive google file](https://drive.google.com/file/d/1LxSB6UEAVK0NLgU0ah5y0CBbD0gL_oO9/), розпакувати та **зберігти** в папці **data**

:bangbang: Можна використати для обчислень інший файл набору цілих чисел. Для цього обов'язково треба **змінити ім'я файлу** в зміній **const FILE_NAME**, яка знаходиться в src/index.js

```bash
const FILE_NAME = "data/вказати ім'я вашого файлу"
```

4. Запустит файл в терміналі та отримати результат

```bash
npm start
```