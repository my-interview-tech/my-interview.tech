const fs = require('fs');
const path = require('path');

const processLines = () => {
  // Укажи путь к своему MD-файлу
  const filePath = path.join(__dirname, './0.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  const processed = content
    .split('\n')
    .map(line => {
      // Игнорируем пустые строки
      if (!line.trim()) return line;

      // Разбиваем строку на номер и текст
      const match = line.match(/^(\d+\.)\s+(.*?)\s*$/);
      if (!match) return line;

      const [_, number, text] = match;
      
      // Удаляем нежелательные символы и лишние пробелы
      const cleanText = text
        .replace(/[\/?¿!¡?*:—,]/g, '') // Удаляем специальные символы
        .replace(/\s+/g, ' ')          // Убираем двойные пробелы
        .trim();

      return `${number} [[${cleanText}]]`;
    })
    .join('\n');

  // Записываем результат в новый файл
  fs.writeFileSync(path.join(__dirname, 'processed-file.md'), processed);
};

processLines();