import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  try {
    // Path to your folder containing JSON files
    const directoryPath = path.join(process.cwd(), 'public/data-travel-group-5');

    // Read all files from the directory
    const files = fs.readdirSync(directoryPath);

    // Filter only JSON files
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    // Sort files by creation time (newest first)
    const sortedFiles = jsonFiles.sort((a, b) => {
      const fileA = path.join(directoryPath, a);
      const fileB = path.join(directoryPath, b);
      return fs.statSync(fileB).mtime.getTime() - fs.statSync(fileA).mtime.getTime();
    });

    // Get the latest file
    const latestFile = sortedFiles[0];  // The most recent file
    const jsonPath = path.join(directoryPath, latestFile);

    // Read the content of the latest JSON file
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');

    // Return the JSON data as a response
    return new Response(jsonData, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response('Error loading data', { status: 500 });
  }
}
