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
    stagger,
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

            group([
                query(':leave', [
                    animate('0.5s ease-in', style({ opacity: 0 }))
                ]),
                query(':enter', [style({ opacity: 0 }), sequence([
                    animate('0.8s 0.5s ease-out', style({ opacity: 1 }))
                ])])
            ]),

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
            group([
                query(':leave', [
                    animate('0.5s ease-in', style({  opacity: 0 }))
                ]),
                query(':enter', [style({ opacity: 0 }), sequence([
                    animate('0.8s 0.5s ease-out', style({  opacity: 1 }))
                ])])
            ]),
            query(':enter', animateChild()),
        ])
    ]);
