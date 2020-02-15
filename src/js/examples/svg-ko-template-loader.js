define(['knockout'],
    function (ko) {
        /** This is from: http://jsfiddle.net/dflor003/6kwmrLs8/ */


        /* Custom template loader */
        function SvgTemplateLoader() {
        }
        SvgTemplateLoader.prototype = {
            parseSvgTemplate: function(templateString) {
                var svgWrappedTemplate = '<svg>' + templateString + '</svg>',
                    $wrapper = $('<div>').html(svgWrappedTemplate),
                    $svg = $wrapper.children('svg');

                return $svg[0].childNodes;
            },

            loadTemplate: function (name, templateConfig, callback) {
                if (!templateConfig || !templateConfig.svgTemplate) {
                    callback(null); // Don't process if we don't have a svgTemplateName
                    return;
                }

                var self = this;
                self.fetchTemplate(templateConfig.svgTemplate, function (templateString) {
                    var parsedTemplate = self.parseSvgTemplate(templateString);
                    callback(parsedTemplate);
                });
            },

            fetchTemplate: function (templateId, callback) {
                var self = this,
                    $templateElement = $(document.getElementById(templateId));

                if ($templateElement.length) {
                    callback($templateElement.html());
                    return;
                }

                //infuser.get(templateId, callback);
            }
        };

        return SvgTemplateLoader;
    }
);
