import { DoCheck, ViewContainerRef, ComponentFactoryResolver, OnDestroy, Injector } from '@angular/core';
import { PromiseTrackerService } from './promise-tracker.service';
import { BusyService } from './busy.service';
/**
 * ### Syntax
 *
 * - `<div [simsBusy]="busy">...</div>`
 * - `<div [simsBusy]="[busyA, busyB, busyC]">...</div>`
 * - `<div [simsBusy]="{busy: busy, message: 'Loading...',
 *                    backdrop: false, delay: 200, minDuration: 600}">...</div>`
 */
export declare class BusyDirective implements DoCheck, OnDestroy {
    private service;
    private tracker;
    private cfResolver;
    private vcRef;
    private injector;
    simsBusy: any;
    template: string;
    backdrop: boolean;
    private simsBusyRecord;
    private simsBusyNorm;
    private busyRef;
    private backdropRef;
    constructor(service: BusyService, tracker: PromiseTrackerService, cfResolver: ComponentFactoryResolver, vcRef: ViewContainerRef, injector: Injector);
    ngDoCheck(): void;
    ngOnDestroy(): void;
    private normalizesimsBusy(simsBusy);
    private dectectsimsBusyChange();
    private destroyComponents();
    private createBackdrop();
    private createBusy();
}
