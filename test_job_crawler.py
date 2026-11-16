import unittest

from job_crawler import is_title_candidate


class CandidateTitleTests(unittest.TestCase):
    def test_relevant_english_and_hebrew_roles(self):
        for title in (
            "Junior Industrial Engineer",
            "Business Operations Analyst",
            "Supply Chain Coordinator",
            "Junior Procurement Specialist",
            "Production Planner",
            "Project Coordinator",
            "Business Analyst",
            "מהנדסת תעשייה וניהול",
            "רכזת פרויקטים",
            "אנליסטית תפעול",
        ):
            with self.subTest(title=title):
                self.assertTrue(is_title_candidate(title))

    def test_unrelated_or_student_roles(self):
        for title in (
            "Software Engineer",
            "Backend Developer",
            "Manual QA Engineer",
            "Operations Student",
            "Supply Chain Intern",
            "סטודנטית לתעשייה וניהול",
            "Senior Operations Manager",
            "Junior Office & Operations Assistant",
            "Finance Operations Associate",
            "Trade Analyst – Operations",
            "Duty Drawback Analyst – Operations",
            "אחראי/ת תפעול ואדמיניסטרציה",
            "מפעיל/ה בקו הייצור Corporate Operation",
            "מלקט.ת למרלוג תפעול ולוגיסטיקה",
            "נציג.ת לוגיסטיקה תפעול ולוגיסטיקה",
        ):
            with self.subTest(title=title):
                self.assertFalse(is_title_candidate(title))


if __name__ == "__main__":
    unittest.main()
