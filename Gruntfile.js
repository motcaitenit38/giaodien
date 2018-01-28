module.exports = function (grunt) {
    
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            //grunt task configuration will go here
            clean: {
                dist: {
                    src: ['dist/*']
                }
            },
            copy: {
                dist: {
                    expand: true,
                    cwd: 'src',
                    src: ['lib/exclude/**', 'lib/fonts/**', 'lib/images/**'],
                    dest: 'dist'
                }
            },
            ngAnnotate: {
                options: {
                    singleQuotes: true,
                    remove: true
                },
                app: {
                    files: [{
                        expand: true,
                        cwd: 'src',
                        src: ['app.js'],
                        dest: ''
                    },{
                        expand: true,
                        cwd: 'src',
                        src: ['pages/**/*.js'],
                        dest: ''
                    }]
                }
            },
            concat: {
                options: {
                    separator: ';\n\n',
                },
                app: {
                    src: [
                        'src/lib/required/*.js',
                        'src/lib/js/angular.min.js', 
                        'src/lib/js/*.js', 
                        'src/app.js',
                        'src/**/*.module.js',
                        'src/**/*.service.js',
                        'src/**/*.js',
                        '!src/lib/exclude/*.js'],
                    dest: 'dist/app.js'
                }
            },
            uglify: {
                options: {
                    compress: {
                    drop_console: true
                    }
                },
                js: { //target
                    src: ['dist/app.js'],
                    dest: 'dist/app.js'
                }
            },
            cssmin: {
                target: {
                    files: {
                        'dist/lib/css/app.css': [
                            'src/lib/required/*.css', 
                            'src/lib/css/*.css',
                            'src/app.css']
                    }
                }
            },
            htmlmin: {
                build: {
                    options: {                                 // Target options
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: [{
                        expand: true,
                        cwd: 'src',
                        src: ['**/*.html'],
                        dest: 'dist'
                    }]
                }
            },
            sass: {
                build: {
                    files: {
                        'src/app.css' : ['src/lib/scss/style.scss']
                    }
                },
            },
            watch: {
                options: {
                    livereload: true,
                    event: ['changed', 'added', 'deleted']				
                },
                sass: {
                    // We watch and compile sass files as normal but don't live reload here
                    files: ['src/lib/scss/**.scss'],
                    tasks: ['sass', 'cssmin'],
                }
            },
        });
    
        //load grunt tasks
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-ng-annotate');
    
        //register grunt default task
        grunt.registerTask('default', ['clean', 'ngAnnotate', 'concat', 'sass', 'cssmin', 'htmlmin']);
        grunt.registerTask('js', ['ngAnnotate', 'concat']);
        grunt.registerTask('code', ['ngAnnotate', 'concat', 'htmlmin']);
    
    };