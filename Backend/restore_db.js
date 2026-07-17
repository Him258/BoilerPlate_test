const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function restore() {
  const sqlPath = path.join(__dirname, '..', 'boiler-plate (2) (1).sql');
  const sqlContent = fs.readFileSync(sqlPath, 'utf8');

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    multipleStatements: true
  });

  console.log('Restoring database...');
  await connection.query('DROP DATABASE IF EXISTS `boilerplate`; CREATE DATABASE `boilerplate`; USE `boilerplate`;');
  await connection.query(sqlContent);
  console.log('Database restored successfully!');
  await connection.end();
}

restore().catch(console.error);
