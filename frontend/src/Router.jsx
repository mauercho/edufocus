/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import PageLayout from './components/Layout/PageLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { lazy, Suspense } from 'react';
import MyPageLayout from './components/Layout/MyPageLayout';
// import LivePage from './pages/LivePage';
import ErrorPage from './pages/ErrorPage';
import { LectureLayout } from './components/Layout';

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
const QuizsetEditPage = lazy(async () => await import('./pages/QuizsetEditPage'));
const FreeboardListPage = lazy(async () => await import('./pages/FreeboardListPage'));
const CreateFreeboardPage = lazy(async () => await import('./pages/CreateFreeboardPage'));
const FreeboardDetailPage = lazy(async () => await import('./pages/FreeboardDetailPage'));
const EditFreeboardPage = lazy(async () => await import('./pages/EditFreeboardPage'));
const PasswordResetAuthPage = lazy(async () => await import('./pages/PasswordResetAuthPage'));
const StudentReportPage = lazy(async () => await import('./pages/StudentReportPage'));
const StudentReportDetailPage = lazy(async () => await import('./pages/StudentReportDetailPage'));
const LivePage = lazy(async () => await import('./pages/LivePage'));

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: 'live/:roomId',
    element: (
      <Suspense fallback={<></>}>
        <LivePage />
      </Suspense>
    ),
  },
  {
    path: '',
    element: <PageLayout />,
    errorElement: <ErrorPage />,
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
        path: 'lecture/:lectureId',
        element: <LectureLayout />,
        children: [
          {
            index: true,
            element: <LearningLectureDetailPage />,
          },
          {
            path: 'report',
            element: <StudentReportPage />,
          },
          {
            path: 'report/:reportId',
            element: <StudentReportDetailPage />,
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
                path: 'write',
                element: <CreateQuestionPage />,
              },
            ],
          },
          {
            path: 'freeboard',
            children: [
              {
                index: true,
                element: <FreeboardListPage />,
              },
              {
                path: ':freeboardId',
                children: [
                  {
                    index: true,
                    element: <FreeboardDetailPage />,
                  },
                  {
                    path: 'edit',
                    element: <EditFreeboardPage />,
                  },
                ],
              },
              {
                path: 'write',
                element: <CreateFreeboardPage />,
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
                children: [
                  {
                    index: true,
                    element: <QuizsetDetailPage />,
                  },
                  {
                    path: 'edit',
                    element: <QuizsetEditPage />,
                  },
                ],
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
          {
            path: 'resetAuth',
            element: <PasswordResetAuthPage />,
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
