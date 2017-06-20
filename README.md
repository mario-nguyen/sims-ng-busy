# Busy Indicator

## Getting Started

Import the BusyModule in your root application module or sub module:

In the root application module, you can do this:

```js
import {BusyModule, BusyConfig} from './shared/busy/busy.module';
 
@NgModule({
    imports: [
    	// ...
        BusyModule.forRoot(
        	new BusyConfig({
            	message: 'Don\'t panic!',
                backdrop: false,
                template: '<div>{{message}}</div>',
                delay: 200,
                minDuration: 600
            })
        )
    ],
    // ...
})
export class AppModule
```

In sub-module, you can do this:

```js
import { BusyModule } from '../shared/busy/busy.module';

@NgModule({
  imports: [
  	// ...
    BusyModule
  ],
  //...
})
```

Reference your subscription (of an Observable) in the simsBusy directive:

```js
// ...
import {Subscription} from 'rxjs';
 
// ...
class SomeComponent implements OnInit {
    busy: Subscription;
 
    // ...
 
    ngOnInit() {
        this.busy = this.http.get('...').subscribe();
    }
}
```

## Directive Syntax

The simsBusy directive expects a busy thing, which means:

- An Observable's subscription or a promise
- Or an array of them
- Or a configuration object

In other words, you may use flexible syntax:

```html
<!-- Simple syntax -->
<div [simsBusy]="busy"></div>
```

```html
<!-- Collection syntax -->
<div [simsBusy]="[busyA, busyB, busyC]"></div>
```

```html
<!-- Advanced syntax -->
<div [simsBusy]="{busy: busy, message: 'Loading...', backdrop: false, delay: 200, minDuration: 600}"></div>
```

## Options

* `promise` - Required. _The promise (or array of promises) that will cause the busy indicator to show._
* `message` - Optional.  Defaults to 'Please Wait...'.  _The message to show in the indicator.  This value may be updated while the promise is active.  The indicator will reflect the updated values as they're changed._
* `backdrop` - Optional. Boolean, default is true. _If true a faded backdrop will be shown behind the progress indicator._
* `templateUrl` - Optional.  _If provided, the given template will be shown in place of the default progress indicatory template._
* `delay` - Optional.  _The amount of time to wait until showing the indicator.  Defaults to 0.  Specified in milliseconds._
* `minDuration` - Optional.  _The amount of time to keep the indicator showing even if the promise was resolved quicker.  Defaults to 0.  Specified in milliseconds._