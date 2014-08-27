module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      // dist: {
      //   src: [
      //       'src/scripts/*.js' // All JS in the libs folder
      //   ],
      //   dest: 'dist/scripts/app.js'
      // },
      vendor: {
        src: [
          'bower_components/jQuery/dist/jquery.js',
          'bower_components/gsap/src/uncompressed/TweenMax.js',
          'bower_components/underscore/underscore.js',
          'bower_components/perfect-scrollbar/min/perfect-scrollbar.with-mousewheel.min.js',
          'bower_components/jquery-zoom/jquery.zoom.js',
          'bower_components/ScrollMagic/js/jquery.scrollmagic.js',
          'bower_components/ScrollMagic/js/jquery.scrollmagic.debug.js',
          'bower_components/ScrollMagic/js/_dependent/greensock/plugins/ScrollToPlugin.min.js'
        ],
        dest: 'js/vendor.js'
      },
      // scroll: {
      //   src: [
      //     'bower_components/gsap/src/minified/TweenMax.min.js',
      //     'bower_components/ScrollMagic/js/jquery.scrollmagic.min.js'
      //   ],
      //   dest: 'src/scripts/scroll.js'
      // }
    },
    uglify: {
      build: {
        src: 'js/vendor.js',
        dest: 'js/vendor.min.js'
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['src/stylesheets/*.scss'],
        tasks: ['sass'],
        options: {
            spawn: false,
            lineNumbers: true
        }
      },
      html: {
        files:['craft/templates/*'],
        tasks: ['sass'],
        options: {
            spawn: false,
            lineNumbers: true
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: {
          'stylesheets/main.css': 'src/stylesheets/main.scss',
          'stylesheets/nintendo.css': 'src/stylesheets/nintendo.scss',
          'stylesheets/atari.css': 'src/stylesheets/atari.scss',
          'stylesheets/crash.css': 'src/stylesheets/crash.scss',
          // 'stylesheets/home.css': 'src/stylesheets/home.scss',
          // 'stylesheets/warp.css': 'src/stylesheets/warp.scss',
          // 'stylesheets/stories.css': 'src/stylesheets/stories.scss'
        }
      }
    },
    responsive_images: {
      build: {
        options: {
          separator: '-',
          sizes: [{
            name: 'small',
            width: '300px',
            quality: 80,
            upscale: false
          },{
            name: 'small',
            width: '600px',
            suffix: '_x2',
            quality: 75,
            upscale: false
          },{
            name: 'medium',
            width: '450px',
            quality: 80,
            upscale: false
          },{
            name: 'medium',
            width: '900',
            suffix: '_x2',
            quality: 75,
            upscale: false
          },{
            name: 'large',
            width: '800px',
            quality: 80,
            upscale: false
          },{
            name: 'large',
            width: '1600px',
            suffix: '_x2',
            quality: 75,
            upscale: false
          }]
        },

        files: [{
          expand: true,
          src: ['*.jpg'],
          cwd: 'images/uploads',
          dest: 'img/resp'
        }]
      }
    },

    smushit: {
      mygroup: {
        src: ['img/resp/*.jpg'],
        dest: 'img/min'
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, cwd: 'src/', src: ['stylesheets/*'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['*'], flatten: true, dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['img/**'], dest: 'dist/', filter: 'isFile'},
          {expand: true, cwd: 'src/', src: ['scripts/**'], dest: 'dist/'}
        ]
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-smushit');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['watch', 'sass']);
  grunt.registerTask('build_images', ['responsive_images']);


};