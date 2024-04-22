const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());