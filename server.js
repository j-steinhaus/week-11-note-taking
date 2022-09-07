// consts throughtout
const express = require("express");
const fs = require("fs");
const path = require("path");

// creating the express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get routes being created to send usert to index page
