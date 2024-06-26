let routes = [
    {
      element: <App />,
      path: "/",
      children: [
        { index: true, element: <Home />,},
        { path: "teams", element: <Teams />,
          children: [
            { index: true, element: <LeagueStandings />},
            { path: ":teamId", element: <Team />},
            { path: ":teamId/edit", element: <EditTeam />},
            { path: "new", element: <NewTeamForm />}],
        },
      ],
    },
    {
      element: <PageLayout />,
      children: [
        { element: <Privacy />, path: "/privacy"},
        { element: <Tos />, path: "/tos",}],
    },
    { element: <Contact />, path: "/contact-us",},
  ];