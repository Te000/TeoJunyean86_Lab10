$(document).ready(function(){
 
	//to hide the order and comment section
        $("#form").hide();
        $("#commentSection").hide();
        $("#modalRegistration").hide();
        $("#login").show();
        $("#pastOrders").hide();
        retrieveCookie();
        loadComments();
        
        //to show the order form and hide the comment section once clicked
        	$("#orderNow").click(function(){
        	//The form will not work if I put a preventDefault here?	
        		$("#login").hide();
                $("#form").show(1000);
        		$("#commentSection").hide();
                $("#modalRegistration").hide();
                $("#loginSection").hide();
                $("#pastOrders").hide();
                
        //to show the comment section and hide the order form once clicked
        	});
        	$("#comment").click(function(){
        	//The form will not work if I put a preventDefault here?
        		$("#commentSection").show(1000);
        		$("#form").hide();
                $("#modalRegistration").hide();
                $("#loginSection").hide();
                $("login").hide();
                $("#pastOrders").hide();

        	});

            $("#register").click(function(){
                $("#modalRegistration").show(1000);
                $("#form").hide();
                $("#commentSection").hide();
                $("#login").hide();
                $("#pastOrders").hide();
            });

            $("#orderHistory").click(function(){
                $("#modalRegistration").hide();
                $("#form").hide();
                $("#commentSection").hide();
                $("#login").hide();
                $("#pastOrders").show(1000);
                viewPastOrders();
            });

        $("#resetButton").click(function(event)
        {
                event.preventDefault();
                $("#burger").val(0);
                $("#bread").val(0);
                $("#size").val(0);
                $(":radio").prop("checked", false);
                $(":checkbox").prop("checked", false);
                $("#validate").val("");
                $("#orderSummary").hide();

        });

        $("#addToCart").click(function(event)
        {
                event.preventDefault();
                $("#orderSummary").show();
                $("#orderSummary").html("<H3>This is what you have ordered</H3>");
                var oldOrder = "Previously, you ordered ";
                var allChecked = 1;
                if($("#burger").prop("selectedIndex")!=0){
                     $("#orderSummary").append("<p class=\"order\">Burger selected: " + $("#burger").val()) + ".</p>";
                    //oldOrder += $("#burger").val()) + ", ";
                }
                else{
                     $("#orderSummary").append("<p class=\"error\">Please select a burger</p>");
                    allChecked = 0;
                }
                if($("#bread").prop("selectedIndex")!=0){
                     $("#orderSummary").append("<p class=\"order\">Bread selected: " + $("#bread").val()) + ".</p>";
                     //oldOrder += $("#bread").val()) + ", ";
                }
                else{
                     $("#orderSummary").append("<p class=\"error\">Please select a bread</p>");
                     allChecked = 0;
                }

                if($("#size").prop("selectedIndex")!=0){
                     $("#orderSummary").append("<p class=\"order\">Size selected: " + $("#size").val()) + ".</p>";
                     //oldOrder += $("#size").val()) + ", "
                }
                else{
                     $("#orderSummary").append("<p class=\"error\">Please select a size</p>");
                     allChecked = 0;
                }
                
                if ($("input[name=mayo]:checked").val()) {
                        $("#orderSummary").append("<p class=\"order\">Mayo: " + $("input[name=mayo]:checked").val() + "</p>");
                        oldOrder +=  $("input[name=mayo]:checked").val() + ", "
                }
                 else {
                        $("#orderSummary").append("<p class=\"error\">Please select if you want Mayo!</p>");

                }

                if ($("input[name=ketchup]:checked").val()) {
                        $("#orderSummary").append("<p class=\"order\">Ketchup: " + $("input[name=ketchup]:checked").val() + "</p>");
                        oldOrder +=  $("input[name=ketchup]:checked").val() + ", "
                }
                 else {
                        $("#orderSummary").append("<p class=\"error\">Please select if you want Ketchup!</p>");
                }

                if ($("input[name=mustard]:checked").val()) {
                        $("#orderSummary").append("<p class=\"order\">Mustard: " + $("input[name=mustard]:checked").val() + "</p>");
                        oldOrder +=  $("input[name=mustard]:checked").val() + ", "
                }
                 else {
                        $("#orderSummary").append("<p class=\"error\">Please select if you want Mustard!</p>");
                }

               $("#orderSummary").append("<p class=\"order\">Toppings</p> ");
               $('input[name=toppings]:checked').each(function() {
                        $("#orderSummary").append(" " + this.value + ",");
                        oldOrder +=  this.value + ", "
                });
               $("#orderSummary").append(" and that's all!");

               $("#orderSummary").append("<p class=\"order\">Sauces</p> ");
               $('input[name=sauces]:checked').each(function() {
                        $("#orderSummary").append(" " + this.value + ",");
                        oldOrder +=  this.value + ", "
                });
               $("#orderSummary").append(" and that's all!");

               if ($("input[name=fries]:checked").val()) {
                        $("#orderSummary").append("<p class=\"order\">Fries: " + $("input[name=fries]:checked").val() + "</p>");
                        oldOrder +=  $("input[name=fries]:checked").val() + ", "
                }
                 else {
                        $("#orderSummary").append("<p class=\"error\">Please select if you want Fries!</p>");
                }

                if (isNaN($("#validate").val()) == true || ($("#validate").val()) == ''){
                        $("#orderSummary").append("<p class=\"error\">Please enter a valid number!</p>");
                        allChecked = 0;
                }
                else {
                      $("#orderSummary").append("<p class=\"order\">You ordered: " + $("#validate").val() + " of these burgers!</p>");
                      oldOrder +=  "a total of " + $("#validate").val() + " orders!"
                      
                }
                 if ($.trim($(".user").html())==''){
                    $("#loginSection").show(500);
                    console.log("Login First");
                }
                if (allChecked == 0){
                    console.log("Check the necessary boxes")
                }
                else {
                    checkSessionForOrders();

                var jsonData = {
                            "action": "STORE_ORDER",
                            "order" : oldOrder,
                            };

                    $.ajax({
                    url : "data/applicationLayer.php",
                    type : "POST",
                    data : jsonData,
                    dataType : "json",
                    contentType : "application/x-www-form-urlencoded",
                    success : function(jsonData){
                        console.log("Order Posted");
                        $("#pastOrders").show(1000);
                        viewPastOrders();
                        $("#form").hide();

                    },
                    error : function(errorMessage) {
                        console.log("Error");
                    }
                });
                }
                

        });

        function checkSessionForOrders(){
            var jsonData = {
            "action": "RETRIEVE_SESSION",
            }
            $.ajax({
                url: 'data/applicationLayer.php', 
                type: 'POST',
                data: jsonData,
                dataType: 'json',
                contentType : "application/x-www-form-urlencoded",

                success: function(jsonData){
                console.log(jsonData.username);
                },
                error: function(error) {
                console.log("Session not active")
                 }
                });
             }

        function viewPastOrders(){
            var jsonData = {
            "action" : "LOAD_ORDERS",
             }
            $.ajax({
                 url: "data/applicationLayer.php", 
                data : jsonData,
                dataType: "json",
                type: "POST",
                success: function (jsonData) {
                    console.log("Orders loaded correctly");

                    var newHTMLContent = ""; 

                 for (i = 0; i < jsonData.length; i++) {
                        newHTMLContent += "<p>" + jsonData[i].orders + "</p>";
                        
                    };

                    $("#oldOrders").append(newHTMLContent);

            
                },
                error: function (errorMsg) {
                console.log(errorMsg.statusText); 
        }
    });
        }
                

//Functionality of button used to send comments 

        $("#enterButton").click(function(){
                        
                        var comment = $("#leaveAComment").val();
                        var email = $("#leaveAMail").val();
                        var name = $("#leaveAName").val();
                        
                        if ($("#leaveAComment").val() === "") {
                                $("#error").html("Please leave a comment before sending!");
            
                        } 
                        else if ($("#leaveAMail").val() === ""){
                                $("#error").html("Please leave your email before sending!");
                        }
                        else if ($("#leaveAName").val() === ""){
                                $("#error").html("Please leave your name before sending!");
                        }
                        else 
                            checkSession();
                        
                       
                                                                
                });

        $("#logoutButton").on("click", function(){
                                            
                            var jsonData = {
                            "action": "LOGOUT",
                            };

                    $.ajax({
                    url : "data/applicationLayer.php",
                    type : "POST",
                    data : jsonData,
                    dataType : "json",
                    contentType : "application/x-www-form-urlencoded",
                    success : function(jsonData){
                        var userHeader = '<p>You have logged out!</p>';
                        $(".user").html(userHeader).show(1000);
                        
                    },
                    error : function(errorMessage) {
                        alert("Problem with logout");
                    }
                });                                                             
                });


            



        function checkSession(){
            var jsonData = {
            "action": "RETRIEVE_SESSION",
            }
            $.ajax({
                url: 'data/applicationLayer.php', 
                type: 'POST',
                data: jsonData,
                dataType: 'json',
                contentType : "application/x-www-form-urlencoded",
                success: function(jsonData){
                
               var comments = $('#leaveAComment').val();
                postComment(jsonData.username, comments, $("#leaveAMail").val());
                var userHeader = '<p>You are logged in as <strong>' + jsonData.username + '</strong></p>';
                $(".user").html(userHeader).show(1000);
                console.log("Comment Posted");
                },
                error: function(error) {
                $("#loginSection").show(500);
                console.log("Session not active")
                 }
                });
             }

        function postComment(username,comments,email){
            var jsonData = {
                "action": "POST_COMMENT",
                "email" : email,
                "username" : username,
                "comments" : comments
            };
            $.ajax({
                url: "data/applicationLayer.php",
                type: "POST",
                data: jsonData,
                datatype: "json",
                contentType : "application/x-www-form-urlencoded",
                    success : function(jsonData){

                        console.log("Comment posted");
                        
                    },
                    error : function(errorMessage) {
                        alert("Problem with posting comment");
                    }
                });
            
            
        }

        $("#loginMainButton"). on("click", function(){
        
            var jsonData = {
                            "action": "LOGINMAIN",
                            "username" : $("#user-login").val(),
                            "passwrd" : $("#passwrd-login").val()
                            };

                    $.ajax({
                    url : "data/applicationLayer.php",
                    type : "POST",
                    data : jsonData,
                    dataType : "json",
                    contentType : "application/x-www-form-urlencoded",
                    success : function(jsonData){
                        var userHeader = '<p>You are logged in as <strong>' + $("#user-login").val() + '</strong></p>';
                        $(".user").html(userHeader).show(1000);

                        if ($('#rememberMe').is(':checked')){
                            createCookie("username", $("#user-login").val());
                        }
                        
                    },
                    error : function(errorMessage) {
                        alert("Problem with login");
                    }
                });
            });

        function createCookie (cookieName,cookieValue){
            var jsonData ={
                "action" : "CREATE_COOKIE",
                "cookieName": cookieName,
                "cookieValue": cookieValue
            };

            $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(response) {
                console.log("Cookie Created");

            },
            error: function(error) {
                console.log(error);
            }
            });
        }

        function retrieveCookie(){
            var jsonData = {
                "action" : "RETRIEVE_COOKIE",
                "cookieName": "username"
            };

        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(response) {
                //Why does it not input the value if I don't put [0]?
                $("#user-login")[0].value = response;
                console.log("Cookie retrieved");
            },
            error: function(error) {
                console.log(error);
                alert("No cookie retrieved");
            }
            });

        }
    
        $("#loginButton"). on("click", function(){
            var jsonData = {
                            "action" : "LOGIN",
                            "username" : $("#userLogin").val(),
                            "passwrd" : $("#passwrdLogin").val(),
                            
                        }
                    $.ajax({
                    url : "data/applicationLayer.php",
                    type : "POST",
                    data : jsonData,
                    dataType : "json",
                    contentType : "application/x-www-form-urlencoded",
                    success : function(jsonData){
                        /*var userHeader = '<p>You are logged in as <strong>' + $("#user-login").val() + '</strong></p>';
                        $(".user").html(userHeader).show(1000);
                        $("#loginSection").hide();
                        checkSession(); */
                        alert("Login OKAY");             
                    },
                    error : function(errorMessage) {
                        alert("Problem with login");
                    }
                });
            });
        

        //Register Button and its functionality

        $("#registerButton").click(function(){

                        
                        if ($("#email-register").val() === ""){
                                $("#errorMessage").html("Please leave your email before sending!");
                        }
                        else if ($("#user-register").val() === ""){
                                $("#errorMessage").html("Please enter a valid username before sending!");
                        }
                        else if ($("#password-register").val() === ""){
                                $("#errorMessage").html("Please enter a valid password before sending!");
                        }
                        else {
                                var jsonArray = {
                                "user" : $("#user-register").val(),
                                "email" : $("#email-register").val(),
                                "passwrd" : $("#password-register").val(),
                                "action": "REGISTER_USER"
                                };
                                
                                

                        $.ajax({
                        type: "POST",
                        url: "data/applicationLayer.php",
                        data : jsonArray,
                        dataType : "json",
                        contentType : "application/x-www-form-urlencoded",
                        success: function(jsonArray) {
                            alert("Registered!");                           
                        },
                        error: function(errorMsg){
                            alert(errorMsg.statusText);
                        }

                        });
                    };

                        
                                                                
                });


//Comments Section using AJAX
   

       // Load previous comments

       function loadComments(){
       var jsonData = {
        "action" : "LOAD_COMMENTS",
       }
    $.ajax({
        url: "data/applicationLayer.php", 
        data : jsonData,
        dataType: "json",
        type: "POST",
        success: function (data) {
            console.log("Comments loaded correctly");

            var newHTMLContent = ""; 

             for (i = 0; i < data.length; i++) {
                        newHTMLContent += "<h4>Name: " + data[i].username + "</h4>";
                        newHTMLContent += "<p>said: " + "<em>" + data[i].comments + "</em></p>";
                        newHTMLContent += "<p>For more information, contact me @ " + data[i].email + "</p>";
                        
                    };

            $("#commentArchive").append(newHTMLContent);

            
        },
        error: function (errorMsg) {
            console.log(0);
        }
    });


}
});






