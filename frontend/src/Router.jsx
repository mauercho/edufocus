/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import PageLayout from './components/Layout/PageLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { lazy } from 'react';
import MyPageLayout from './components/Layout/MyPageLayout';
import { LiveLayout } from './components/Layout';

const LivePage = lazy(async () => await import('./pages/LivePage'));
const LectureLayout = lazy(async () => await import('./components/Layout/LectureLayout'));
const LearningLectureDetailPage = lazy(async () => await import('./pages/LearningLectureDetailPage'));
const NoticeListPage = lazy(async () => await import('./pages/NoticeListPage'));
const NoticeDetailPage = lazy(async () => await import('./pages/NoticeDetailPage'));
const NoticeEditPage = lazy(async () => await import('./pages/NoticeEditPage'));
const LectureInfoPage = lazy(async () => await import('./pages/LectureInfoPage'));
const QuestionListPage = lazy(async () => await import('./pages/QuestionListPage'));
const QuestionDetailPage = lazy(async () => await import('./pages/QuestionDetailPage'));
const CreateQuestionPage = lazy(async () => await import('./pages/CreateQuestionPage'));
const NoticeWritePage = lazy(async () => await import('./pages/NoticeWritePage/NoticeWritePage'));
const LoginPage = lazy(async () => await import('./pages/LoginPage'));
const UserRegisterPage = lazy(async () => await import('./pages/UserRegisterPage'));
const PasswordResetPage = lazy(async () => await import('./pages/PasswordResetPage'));
const MyInfoChangePage = lazy(async () => await import('./pages/MyInfoChangePage'));
const PasswordChangePage = lazy(async () => await import('./pages/PasswordChangePage'));
const LearningLecturesPage = lazy(async () => await import('./pages/LearningLecturesPage'));
const LectureCreatePage = lazy(async () => await import('./pages/LectureCreatePage'));
const EditQuestionPage = lazy(async () => await import('./pages/EditQuestionPage'));
const LectureEditPage = lazy(async () => await import('./pages/LectureEditPage'));
const QuizsetListPage = lazy(async () => await import('./pages/QuizsetListPage'));
const QuizsetWritePage = lazy(async () => await import('./pages/QuizsetWritePage'));
const QuizsetDetailPage = lazy(async () => await import('./pages/QuizsetDetailPage'));
const LectureEnrollPage = lazy(async () => await import('./pages/LectureEnrollPage'));

const router = createBrowserRouter([
  {
    path: 'live/:roomId',
    element: <LiveLayout />,
    children: [
      {
        index: true,
        element: <LivePage />,
      },
    ],
  },
  {
    path: '',
    element: <PageLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'lecture/create',
        element: <LectureCreatePage />,
      },
      {
        path: 'lecture/:lectureId/info',
        element: <LectureInfoPage />,
      },
      {
        path: 'lecture/:lectureId/edit',
        element: <LectureEditPage />,
      },
      {
        path: 'lecture/:lectureId',
        element: <LectureLayout />,
        children: [
          {
            index: true,
            element: <LearningLectureDetailPage />,
          },
          {
            path: 'edit',
            element: <LectureEditPage />,
          },
          {
            path: 'notice',
            children: [
              {
                index: true,
                element: <NoticeListPage />,
              },
              {
                path: ':noticeId',
                children: [
                  {
                    index: true,
                    element: <NoticeDetailPage />,
                  },
                  {
                    path: 'edit',
                    element: <NoticeEditPage />,
                  },
                ],
              },
              {
                path: 'write',
                element: <NoticeWritePage />,
              },
            ],
          },
          {
            path: 'qna',
            children: [
              {
                index: true,
                element: <QuestionListPage />,
              },
              {
                path: ':questionId',
                children: [
                  {
                    index: true,
                    element: <QuestionDetailPage />,
                  },
                  {
                    path: 'edit',
                    element: <EditQuestionPage />,
                  },
                ],
              },
              {
                path: ':questionId/edit',
                element: <EditQuestionPage />,
              },
              {
                path: 'write',
                element: <CreateQuestionPage />,
              },
            ],
          },
          {
            path: 'quiz',
            children: [
              {
                index: true,
                element: <QuizsetListPage />,
              },
              {
                path: 'write',
                element: <QuizsetWritePage />,
              },
              {
                path: ':quizsetId',
                element: <QuizsetDetailPage />,
              },
            ],
          },
          {
            path: 'enroll',
            element: <LectureEnrollPage />,
          },
        ],
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <UserRegisterPage />,
          },
          {
            path: 'password-reset',
            element: <PasswordResetPage />,
          },
        ],
      },
      {
        path: 'user/my',
        element: <MyPageLayout />,
        children: [
          {
            index: true,
            element: <LearningLecturesPage />,
          },
          {
            path: 'edit',
            element: <MyInfoChangePage />,
          },
          {
            path: 'changePw',
            element: <PasswordChangePage />,
          },
        ],
      },
    ],
  },
]);

export default router;
