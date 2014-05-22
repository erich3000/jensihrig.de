
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          // cssmin will minify later
          style: 'expanded'
        },
        files: {
		  'css/_tmp/jensihrig.css': 'css/_src/jensihrig.scss',
        }
      }
    },
    
    montage: {
        icons: {
            files: {
                "stylesheets/deploy": [
                    "images/_source/icons/*.png"
                ]
            },
            options: {
                size: 26,
                prefix: '.icons',
                outputImage: "icons.png",
                outputStylesheet: "../source/icons.css",
                magick: {
                    background: "none"
                },
                baseRules: {
                        display: "block",
                        width: "24px",
                        height: "24px"
                }
            }
        },
  
    },

    cssmin: {
      combine: {
        files: {
			'css/deploy/jensihrig.min.css': [
				'css/_tmp/jensihrig.css'		
			]	
        }
      }
    },

    jshint: {
      beforeconcat: ['javascripts/app.js']
    },

    uglify: {
      build: {
      	 files: {
			'js/deploy/jensihrig.min.js' : 'js/_src/jensihrig.js'
        }

      }
    },
   
    imagemin: {
  
      'images': {
        files: [
        	{
		         expand: true,
		         cwd: 'images/',
		         src: ['**.{png,gif,jpg}'],
		         dest: 'images/'
       		}
        ], 
      },
   
   },
   
   

	'ftp-deploy': {

	  'styles': {
		    auth: {
		      host: 'jensihrig.de',
		      port: 21,
		      authKey: 'key'
		    },
		    src: 'css/**',
		    dest: 'home/css',
		    exclusions: ['css/**/.DS_Store']
	  },
	  'scripts': {
		    auth: {
		      host: 'jensihrig.de',
		      port: 21,
		      authKey: 'key'
		    },
		    src: 'js/**',
		    dest: 'home/js',
		    exclusions: ['js/deploy/**/.DS_Store']
	  },  
	  'images': {
		    auth: {
		      host: 'jensihrig.de',
		      port: 21,
		      authKey: 'key'
		    },
		    src: 'images/**',
		    dest: 'home/images',
		    exclusions: ['images/.DS_Store']
	  }

	},
	
	watch: {
      options: {
        livereload: false
      },
      scripts: {
        files: ['js/jensihrig.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['css/jensihrig.css'],
        tasks: ['cssmin'],
        options: {
          spawn: false
        }
      },
      images: {
        files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },
    
    notify: {
		buildTask: {
		  options: {
		    title: 'jensihrig.de', 
		    message: 'build task completed', 
		  }
		},
  },



  });

	
  require('load-grunt-tasks')(grunt);


  grunt.registerTask('images', [
    'imagemin:images',
  	
  ]); 




  grunt.registerTask('build', [
  	//'montage:icons',
  	'sass:dist',
  	'cssmin:combine',
  	//'imagemin:images', /* only this directory so we nedd to use imagemin! */
    //'imageoptim:css-sprites',
  	//'concat',
  	'uglify',
  	'ftp-deploy:styles',
  	'ftp-deploy:scripts',
  	//'ftp-deploy:images',
  ]); 

};