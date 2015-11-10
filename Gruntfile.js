// Generated on 2015-10-29 using generator-angular 0.12.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  //serve static, used in grunt connect
  var serveStatic = require('serve-static');
  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn'
  });

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    moduleName : 'angularAppName',
    dist: 'builds/production',
    temp:'.generated',
    development: 'builds/development'
  };
  grunt.log.write('APPLICATION PATH: ' + appConfig.app);
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      html: {
          files: ['<%= yeoman.app %>/**/*.html'],
           tasks: ['newer:copy:html'],
            options: {
             livereload: '<%= connect.options.livereload %>'
            }
      },
      js: {
        files: ['<%= yeoman.app %>/**/*.js','!<%= yeoman.app %>/components/**/*_test.js'],
        tasks: ['newer:jshint:all','concat:js'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['<%= yeoman.app %>/**/*_test.js'],
        tasks: ['newer:jshint:test', 'karma:continuous:run'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      compass: {
        files: ['assets/css/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.generated/styles/{,*/}*.css',
          'assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35725
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              require('connect-livereload')(),
              serveStatic('.generated'),
              serveStatic('test'),
              connect().use(
                '/bower_components',
               serveStatic('./bower_components')
              ),
             serveStatic(appConfig.dist)
            ];
          }
        }
      },
      test: {
        options: {
          open:true,
          port: 9001,
          middleware: function (connect) {
            return [
             require('connect-livereload')(),
             serveStatic('.generated'),
             serveStatic('test'),
              connect().use(
                '/bower_components',
               serveStatic('./bower_components')
              ),
             serveStatic(appConfig.dist)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
              options: {
                jshintrc: '.jshintrc',
                reporter: String( require('jshint-stylish')),
                ignores: ['<%= yeoman.app %>/**/*_test.js'],
              },

      all: {

         src:  ['Gruntfile.js','<%= yeoman.app %>/**/*.js']
      },
      test: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['<%= yeoman.app %>/**/*_test.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.generated',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.generated',
      development: {
          files: [{
          dot: true,
          src: [
            '.generated',
            '<%= yeoman.development %>/{,*/}*',
            '!<%= yeoman.development %>/.git{,*/}*'
          ]
        }]
      }
    },
      //concatenate all js and css files in buildelopment build
    concat: {
      //concat js into app.js
        js: {
          src: ['<%=yeoman.app%>/shared_components/**/*.js', '<%=yeoman.app%>/app.js','<%=yeoman.app%>/components/**/*.js','!<%=yeoman.app%>/components/**/*_test.js','!<%=yeoman.app%>/shared_components/**/*_test.js'],
          dest: '<%= yeoman.dist %>/scripts/app.js'
        },
        //concat css into app.css, only for production.
        css:{
          src: ['.generated/**/*.css' ],
          dest: '<%= yeoman.dist %>/styles/app.css'
        }

    },


    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.generated/styles/',
          src: '{,*/}*.css',
          dest: '<%=yeoman.dist %>/styles'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.generated/styles/',
          src: '{,*/}*.css',
          dest: '<%=yeoman.dist %>'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        /*ignorePath:  /\.\.\//*/
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['assets/css/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: 'assets/css',
        cssDir: '.generated/styles',
        generatedImagesDir: '.generated/images/generated',
        imagesDir: 'assets/images',
        javascriptsDir: '<%= yeoman.app %>/components',
        fontsDir: 'assets/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/assets/images/generated',
        httpFontsPath: '/assets/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/components/**/*.js',
          '<%= yeoman.dist %>/assets/css/{,*/}*.css',
          '<%= yeoman.dist %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/assets/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        staging:'.generated',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/**/*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          extDot: 'first',
          cwd: 'assets/images/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
/*Angular JS grunt Task */
    ngtemplates: {
      dist: {
        options: {
          module: '<%=yeoman.app.moduleName%>',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: 'scripts/scripts.js'
        },
        cwd: '<%= yeoman.app %>',
        src: 'views/{,*/}*.html',
        dest: '.generated/templateCache.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.generated/concat/scripts',
          src: '*.js',
          dest: '.generated/concat/scripts'
        }]
      }
    },
   // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    // Copies remaining files to places other tasks can use
    copy: {
     html: {
          expand: true,
          cwd: '<%=yeoman.app%>',
          src: ['index.html', '**/*.html'],
          dest: '<%= yeoman.dist%>'
        },
      development: {
          files: [{
          expand: true,
          dot: true,
          dest: '<%= yeoman.development %>',
          src: [
            'assets/images/{,*/}*.{webp,jpg,png,jpeg,gif,svg}',
            'assets/fonts/{,*/}*.*'
          ]
        },{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.development %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html'
          ]
        }, {
          expand: true,
          cwd: '.generated/images',
          dest: '<%= yeoman.development %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.development %>'
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          dest: '<%= yeoman.dist %>',
          src: [
            'assets/images/{,*/}*.{webp,jpg,png,jpeg,gif,svg}',
            'assets/fonts/{,*/}*.*'
          ]
        },{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html'
          ]
        }, {
          expand: true,
          cwd: '.generated/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      sassStyles: {
        expand: true,
        cwd: '.generated/styles',
        dest: '.<%= yeoman.dist%>/styles/',
        src: '{,*/}*.css'
      },
      styles: {
        expand: true,
        cwd: 'assets/css',
        dest: '.<%= yeoman.dist%>/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'

      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: false,
        background:true,
        browsers: ['PhantomJS']
  },
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });
  grunt.registerTask('dev','Development Environment Task', function(){
    //change dist folder to development

    appConfig.dist = appConfig.development;
     grunt.log.write('APPLICATION PATH: ' + appConfig.dist);
    grunt.task.run(['debugDev']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
  /*  'copy:html',
    'copy:development',*/
/*    'concat',*/
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma:continuous',
    'watch'
  ]);
  //build development
   grunt.registerTask('debugDev', [
    'jshint:all',
    'clean:dist',
    'clean:server',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin',
    'concurrent:server',
    'autoprefixer:server',
    'connect:livereload',
      'karma:continuous',
    'watch'
  ]);

  //building production
  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:development',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
