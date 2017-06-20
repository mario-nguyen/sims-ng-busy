import {
    Directive,
    Component,
    Input,
    DoCheck,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    OnDestroy,
    Injector
} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import { isEquivalent } from './busy-helper';
import { PromiseTrackerService } from './promise-tracker.service';
import { BusyService } from './busy.service';
import { IBusyConfig } from './busy-config';
import { BusyComponent } from './busy.component';
import { BusyBackdropComponent } from './busy-backdrop.component';

/**
 * ### Syntax
 *
 * - `<div [simsBusy]="busy">...</div>`
 * - `<div [simsBusy]="[busyA, busyB, busyC]">...</div>`
 * - `<div [simsBusy]="{busy: busy, message: 'Loading...',
 *                    backdrop: false, delay: 200, minDuration: 600}">...</div>`
 */
@Directive({
    selector: '[simsBusy]',
    providers: [PromiseTrackerService]
})
export class BusyDirective implements DoCheck, OnDestroy {

    @Input() simsBusy: any;

    template: string;
    backdrop: boolean;
    private simsBusyRecord: any;
    private simsBusyNorm: IBusyConfig;
    private busyRef: ComponentRef<BusyComponent>;
    private backdropRef: ComponentRef<BusyBackdropComponent>;

    constructor(
        private service: BusyService,
        private tracker: PromiseTrackerService,
        private cfResolver: ComponentFactoryResolver,
        private vcRef: ViewContainerRef,
        private injector: Injector
    ) {
    }

    ngDoCheck() {
        const simsBusy = this.simsBusyNorm = this.normalizesimsBusy(this.simsBusy);

        if (!this.dectectsimsBusyChange()) {
            return;
        }

        if (this.busyRef) {
            this.busyRef.instance.message = simsBusy.message;
        }

        if (!isEquivalent(simsBusy.busy, this.tracker.promiseList)) {
            this.tracker.reset({
                promiseList: simsBusy.busy,
                delay: simsBusy.delay,
                minDuration: simsBusy.minDuration
            });
        }

        if (!this.busyRef
            || this.template !== simsBusy.template
            || this.backdrop !== simsBusy.backdrop
        ) {
            this.destroyComponents();

            this.template = simsBusy.template;
            this.backdrop = simsBusy.backdrop;

            if (simsBusy.backdrop) {
              this.createBackdrop();
            }

            this.createBusy();
        }
    }

    ngOnDestroy() {
        this.destroyComponents();
    }

    private normalizesimsBusy(simsBusy: any) {
        if (!simsBusy) {
            simsBusy = {busy: null};
        }else if (Array.isArray(simsBusy)
            || simsBusy instanceof Promise
            || simsBusy instanceof Subscription
        ) {
            simsBusy = {busy: simsBusy};
        }
        simsBusy = Object.assign({}, this.service.config, simsBusy);
        if (!Array.isArray(simsBusy.busy)) {
            simsBusy.busy = [simsBusy.busy];
        }

        return simsBusy;
    }

    private dectectsimsBusyChange() {
        if (isEquivalent(this.simsBusyNorm, this.simsBusyRecord)) {
            return false;
        }
        this.simsBusyRecord = this.simsBusyNorm;
        return true;
    }

    private destroyComponents() {
        if (this.busyRef) {
          this.busyRef.destroy();
        }
        if (this.backdropRef) {
          this.backdropRef.destroy();
        }
    }

    private createBackdrop() {
        const backdropFactory = this.cfResolver.resolveComponentFactory(BusyBackdropComponent);
        this.backdropRef = this.vcRef.createComponent(backdropFactory, null, this.injector);
    }

    private createBusy() {
        const busyFactory = this.cfResolver.resolveComponentFactory(BusyComponent);
        this.busyRef = this.vcRef.createComponent(busyFactory, null, this.injector);

        const {message, wrapperClass, template} = this.simsBusyNorm;
        const instance = this.busyRef.instance;
        instance.message = message;
        instance.wrapperClass = wrapperClass;
        instance.template = template;
    }
}
