import React from "react";

const PlaceHolder = "Hai";
// React.lazy(() =>
//   import("./components/Placeholder/placeholder")
// );
// const RoleManagement = React.lazy(() =>
//   import("./components/RoleManagement/rolemanagement")
// );
// const CommunityPost = React.lazy(() =>
//   import("./components/CommunityPost/communitypost")
// );
// const Youtube = React.lazy(() => import("./components/Youtube/youtube"));
// const UserManagement = React.lazy(() =>
//   import("./components/UserManagement/usermanagement")
// );
// const Banner = React.lazy(() => import("./components/Banner/banner"));
// const Profile = React.lazy(() => import("./components/Profile/profile"));

const routes = [
  {
    path: "/dashboard",
    exact: true,
    name: "PlaceHolder",
    component: PlaceHolder
  },
//   {
//     path: "/dashboard/rolemanagement",
//     exact: true,
//     name: "RoleManagement",
//     component: RoleManagement
//   },
//   {
//     path: "/dashboard/communitypost",
//     exact: true,
//     name: "CommunityPost",
//     component: CommunityPost
//   },
//   { 
//     path: "/dashboard/banner", 
//     exact: true, 
//     name: "Banner", 
//     component: Banner 
//   },
//   {
//     path: "/dashboard/youtube",
//     exact: true,
//     name: "Youtube",
//     component: Youtube
//   },
//   {
//     path: "/dashboard/usermanagement",
//     exact: true,
//     name: "UserManagement",
//     component: UserManagement
//   },
//   {
//     path: "/dashboard/profile",
//     exact: true,
//     name: "Profile",
//     component: Profile
//   }
];

export default routes;