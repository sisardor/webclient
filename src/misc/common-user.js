// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-example-user-management
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var config = require('../../server/config.json');
var path = require('path');
var Recaptcha = require('express-recaptcha');
var recaptcha = new Recaptcha('6LdM3zkUAAAAAJ3MkNFmbXPcVg47p_t-Yv8lW5I2', '6LdM3zkUAAAAAL1d8fzWMiEoSBA7iwFgxIc-2Fmp');

var param = "g-recaptcha-response"
module.exports = function(User) {
  User.remoteMethod('customCreate', {
    description: [
      'A custom update Entity remote method.',
      'We use custom remotes so we can *reliably* access request data.',
      'Why? because getCurrentContext() is broken.',
      'See https://github.com/hydraulx/mavis/issues/93'
    ],
    accepts: [
      {
        arg: 'data', type: 'User',
        description: 'CustomUpdate model instance data',
        http: {source: 'body'}
      },
      {
        arg: 'ctx', type: 'object',
        description: 'context',
        required: false,
        http: { source: 'context' }
      }
    ],
    returns: { arg: 'data', type: 'object', root: true },
    // Override default update path: '/:id'
    http:{ verb: 'post', path: '/' }
  })
  User.disableRemoteMethodByName('create')
  User.customCreate = function (data, ctx, callback) {
    console.log(data);
    recaptcha.verify(ctx.req, function(error, data){
        if(error)
            return callback(error)
        else
            return callback(null, data)
    });
  }

  User.observe('before save', function (ctx, next) {
      console.log(ctx)
    try {
      if (!ctx.instance.hasOwnProperty(param) ||
      ctx.instance[param] === undefined ||
      ctx.instance[param] === null ||
      ctx.instance[param] === ''
      ) {
        throw {
          name: 'Access token error',
          message: 'Recaptcha note selected.',
          status: 401,
          statusCode: 401
        }
      }
      // else {
      //   recaptcha.verify(req, function(error, data){
      //       if(!error)
      //           //success code
      //       else
      //           //error code
      //   });
      // }
    } catch (e) {
      return next(e)
    } finally {

    }
    next()
  })
  //send verification email after registration
  User.afterRemote('create', function(context, user, next) {
    var options = {
      type: 'email',
      to: user.email,
      from: 'admin@atomex.io',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: '/verified',
      user: user
    };

    user.verify(options, function(err, response) {
      if (err) {
        User.deleteById(user.id);
        return next(err);
      }
      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' +
            'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });

  // Method to render
  User.afterRemote('prototype.verify', function(context, user, next) {
    context.res.render('response', {
      title: 'A Link to reverify your identity has been sent '+
        'to your email successfully',
      content: 'Please check your email and click on the verification link '+
        'before logging in',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  //send password reset link when requested
  User.on('resetPasswordRequest', function(info) {
    var url = 'http://' + config.host + ':' + config.port + '/reset-password';
    var html = 'Click <a href="' + url + '?access_token=' +
        info.accessToken.id + '">here</a> to reset your password';

    User.app.models.Email.send({
      to: info.email,
      from: 'noreply@atomex.io',
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email', err);
      console.log('> sending password reset email to:', info.email);
    });
  });

  //render UI page after password change
  User.afterRemote('changePassword', function(context, user, next) {
    context.res.render('response', {
      title: 'Password changed successfully',
      content: 'Please login again with new password',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });

  //render UI page after password reset
  User.afterRemote('setPassword', function(context, user, next) {
    context.res.render('response', {
      title: 'Password reset success',
      content: 'Your password has been reset successfully',
      redirectTo: '/',
      redirectToLinkText: 'Log in'
    });
  });
};

// {
//       "principalType": "ROLE",
//       "property": "customCreate",
//       "principalId": "$everyone",
//       "accessType": "EXECUTE",
//       "permission": "ALLOW"
//     }
