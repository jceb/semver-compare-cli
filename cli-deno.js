#!/usr/bin/env -S deno
// LICENSE: MIT
// Copyright (C) 2021 Jan Christoph Ebersbach. All rights reserved.

import semverCompare from "https://cdn.skypack.dev/semver-compare?dts";
import sanctuary from "https://cdn.skypack.dev/sanctuary?dts";
const S = sanctuary;

const stripV = (s) => s.replace(/^v/, "");
const isVersion = (s) => s.match(/^v?[0-9]+(\.[0-9]+)*/) !== null;
const testArgs = (a) => a.reduce((acc, s) => acc && isVersion(s), true);

const _comp = (validResults) =>
  (a, b) => validResults.includes(semverCompare(a, b));
const cmp_predicates = {
  eq: _comp([0]),
  ge: _comp([0, 1]),
  gt: _comp([1]),
  le: _comp([0, -1]),
  lt: _comp([-1]),
};

if (Deno.args.length === 1 && S.elem(Deno.args[0])(["-v", "--version"])) {
  console.log(VERSION);
  Deno.exit(0);
} else if (
  ![2, 3].includes(Deno.args.length) ||
  !testArgs(Deno.args.slice(-2)) ||
  (Deno.args.length === 3 && !S.elem(Deno.args[0])(S.keys(cmp_predicates)))
) {
  console.log(
    `Reveived: semver-compare ${S.joinWith(" ")(Deno.args.slice(1))}`,
  );
  console.log(
    `Usage: semver-compare [${
      S.pipe([S.keys, S.joinWith("|")])(
        cmp_predicates,
      )
    }] VERSION1 VERSION2`,
  );
  console.log("Without predicate:");
  console.log("\texit code 0 if versions are equal");
  console.log("\texit code 1 if first versions is higher");
  console.log("\texit code 2 if first versions is lower");
  console.log(
    `With predicate [${S.pipe([S.keys, S.joinWith("|")])(cmp_predicates)}]:`,
  );
  console.log(
    "\texit code 0 if predicate applies comparing VERSION1 to VERSION2",
  );
  console.log("\texit code 1 if predicate doesn't apply");
  console.log("exit code 3 if an error occurs");
  Deno.exit(3);
}

let versions = Deno.args.slice(-2);
let exitcode = 3;

if (Deno.args.length === 4) {
  exitcode = semverCompare(...versions.map(stripV));
  if (exitcode === -1) {
    exitcode = 2;
  }
} else {
  exitcode = cmp_predicates[Deno.args[0]](...versions) ? 0 : 1;
}
Deno.exit(exitcode);
