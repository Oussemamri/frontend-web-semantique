import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Dashboard',
        isTitle: true
    },
    {
        id: 1,
        label: 'Users',
        icon: 'bx-home-circle',
    },
    {
        id: 2,
        label: 'Garden',
        icon: 'bx-home-circle',
        link:'gardens'
    },
    {
        id: 8,
        label: 'Plants',
        icon: 'bx-home-circle',
        link:'plants'
    },
    {
        id: 9,
        label: 'Events',
        icon: 'bx-home-circle',
        link: '/events'
    },
    {
        id: 10,
        label: 'Sponsors',
        icon: 'bx-calendar',
        link: '/sponsors'
    },
    {
        id: 11,
        label: 'Tutorials',
        icon: 'bx-chat',
        link:'listTutorial',
    },
    {
        id: 12,
        label: 'Experts',
        icon: 'bx-file',
        link:'listExpert',
        
    },
    {
        id: 13, 
        label: 'Resources',
        icon: 'bx-file',
        link: '/resource-reservation/resources',

        
    },
    {
        id: 14, 
        label: 'Reservations',
        icon: 'bx-file',
        link: '/resource-reservation/reservations',

       
    },
    {
        id: 15, 
        label: 'Posts',
        icon: 'bx-file',
       link: '/posts-comments/posts',
    },
    {
        id: 16, 
        label: 'Comments',
        icon: 'bx-file',
        link: '/posts-comments/comments',
    },

//     {
//         id: 14, 
//         label: 'Reservations',
//         icon: 'bx-file',
//         link: '/filemanager',
//     },
];
