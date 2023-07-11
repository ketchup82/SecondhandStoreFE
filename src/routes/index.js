import { createBrowserRouter } from "react-router-dom";
import { Auth } from "../screens/auth/Auth";
import { SignUp } from "../screens/auth/components/SignUp";
import { SignIn } from "../screens/auth/components/SignIn";
import { RecoveryRequest } from "../screens/auth/components/RecoverRequest";
import { RecoveryNotify } from "../screens/auth/components/RecoverNotify";

import { Admin } from "../screens/admin/Admin";
import { Deactive } from "../screens/admin/components/Deactive";
import { AdminHome } from "../screens/admin/components/AdminHome";
import { PostVerification } from "../screens/admin/components/PostVerification";
import { ReportForm } from "../screens/admin/components/ReportForm";
import { ReportList } from "../screens/admin/components/ReportList";
import { RevenueManagement } from "../screens/admin/components/RevenueManagement";
import { UserManagement } from "../screens/admin/components/UserManagement";
import { AdminUserProfile } from "../screens/admin/components/AdminUserProfile";
import { AdminPostDetail } from "../screens/admin/components/PostDetail";
import { AdminPostListManagement } from "../screens/admin/components/PostListManagement";

import { UserProfile } from "../screens/common/components/UserProfile";
import { Transaction } from "../screens/common/components/Transaction";
import { UserHome } from "../screens/common/components/Home";
import { PostDetail } from "../screens/common/components/PostDetail";
import { PostListManagement } from "../screens/common/components/PostListManagement";
import { UserEdit } from "../screens/common/components/UserEdit";
import { HomeFilter } from "../screens/common/components/HomeFilter";
import { Payment } from "../screens/common/components/Payment";
import { PaymentWithPoint } from "../screens/common/components/PaymentWithPoint";
import { PostCreate } from "../screens/common/components/PostCreate";
import PaymentQRPage from "../screens/common/components/QrPayment";
import PointExchange from "../screens/common/components/PointExchange";


export const appRouter = createBrowserRouter([
    {
        path: '',
        element: <UserHome />
    },
    // fix element later
    {
        path: 'post-create',
        element: <PostCreate />
    },
    {
        path: 'post-detail',
        element: <PostDetail />
    },
    // {
    //     path: 'post-edit',
    //     element: <Post />
    // },
    {
        path: 'post-list',
        element: <PostListManagement />
    },
    {
        path: 'user-edit',
        element: <UserEdit />
    },
    {
        path: 'user-profile',
        element: <UserProfile />
    },
    {
        path: 'transaction',
        element: <Transaction />
    },
    {
        path: 'point-exchange',
        element: <PointExchange />
    },
    {
        path: 'home-filter',
        element: <HomeFilter />
    },
    {
        path: 'payment',
        element: <Payment />
    },
    {
        path: 'payment-with-point',
        element: <PaymentWithPoint />
    },
    {
        path: 'qrcode',
        element: <PaymentQRPage />
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
            {
                path: "register",
                element: <SignUp />
            },
            {
                path: "login",
                element: <SignIn />
            },
            {
                path: "recovery-request",
                element: <RecoveryRequest />
            },
            {
                path: "recovery-notify",
                element: <RecoveryNotify />
            }
        ]
    },
    {
        path: "/admin",
        element: <Admin />,
        children: [
            {
                path: "deactive",
                element: <Deactive />
            },
            {
                path: "admin-home",
                element: <AdminHome />
            },
            {
                path: "post-list",
                element: <AdminPostListManagement />
            },
            {
                path: "post-detail",
                element: <AdminPostDetail />
            },
            {
                path: "post-verify",
                element: <PostVerification />
            },
            {
                path: "report",
                element: <ReportForm />
            },
            {
                path: "report-list",
                element: <ReportList />
            },
            {
                path: "revenue",
                element: <RevenueManagement />
            },
            {
                path: "user-management",
                element: <UserManagement />
            },
            {
                path: "user-profile",
                element: <AdminUserProfile />
            },
        ]
    }
])
