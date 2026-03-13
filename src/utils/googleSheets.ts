/**
 * Google Sheets CMS Service
 * Fetches data from Google Sheets and transforms it into usable format
 */

import { LandingPageProps } from '@/types';

const getApiKey = () => {
  const isDev = process.env.NODE_ENV === 'development';
  return isDev ? process.env.GOOGLE_SHEETS_API_KEY_DEV : process.env.GOOGLE_SHEETS_API_KEY_PROD;
};

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

/**
 * Fetches data from a specific sheet tab
 * @param {string} sheetName - Name of the sheet tab (e.g., 'combat-sports')
 * @returns {Promise<Object>} Transformed data object; we get what we get
 */
export const fetchSheetData = async (sheetName: string): Promise<object> => {
  const apiKey = getApiKey();
  
  if (!apiKey || !SPREADSHEET_ID) {
    throw new Error('Missing Google Sheets configuration');
  }

  const range = `${sheetName}!A:B`; // Only columns A and B (key and value)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Google Sheets API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.values || data.values.length === 0) {
      return {};
    }

    // Skip header row and transform data
    const rows = data.values.slice(1);

    return transformSheetData(rows);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
};

/**
 * Transforms flat key-value pairs into nested object structure
 * Handles dot notation (obj.prop) and bracket notation (obj[0])
 * @param {Array} rows - Array of [key, value] pairs
 * @returns {Object} Nested object structure
 */
const transformSheetData = (rows: Array<Array<string>>): Partial<LandingPageProps> => {
  const result = {};

  rows.forEach(([key, value]) => {
    if (!key || key.trim() === '') return;
    
    // Skip empty values
    if (value === undefined || value === null || value === '') return;

    setNestedValue(result, key.trim(), parseValue(value));
  });

  return result;
};

/**
 * Sets a nested value using dot and bracket notation
 * @param {Object} obj - Target object
 * @param {string} path - Path like 'heroSection.title' or 'cards[0].title'
 * @param {*} value - Value to set
 */
const setNestedValue = (obj: object, path: string, value: any) => {
  const keys = path.split(/\.|\[|\]/).filter(key => key !== '');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];
    
    // Check if next key is a number (array index)
    const isNextArray = !isNaN(parseInt(nextKey));
    
    if (!(key in current)) {
      current[key] = isNextArray ? [] : {};
    }
    
    current = current[key];
  }

  const finalKey = keys[keys.length - 1];
  current[finalKey] = value;
};

/**
 * Parses string values to appropriate types
 * @param {string} value - String value from sheet
 * @returns {string | number | boolean } Parsed value
 */
const parseValue = (value: string): string | number | boolean => {
  if (typeof value !== 'string') return value;
  
  const trimmed = value.trim();
  
  // Boolean values
  if (trimmed.toLowerCase() === 'true') return true;
  if (trimmed.toLowerCase() === 'false') return false;
  
  // Numeric values
  if (!isNaN(Number(trimmed)) && trimmed !== '') {
    return Number(trimmed);
  }
  
  // HTML entities and special formatting
  return trimmed
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, '\u00A0')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&apos;/g, "'");
};