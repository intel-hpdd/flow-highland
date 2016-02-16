#!/usr/bin/env bash
# There are no tests to run, but CI needs a results file.
echo '<testsuites><testsuite name="flow-highland" package="flow-highland" timestamp="2014-07-31" id="0" hostname="localhost" tests="0" errors="0" failures="0" skipped="0" time="0.008"></testsuite></testsuites>' > flow-highland-results.xml
mv flow-highland-results.xml ../results
