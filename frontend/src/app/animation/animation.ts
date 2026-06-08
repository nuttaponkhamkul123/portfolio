import { trigger, transition, style, animate, state } from '@angular/animations';
export const enterAnimation = trigger(
  'enterAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('500ms', style({ opacity: 0 }))
  ])])


export const fadeAfterDelay = trigger('fadeAfterDelay', [
  // Define the initial state (hidden)
  state('hidden', style({
    opacity: 0
  })),
  // Define the visible state
  state('visible', style({
    opacity: 1
  })),
  // Define the transition from hidden to visible
  transition('hidden => visible', [
    // Use a delay in the animate function
    animate('1s ease-in-out') // duration delay easing
  ]),

])
