'use strict';

/*
 *************************************************************
 * INSTRUCTIONS
 * 
 * Go to your terminal and use "grunt" to deploy the site 
 * locally and start developing
 *
 *************************************************************
 */

module.exports = function(grunt) {
	/*
	 * Used for loading all of your grunt plugins
	 */
	require('load-grunt-tasks')(grunt);


	/*
	 *************************************************************
	 * Grunt config
	 *************************************************************
	 */
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		faqData: grunt.file.readJSON('src/asset/data/faq_data.json'),

		/*
		 * An array list of all your js files to be minified in compiling order
		 */
		scripts: {
			cdn:[
				'//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'
			],
			libs:[
				'src/js/lib/imagesloaded.js'
			],
			app:[
				'src/js/core/Class.js',
				'src/js/core/CoreClass.js',
				'src/js/core/PageCore.js',
				'src/js/util/AjaxUtil.js',
				'src/js/util/ErrorUtil.js',
				'src/js/util/IE8Fixes.js',
				'src/js/lib/instafeed.js',
				'src/js/page/Home.js',
				'src/js/page/Judges.js',
				'src/js/page/Carlos.js',
				'src/js/page/Faq.js',
				'src/js/page/objects/SocialFeeds.js',
				'src/js/page/objects/InstagramFeed.js',
				'src/js/page/objects/YTVAds.js',
				'src/js/ytv/ytv.js',
				'src/js/page/objects/YTVHeaderFooter.js',
				'src/js/Initialize.js'
			]
		},

		/*
		 * Config variables for different deployment environments
		 */
		config: {
			local: {
				options: {
					variables: {
						environment:{
							id: "local",
							host: "localhost",
							ytvPHP: "http://dev.thesecretlocation.net/ytvi-vns7/js/ytv/ytv.php?p=",
							dest: "dist/local/",
							dir: "/"
						}
					}
				}
			},
			dev: {
				options: {
					variables: {
						environment:{
							id: "dev",
							host: "dev.thesecretlocation.net/ytvi-vns7",
							ytvPHP: "http://dev.thesecretlocation.net/ytvi-vns7/js/ytv/ytv.php?p=",
							dest: "dist/dev/",
							dir: "/ytvi-vns7/",
							gaID: "UA-48884292-2"
						}
					}
				}
			},
			test: {
				options: {
					variables: {
						environment:{
							id: "test",
							host: "vns7.test.thesecretlocation.net",
							ytvPHP: "http://vns7.test.thesecretlocation.net/js/ytv/ytv.php?p=",
							dest: "dist/test/",
							dir: "/",
							gaID: "UA-48884292-2"
						}
					}
				}
			},
			stage: {
				options: {
					variables: {
						environment:{
							id: "stage",
							host: "vns7.stage.thesecretlocation.net",
							ytvPHP: "http://vns7.stage.thesecretlocation.net/js/ytv/ytv.php?p=",
							dest: "dist/stage/",
							dir: "/",
							gaID: "UA-48884292-2"
						}
					}
				}
			},
			prod: {
				options: {
					variables: {
						environment:{
							id: "prod",
							host: "vns7.prod.thesecretlocation.net",
							ytvPHP: "http://vns7.prod.thesecretlocation.net/js/ytv/ytv.php?p=",
							dest: "dist/prod/",
							dir: "/",
							gaID: "UA-48884292-1"
						}
					}
				}
			},
		},

		/*
		 *************************************************************
		 * Grunt processes
		 *************************************************************
		 */

		/*
		 * Delete all files in the distribution directory
		 */
		clean: {
			dist: {
				src: [
					"<%= environment.dest %>"
				]
			}
		},

		/*
		 * Copy the asset directory
		 * OR Copy the js directory if you are developing to preserve all your file paths
		 */
		copy: {
			assets: {
				files: [{
					expand: true,
					cwd: "src/asset/",
					src: ["**"],
					dest: "<%= environment.dest %>asset/"
				}]
			},
			js: {
				files: [{
					expand: true,
					cwd: "src/js/",
					src: ["**"],
					dest: "<%= environment.dest %>js/"
				}]
			},
			ytv: {
				files: [{
					expand: true,
					cwd: "src/js/ytv",
					src: ["**"],
					dest: "<%= environment.dest %>js/ytv"
				}]
			}
		},

		/*
		 * SASS compilation
		 */
		sass: {
			debug: {
				options: {
					style: 'expanded'
				},
				files:{
					"<%= environment.dest %>css/main.css": "src/css/main.sass",
					"<%= environment.dest %>css/ie9.css": "src/css/ie9.sass"
				}
			},
			compile: {
				files:{
					"<%= environment.dest %>css/main-min.css": "src/css/main.sass",
					"<%= environment.dest %>css/ie9.css": "src/css/ie9.sass"
				}
			}
		},

		/*
		 * JS compilation 
		 */
		uglify: {
			dist: {
				options: {
					drop_console: true,
					mangle: false
				},
				files: {
					'<%= environment.dest %>js/main-min.js': '<%= scripts.app %>',
					'<%= environment.dest %>js/libs.js': '<%= scripts.libs %>'
				}
			}
		},

		/*
		 * Jade compilation
		 * - Modify the scripts array to remove the src directory path
		 */
		jade: {
			dist: {
				options: {
					pretty: false,
					data: {
						environment: "<%= environment %>",
						scripts: "<%= scripts %>",
						srcDir: "src/",
						data: '<%= faqData %>'
					}
				},
				files: {
					"<%= environment.dest %>index.html": "src/template/page/home.jade",
					"<%= environment.dest %>judges/index.html": "src/template/page/judges.jade",
					"<%= environment.dest %>carlos/index.html": "src/template/page/carlos.jade",
					"<%= environment.dest %>faq/index.html": "src/template/page/faq.jade",
					"<%= environment.dest %>need2audition/index.html": "src/template/page/need2audition.jade",
					"<%= environment.dest %>about/about/index.html": "src/template/page/about.jade"
				}
			}
		},

		/*
		 * Live reload your browser when developing
		 */
		connect: {
			options: {
				port: 9000,
				hostname: 'localhost',
				livereload: 35729
			},
			livereload: {
				options: {
					open: true,
					base: [
						'<%= environment.dest %>'
					]
				}
			}
		},

		/*
		 * Watch files and update only changed content
		 * - Added grunt-newer to compile only the jade file that pertains to what was changed
		 */
		watch: {
			jade: {
				files: ['src/template/**/*.jade'],
				tasks: ['config:local', 'newer:jade']
			},
			sass: {
				files: ['src/css/**/*.sass'],
				tasks: ['config:local', 'sass:debug']
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['config:local', 'newer:copy:js']
			},
			copy: {
				files: ['src/asset/**/*.{json,png,jpg,jpeg,gif,webp,svg,eot,ttf,woff,mp3,wav,swf,mp4,webm,ogv}'],
				tasks: ['config:local', 'newer:copy']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: ['src/**/*']
			}
		}
	});


	/*
	 *************************************************************
	 * Grunt tasks to be run through your terminal
	 *************************************************************
	 */
	
	/*
	 * The default "grunt" task is for active development
	 */
	grunt.registerTask('default', [
		'config:local',
		'clean',
		'copy:assets',
		'copy:js',
		'sass:debug',
		'jade',
		'connect:livereload',
		'watch'
	]);

	/*
	 * Compile build for the different deployment environments
	 */
	grunt.registerTask('build', function(_environment) {

		if (_environment == "local" || _environment == "dev"){
			grunt.task.run([
				'config:'+_environment,
				'clean',
				'copy:assets',
				'copy:js',
				'copy:ytv',
				'sass:compile',
				'jade'
			]);
		}else{
			grunt.task.run([
				'config:'+_environment,
				'clean',
				'copy:assets',
				'copy:ytv',
				'uglify',
				'sass:compile',
				'jade'
			]);
		}
	});
};
