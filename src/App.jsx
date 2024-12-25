import "./App.css";
import Layout from "./layout/layout";
import LoginLayout from "./layout/loginLayout";
import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./main/home/home";
import LoginForm from "./components/(auth)/login";
import NotFound from "./components/not-found";
import Dashboard from "./main/dashboard/dashboard";
import Logout from "./components/(auth)/logout";
import Loading from "./components/loading";
import CreateUser from "./main/home/createUser";
import ReadUser from "./main/home/readUser";
import UpdateUser from "./main/home/updateUser";
import Error from "./components/error";
import PopupNotice from "./main/popup_notice/popupnotice";
import ReadPopup from "./main/popup_notice/readPopupNotice";
import Notices from "./main/notice/notice";
import General from "./main/general-information/general";
import Facilities from "./main/facilities/facilities";
import CreateFacilities from "./main/facilities/createFacilities";
import ReadFacilities from "./main/facilities/readFacilities";
import UpdateFacilities from "./main/facilities/updateFacilities";
import Testimonial from "./main/testimonial/testimonial";
import CreateTestimonial from "./main/testimonial/createTestimonial";
import ReadTestimonial from "./main/testimonial/readTestimonial";
import UpdateTestimonial from "./main/testimonial/updateTestimonial";
import Contact from "./main/contact/contact";
import ReadContact from "./main/contact/readContact";
import AboutCollege from "./main/about-college/aboutCollege";
import Messages from "./main/message/message";
import ReadMessage from "./main/message/readMessage";
import UpdateMessage from "./main/message/updateMessage";
import CreateMessage from "./main/message/createMessage";
import AdvisorCommittee from "./main/committee/advisory_committee/advisorCommittee";
import ReadAdvisor from "./main/committee/advisory_committee/readAdvisor";
import CreateAdvisory from "./main/committee/advisory_committee/createAdvisory";
import UpdateAdvisory from "./main/committee/advisory_committee/updateAdvisory";
import UpdateResearch from "./main/committee/research_committee/updateResearch";
import ReadResearch from "./main/committee/research_committee/readResearch";
import CreateResearch from "./main/committee/research_committee/CreateResearch";
import ResearchCommittee from "./main/committee/research_committee/researchCommittee";
import News from "./main/news/news";
import CreateNews from "./main/news/createNews";
import ReadNews from "./main/news/readNews";
import UpdateNews from "./main/news/updateNews";
import CreatePopupNotice from "./main/popup_notice/createPopupNotice";
import CreateNotice from "./main/notice/createNotice";
import ReadNotice from "./main/notice/readNotice";
import Admissions from "./main/admissions/admission";
import Gallery from "./main/gallery/gallery";
import Downloads from "./main/download/download";
import HomeSlider from "./main/home-slider/homeSlider";
import CreateHomeSlider from "./main/home-slider/createHomeSlider";
import ReadHomeSlider from "./main/home-slider/readHomeSlider";
import UpdateHomeSlider from "./main/home-slider/updateHomeSlider";
import CreateGallery from "./main/gallery/createGallery";
import ReadGallery from "./main/gallery/readGallery";
import UpdateGallery from "./main/gallery/updateGallery";
import Programs from "./main/programs/programs";
import ReadProgram from "./main/programs/readPrograms";
import CreateProgram from "./main/programs/createProgram";
import UpdateProgram from "./main/programs/updateProgram";
import ResearchManagement from "./main/research-management/researchManagement";
import CreateResearchManagement from "./main/research-management/createResearchManagement";
import ReadResearchManagement from "./main/research-management/readResearchManagement";
import UpdateResearchManagement from "./main/research-management/updateResearchManagement";
import CreateDownload from "./main/download/createDownload";
import ReadDownload from "./main/download/readDownload";
import UpdateDownload from "./main/download/updateDownload";
import ForgetPassword from "./components/(auth)/forgetPassword";
import ResetPassword from "./components/(auth)/resetPassword";
import ChangePassword from "./components/(auth)/changePassword";
import Alumini from "./main/alumini/alumini";
import CreateAlumini from "./main/alumini/createAlumini";
import ReadAlumini from "./main/alumini/readAlumini";
import UpdateAlumini from "./main/alumini/updateAlumini";
import Admission from "./main/admission/admission";
import ReadAdmission from "./main/admission/ReadAdmission";
import StudentCouncil from "./main/studentCouncil/studentCouncil";
import ReadStudent from "./main/studentCouncil/readStudentCouncil";
import CreateStudent from "./main/studentCouncil/createStudentCouncil";
import UpdateStudent from "./main/studentCouncil/updateStudentCouncil";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />, // Navbar as the parent component
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/user",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/user/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateUser />
          </Suspense>
        ),
      },
      {
        path: "/user/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadUser />
          </Suspense>
        ),
      },
      {
        path: "/user/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateUser />
          </Suspense>
        ),
      },
      {
        path: "/noticePopup",
        element: (
          <Suspense fallback={<Loading />}>
            <PopupNotice />
          </Suspense>
        ),
      },

      {
        path: "/noticePopup/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreatePopupNotice />
          </Suspense>
        ),
      },
      {
        path: "/noticePopup/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadPopup />
          </Suspense>
        ),
      },
      {
        path: "/notice",
        element: (
          <Suspense fallback={<Loading />}>
            <Notices />
          </Suspense>
        ),
      },
      {
        path: "/notice/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateNotice />
          </Suspense>
        ),
      },
      {
        path: "/notice/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadNotice />
          </Suspense>
        ),
      },
      {
        path: "/general-information",
        element: (
          <Suspense fallback={<Loading />}>
            <General />
          </Suspense>
        ),
      },
      {
        path: "/facilities",
        element: (
          <Suspense fallback={<Loading />}>
            <Facilities />
          </Suspense>
        ),
      },
      {
        path: "/facilities/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateFacilities />
          </Suspense>
        ),
      },
      {
        path: "/facilities/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadFacilities />
          </Suspense>
        ),
      },
      {
        path: "/facilities/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateFacilities />
          </Suspense>
        ),
      },
      {
        path: "/testimonial",
        element: (
          <Suspense fallback={<Loading />}>
            <Testimonial />
          </Suspense>
        ),
      },
      {
        path: "/testimonial/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateTestimonial />
          </Suspense>
        ),
      },
      {
        path: "/testimonial/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadTestimonial />
          </Suspense>
        ),
      },
      {
        path: "/testimonial/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateTestimonial />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/contact/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadContact />
          </Suspense>
        ),
      },
      {
        path: "/about-college",
        element: (
          <Suspense fallback={<Loading />}>
            <AboutCollege />
          </Suspense>
        ),
      },
      {
        path: "/messages",
        element: (
          <Suspense fallback={<Loading />}>
            <Messages />
          </Suspense>
        ),
      },
      {
        path: "/messages/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateMessage />
          </Suspense>
        ),
      },
      {
        path: "/messages/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadMessage />
          </Suspense>
        ),
      },
      {
        path: "/messages/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateMessage />
          </Suspense>
        ),
      },
      {
        path: "/advisory-committee",
        element: (
          <Suspense fallback={<Loading />}>
            <AdvisorCommittee />
          </Suspense>
        ),
      },
      {
        path: "/advisory-committee/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateAdvisory />
          </Suspense>
        ),
      },
      {
        path: "/advisory-committee/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadAdvisor />
          </Suspense>
        ),
      },
      {
        path: "/advisory-committee/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateAdvisory />
          </Suspense>
        ),
      },
      {
        path: "/research-committee",
        element: (
          <Suspense fallback={<Loading />}>
            <ResearchCommittee />
          </Suspense>
        ),
      },
      {
        path: "/research-committee/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateResearch />
          </Suspense>
        ),
      },
      {
        path: "/research-committee/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadResearch />
          </Suspense>
        ),
      },
      {
        path: "/research-committee/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateResearch />
          </Suspense>
        ),
      },
      {
        path: "/news",
        element: (
          <Suspense fallback={<Loading />}>
            <News />
          </Suspense>
        ),
      },
      {
        path: "/news/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateNews />
          </Suspense>
        ),
      },
      {
        path: "/news/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadNews />
          </Suspense>
        ),
      },
      {
        path: "/news/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateNews />
          </Suspense>
        ),
      },
      {
        path: "/admission",
        element: (
          <Suspense fallback={<Loading />}>
            <Admissions />
          </Suspense>
        ),
      },
      {
        path: "/gallery",
        element: (
          <Suspense fallback={<Loading />}>
            <Gallery />
          </Suspense>
        ),
      },
      {
        path: "/gallery/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateGallery />
          </Suspense>
        ),
      },
      {
        path: "/gallery/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadGallery />
          </Suspense>
        ),
      },
      {
        path: "/gallery/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateGallery />
          </Suspense>
        ),
      },
      {
        path: "/downloads",
        element: (
          <Suspense fallback={<Loading />}>
            <Downloads />
          </Suspense>
        ),
      },
      {
        path: "/downloads/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateDownload />
          </Suspense>
        ),
      },
      {
        path: "/downloads/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadDownload />
          </Suspense>
        ),
      },
      {
        path: "/downloads/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateDownload />
          </Suspense>
        ),
      },
      {
        path: "/home-slider",
        element: (
          <Suspense fallback={<Loading />}>
            <HomeSlider />
          </Suspense>
        ),
      },
      {
        path: "/home-slider/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateHomeSlider />
          </Suspense>
        ),
      },
      {
        path: "/home-slider/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadHomeSlider />
          </Suspense>
        ),
      },
      {
        path: "/home-slider/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateHomeSlider />
          </Suspense>
        ),
      },
      {
        path: "/program",
        element: (
          <Suspense fallback={<Loading />}>
            <Programs />
          </Suspense>
        ),
      },
      {
        path: "/program/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateProgram />
          </Suspense>
        ),
      },
      {
        path: "/program/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateProgram />
          </Suspense>
        ),
      },
      {
        path: "/program/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadProgram />
          </Suspense>
        ),
      },
      {
        path: "/research-management",
        element: (
          <Suspense fallback={<Loading />}>
            <ResearchManagement />
          </Suspense>
        ),
      },
      {
        path: "/research-management/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateResearchManagement />
          </Suspense>
        ),
      },
      {
        path: "/research-management/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadResearchManagement />
          </Suspense>
        ),
      },
      {
        path: "/research-management/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateResearchManagement/>
          </Suspense>
        ),
      },
      {
        path: "/alumini",
        element: (
          <Suspense fallback={<Loading />}>
            <Alumini/>
          </Suspense>
        ),
      },
      {
        path: "/alumini/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateAlumini/>
          </Suspense>
        ),
      },
      {
        path: "/alumini/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadAlumini/>
          </Suspense>
        ),
      },
      {
        path: "/alumini/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateAlumini/>
          </Suspense>
        ),
      },
      {
        path: "/admissionForm",
        element: (
          <Suspense fallback={<Loading />}>
            <Admission/>
          </Suspense>
        ),
      },
      {
        path: "/admissionForm/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadAdmission/>
          </Suspense>
        ),
      },
      {
        path: "/studentCouncil",
        element: (
          <Suspense fallback={<Loading />}>
            <StudentCouncil/>
          </Suspense>
        ),
      },
      {
        path: "/studentCouncil/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateStudent/>
          </Suspense>
        ),
      },
      {
        path: "/studentCouncil/read/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReadStudent/>
          </Suspense>
        ),
      },
      {
        path: "/studentCouncil/update/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateStudent/>
          </Suspense>
        ),
      },
      {
        path: "/changePassword/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ChangePassword/>
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <LoginLayout />,
    errorElement: <Error />, // Navbar as the parent component
    children: [
      {
        path: "/login",
        element: <LoginForm />
      },
      {
        path:"/forgetPassword",
        element:<ForgetPassword/>
      },
      {
        path:"/resetPassword",
        element:<ResetPassword/>
      }
    ],
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <NotFound />, // NotFound component for unmatched routes
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
