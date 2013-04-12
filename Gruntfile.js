module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        'Gruntfile.js',
        'js/jquery.flot.tooltip.source.js'
      ]
    },

    concat: {
      options: {
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
        '*/ \n'
      },
      main: {
        src: ['js/jquery.flot.tooltip.source.js'],
        dest: 'js/jquery.flot.tooltip.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= concat.options.banner %>'
      },
      main: {
        src: ['js/jquery.flot.tooltip.source.js'],
        dest: 'js/jquery.flot.tooltip.min.js'
      }
    },

    watch: { // for development run 'grunt watch'
      main: {
        files: 'js/*.source.js',
        tasks: ['jshint','concat:main','uglify:main']
      }
    }
  });

  // Default task
  grunt.registerTask('build', ['jshint', 'concat:main', 'uglify:main']);

};
