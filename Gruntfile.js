module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'public/build/js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    concat: {
      options: {
        separator: '\n\n'
      },
      dist: {
        src: ['public/build/js/*.js'],
        dest: 'public/dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: true
      },
      dist: {
        files: {
          'public/dist/js/<%= pkg.name %>.min.js' : ['<%= concat.dist.dest %>']
        }
      }
    },
    cssmin: {
      target: {
        options: {
          report: 'gzip'
        },
        files: [
          {
            expand: true,
            cwd: 'public/build/css',
            src: ['*.css'],
            dest: 'public/dist/css',
            ext: '.min.css'        
          }
        ]
      }
    },
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [
          {
            expand: true,
            cwd: 'public/build/img/',
            src: ['*.{png,jpg}'],
            dest: 'public/dist/img/'
          }
        ]
      }
    },
    qunit: {
      files: ['public/tests/*.html']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin:target', 'imagemin:dynamic']);

};