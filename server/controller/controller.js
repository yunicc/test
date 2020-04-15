/**
 * Module Dependencies
 */
const service = require('../service/service')

/**
 * API
 */
const Controller = {};

/**
 * register controller middleware
 * 
 * static method
 * 
 * @param {Koa.ctx} ctx
 */
Controller.register = async function(ctx) {	//koa注册
	if (ctx.session.authenticated) return ctx.status = 403;
	let { username, password, nickname } = ctx.request.body;
	if (!service.register(username, password, nickname))	//调用注册函数
		return ctx.status = 400;
	ctx.status = 200;
};

/**
 * login controller middleware
 * 
 * static method
 * 
 * @param {Koa.ctx} ctx
 */
Controller.login = async function(ctx) {
	if (ctx.session.authenticated) return ctx.status = 403;
	let { username, password, nickname } = ctx.request.body;
	if (!service.login(username, password))	//调用登录函数
		return ctx.status = 400;
	ctx.status = 200;
	ctx.session.authenticated = true;
};

/**
 * logout controller middleware
 * 
 * static method
 * 
 * @param {Koa.ctx} ctx
 */
Controller.logout = async function(ctx) {
	ctx.session.authenticated = false;
	return ctx.status = 200;
};

module.exports = Controller;