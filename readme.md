# About oraclejet-for-vuejs-examples

This project re-implements some of the [VueJS](https://vuejs.org/) examples using the [Oracle JET](https://www.oracle.com/webfolder/technetwork/jet/index.html) library. Both of these are open source JavaScript UI libraries that help you build web application easily. You can read more details on 
their website.

[Live Demo is Here](https://raw.githack.com/zemian/oraclejet-for-vuejs-examples-demo/master/web/index.html)

[Some screenshots are here](docs/screenshots.md).

## Credits and Disclaimer

- This `oraclejet-for-vuejs-examples` project is written by Zemian Deng.
  I have merely ported the code from VueJS to OracleJET. All the looks, styling, 
  behaviors and functionalities are modified version of original VueJS examples code.
  All ideas and behaviors are from original VueJS and not from me. I have only done
  enough work to convert the demo from one framework to another.
- Though I am an Oracle employee, but I do not work directly
  on the OracleJET development team. All the notes here on re-implementations and comparision
  of the two libraries are my own opinions. It does not reflect nor represent my employer 
  in any way. 
- This project is solely used for learning purpose. Use it at your own risk.
- The original VueJS examples are from their source repository and all origin works, credits 
  and license can be found on their website.
- Oracle JET library itself is an open source library. And all credits and license
  can be found on their website.

## How to Get Started On Development

You need to install [NodeJS](https://nodejs.org/en/) first, then clone this project 
from GitHub into your computer. Then you can get started in a terminal like this:

```
cd oraclejet-for-vuejs-examples
npm install
npx ojet serve
# open http://localhost:8000
```

## Notes on Comparing the Libraries

The Oracle JET library uses KnockoutJS as it's UI and model binding, and it has large set of
UI components (including charts and graphs). So comparing it to VueJS itself is not 
strictly equal, since VueJS is more at lower level. A VueJS based UI library 
such as [Vuetify](https://vuetifyjs.com/) would be more equal level to compare with OJET. But 
the VueJS distribution comes with some very interesting examples that demonstrate how one 
might use a library to implement it. So despite the exmaples do not uses UI component heavily,
it can clearly shows you how the model is constructed and the DOM view is rendered based on the
framework usage.

There are some additional comparison notes inside each example `.js` file as comments. You will
find these under `src/js/examples` directory.

## Fixing Example CSS files

The original example css files assume each example is in it's own html page
and styled some elements globally. This affected some of OJET own theme styling
when I try to load all examples as single page application. So a fix is added 
with a unique demo name prefix some elements. This prevents style overrides 
between examples. Other than this, the example should look and behave the 
same as original work.

## Examples List

A copy of the original VueJS (v2) Examples is under `vuejs-examples` 
directory for referenc purpose. These examples should able to run by opening the `index.html` 
in a browser without running a web server. 

Re-implementation List:

- [x] Markdown Editor
- [x] GitHub Commits
- [x] Grid Component
- [x] Tree View
- [x] SVG Graph
- [ ] Modal Component
- [x] Elastic Header
- [ ] Wrapper Component
- [ ] Realtime with deepstreamHub
- [ ] Firebase + Validation
- [x] TodoMVC
- [ ] HackerNews Clone
