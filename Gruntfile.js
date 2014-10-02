module.exports = function ( grunt ) {
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');  
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks("grunt-image-embed");
  grunt.loadNpmTasks("grunt-angular-templates");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  
  var gruntConfig = require( './gruntConfig.js' );

  var taskConfig = {

    pkg: grunt.file.readJSON("package.json"),
    meta: {
      banner: 
        '/**\n' +
        ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * <%= pkg.homepage %>\n' +
        ' *\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' */\n'
    },

    clean: [ 
      '<%= build_dir %>',
      '<%= compile_dir %>'
    ],

    copy: {
      build: {
        files: [
          {
            src: [ 
              '<%= app_files.js %>',
              '<%= app_files.tpl %>', 
              '<%= vendor_files.js %>', 
              '<%= app_files.assets %>', 
              '<%= app_files.stylesheet %>' 
            ],
            cwd: '.',
            dest: '<%= build_dir %>/',
            expand: true
          }
        ]
      },
      compile: {
        files: [
          {
            src: [ '**/*', '!**/*.json' ],
            cwd: '<%= build_dir %>/app/assets',
            dest: '<%= compile_dir %>/app/assets',
            expand: true
          }
        ]
      }
    },

    concat: {
      compile_js: {
        options: {
          banner: '<%= meta.banner %>\n(function() {\n',
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
          },
          footer: '})();'
        },
        src: [
          '<%= vendor_files.js %>',
          '<%= build_dir %>/<%= app_files.first %>',
          '<%= build_dir %>/<%= app_files.js %>'
        ],
        dest: '<%= compile_dir %>/<%= pkg.name %>-<%= pkg.version %>.js'
      },
      compile_css: {
        src: [
          '<%= vendor_files.css %>',
          '<%= app_files.stylesheet %>'
        ],
        dest: '<%= compile_dir %>/app/stylesheet/<%= pkg.name %>-<%= pkg.version %>.css'
      }
    },

    uglify: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
        }
      }
    },

    cssmin: {
      compile: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          '<%= concat.compile_css.dest %>': '<%= concat.compile_css.dest %>'
        }
      }
    },

    index: {
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= vendor_files.js %>',
          '<%= app_files.first %>',
          '<%= app_files.js %>',
          '<%= vendor_files.css %>',
          '<%= app_files.stylesheet %>',
        ]
      },
      compile: {
        dir: '<%= compile_dir %>',
        src: [
          '<%= concat.compile_js.dest %>',
          '<%= vendor_files.css %>',
          '<%= concat.compile_css.dest %>'
        ]
      }
    },

    watch: {
      files: [ 
        '<%= app_files.html %>',
        '<%= app_files.tpl %>',
        '<%= app_files.js %>',
        '<%= vendor_files.js %>',
        '<%= app_files.assets %>',
        '<%= app_files.stylesheet %>',
        '<%= test_files.js %>'
      ],
      tasks: ['jshint', 'karma:build:run', 'build']
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      build: {
        options: {
          runnerPort: 9100,
          autoWatch: false,
          background: true,
          singleRun: false
        }
      },
      compile: {
        singleRun: true,
        background: false
      }
    },

    jshint: {
      files: [ 
        '<%= app_files.js %>',
        '<%= test_files.js %>'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        strict: true,
        browser : true,
        undef: true,
        indent: 2,
        quotmark : 'single',
        globals: {
          /*js*/
          console: false,
          inject: false,
          spyOn: false,
          waitsFor: false,
          runs: false,
          /*tests functions exclude*/
          define: false,
          module: false,
          describe: false,
          beforeEach: false,
          it: false,
          expect: false,
          requirejs: false,
          dump: false,
          afterEach: false,
          /*libs*/
          _: false,
          angular: false,
          d3: false,
          jasmine: false
        }
      }
    },

    connect: {
      build: {
        options: {
          port: 9090,
          base: '<%= build_dir %>'
        }
      },
      compile: {
        options: {
          port: 9090,
          base: '<%= compile_dir %>'
        }
      }
    },

    imageEmbed: {
      dist: {
        src: [ "<%= compile_dir %>/stylesheet/<%= pkg.name %>-<%= pkg.version %>.css" ],
        dest: "<%= compile_dir %>/stylesheet/<%= pkg.name %>-<%= pkg.version %>-urified.css",
        options: {
          deleteAfterEncoding : false
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 7', 'ff >= 20', 'chrome >=20', 'opera >= 12']
      },
      concat: {
        src: '<%= compile_dir %>/stylesheet/<%= pkg.name %>-<%= pkg.version %>.css', // -> src/css/file1.css, src/css/file2.css
        dest: '<%= compile_dir %>/stylesheet/<%= pkg.name %>-<%= pkg.version %>-prefixed.css' // -> dest/css/concatenated.css
      }
    },

    ngtemplates:  {
      app: {
        src: '<%= app_files.tpl %>',
        dest: '<%= build_dir %>/app/src/template.js',
        options: {
          htmlmin: { collapseWhitespace: true, collapseBooleanAttributes: true }
        }
      }
    },

    htmlmin: {
      compile: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= compile_dir %>/index.html': '<%= compile_dir %>/index.html',
        }
      }
    }
  };

  grunt.initConfig( grunt.util._.extend( taskConfig, gruntConfig ) );

  grunt.registerTask( 'draw', [ 'draw_my_project' ] );

  grunt.registerTask( 'build', [ 'clean', 'copy:build', 'index:build' ] );
  
  grunt.registerTask( 'compile', [ 'jshint', 'karma:compile:start', 'build', 'ngtemplates', 'concat:compile_js', 'concat:compile_css', 'uglify:compile', 'cssmin:compile', 'copy:compile', 'index:compile', 'autoprefixer', 'htmlmin:compile' ] );

  grunt.registerTask( 'compile-dev', [ 'compile', 'connect:compile:keepalive' ] );

  grunt.registerTask( 'compile-image-embed', [ 'compile', 'imageEmbed' ] );

  grunt.registerTask( 'dev', [ 'jshint', 'build', 'connect:build', 'karma:build:start', 'watch' ] );
  grunt.registerTask( 'devNoServer', [ 'jshint', 'build', 'karma:build:start', 'watch' ] );

  grunt.registerTask( 'default', [ 'build'] );

 
  function filterForJS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.js$/ );
    });
  }

  function filterForCss ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.css$/ );
    });
  }

  grunt.registerMultiTask( 'index', 'Process index.html template', function () {
    console.log(this.data.src);

    var dirRE = new RegExp( '^('+this.data.dir+')\/', 'g' );
    
    var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });

    var cssFiles = filterForCss( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });

    console.log(cssFiles);

    grunt.file.copy(grunt.config( 'app_files.html' ), this.data.dir + '/index.html', { 
      process: function (contents, path) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config( 'pkg.version' ),
            title: grunt.config('pkg.name'),
            favicon: grunt.config('app_files.favicon'),
            nojs_sentence: grunt.config('nojs_sentence')
          }
        });
      }
    });
  });

};
