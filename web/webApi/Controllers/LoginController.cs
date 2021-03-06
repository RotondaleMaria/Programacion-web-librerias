using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens; 
using webApi;
using Persistencia.Models;
using Persistencia;

namespace webApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]  
    
    
    public class LoginController:ControllerBase
    {

        private readonly LibreriaDbContext _context;
        private readonly IConfiguration _config;

        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost]
        [AllowAnonymous] 
        public IActionResult Login([FromBody]User login)
        {

            IActionResult response = Unauthorized();
            User user = AuthenticateUser(login);
            
            if (user != null)
            {
                var tokenString = GenerateJWTToken(user);
                response = Ok(new
                {
                    token = tokenString,
                    userDetails = user,
                });
            }
            return response;
        }

        private bool Autenticar(User login)
        {
            return true;
        }

        User AuthenticateUser(User loginCredentials)
        {
            //User user = appUsers.SingleOrDefault(x => x.UserName == loginCredentials.UserName && x.Password == loginCredentials.Password);
            //return user;
            loginCredentials.FullName="Rotondale Maria";
            loginCredentials.Password="";
            loginCredentials.UserRole="Admin";
            return loginCredentials;
        }

        private string GenerateJWTToken(User userInfo)
        {
            
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim("fullName", userInfo.FullName.ToString()),
                new Claim("role",userInfo.UserRole),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            //ISSUER: identifica el principal que emiti?? el JWT;
            //AUDIENCE: identifica a los destinatarios para los que est?? destinado el JWT. 
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

}