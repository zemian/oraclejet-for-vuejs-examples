# About oraclejet-for-vuejs-examples

Here is an Oracle JET project that re-implements some of the 
VueJS Examples. Walking through this project code will help you
learn how to use and compare the two libraries and their capabilities.

[Live Demo is Here](https://raw.githack.com/zemian/oraclejet-for-vuejs-examples-demo/master/web/index.html)

We also have some [screenshots here](docs/screenshots.md).

[Oracle JET](https://www.oracle.com/webfolder/technetwork/jet/index.html) and 
[VueJS](https://vuejs.org/) are both a open source JavaScript libraries that 
help you build UI application easily. You can read more details on their website
to find out more.

## Credits and Disclaimer

- This `oraclejet-for-vuejs-examples` project is written by Zemian Deng.
  I have merely ported the code from VueJS to OracleJET. All the looks, styling, 
  behaviors and functionalities are from modified version of original VueJS examples code.
  All ideas and behaviors are from original VueJS and not from me. I have only done
  enough work to convert the demo from one framework to another.
- This project solely used for learning purpose. Use it at your own risk.
- Though I am an Oracle employee, but I do not work directly
  on the OracleJET development team. All the notes here on re-implementations and comparision
  of the two libraries are my own opinions. It does not reflect nor represent my employer 
  in any way. 
- The original VueJS examples are from their source repository and credits below to their 
  original authors.
- Oracle JET library itself is an open source library. And all credits and license
  can be found on their websites.

## How to Get Started On Development

You need to install [NodeJS](https://nodejs.org/en/) first, then clone this project to 
get started in a terminal like this:

```
cd oraclejet-for-vuejs-examples
npm install
npx ojet serve
# open http://localhost:8000
```

In each example, there are some developer notes and tips in
comparing the two frameworks usage. To see more details, open the
`.js` file under `src/js/examples` folder.

## Fixing Example CSS files

The original example css files assume each example is in it's own html page
and styled some elements globally. This affected some of OJET own theme styling
when we try to load all examples as single page application. So a fix is added 
with a unique demo name prefix some elements. This prevents style overrides 
between examples. Other than this, the example should look and behave the 
same as original work.

## Examples List

A copy of the original VueJS (v2) Examples is under `vuejs-examples` 
directory. These examples should able to run by opening the `index.html` 
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
