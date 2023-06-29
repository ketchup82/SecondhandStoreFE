import { createBrowserRouter } from "react-router-dom";
import { Auth } from "../screens/auth/Auth";
import { SignUp } from "../screens/auth/components/SignUp";
import { SignIn } from "../screens/auth/components/SignIn";
import { RecoveryRequest } from "../screens/auth/components/RecoverRequest";
import { RecoveryNotify } from "../screens/auth/components/RecoverNotify";
import { UserHome } from "../screens/common/components/Home";
import { Admin } from "../screens/admin/Admin";
import { Deactive } from "../screens/admin/components/Deactive";
import { AdminHome } from "../screens/admin/components/AdminHome";
import { PostListManagement } from "../screens/admin/components/PostListManagement";
import { PostVerification } from "../screens/admin/components/PostVerification";
import { ReportForm } from "../screens/admin/components/ReportForm";
import { ReportList } from "../screens/admin/components/ReportList";
import { RevenueManagement } from "../screens/admin/components/RevenueManagement";
import { UserManagement } from "../screens/admin/components/UserManagement";
import { UserProfile } from "../screens/admin/components/UserProfile";
import { AdminProduct } from "../screens/common/components/Product";








export const appRouter = createBrowserRouter([
    {
        path: '/home',
        element: <UserHome/>
    },
    {
        path: '/product',
        element: <AdminProduct/>
    },
    {
        path: "/auth",
        element: <Auth/>,
        children: [
            {
                path: "register",
                element: <SignUp/>
            },
            {
                path: "login",
                element: <SignIn/>
            },
            {
                path: "recovery-request",
                element: <RecoveryRequest/>
            },
            {
                path: "recovery-notify",
                element: <RecoveryNotify/>
            }
        ]
    },
    {
        path: "/admin",
        element: <Admin/>,
        children: [
            {
                path: "deactive",
                element: <Deactive/>
            },
            {
                path: "admin-home",
                element: <AdminHome/>
            },
            {
                path: "post-list",
                element: <PostListManagement/>
            },
            {
                path: "post-verify",
                element: <PostVerification/>
            },
            {
                path: "report",
                element: <ReportForm/>
            },
            {
                path: "report-list",
                element: <ReportList/>
            },
            {
                path: "revenue",
                element: <RevenueManagement/>
            },
            {
                path: "user-management",
                element: <UserManagement/>
            },
            {
                path: "user-view",
                element: <UserProfile/>
            },
        ]
    }

    
])
