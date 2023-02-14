"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
	if (typeof executor !== "function") throw new TypeError("Executor fuctin");
	this._state === "pending";
	executor(this._internalResolve.bind(this), this._internalReject.bind(this));
	this._handlerGroups = [];
}

$Promise.prototype._internalResolve = function (value) {
	if (this._state === "pending") {
		this._state = "fullfilled";
		this._value = value;
		this._callHandlers();
	}
};
$Promise.prototype._internalReject = function (value) {
	if (this._state === "pending") {
		this._state = "rejected";
		this._value = value;
		this._callHandlers();
	}
};

$Promise.prototype._callHandlers = function () {
	while (this._handlerGroups.length) {
		let current = this._handlerGroups.shift();
		if (this._state === "fullfiled") {
			if (!current.successCb) {
				current.downstreamPromise._internalResolve(this._value);
			} else {
				let result = current.successCb(this._value);
				try {
					if (result instanceof $Promise) {
						result.then((value) =>
							current.downstreamPromise._internalResolve(value)
						);
						(err) => current.downstreamPromise._internalReject(err);
					} else {
						current.downstreamPromise._internalResolve(result);
					}
				} catch (error) {
					current.downstreamPromise._internalReject(error);
				}
			}
		} else if (this._state === "rejected") {
			//cb.errorCb && cb.errorCb(this._value);
			if (!current.errorCb) {
				current.downstreamPromise._internalResolve(this._value);
			} else {
				let result = current.downstreamPromise.errorCb(this._value);
				try {
					if (result instanceof $Promise) {
						result.then(
							(value) => current.downstreamPromise._internalResolve(value),
							(err) => current.downstreamPromise._internalReject(err)
						);
					} else {
						current.downstreamPromise._internalResolve(result);
					}
				} catch (error) {
					current.downstreamPromise._internalReject(error);
				}
			}
		}
	}
};

$Promise.prototype.then = function (successCb, errorCb) {
	if (typeof successCb !== "function") successCb = false;
	if (typeof errorCb !== "function") errorCb = false;
	const downstreamPromise = new $Promise(function () {});
	this._handlerGroup.push({ successCb, errorCb });
	if (this._state !== "pending") this._callHandlers();
	return downstreamPromise;
};

$Promise.prototype.catch = function (errorCb) {
	return this.then(null, errorCb);
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
