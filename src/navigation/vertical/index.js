
export const primary = () => {
  return [
    {
      title: 'Projects',
      icon: 'bx:envelope',
      path: '/projects'
    },
    {
      title: 'Users',
      icon: 'bx:message',
      path: '/users'
    }
  ];
};


export const secondary = (id) => {
  return [
    {
      title: 'Back',
      icon: 'bx:envelope',
      path: '/projects'
    },
    {
      sectionTitle: 'Project Menues'
    },
    {
      title: 'Modules',
      icon: 'bx:envelope',
      path: `/projects/${id}/modules`
    },
    {
      title: 'Test Cases',
      icon: 'bx:envelope',
      path: `/projects/${id}/testcases`
    },
  ]
}
