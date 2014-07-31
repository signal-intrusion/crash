module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // concat: {
      // dist: {
      //   src: [
      //       'src/scripts/*.js' // All JS in the libs folder
      //   ],
      //   dest: 'dist/scripts/app.js'
      // },
    //   vendor: {
    //     src: [
    //       'bower_components/jquery/dist/jquery.min.js',
    //       'bower_components/underscore/underscore.js',
    //       'bower_components/respeto/dist/respeto.min.js',
    //       'bower_components/unslider/src/unslider.js'
    //     ],
    //     dest: 'src/scripts/vendor.js'
    //   },
    //   scroll: {
    //     src: [
    //       'bower_components/gsap/src/minified/TweenMax.min.js',
    //       'bower_components/ScrollMagic/js/jquery.scrollmagic.min.js'
    //     ],
    //     dest: 'src/scripts/scroll.js'
    //   }
    // },
    // uglify: {
    //   build: {
    //     src: 'src/scripts/vendor.js',
    //     dest: 'src/scripts/vendor.min.js'
    //   }
    // },
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
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: {
          'stylesheets/main.css': 'src/stylesheets/styles.scss'
        }
      }
    },
    // responsive_images: {
    //   build: {
    //     options: {
    //       separator: '-',
    //       sizes: [{
    //         name: 'small',
    //         width: '500px',
    //         quality: 90,
    //         upscale: false
    //       },{
    //         name: 'small',
    //         width: '1000px',
    //         suffix: '_x2',
    //         quality: 65,
    //         upscale: false
    //       },{
    //         name: 'medium',
    //         width: '800px',
    //         quality: 90,
    //         upscale: false
    //       },{
    //         name: 'medium',
    //         width: '1600',
    //         suffix: '_x2',
    //         quality: 65,
    //         upscale: false
    //       },{
    //         name: 'large',
    //         width: '1200px',
    //         quality: 90,
    //         upscale: false
    //       },{
    //         name: 'large',
    //         width: '2400px',
    //         suffix: '_x2',
    //         quality: 65,
    //         upscale: false
    //       }]
    //     },

    //     files: [{
    //       expand: true,
    //       src: ['*.jpg'],
    //       cwd: 'src/images',
    //       dest: 'src/images/resp'
    //     }]
    //   }
    // },

    // smushit: {
    //   mygroup: {
    //     src: ['src/images/**/*.png','src/images/resp/*.jpg'],
    //     dest: 'src/img/min'
    //   }
    // },

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