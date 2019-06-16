import React from 'react';
import HomePage from './../pages/HomePage/HomePage';
import SignInPage from './../pages/SignInPage/SignInPage';
import SignUpPage from './../pages/SignUpPage/SignUpPage';
import UserInfoPage from './../pages/UserInfoPage/UserInfoPage';
import NotFoundPage from './../pages/NotFoundPage/NotFoundPage';
import LogoutPage from './../pages/LogoutPage/LogoutPage';
import AddTodoPage from './../pages/AddTodoPage/AddTodoPage';
import TodoDonePage from '../pages/TodoDonePage/TodoDonePage';

const routes = [
    {
        path: '/',
        exact: true,
        main: (location) => <HomePage location={location} />
    },
    {
        path: '/signup',
        exact: false,
        main: () => <SignUpPage />
    },
    {
        path: '/signin',
        exact: false,
        main: () => <SignInPage />
    },
    {
        path: '/userinfo',
        exact: false,
        main: () => <UserInfoPage />
    },
    {
        path: '/addTodo',
        exact: false,
        main: () => <AddTodoPage />
    },
    {
        path: '/editTodo/:id',
        exact: false,
        main: (location, match) => <AddTodoPage location={location} match={match} />
    },
    {
        path: '/todoDoneList',
        exact: false,
        main: () => <TodoDonePage />
    },
    {
        path: '/logout',
        exact: false,
        main: () => <LogoutPage />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }
]
export default routes;