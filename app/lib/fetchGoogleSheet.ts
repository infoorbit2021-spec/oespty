'use server';
import { google } from 'googleapis';

export async function getSheetData<T = any>(sheetName: string): Promise<T[]> {
  const apiKey = process.env.GOOGLE_API_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!apiKey || !spreadsheetId) {
    console.warn('Missing GOOGLE_API_KEY or GOOGLE_SHEET_ID');
    return [];
  }

  const sheets = google.sheets({ version: 'v4', auth: apiKey });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: sheetName,
  });

  const rows = res.data.values;
  if (!rows || rows.length === 0) return [];

  const headers = rows[0];

  return rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h as string] = row[i] ?? '';
    });
    return obj as T;
  });
}