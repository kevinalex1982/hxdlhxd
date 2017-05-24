/*!
 * Adminux (http://maxartkiller.com)
 * Copyright 2017 The Adminux Author: Maxartkiller
 * purchase licence before use
 * You can not resale and/or modify without prior licences.
*/

"use strict";
var infonum =0;
$(document).on("ready", function(){
     /*LAYOUT CONTENT SCRIPT*/
    var body_1= $('body');
    
    if( body_1.hasClass("scroll_header") === true){
       $(window).on("scroll", function(){
            if ($(document).scrollTop() >= 250) {
                body_1.addClass("active_scroll");
            }else{ 
                body_1.removeClass("active_scroll");
            }
        });
    }
    
    $(window).on("load", function(){
    setTimeout(function(){
         /*cicular progress sidebar home page */   
         $('.progress_profile').circleProgress({ 
             fill: {gradient: ["#2ec7cb", "#6c8bef"]},
             lineCap: 'butt'
         });
        

        
        
        /* url  navigation active */
        var url = window.location;        
        function menuitems(){            
          /*  if(body_1.hasClass('horizontal-menu') === false){
                var element = $('.sidebar-left #side-menu li a').filter(function() {
                    return this.href == url;
                }).addClass('active').parent("li").addClass('active').closest('.nav').addClass('in').slideDown().prev().addClass('show');

                $('.sidebar-left .nav li a').on('click', function(){
                    if( $(this).hasClass('menudropdown')=== true){ 
                        $(this).toggleClass("show").next().slideToggle().parent().addClass("in");
                    } 
                });                
            }else {
                if( $(window).width() >=1020){
                    var element = $('.sidebar-left #side-menu li a').filter(function() {
                        return this.href == url;
                    }).addClass('active').parent("li").addClass('active').closest('.nav').addClass('in').prev().addClass('show');

                    $('.sidebar-left > .nav > li').on('mouseover', function(){
                        if( $(this).find('a:first-of-type').hasClass('menudropdown')==true){ 
                            $(this).find('a:first-of-type').addClass("show").next().slideDown().parent().addClass("in");
                        } 
                    }); 
                    $('.sidebar-left > .nav > li ').on('mouseleave', function(){
                        if( $(this).find('a:first-of-type').hasClass('menudropdown')==true){ 
                            $(this).find('a:first-of-type').removeClass("show").next().slideUp().parent().removeClass("in");
                        } 
                    });                 
                }
                else{
                    var element = $('.sidebar-left #side-menu li a').filter(function() {
                        return this.href == url;
                    }).addClass('active').parent("li").addClass('active').closest('.nav').addClass('in').slideDown().prev().addClass('show');

                      
                }               
            }*/
            $('.sidebar-left .nav li a').on('click', function(){

                /*$('.sidebar-left .nav li a').each(function (index,data) {
                    
                })*/
                $('.sidebar-left #side-menu li a').filter(function(index) {

                    if( $(this).hasClass('active')===true){
                        $(this).removeClass("active");
                    }
                })
                
                if( $(this).hasClass('active')===true){
                
                }else 
                {
                    $(this).addClass("active");
                }
                
                
            });
        }
       menuitems();


        
        /* inbox mail page  collapsible */
        $(".inboxmenu").on("click", function(){
            $(".mailboxnav ").toggleClass("mailboxnavopen");
        });
        $(".filemenu_btn").on("click", function(){
            $(".filemenu ").toggleClass("filemenuopen");
        });
        
        /* menu  collapsible */
        $(".menu-collapse").on("click", function(){
            body_1.toggleClass("menuclose");
        });
        $(".menu-collapse-right").on("click", function(){
            body_1.toggleClass("menuclose-right");
        });
        $(".menu-small").on("click",function(){
            body_1.toggleClass("menusmall");
        });

    },500);       
       
   });
    
    /* Custome css checkbox script */
    $('.form-check-input').on('change', function(){
        $(this).parent().toggleClass("active")
        $(this).closest(".media").toggleClass("active");
    }); 
    
    /* Card fullscreeen button script */
    $('.fullscreen-btn').on('click', function(){
        $(this).closest(".full-screen-container").toggleClass("fullscreen");
        body_1.toggleClass("fullscreen");
    });
    
    
    /* Resposnsive Utility hide menu */
    if($(window).width() >= 1440){  body_1.removeClass('menuclose menuclose-right'); }else{  body_1.addClass('menuclose menuclose-right'); }
    
    $(window).on('resize', function(){
        if($(window).width() >= 1440){  body_1.removeClass('menuclose menuclose-right'); }else{  body_1.addClass('menuclose menuclose-right'); }
    });





    $("#indexhtmlA").click();
});

