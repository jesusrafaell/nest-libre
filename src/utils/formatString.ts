import { LocationDTO } from '../commerce/dto/new-commerce.dto';

export const daysToString = (value: any) => {
  let text: string = '';
  for (const item of Object.entries(value)) {
    if (item[1]) {
      text = text + (text.length ? ',' : '') + item[0].slice(0, 3);
    }
  }
  return text;
};

export const locationToString = (value: LocationDTO) => {
  let text: string = '';
  for (const item of Object.entries(value)) {
    if (item[1]) {
      text = text + (text.length ? ', ' : '') + item[1];
    }
  }
  return text;
};
