var _ = require('lodash');

var ACTION_LOGIN = "urn:NETGEAR-ROUTER:service:ParentalControl:1#Authenticate";
var ACTION_GET_ATTACHED_DEVICES = "urn:NETGEAR-ROUTER:service:DeviceInfo:1#GetAttachDevice";
var SESSION_ID = "A7D88AE69687E58D9A00";
var soapLogin = _.template('<?xml version="1.0" encoding="utf-8" ?>'+
    '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<SOAP-ENV:Header>'+
    '<SessionID xsi:type="xsd:string" xmlns:xsi="http://www.w3.org/1999/XMLSchema-instance"><%=session_id%></SessionID>'+
    '</SOAP-ENV:Header>'+
    '<SOAP-ENV:Body>'+
    '<Authenticate>'+
      '<NewUsername><%=username%></NewUsername>'+
        '<NewPassword><%=password%></NewPassword>'+
        '</Authenticate>'+
        '</SOAP-ENV:Body>'+
        '</SOAP-ENV:Envelope>');

var soapAttachedDevices = _.template('<?xml version="1.0" encoding="utf-8" standalone="no"?>'+
    '<SOAP-ENV:Envelope xmlns:SOAPSDK1="http://www.w3.org/2001/XMLSchema" xmlns:SOAPSDK2="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAPSDK3="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<SOAP-ENV:Header>'+
    '<SessionID><%=session_id%></SessionID>'+
    '</SOAP-ENV:Header>'+
    '<SOAP-ENV:Body>'+
    '<M1:GetAttachDevice xmlns:M1="urn:NETGEAR-ROUTER:service:DeviceInfo:1">'+
    '</M1:GetAttachDevice>'+
    '</SOAP-ENV:Body>'+
    '</SOAP-ENV:Envelope>');

var NetgearRouter = function(host, username, password){
  this.soap_url = "http://"+host+":5000/soap/server_sa/";
  this.username = username;
  this.password = password;
  this.loggedIn = false;
};

_.extend(NetgearRouter.prototype, {
  login: function(callback){
    var message = soapLogin({
      session_id: SESSION_ID,
        username: this.username||'admin',
        password: this.username||'password'
    });
    this.request({
      action: ACTION_LOGIN,
      message: message,
      tryLoginAfterFailure: false
    }, false);
  },
  getAttachedDevices: function(callback){
  },
  request: function(opt, callback){
    var headers = getSoapHeader(opt.action);
    request.post({
      url: this.soap_url,
      headers: headers,
      data: message
    }, function(err, response, body){

    });

  }
});

function getSoapHeader(action){
  return {'SOAPAction':action};
}

module.exports = NetgearRouter;
