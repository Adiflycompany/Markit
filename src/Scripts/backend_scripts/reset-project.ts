import fs from 'fs-extra';
import path from 'path';

const moveDirectories = async (userInput: string): Promise<void> => {
  try {
    const srcPath = path.join(__dirname, '../../');
    const destPath = path.join(__dirname, '../../../archive');

    if (userInput === 'yes') {
      await fs.ensureDir(destPath);
      await fs.move(srcPath, path.join(destPath, `project-backup-${Date.now()}`));
      console.log('✅ Project moved to archive.');
    } else {
      console.log('❌ Operation cancelled by user.');
    }
  } catch (error) {
    const typedError = error as Error;
    console.error(`❌ Error during script execution: ${typedError.message}`);
  }
};

const askUser = () => {
  console.log('Do you want to archive the current project? (yes/no)');
  process.stdin.once('data', (data: Buffer) => {
    const answer: string = data.toString().trim().toLowerCase();
    moveDirectories(answer);
  });
};

askUser();
