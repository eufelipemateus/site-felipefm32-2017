/**
 * ContatoController
 *
 * @description :: Server-side logic for managing contatoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 
 

module.exports = {
	
	index:function(req, res) {
		Recaptcha = require('recaptcha-v2').Recaptcha;
		var recaptcha = new Recaptcha(process.env.RECAPTCHA_PUBLIC_KEY, process.env.RECAPTCHA_PRIVATE_KEY);
				
		return res.view("contato",{title:"Contate Me",captcha:recaptcha.toHTML()})
	},
	
	send: function(req, res) {
		Recaptcha = require('recaptcha-v2').Recaptcha;

		var data = {};
		data.name = req.param("name");
		data.fone = req.param("fone");
		data.email = req.param("email");
		data.message = req.param("message");
		let success=false;
		let message=null;
   
		var data_recapctcha = {
			remoteip:  req.connection.remoteAddress,
			response:  req.param("g-recaptcha-response"),
			secret: process.env.RECAPTCHA_PRIVATE_KEY
		};
		
		var recaptcha = new Recaptcha(process.env.RECAPTCHA_PUBLIC_KEY, process.env.RECAPTCHA_PRIVATE_KEY, data_recapctcha);

		recaptcha.verify(function(captcha_success, error_code) {
   
			if(!captcha_success){
				message = "Erro no Captcha!";
			}else if (!data.name.trim()) {
				message = "Nome esta vazio!";
			}else if(!data.fone.trim()){
				message = "Telefone esta vazio!";	  
			}else if(!data.email.trim()){
				message = "Email esta vazio!";
			}else if(!data.message.trim()){
				message = "Menssagem esta vazio!";	  
			}else{
				success=true;
				message="Menssagem Recebida";
				
				
				
				EmailService.sendEmail({
						from: data.email,
						to: "contato@felipefm32.com.br",
						subject: `Messagem de "${data.name}" `,
						html: ` Name: ${data.name} \n  Telefone: ${data.fone} \n\n  Messagem: ${data.message}    ` ,
					  }, function(err, reply) {
						console.log(err && err.stack);
						console.dir(reply);
				});
				
				
				
				EmailService.sendEmail ({
						from: "noreply@fm32.com.br" ,
						to: data.email ,
						subject: "Resposta Automatica",
						html: `Sua menssagem foi enviada aguarde pois em breve estarei respondendo.\n\n Atenciosamente, Felipe Mateus` ,
					  }, function(err, reply) {
						console.log(err && err.stack);
						console.dir(reply);
				});
				
				
			}

			Recaptcha = require('recaptcha-v2').Recaptcha;
			var recaptcha = new Recaptcha(process.env.RECAPTCHA_PUBLIC_KEY, process.env.RECAPTCHA_PRIVATE_KEY);
		
		return res.view("contato",{title:"Contate Me",success,message,data,captcha:recaptcha.toHTML()});
			
		});
		
		
	},
};

