import { getCookie } from 'cookies-next';

export const primary = () => {
  return [
    {
      title: 'Projects',
      icon: 'bx:food-menu',
      path: '/projects'
    },
    {
      title: 'Users',
      icon: 'bx:user',
      path: '/users'
    }
  ];
};


export const secondary = (id) => {
  return [
    {
      title: 'Back',
      icon: 'bx-arrow-back',
      path: '/'
    },
    {
      sectionTitle: getCookie("project-title") ?getCookie("project-title") : "Project Menus"
    },
    {
      title: 'Modules',
      icon: 'bx-transfer-alt',
      path: `/projects/${id}/modules`
    },
    {
      title: 'Test Cases',
      icon: 'bx-code-block',
      path: `/projects/${id}/testcases`
    },
    {
      title: 'Test Plan',
      icon: 'bx-task',
      path: `/projects/${id}/testplans`
    },
  ]
}
