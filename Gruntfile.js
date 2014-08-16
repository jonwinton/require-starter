module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      env: require('./grunt-config'),

      // ------------------------------/
      // Grunt Contrib Clean
      // ------------------------------/
      clean: {
        build: {
          src: ["<%= env.DIR_DEST %>"]
        }
      },

      // ------------------------------/
      // Copy
      // ------------------------------/
      copy: {
          media: {
              files: [{
                  expand: true,
                  cwd: '<%= env.DIR_SRC %>',
                  src: ['assets/media/**', 'assets/scripts/**'],
                  dest: '<%= env.DIR_DEST %>',
              }]
          },
          scripts: {
              files: [{
                  expand: true,
                  cwd: '<%= env.DIR_SRC %>',
                  dest: '<%= env.DIR_DEST %>',
                  src: ['assets/{scripts,vendor}/**/*.js']
              }]
          }
      },

      // ------------------------------/
      // Sass
      // ------------------------------/
      sass: {
          all: {
              files: [{
                  expand: true,
                  cwd: '<%= env.DIR_SRC %>/assets/scss',
                  src: ['*.scss'],
                  dest: '<%= env.DIR_DEST %>/assets/styles',
                  ext: '.css'
              }],
          }
      },

      // ------------------------------/
      // RequireJS
      // ------------------------------/
      requirejs: {
        compile: {
          options: {
            baseUrl: "src/assets/scripts/",
            mainConfigFile: "./src/assets/scripts/config.js",
            out: "web/assets/scripts/app.js",
            name: "main",
            preserveLicenseComments: false
          }
        }
      },

      // ------------------------------/
      // Includes
      // ------------------------------/
      includes: {
        files: {
          src: [
              '**/*.html',
              '!templates/**',
              '!assets/vendor/**'
          ], // Source files
          dest: '<%= env.DIR_DEST %>', // Destination directory
          flatten: true,
          cwd: '<%= env.DIR_SRC %>',
        }
      },

      // ------------------------------/
      // Hologram
      // ------------------------------/
      hologram: {
          generate: {
              options: {
                  config: './hologram_config.yml'
              }
          }
      },

      // ------------------------------/
      // Watch
      // ------------------------------/
      watch: {
          options: {
              event: 'all',
              livereload: true
          },
          grunt: {
              files: ['Gruntfile.js'],
              tasks: ['default']
          },
          media: {
              files: ['<%= env.DIR_SRC %>/assets/media/**'],
              tasks: ['copy:media']
          },
          styles: {
              files: ['<%= env.DIR_SRC %>/assets/scss/**/*.scss'],
              tasks: ['styles', 'hologram:generate']
          },
          scripts: {
              files: ['<%= env.DIR_SRC %>/assets/{scripts,vendor}/**/*.js'],
              tasks: ['default']
          },
          styleguide: {
              files: ['styleguide_assets/**'],
              tasks: ['default', 'hologram:generate']
          },
          markup: {
              files: ['<%= env.DIR_SRC %>/**/*.html'],
              tasks: ['markup']
          },
      },

    });

    // Load Tasks Here
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-requirejs');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-hologram');

    // Default task(s).
    grunt.registerTask('default', ['clean','includes', 'copy', 'sass', 'hologram:generate']);
    grunt.registerTask('styles', ['sass']);
    grunt.registerTask('scripts', ['copy:scripts']);
    grunt.registerTask('markup', ['includes']);

};