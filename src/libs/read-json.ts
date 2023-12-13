import { createRequire } from 'node:module';

const requireModule = createRequire(import.meta.url);

export const loadJSONFromFile = (path: string) => {
  try {
    return requireModule(path);
  } catch (error) {
    console.error(
      `Error loading JSON file at ${path}: ${(error as Error).message}`
    );
    return null;
  }
};

/* import fs from 'node:fs';
import path from 'node:path';

export const loadJSONFromFile = (pathStr: string) => {
  try {
    const filePath = path.resolve(pathStr);
    const data = fs.readFileSync(filePath, 'utf-8');

    return JSON.parse(data);
  } catch (error) {
    console.error(
      `Error loading JSON file at ${pathStr}: ${(error as Error).message}`
    );

    return null;
  }
}; */
