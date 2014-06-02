module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
//            css: {
//               src: [
//                     'css/*'
//                    ],
//                dest: 'combined.css'
//            },
        	
            js : {
                src : [
                    'src/*.js',
                ],
                // dest : 'build/src-combined.js'
                dest : 'www/jfeev.js'
            },
            jslib : {
            	src : [
                       'src/lib/*.js',
                ],
                dest : 'www/lib.js'
            }
        },
//        cssmin : {
//            css:{
//                src: 'combined.css',
//                dest: 'combined.min.css'
//            }
//        },
        uglify : {
            js: {
                files: {
                    'www/jfeev.min.js' : [ 'build/src-combined.js' ]
                }
            }
        }
//        watch: {
//            files: ['css/*', 'js/*'],
//            tasks: ['concat', 'cssmin', 'uglify']
//        }
    });

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default', [
        'concat:css', 
        'cssmin:css', 
        'concat:js', 
        'uglify:js' 
    ]);
};
