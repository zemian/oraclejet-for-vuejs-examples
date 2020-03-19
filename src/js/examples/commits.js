/**
 * OJET can access external API very well as well. Here we match to the VueJS
 * examples to fetch GitHub commits and using KO observable to toggle
 * different branches as input parameter.
 */
define(['knockout',
        'ojs/ojknockout',
        'ojs/ojoption',
        'ojs/ojradioset'],
    function (ko) {

        function ExampleViewModel() {
            var self = this;

            this.branches = ko.observableArray(['master', 'dev']);
            this.currentBranch = ko.observable('master');
            this.commits = ko.observableArray();

            this.connected = () => {
                this.fetchData();
            };

            this.onBranchNameChanged = (event) => {
                var branchName = event.detail.value;
                console.log("Changing current branch name " + branchName);
                this.currentBranch(branchName);
                this.fetchData();
            };

            this.fetchData = function () {
                var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=';
                var xhr = new XMLHttpRequest();
                xhr.open('GET', apiURL + self.currentBranch());
                xhr.onload = function () {
                    var respItems = JSON.parse(xhr.responseText);
                    console.log("Github response: ", respItems);
                    self.commits(respItems);
                    //console.log(respItems[0].html_url);
                };
                xhr.send();
            };

            this.truncate = function (v) {
                var newline = v.indexOf('\n');
                return newline > 0 ? v.slice(0, newline) : v;
            };
            this.formatDate = function (v) {
                return v.replace(/T|Z/g, ' ');
            };
        }

        return ExampleViewModel;
    }
);
