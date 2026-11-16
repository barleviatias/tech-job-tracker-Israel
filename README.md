# מעקב משרות תעשייה וניהול בישראל

גרסה מותאמת של [Israeli Tech Junior Job Tracker](https://github.com/amitshtark/tech-job-tracker-Israel) לחיפוש משרות התחלתיות בישראל לבוגרי תעשייה וניהול. הסורק מחפש תפקידי תפעול, שרשרת אספקה, לוגיסטיקה, רכש, תכנון, ניהול פרויקטים, PMO, שיפור תהליכים וניתוח עסקי/נתונים. ברירת המחדל היא **0–2 שנות ניסיון**, כולל בוגרים וג׳וניורים, ללא משרות סטודנט או התמחות.

הסריקה מתוזמנת בארבע ריצות יומיות באמצעות GitHub Actions. המשרות שאושרו מתווספות ל־`seen_jobs.json`, מוצגות ב־GitHub Pages ונכללות בקובץ Excel שנשמר כ־Artifact בכל ריצה. הסורק בודק כותרות תחילה, ואז שולח את תוכן המשרות המתאימות ל־Gemini לבדיקה של תפקיד, ניסיון, מיקום ודף משרה יחיד. סינון הכותרות אינו מושלם, ומשרות באתרי קריירה שדורשים JavaScript עשויות לא להימצא.

## הפעלה ב־Fork

1. צור Fork לחשבון GitHub שלך. ב־Fork, הפעל את ה־Workflows בלשונית **Actions** אם GitHub מציג בקשה לכך.
2. ב־**Settings → Secrets and variables → Actions** הוסף Repository secret בשם `GEMINI_API_KEY`, עם מפתח מ־[Google AI Studio](https://aistudio.google.com/). אין להכניס את המפתח לקובץ במאגר.
3. הפעל ידנית את **Israeli Industrial Engineering Job Crawler** דרך **Actions → Run workflow** ובדוק שהריצה הסתיימה בהצלחה. לאחר מכן הריצות המתוזמנות יופעלו אוטומטית; GitHub עשוי לעכב ריצות מתוזמנות. ה־Workflow מבקש `contents: write` רק עבור עדכון `seen_jobs.json`, ולכן אין צורך להרחיב את הרשאות ברירת המחדל של כל ה־Workflows.
4. ב־**Settings → Pages** בחר פרסום מ־**Deploy from a branch**, הענף `main` והתיקייה `/ (root)`. הכתובת תהיה `https://<your-username>.github.io/<repository-name>/`.

ה־Workflow רץ ב־06:00, 10:00, 14:00 ו־18:00 UTC. השעות בישראל משתנות לפי שעון קיץ/חורף. קובץ ה־Excel זמין ב־**Actions → הריצה האחרונה → Artifacts → daily-jobs-excel**.

## התאמת החיפוש

אפשר לערוך את `config.json` ישירות ב־GitHub:

- `min_yoe` ו־`max_yoe`: טווח שנות ניסיון.
- `location`: מיקום היעד, כברירת מחדל `Israel`.
- `include_student_and_graduate`: במצב `false` משרות סטודנט והתמחות נפסלות; משרות ג׳וניור ובוגרים עדיין מותרות.
- `target_roles`: תחומי התפקיד שהמודל יאשר.
- `candidate_title_patterns`: ביטויים רגולריים לכותרות באנגלית ובעברית שעוברות לסינון המעמיק. שינוי תחום חיפוש מחייב עדכון של רשימה זו לצד `target_roles`.
- `excluded_roles`: תחומים לפסילה מוקדמת.

`seen_jobs.json` מתחיל ריק בגרסה הזו, כך שמשרות הפיתוח שנאספו במקור לא יופיעו בלוח. הסימונים האישיים בלוח והרפרלים האישיים נשמרים רק בדפדפן (`localStorage`).

## הרצה מקומית

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# הוסף GEMINI_API_KEY לקובץ .env
python -m unittest discover -v
python job_crawler.py
```

קובץ `.env` מוחרג מ־Git. אין צורך להריץ את הסורק מקומית כדי להשתמש ב־Fork וב־GitHub Actions.
