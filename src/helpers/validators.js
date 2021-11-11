import { parse } from "date-fns";

const dateFormat = "dd.MM.yyyy";

const isEmpty = (value) => typeof value !== "string" || value.length === 0;
const strToDate = (value) => parse(value, dateFormat, new Date());
const isValidDate = (value) => value instanceof Date && value.getTime() === value.getTime();

// Фильтр, только русские буквы, пробел и дефис
export function onlyRusLetters(value) {
  return isEmpty(value) || /^[а-яё -]+$/i.test(value);
}

// Фильтр, только латинские буквы, пробел и дефис
export function onlyEngLetters(value) {
  return isEmpty(value) || /^[a-z -]+$/i.test(value);
}

// Фильтр, 4 цифры
export function rusPassportId(value) {
  return isEmpty(value) || /^\d{4}$/i.test(value);
}

// Фильтр, 6 цифр (можно конечно было сделать универсальный, но возни больше)
export function rusPassportSeries(value) {
  return isEmpty(value) || /^\d{6}$/i.test(value);
}

// Фильтр, дата в формате дд.мм.гггг
export function checkDateFormat(value) {
  return isEmpty(value) || /^\d{2}\.\d{2}\.\d{4}$/.test(value);
}

// Фильтр, валидная дата
export function checkValidDate(value) {
  if (isEmpty(value) || !checkDateFormat(value)) {
    return true;
  }

  return isValidDate(strToDate(value));
}

// Фильтр, дата меньше или равна текущей
export function dateLessThanCurrent(value) {
  if (isEmpty(value) || !checkValidDate(value)) {
    return true;
  }

  return strToDate(value) <= new Date();
}
