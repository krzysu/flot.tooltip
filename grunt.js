
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({

    lint: {
      files: [
        'grunt.js',
        'js/jquery.flot.tooltip.source.js'
      ]
    },

    pkg: {
      name: 'jquery.flot.tooltip',
      version: '0.5 alpha',
      author: 'Krzysztof Urbas @krzysu [myviews.pl]',
      description: 'easy-to-use tooltips for Flot charts',
      license: 'MIT',
      website: 'https://github.com/krzysu/flot.tooltip'
    },

    meta: {
      banner: '/*\n' +
        ' * <%= pkg.name %>\n' +
        ' * \n' +
        ' * description: <%= pkg.description %>\n' +
        ' * version: <%= pkg.version %>\n' +
        ' * author: <%= pkg.author %>\n' +
        ' * website: <%= pkg.website %>\n' +
        ' * \n' +
        ' * build on <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * released under <%= pkg.license %> License, 2012\n' +
        '*/'
    },

    concat: {
      main: {
        src: ['<banner>', 'js/jquery.flot.tooltip.source.js'],
        dest: 'js/jquery.flot.tooltip.js'
      }
    },

    min: {
      main: {
        src: ['<banner>', 'js/jquery.flot.tooltip.source.js'],
        dest: 'js/jquery.flot.tooltip.min.js'
      }
    }
  });

  // Default task
  grunt.registerTask('build', 'lint concat:main min:main');

};
