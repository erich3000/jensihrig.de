
module.exports = function(grunt) {
	
	var ftpHost = 'alfa3076.alfahosting-server.de';
  var ftpBaseUrl = '/html';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    montage: {
        icons: {
            files: {
                "css": [
                    "images/icons/*.png"
                ]
            },
            options: {
                size: 116,
                prefix: '.icons',
                outputImage: "icons.png",
                outputStylesheet: "icons.css",
                magick: {
                    background: "none"
                },
                baseRules: {
                        display: "block",
                        width: "116px;",
                        height: "116px;"
                }
            }
        },
  
    },
 
     imageoptim: {
	  'css-sprites': {
	    options: {
	      jpegMini: false,
	      imageAlpha: true,
	      quitAfter: true
	    },
	    src: ['css']
	  },	 
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

 	 uglify: {
      build: {
      	 files: {
			'js/_tmp/init.min.js' : 'js/_src/init.js',
			'js/_tmp/app.min.js' : 'js/_src/app.js'
        }

      }
    },

	 concat: {
	  dist: {
	  	files: {
			'js/combined.js' : 
				[
				      'js/vendor/jquery.min.js',
				      'js/vendor/skel.min.js',
				      'js/_tmp/init.min.js',
				      'js/_tmp/app.min.js'	      
				]
	   },
	
	  }
	},

    cssmin: {
      combine: {
        files: {
			'css/jensihrig.min.css': [
				'css/jensihrig.css'		
			]	
        }
      }
    },

	'ftp-deploy': {

	  'styles': {
		    auth: {
		      host: ftpHost,
		      port: 21,
		      authKey: 'key'
		    },
		    src: 'css',
		    dest: ftpBaseUrl +'/css',
		    exclusions: ['css/**/.DS_Store']
	  },
	  'scripts': {
		    auth: {
		      host: ftpHost,
		      port: 21,
		      authKey: 'key'
		    },
		    src: 'js',
		    dest:  ftpBaseUrl + '/js',
		    exclusions: ['js/_src*','js/_tmp*','js/vendor*','**/.DS_Store']
	  },  
	  'images': {
		    auth: {
		      host: ftpHost,
		      port: 21,
		      authKey: 'key'
		    },
		    src: 'images',
		    dest: ftpBaseUrl + '/images',
		    exclusions: ['images/icons*','images/**/.DS_Store']
	  },
	  'index': {
		    auth: {
		      host: ftpHost,
		      port: 21,
		      authKey: 'key'
		    },
		    src: '.',
		    dest: ftpBaseUrl,
		    exclusions: ['.git*','.sass-cache*','css*','images*','js*','node_modules*','.ftppass','.gitignore','.project','index.php','Gruntfile.js','package.json','pinterest-f3d1c.html']
	  },

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

  grunt.registerTask('build', [
    'montage:icons',
    'imageoptim:css-sprites',
  	'imagemin:images', /* only this directory so we nedd to use imagemin! */
  	'uglify',
    'concat',
  	'ftp-deploy:styles',
  	'ftp-deploy:scripts',
  	'ftp-deploy:images',
  	'ftp-deploy:index',
  	'notify:buildTask'
  ]); 

};