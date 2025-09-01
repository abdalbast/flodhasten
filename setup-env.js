#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔐 Flodhästen Environment Setup');
console.log('================================\n');

const envExamplePath = '.env.example';
const envPath = '.env';

// Check if .env already exists
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('   If you want to recreate it, please delete the existing .env file first.\n');
  process.exit(0);
}

// Check if .env.example exists
if (!fs.existsSync(envExamplePath)) {
  console.log('❌ .env.example file not found!');
  console.log('   Please make sure you have the latest version of the repository.\n');
  process.exit(1);
}

// Copy .env.example to .env
try {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ Created .env file from .env.example');
  console.log('\n📝 Next steps:');
  console.log('   1. Edit .env file and add your Azure Translation API key');
  console.log('   2. Get your API key from: https://portal.azure.com/');
  console.log('   3. Create a Translator resource and copy the key');
  console.log('   4. Replace "your_azure_translation_key_here" with your actual key');
  console.log('\n🔒 Security reminder:');
  console.log('   - Never commit .env file to version control');
  console.log('   - Keep your API keys secure and private');
  console.log('\n🚀 You can now run: npm start\n');
} catch (error) {
  console.log('❌ Error creating .env file:', error.message);
  process.exit(1);
}
