var ConfigMixin = {
	utils : function(){
		var clientId = "";
		var auth_token = "";
		function url(){
		 var BASE_URL = "https://dev.thrillophilia.com/api/v1/";
			return {
				"CREATE_ACCOUNT": BASE_URL+"suppliers/sign_up",
		        "LOGIN": BASE_URL+"suppliers/sign_in",
		        "SEND_RESET_PASSWORD_EMAIL": BASE_URL+"suppliers/password",
		        "RESET_PASSWORD": BASE_URL+"suppliers/profile/change_password",
		        "DASHBOARD": BASE_URL+"suppliers/dashboard?",
		        //"BOOKINGS_LIST": BASE_URL+"suppliers/bookings?",
		        "BOOKINGS_LIST": "./../data/bookings.json?",   
		        "BOOKINGS_DETAILS": "./../data/bookingDetails.json?",    //BOOKINGS_DETAILS": BASE_URL+"suppliers/bookings/"
		       // "PROFILE": BASE_URL+"suppliers/profile"
		        "PROFILE":  "./../data/profile.json"  ,
		        "LISTING": "./../data/listing.json?",
		        "LISTING_DETAILS": "./../data/listingDetails.json?"    

			}
		}
		function httpInterceptor(url, methodType, bodyParams, headers={}, urlParams={}){
			//setClientInfo();
			var params = (!$.isEmptyObject(urlParams)) ? $.param(urlParams): "";
			console.log(params);
			if($.isEmptyObject(headers)){
				var beforesend = function(){};
			}else{
				console.log(headers);
				var beforesend = function(request)
			            {
			                request.setRequestHeader(headers[0][0], headers[0][1]);
			                request.setRequestHeader(headers[1][0], headers[1][1]);
			                request.setRequestHeader("Access-Control-Allow-Origin", "*");
			                
                        }
			}
			var promise = new Promise(function(resolve, reject)  {
				$.ajax({type: methodType, url: url+params, data: bodyParams,
					headers: headers,
					
					   success: function (result) {
	                        //self.props.route.notification._addNotification(e, "success", "Successfully registered !!!");
	                        //window.location.href="/#/thank-you";
				            resolve(result);
				        },error: function(result){
				          //console.log(result.responseText);
				          //let message = JSON.parse(result.responseText);
				          //self.props.route.notification._addNotification(e, "error", message.message);
				          reject(result);
				        }}); 
				});
			return promise;
		}
		function redirectWithoutSession(){
			if(!localStorage.getItem("clientInfo")){
				window.location.href = "/#/";
			}
			
		}
		
		function getClientInfo(){
			
			return {
				"client_id": JSON.parse(localStorage.getItem("clientInfo")).client.client_id,
				"auth_token": JSON.parse(localStorage.getItem("clientInfo")).client.authentication_token
			}
		}
		return {
			url: url,
			httpInterceptor: httpInterceptor,
			redirectWithoutSession: redirectWithoutSession,
			getClientInfo: getClientInfo
		}
	}
}