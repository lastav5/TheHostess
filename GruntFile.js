  var  fs = require('fs');
  var angularConfig = require('./config/angularConfig.js');
  function makeJson (env, filePath) {
    console.log('in makejson');
    fs.writeFileSync(filePath,JSON.stringify(env));
  };

module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['GruntFile.js', 'TheHostess/scripts/src/**/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'TheHostess/scripts/app.min.js': 'TheHostess/scripts/src/*.js'
        }
      }
    },

    // compile less stylesheets to css -----------------------------------------
    // less: {
    //   build: {
    //     files: {
    //       'dist/css/pretty.css': 'src/css/pretty.less'
    //     }
    //   }
    // },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'TheHostess/css/index.min.css': 'TheHostess/css/index.css'
        }
      }
    },

    // configure watch to auto update ------------------------------------------
    watch: {
      stylesheets: {
        files: ['TheHostess/css/*.css', 'TheHostess/css/*.less'],
        tasks: ['cssmin']
      },
      scripts: {
        files: 'TheHostess/scripts/src/**/*.js',
        tasks: ['jshint', 'uglify']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    //run watch and nodemon at the same time
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      tasks: ['nodemon', 'watch']
    },

    ngconstant: {
      options: {
        name: 'envConfig',
        dest: 'TheHostess/scripts/src/envConfig.js',
      },
      dist:{
        constants: function() {
          makeJson(angularConfig.angularConfig,'./config/angularConfigJSON.json');
          return {
            nodeConst: grunt.file.readJSON('./config/angularConfigJSON.json')
          };
        }
      }
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ng-constant');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  // ===========================================================================
  // CREATE TASKS ==============================================================
  // ===========================================================================
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'ngconstant', 'nodemon','concurrent']);
  grunt.registerTask('heroku', ['ngconstant']);

};