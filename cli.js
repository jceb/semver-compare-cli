#!/usr/bin/env node
// LICENSE: MIT
// Copyright (C) 2021 Jan Christoph Ebersbach. All rights reserved.
"use strict";

const cmp = require("semver-compare");
const VERSION = require("./package.json").version;

const stripV = (s) => s.replace(/^v/, "");
const isVersion = (s) => s.match(/^v?[0-9]+(\.[0-9]+)*/) !== null;
const testArgs = (a) => a.reduce((acc, s) => acc && isVersion(s), true);

const extractVersions = (args) => {
  if (args.length === 3) {
    return [args[0], args[2]];
  }
  return args.slice(-2);
};

const _comp = (validResults) => (a, b) => validResults.includes(cmp(a, b));
const cmp_predicates = {
  eq: _comp([0]),
  ge: _comp([0, 1]),
  gt: _comp([1]),
  le: _comp([0, -1]),
  lt: _comp([-1]),
};

if (
  process.argv.length === 3 &&
  ["-v", "--version"].includes(process.argv[2])
) {
  console.log(VERSION);
  process.exit(0);
} else if (
  ![4, 5].includes(process.argv.length) ||
  !testArgs(extractVersions(process.argv.slice(2))) ||
  (process.argv.length === 5 &&
    !Object.keys(cmp_predicates).includes(process.argv[3]))
) {
  console.log(`Reveived: semver-compare ${process.argv.slice(2).join(" ")}`);
  console.log(
    `Usage: semver-compare VERSION1 [${Object.keys(cmp_predicates).join(
      "|"
    )}] VERSION2`
  );
  console.log("Without predicate:");
  console.log("\texit code 0 if versions are equal");
  console.log("\texit code 1 if first versions is higher");
  console.log("\texit code 2 if first versions is lower");
  console.log(`With predicate [${Object.keys(cmp_predicates).join("|")}]:`);
  console.log(
    "\texit code 0 if predicate applies comparing VERSION1 to VERSION2"
  );
  console.log("\texit code 1 if predicate doesn't apply");
  console.log("Exit code 3 if an error occurs");
  process.exit(3);
}

let versions = extractVersions(process.argv.slice(2)).map(stripV);
let exitcode = 3;

if (process.argv.length === 4) {
  exitcode = cmp(...versions);
  if (exitcode === -1) {
    exitcode = 2;
  }
} else {
  const predicate = process.argv[3];
  exitcode = cmp_predicates[predicate](...versions) ? 0 : 1;
}
process.exit(exitcode);
