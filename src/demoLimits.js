import { catalogProducts } from './catalog';

export const DEMO_REGISTRATION_LIMIT = 5;

const catalogNames = new Set(catalogProducts.map(product => normalize(product.name)));

export function countDemoStockRegistrations(products = []) {
    return products.filter(product => !catalogNames.has(normalize(product.name))).length;
}

function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
}