#!/usr/bin/env node
// LICENSE: MIT
// Copyright (C) 2021 Jan Christoph Ebersbach. All rights reserved.
'use strict';

const stripV = (s) => s.replace(/^v/, "");
const isVersion = (s) => s.match(/^v?[0-9]+(\.[0-9]+)*/) !== null;
const testArgs = (a) => a.reduce((acc, s) => acc && isVersion(s), true);

const _comp = (validResults) => (a, b) => validResults.includes(cmp(a, b));

if (
  ![4, 5].includes(process.argv.length) ||
  !testArgs(process.argv.slice(-2)) ||
  (process.argv.length === 5 &&
    !["eq", "ge", "gt", "le", "lt"].includes(process.argv[2]))
) {
  console.log(`Reveived: semver-compare ${process.argv.slice(2).join(" ")}`);
  console.log("Usage: semver-compare [eq|ge|gt|le|lt] VERSION1 VERSION2");
  console.log("Without predicate:");
  console.log("\texit code 0 if versions are equal");
  console.log("\texit code 1 if first versions is higher");
  console.log("\texit code 2 if first versions is lower");
  console.log("With predicate [eq|ge|gt|le|lt] :");
  console.log("\texit code 0 if predicate matches");
  console.log("\texit code 1 if predicate doesn't match");
  console.log("exit code 3 if an error occurs");
  process.exit(3);
}

let versions = process.argv.slice(-2);
let exitcode = 3;

if (process.argv.length === 4) {
  exitcode = cmp(...versions.map(stripV));
  if (exitcode === -1) {
    exitcode = 2;
  }
} else {
  exitcode = {
    gt: _comp([1]),
    ge: _comp([0, 1]),
    eq: _comp([0]),
    le: _comp([0, -1]),
    lt: _comp([-1]),
  }[process.argv[2]](...versions)
    ? 0
    : 1;
}
process.exit(exitcode);
