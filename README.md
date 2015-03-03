Introduction
============

QA Test Case Data is a repository that holds manual test case data for Desktop
Firefox, Firefox for Android, and Firefox OS.

Developing Test Case Data
=========================

To modify the test case data in this repository, follow these steps in you are a core contributor:

1. Clone the repository by running "git clone https://github.com/mozilla-b2g/qa-testcase-data.git"
2. Modify the test case data to your local copy of qa-testcase-data
 1. If you adding or modifying files, then run "git add" on those files
 2. If you removing files, then run "git rm" on those files
3. Commit your changes by using "git commit" with an appropriate commit message
4. Push your changes to main repository by using "git push"

For non-core contributors, you will need to follow these steps:

1. Fork the qa-testcase-data repository
2. Follow the core contributor steps above for your own fork of the repository
3. Open a pull request from your fork into the main repository
4. A core contributor will review your changes
 1. If a core contributor approves the changes, he/she will merge those changes into the main repository
 2. If a core contributor disapproves of the changes, he/she will indicate why

Using Test Case Data
====================

Visit http://mozilla-b2g.github.io/qa-testcase-data/ with a relative path at the end of the URL that matches
the relative path of the test case data in this repository.

Example:

* **Github Location**: https://github.com/mozilla-b2g/qa-testcase-data/blob/gh-pages/Video/multi2.ogg
* **Test Case Data URL**: http://mozilla-b2g.github.io/qa-testcase-data/Video/multi2.ogg
