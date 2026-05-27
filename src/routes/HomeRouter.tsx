import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "../components/HomeLayout";
import { HomePage } from "../views/HomePage";
import { AboutPage } from "../views/AboutPage";
import { TutorialPage } from "../views/TutorialPage";
import BlogPage from "../views/BlogPage";
import ContactPage from "../views/ContactPage";

export const HomeRouter = () => {
  return (
    <>
      <HomeLayout>
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </HomeLayout>
    </>
  );
};
