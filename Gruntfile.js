module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {

// combine css, , right now there is none
//            css: {
//               src: [
//                     'css/*'
//                    ],
//                dest: 'combined.css'
//            },
        	
        //
        // combine source js into one big file
        //
            js : {
                src : [
                    'src/js/*',
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

// minify css, right now there is none
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
        },

	copy : {
        //
    	// copy resources from src to www as a means of deployment
        //
		resources: {
            files: [
                {expand: true, cwd: 'src/resources/', src: ['**'], dest: 'www/resources'}
            ]},
        libs: {
            files: [
                {expand: true, cwd: 'src/lib/', src:['**'], dest: 'www/lib'}
            ]}
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
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', [
        //'concat:css', 
        //'cssmin:css', 
        'concat:js',
        'concat:jslib',  

        'uglify:js',

        'copy:resources',
        'copy:libs',

    ]);
};
