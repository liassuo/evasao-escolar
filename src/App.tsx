import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { Dashboard } from "@/pages/Dashboard";
import { Students } from "@/pages/Students";
import { StudentProfile } from "@/pages/StudentProfile";
import { Courses } from "@/pages/Courses";
import { CourseDetail } from "@/pages/CourseDetail";
import { Reports } from "@/pages/Reports";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="alunos" element={<Students />} />
          <Route path="alunos/:id" element={<StudentProfile />} />
          <Route path="cursos" element={<Courses />} />
          <Route path="cursos/:slug" element={<CourseDetail />} />
          <Route path="relatorios" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
