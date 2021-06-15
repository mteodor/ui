
local opts = {
 -- the full redirect URI must be protected by this script
   -- if the URI starts with a / the full redirect URI becomes
   -- ngx.var.scheme.."://"..ngx.var.http_host..opts.redirect_uri
   -- unless the scheme was overridden using opts.redirect_uri_scheme or an X-Forwarded-Proto header in the incoming request
   redirect_uri_path = "/tokens/redirect_uri",
   accept_none_alg = true,
   discovery = "http://172.18.0.30:8080/auth/realms/master/.well-known/openid-configuration",
   client_id = "openresty",
   client_secret = "85740c02-124a-4160-97cf-a63df08ce525",
   token_endpoint_auth_method = "client_secret_post",
   scope = "openid email profile",
   introspection_endpoint = "http://172.18.0.30:8080/auth/realms/master/protocol/openid-connect/token/introspect",
   introspection_endpoint_auth_method = "client_secret_post",
   redirect_uri_scheme = "http",
   logout_path = "/logout",
   redirect_after_logout_uri = "http://172.18.0.30:8080/auth/realms/master/protocol/openid-connect/logout?redirect_uri=http://www.example.com/",
   redirect_after_logout_with_id_token_hint = false,
}   

-- call introspect for OAuth 2.0 Bearer Access Token validation
ngx.log(ngx.ERR, "URI:", ngx.var.request_uri)
local res, err = require("resty.openidc").authenticate(opts)
local cjson = require("cjson")
local payload = cjson.encode(res)
ngx.var.access_token = res.access_token


if err then
  ngx.status = 403
  ngx.say(err)
  ngx.exit(ngx.HTTP_FORBIDDEN)
end

ngx.req.set_header("X-WEBAUTH-USER", res.email)
ngx.req.set_header("Authorization", res.access_token)




