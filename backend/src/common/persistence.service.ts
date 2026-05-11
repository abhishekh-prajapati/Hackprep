import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PersistenceService {
  private readonly dataPath = path.join(process.cwd(), 'data');

  constructor() {
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
    }
  }

  saveData(filename: string, data: any): void {
    const filePath = path.join(this.dataPath, `${filename}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  loadData<T>(filename: string, defaultValue: T): T {
    const filePath = path.join(this.dataPath, `${filename}.json`);
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content) as T;
    } catch (error) {
      console.error(`Error loading data from ${filename}.json:`, error);
      return defaultValue;
    }
  }
}
