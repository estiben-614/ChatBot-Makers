import { measureTextWidth } from "@ant-design/charts";

export const BASE_URL = 'http://localhost:8080';
export const columns = [
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Price ($)',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Total ($)',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

export const data = [
  {
    key: 1,
    computer: 'HP',
    quantity: 1,
    price: 200,
  },
  {
    key: 2,
    computer: 'Acer',
    quantity: 1,
    price: 200,
  },
];

export function renderStatistic(containerWidth, text, style) {
  const { width: textWidth, height: textHeight } = measureTextWidth(text, style);

  const R = containerWidth / 2;
  let scale = 1;

  if (containerWidth < textWidth) {
    scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
  }

  const textStyleStr = `width:${containerWidth}px;`;
  return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
}