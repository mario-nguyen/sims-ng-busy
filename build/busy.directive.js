"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subscription_1 = require("rxjs/Subscription");
var busy_helper_1 = require("./busy-helper");
var promise_tracker_service_1 = require("./promise-tracker.service");
var busy_service_1 = require("./busy.service");
var busy_component_1 = require("./busy.component");
var busy_backdrop_component_1 = require("./busy-backdrop.component");
/**
 * ### Syntax
 *
 * - `<div [simsBusy]="busy">...</div>`
 * - `<div [simsBusy]="[busyA, busyB, busyC]">...</div>`
 * - `<div [simsBusy]="{busy: busy, message: 'Loading...',
 *                    backdrop: false, delay: 200, minDuration: 600}">...</div>`
 */
var BusyDirective = (function () {
    function BusyDirective(service, tracker, cfResolver, vcRef, injector) {
        this.service = service;
        this.tracker = tracker;
        this.cfResolver = cfResolver;
        this.vcRef = vcRef;
        this.injector = injector;
    }
    BusyDirective.prototype.ngDoCheck = function () {
        var simsBusy = this.simsBusyNorm = this.normalizesimsBusy(this.simsBusy);
        if (!this.dectectsimsBusyChange()) {
            return;
        }
        if (this.busyRef) {
            this.busyRef.instance.message = simsBusy.message;
        }
        if (!busy_helper_1.isEquivalent(simsBusy.busy, this.tracker.promiseList)) {
            this.tracker.reset({
                promiseList: simsBusy.busy,
                delay: simsBusy.delay,
                minDuration: simsBusy.minDuration
            });
        }
        if (!this.busyRef
            || this.template !== simsBusy.template
            || this.backdrop !== simsBusy.backdrop) {
            this.destroyComponents();
            this.template = simsBusy.template;
            this.backdrop = simsBusy.backdrop;
            if (simsBusy.backdrop) {
                this.createBackdrop();
            }
            this.createBusy();
        }
    };
    BusyDirective.prototype.ngOnDestroy = function () {
        this.destroyComponents();
    };
    BusyDirective.prototype.normalizesimsBusy = function (simsBusy) {
        if (!simsBusy) {
            simsBusy = { busy: null };
        }
        else if (Array.isArray(simsBusy)
            || simsBusy instanceof Promise
            || simsBusy instanceof Subscription_1.Subscription) {
            simsBusy = { busy: simsBusy };
        }
        simsBusy = Object.assign({}, this.service.config, simsBusy);
        if (!Array.isArray(simsBusy.busy)) {
            simsBusy.busy = [simsBusy.busy];
        }
        return simsBusy;
    };
    BusyDirective.prototype.dectectsimsBusyChange = function () {
        if (busy_helper_1.isEquivalent(this.simsBusyNorm, this.simsBusyRecord)) {
            return false;
        }
        this.simsBusyRecord = this.simsBusyNorm;
        return true;
    };
    BusyDirective.prototype.destroyComponents = function () {
        if (this.busyRef) {
            this.busyRef.destroy();
        }
        if (this.backdropRef) {
            this.backdropRef.destroy();
        }
    };
    BusyDirective.prototype.createBackdrop = function () {
        var backdropFactory = this.cfResolver.resolveComponentFactory(busy_backdrop_component_1.BusyBackdropComponent);
        this.backdropRef = this.vcRef.createComponent(backdropFactory, null, this.injector);
    };
    BusyDirective.prototype.createBusy = function () {
        var busyFactory = this.cfResolver.resolveComponentFactory(busy_component_1.BusyComponent);
        this.busyRef = this.vcRef.createComponent(busyFactory, null, this.injector);
        var _a = this.simsBusyNorm, message = _a.message, wrapperClass = _a.wrapperClass, template = _a.template;
        var instance = this.busyRef.instance;
        instance.message = message;
        instance.wrapperClass = wrapperClass;
        instance.template = template;
    };
    return BusyDirective;
}());
BusyDirective.decorators = [
    { type: core_1.Directive, args: [{
                selector: '[simsBusy]',
                providers: [promise_tracker_service_1.PromiseTrackerService]
            },] },
];
/** @nocollapse */
BusyDirective.ctorParameters = function () { return [
    { type: busy_service_1.BusyService, },
    { type: promise_tracker_service_1.PromiseTrackerService, },
    { type: core_1.ComponentFactoryResolver, },
    { type: core_1.ViewContainerRef, },
    { type: core_1.Injector, },
]; };
BusyDirective.propDecorators = {
    'simsBusy': [{ type: core_1.Input },],
};
exports.BusyDirective = BusyDirective;
//# sourceMappingURL=busy.directive.js.map