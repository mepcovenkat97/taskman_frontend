import React from "react";

 const PlaceHolder = React.lazy(() =>
   import("./components/Placeholder/placeholder")
 );

 const Workspace = React.lazy(() =>
   import("./components/Workspace/workspace")
 )

 const Project = React.lazy(()=>
   import("./components/Project/project")
 )

 const Team = React.lazy(() =>
  import("./components/Team/team")
)

const Task = React.lazy(() =>
  import("./components/Task/task")
)

const User = React.lazy(() =>
  import("./components/User/user")
)

const routes = [
  {
    path: "/dashboard",
    exact: true,
    name: "PlaceHolder",
    component: PlaceHolder
  },
  {
    path: "/dashboard/workspace",
    exact: true,
    name: "Workspace",
    component: Workspace
  },
  {
    path: "/dashboard/project",
    exact: true,
    name: "Project",
    component: Project
  },
  {
    path: "/dashboard/team",
    exact: true,
    name: "Team",
    component: Team
  },
  { 
    path: "/dashboard/task", 
    exact: true, 
    name: "Task", 
    component: Task 
  },
  {
    path: "/dashboard/user",
    exact: true,
    name: "User",
    component: User
  },
];

export default routes;
