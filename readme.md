# About oraclejet-for-vuejs-examples

This project re-implements some of the [VueJS](https://vuejs.org/) examples using the [Oracle JET](https://www.oracle.com/webfolder/technetwork/jet/index.html) library. Both of these are open source
JavaScript UI libraries that help with building web applications. More details can be found on
the library websites.

[Live Demo](https://rawcdn.githack.com/zemian/oraclejet-for-vuejs-examples/master/web/index.html)

(NOTE: Due to slow network acces, the demo might take some time to load, so be patient!)

(NOTE2: We commited the `web` output folder into this repository branch, so that it can be served by githack.com as demo. Normally this folder is ignored by source.)

[Screenshots](docs/screenshots.md)

## Disclaimer and Credits

- The `oraclejet-for-vuejs-examples` project is written by Zemian Deng.
  I have merely ported the code from VueJS to OracleJET. All the looks, styling, 
  behaviors, and functionalities are modified versions of original VueJS examples code.
  All ideas and behaviors are from VueJS, not from me. I have only done
  enough work to convert the demo from one framework to another.
- Though I am an Oracle employee, I do not work directly
  on the OracleJET development team. All the notes here on re-implementations and comparisons
  of the two libraries are my own opinions. It does not reflect nor represent my employer 
  in any way. 
- This project is solely used for learning purpose. Use it at your own risk.
- The original VueJS examples are from their source repository and all origin works, credits 
  and licenses can be found on their website.
- Oracle JET library itself is an open source library. All credits and license
  can be found on their website.

## How to Get Started On Development

You need to install [NodeJS](https://nodejs.org/en/) first, then clone this project 
from GitHub onto your computer. Then you can get started in a terminal with these commands.

```
cd oraclejet-for-vuejs-examples
npm install
npx ojet serve
# open http://localhost:8000
```

## Library Comparison Notes

The Oracle JET library uses KnockoutJS as its UI and model binding, and includes a large set of
UI components (including charts and graphs). So comparing it to VueJS itself is not 
strictly fair, since VueJS is at a lower level, like KnockoutJS. A VueJS based UI library 
such as [BootstrapVue](https://bootstrap-vue.js.org/) would be more similar to OJET. However the original 
VueJS distribution comes with some very interesting demos, therefore I wanted to convert them
using OJET and see how things compared in implementation details.

There are some additional comparison notes inside each `.js` file as comments for the example, 
which can be found under the `src/js/examples` directory.

## Fixing Example CSS files

The original CSS files for the example assume each example is in its own html page
and styled some elements globally, effecting some of the OJET theme styles
when all examples are loaded as a single page application. This is fixed by adding a unique demo name prefix for those elements, preventing style overrides 
between examples. Other than this, the example should look and behave the 
same as the original work.

## Examples List

A copy of the original VueJS (v2) Examples are under the `vuejs-examples` 
directory for reference. These examples should able to run by opening the `index.html` 
in a browser without running a web server. 

Re-implementation List:

- [x] Markdown Editor
- [x] GitHub Commits
- [x] Grid Component
- [x] Tree View
- [x] SVG Graph
- [x] Modal Component
- [x] Elastic Header
- [x] Wrapper Component
- [ ] Realtime with deepstreamHub
- [ ] Firebase + Validation
- [x] TodoMVC
- [ ] HackerNews Clone
