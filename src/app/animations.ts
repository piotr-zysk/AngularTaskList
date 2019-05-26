import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
    animateChild,
    group,
    sequence,
    // ...
} from '@angular/animations';


export const RouterAnimation =
    trigger('routeAnimations', [
        transition('WelcomePage <=> TaskListPage', [
            style({ position: 'relative' }),
            query(':leave, :enter', [
                style({
                    position: 'absolute',
                    width: '100%',
                })
            ]),

            query(':leave', animateChild()),
            sequence([
                query(':leave', [
                    animate('0.5s ease-in', style({ opacity: 0 }))
                ]),
                query(':enter', [
                    animate('0.5s ease-out', style({ opacity: 1 }))
                ])
            ]),
            query(':enter', animateChild()),
        ]),
        transition('* <=> TaskListPage', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    width: '100%'
                })
            ]),
            query(':leave', animateChild()),
            sequence([
                query(':leave', [
                    animate('900ms ease-in', style({  opacity: 0 }))
                ]),
                query(':enter', [
                    animate('900ms ease-out', style({  opacity: 1 }))
                ])
            ]),
            query(':enter', animateChild()),
        ])
    ]);
