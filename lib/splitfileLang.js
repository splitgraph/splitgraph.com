"use strict";

// Extends prism-sql.js with a couple of additions to highlight Splitfiles:
//   * Add extra keywords: MOUNT, EMPTY
//   * Highlight DB connection strings in FROM MOUNT
//   * Highlight repository names in FROM ... IMPORT (SQL is automatically highlighted since
//     it's treated as schemata)

// Splitfile grammar is located at
// https://github.com/splitgraph/splitgraph/blob/master/splitgraph/splitfile/_parsing.py

module.exports = splitfile;
splitfile.displayName = "splitfile";
splitfile.aliases = ["sgr"];

function splitfile(Prism) {
  var splitfile = (Prism.languages.splitfile = Prism.languages.extend(
    "sql",
    {}
  ));

  var string = splitfile["string"];
  if (!Array.isArray(string)) {
    string = splitfile["string"] = [string];
  }
  string.unshift(
    {
      pattern: /(FROM\s+)[_a-zA-Z0-9-/:]+(?=\s+IMPORT)/,
      lookbehind: true,
    },
    {
      pattern: /(FROM\s+)[_a-zA-Z0-9-/:]+(?=\.)/,
      lookbehind: true,
    }
  );

  var keyword = splitfile["keyword"];
  if (!Array.isArray(keyword)) {
    keyword = splitfile["keyword"] = [keyword];
  }
  keyword.unshift(/\b(?:MOUNT|EMPTY)\b/i);

  var operator = splitfile["operator"];
  if (!Array.isArray(operator)) {
    operator = splitfile["operator"] = [operator];
  }
  operator.unshift({
    pattern: /(MOUNT )\S+\s+\S+/,
    lookbehind: true,
    greedy: true,
  });

  Prism.languages.splitfile = splitfile;
  Prism.languages.sgr = splitfile;
}
